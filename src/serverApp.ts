import express, { Response } from 'express';
import { inMemoryStore } from './lib/sanityStore';
import {
  authMiddleware,
  requireRoles,
  signJwtToken,
  AuthenticatedRequest,
} from './server/auth';
import {
  UserRole,
  ActionType,
  CertificatStatus,
  AutoEcole,
  Eleve,
  User,
  ProgrammePermis,
  ModuleFormation,
  Quiz,
  Certificat,
} from './types';

function getRefId(item: any): string | undefined {
  if (!item) return undefined;
  if (typeof item === 'string') return item;
  return item._ref || item._id;
}

const app = express();

app.use(express.json());

// CORS & Preflight headers for cross-origin or serverless environments
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Synchronize in-memory store with Sanity Cloud on boot
inMemoryStore.loadFromSanity().catch((err) => console.warn('Sanity load warning:', err));

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Matoa Multi-Tenant Driving School SaaS', time: new Date().toISOString() });
});

// 1. AUTH - Login
app.post('/api/auth/login', (req, res) => {
  const { loginType, email, password, codeAutoEcole, codeEleveUnique } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Le mot de passe est obligatoire.' });
  }

  const todayStr = new Date().toISOString().split('T')[0];

  // Role-based login handling
  if (loginType === UserRole.SUPER_ADMIN) {
    const user = inMemoryStore.users.find(
      (u) => u.role === UserRole.SUPER_ADMIN && (u.email.toLowerCase() === (email || '').trim().toLowerCase() || u.email === 'matoa@gmail.com')
    );

    if (!user || user.passwordHash !== password) {
      return res.status(401).json({ error: 'Identifiants Super Admin incorrects.' });
    }

    const token = signJwtToken({
      userId: user._id,
      email: user.email,
      name: user.name,
      role: UserRole.SUPER_ADMIN,
    });

    inMemoryStore.addLog(user, ActionType.CONNEXION_UTILISATEUR, 'Connexion Super Admin Matoa');

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: UserRole.SUPER_ADMIN,
      },
    });
  }

  if (loginType === UserRole.AUTO_ECOLE_ADMIN) {
    const user = inMemoryStore.users.find(
      (u) => u.role === UserRole.AUTO_ECOLE_ADMIN && u.email.toLowerCase() === (email || '').trim().toLowerCase()
    );

    if (!user || user.passwordHash !== password) {
      return res.status(401).json({ error: 'Identifiants Administrateur Auto-École incorrects.' });
    }

    const aeId = getRefId(user.autoEcole);
    const ae = inMemoryStore.getAutoEcoleById(aeId);

    if (!ae || !ae.isActive) {
      return res.status(403).json({
        error: 'Compte Auto-École suspendu ou inactif. Veuillez contacter le support Matoa.',
      });
    }

    const token = signJwtToken({
      userId: user._id,
      email: user.email,
      name: user.name,
      role: UserRole.AUTO_ECOLE_ADMIN,
      autoEcoleId: ae._id,
    });

    inMemoryStore.addLog(user, ActionType.CONNEXION_UTILISATEUR, `Connexion Admin Auto-École : ${ae.name}`, ae._id);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: UserRole.AUTO_ECOLE_ADMIN,
        autoEcoleId: ae._id,
        autoEcoleName: ae.name,
      },
      autoEcole: ae,
    });
  }

  if (loginType === UserRole.ELEVE) {
    if (!codeAutoEcole) {
      return res.status(400).json({ error: 'Le code unique d\'auto-école est requis pour la connexion élève.' });
    }

    // Find driving school
    const ae = inMemoryStore.autoEcoles.find(
      (a) => a.codeAutoEcoleUnique.toUpperCase() === codeAutoEcole.trim().toUpperCase()
    );

    if (!ae || !ae.isActive) {
      return res.status(404).json({ error: 'Code auto-école introuvable ou établissement suspendu.' });
    }

    // Find eleve record attached to this auto-école
    const eleveRecord = inMemoryStore.eleves.find((el) => {
      const elAeId = getRefId(el.autoEcole);
      if (elAeId !== ae._id) return false;

      const user = inMemoryStore.getUserById(el.user);
      if (!user) return false;

      const matchesCode = codeEleveUnique && el.codeEleveUnique.toUpperCase() === codeEleveUnique.trim().toUpperCase();
      const matchesEmail = email && user.email.toLowerCase() === email.trim().toLowerCase();

      return matchesCode || matchesEmail;
    });

    if (!eleveRecord) {
      return res.status(401).json({ error: 'Élève non trouvé pour cette auto-école. Vérifiez votre code élève ou email.' });
    }

    const user = inMemoryStore.getUserById(eleveRecord.user);
    if (!user || user.passwordHash !== password) {
      return res.status(401).json({ error: 'Mot de passe élève incorrect.' });
    }

    // Business Rule: Check if formation dates expired
    if (eleveRecord.dateFinFormation && eleveRecord.dateFinFormation < todayStr) {
      eleveRecord.isBlocked = true;
      eleveRecord.formationActive = false;

      inMemoryStore.addLog(
        user,
        ActionType.SUSPENSION_ELEVE,
        `Tentative de connexion refusée : Période de formation expirée (${eleveRecord.dateFinFormation})`,
        ae._id
      );

      return res.status(403).json({
        error: `ACCÈS SUSPENDU : Votre période de formation s'est achevée le ${eleveRecord.dateFinFormation}. Votre compte est actuellement verrouillé. Veuillez contacter l'administration de ${ae.name}.`,
        isBlocked: true,
        isExpired: true,
        dateFinFormation: eleveRecord.dateFinFormation,
      });
    }

    if (eleveRecord.isBlocked || !user.isActive) {
      return res.status(403).json({
        error: `ACCÈS SUSPENDU : Votre compte élève a été bloqué par votre auto-école (${ae.name}). Veuillez contacter la direction pour rétablir votre accès.`,
        isBlocked: true,
      });
    }

    const token = signJwtToken({
      userId: user._id,
      email: user.email,
      name: user.name,
      role: UserRole.ELEVE,
      autoEcoleId: ae._id,
      codeEleveUnique: eleveRecord.codeEleveUnique,
    });

    inMemoryStore.addLog(
      user,
      ActionType.CONNEXION_UTILISATEUR,
      `Connexion de l'élève ${user.name} (${eleveRecord.codeEleveUnique})`,
      ae._id
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: UserRole.ELEVE,
        autoEcoleId: ae._id,
        autoEcoleName: ae.name,
        codeEleveUnique: eleveRecord.codeEleveUnique,
        eleveId: eleveRecord._id,
      },
      autoEcole: ae,
      eleve: eleveRecord,
    });
  }

  return res.status(400).json({ error: 'Type de connexion invalide.' });
});

// 2. AUTH - Session info
app.get('/api/auth/me', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userPayload = req.user!;
  const user = inMemoryStore.getUserById(userPayload.userId);

  if (!user || !user.isActive) {
    return res.status(403).json({ error: 'Utilisateur introuvable ou suspendu.', isBlocked: true });
  }

  let ae: AutoEcole | undefined;
  let eleve: Eleve | undefined;

  if (userPayload.autoEcoleId) {
    ae = inMemoryStore.getAutoEcoleById(userPayload.autoEcoleId);
    if (userPayload.role !== UserRole.SUPER_ADMIN && (!ae || !ae.isActive)) {
      return res.status(403).json({ error: 'Établissement auto-école suspendu.', isBlocked: true });
    }
  }

  if (userPayload.role === UserRole.ELEVE) {
    eleve = inMemoryStore.eleves.find((el) => {
      const uId = getRefId(el.user);
      return uId === user._id;
    });

    if (!eleve) {
      return res.status(404).json({ error: 'Dossier élève introuvable.', isBlocked: true });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const isExpired = eleve.dateFinFormation ? eleve.dateFinFormation < todayStr : false;

    if (eleve.isBlocked || !eleve.formationActive || isExpired) {
      if (isExpired && !eleve.isBlocked) {
        eleve.isBlocked = true;
        eleve.formationActive = false;
        inMemoryStore.syncEleveToSanity(eleve, user);
      }
      return res.status(403).json({
        error: eleve.isBlocked
          ? `Accès élève suspendu par l'auto-école ${ae?.name || 'Matoa Auto-École'}.`
          : `Période de formation expirée le ${eleve.dateFinFormation}.`,
        isBlocked: true,
        isExpired,
      });
    }
  }

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      autoEcoleId: ae?._id,
      autoEcoleName: ae?.name,
      codeEleveUnique: eleve?.codeEleveUnique,
      eleveId: eleve?._id,
    },
    autoEcole: ae,
    eleve,
  });
});

// 3. AUTO-ÉCOLES (CRUD & Tenant management)
app.get('/api/auto-ecoles', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  if (req.user?.role === UserRole.SUPER_ADMIN) {
    const schools = inMemoryStore.autoEcoles.map((ae) => {
      const studentCount = inMemoryStore.eleves.filter((e) => {
        const aeRef = getRefId(e.autoEcole);
        return aeRef === ae._id;
      }).length;

      return { ...ae, studentCount };
    });
    return res.json(schools);
  }

  if (req.user?.role === UserRole.AUTO_ECOLE_ADMIN) {
    const ae = inMemoryStore.getAutoEcoleById(req.user.autoEcoleId);
    return res.json(ae ? [ae] : []);
  }

  res.status(403).json({ error: 'Accès non autorisé.' });
});

app.post('/api/auto-ecoles', authMiddleware, requireRoles(UserRole.SUPER_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  const { name, adresse, contact, slogan, primaryColor, secondaryColor, adminName, adminEmail, adminPassword } = req.body;

  if (!name || !adminEmail || !adminPassword) {
    return res.status(400).json({ error: 'Le nom, l\'email admin et le mot de passe sont requis.' });
  }

  const count = inMemoryStore.autoEcoles.length + 1;
  const codeAutoEcoleUnique = `MATOA-AE-${String(count).padStart(3, '0')}`;
  const aeId = `ae-${Date.now()}`;

  const newAutoEcole: AutoEcole = {
    _id: aeId,
    _type: 'autoEcole',
    name,
    adresse: adresse || '',
    contact: contact || { phone: '', email: adminEmail },
    codeAutoEcoleUnique,
    logo: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=150&auto=format&fit=crop&q=80',
    couleursTheme: {
      primaryColor: primaryColor || '#2563eb',
      secondaryColor: secondaryColor || '#059669',
    },
    slogan: slogan || 'Bienvenue dans notre auto-école.',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  inMemoryStore.autoEcoles.push(newAutoEcole);
  inMemoryStore.syncAutoEcoleToSanity(newAutoEcole);

  // Create Auto-école Admin User
  const newAdminUser: User = {
    _id: `user-ae-${Date.now()}`,
    _type: 'user',
    name: adminName || `Admin ${name}`,
    email: adminEmail,
    phone: contact?.phone || '',
    role: UserRole.AUTO_ECOLE_ADMIN,
    autoEcole: { _type: 'reference', _ref: aeId },
    passwordHash: adminPassword,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  inMemoryStore.users.push(newAdminUser);
  inMemoryStore.syncUserToSanity(newAdminUser);

  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.CREATION_AUTO_ECOLE,
    `Création de l'auto-école ${name} (${codeAutoEcoleUnique}) avec administrateur ${adminEmail}`,
    aeId
  );

  res.status(201).json({ autoEcole: newAutoEcole, adminUser: newAdminUser });
});

app.put('/api/auto-ecoles/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  if (req.user?.role === UserRole.AUTO_ECOLE_ADMIN && req.user.autoEcoleId !== id) {
    return res.status(403).json({ error: 'Vous ne pouvez modifier que votre propre auto-école.' });
  }

  const ae = inMemoryStore.getAutoEcoleById(id);
  if (!ae) {
    return res.status(404).json({ error: 'Auto-école non trouvée.' });
  }

  const { name, adresse, contact, slogan, logo, couleursTheme, isActive } = req.body;

  if (name) ae.name = name;
  if (adresse !== undefined) ae.adresse = adresse;
  if (contact) ae.contact = { ...ae.contact, ...contact };
  if (slogan !== undefined) ae.slogan = slogan;
  if (logo !== undefined) ae.logo = logo;
  if (couleursTheme) ae.couleursTheme = { ...ae.couleursTheme, ...couleursTheme };

  if (req.user?.role === UserRole.SUPER_ADMIN && isActive !== undefined) {
    ae.isActive = isActive;
    inMemoryStore.addLog(
      req.user.userId,
      isActive ? ActionType.ACTIVATION_AUTO_ECOLE : ActionType.SUSPENSION_AUTO_ECOLE,
      `Auto-école ${ae.name} ${isActive ? 'réactivée' : 'suspendue'}.`,
      ae._id
    );
  }

  ae.updatedAt = new Date().toISOString();
  inMemoryStore.syncAutoEcoleToSanity(ae);

  if (req.user?.role === UserRole.AUTO_ECOLE_ADMIN) {
    inMemoryStore.addLog(
      req.user.userId,
      ActionType.MODIFICATION_BRANDING,
      `Mise à jour du branding et informations de l'auto-école ${ae.name}`,
      ae._id
    );
  }

  res.json(ae);
});

app.delete('/api/auto-ecoles/:id', authMiddleware, requireRoles(UserRole.SUPER_ADMIN), async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const ae = inMemoryStore.getAutoEcoleById(id);
  if (!ae) {
    return res.status(404).json({ error: 'Auto-école introuvable.' });
  }

  const schoolName = ae.name;
  const schoolCode = ae.codeAutoEcoleUnique;

  inMemoryStore.autoEcoles = inMemoryStore.autoEcoles.filter((a) => a._id !== id);
  inMemoryStore.eleves = inMemoryStore.eleves.filter((e) => getRefId(e.autoEcole) !== id);
  inMemoryStore.users = inMemoryStore.users.filter((u) => getRefId(u.autoEcole) !== id);

  inMemoryStore.deleteSanityDocument(id);

  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.SUPPRESSION_AUTO_ECOLE,
    `Suppression définitive de l'auto-école ${schoolName} (${schoolCode})`,
    id
  );

  res.json({ message: `L'auto-école ${schoolName} a été supprimée avec succès.`, deletedId: id });
});

// User Profile Settings Endpoint
app.put('/api/users/profile', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const user = inMemoryStore.getUserById(userId);

  if (!user) {
    return res.status(404).json({ error: 'Utilisateur introuvable.' });
  }

  const { name, email, phone, currentPassword, newPassword, notificationPreferences } = req.body;

  if (name) user.name = name;
  if (phone !== undefined) user.phone = phone;

  if (email && email.toLowerCase() !== user.email.toLowerCase()) {
    const existing = inMemoryStore.users.find((u) => u._id !== userId && u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé par un autre compte.' });
    }
    user.email = email;
  }

  if (newPassword) {
    if (currentPassword && currentPassword !== user.passwordHash) {
      return res.status(400).json({ error: 'Le mot de passe actuel est incorrect.' });
    }
    user.passwordHash = newPassword;
  }

  if (notificationPreferences) {
    (user as any).notificationPreferences = notificationPreferences;
  }

  user.updatedAt = new Date().toISOString();
  inMemoryStore.syncUserToSanity(user);

  inMemoryStore.addLog(
    userId,
    ActionType.MODIFICATION_ELEVE,
    `Mise à jour des paramètres du profil utilisateur (${user.name})`,
    req.user?.autoEcoleId
  );

  res.json({
    message: 'Profil mis à jour avec succès.',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      notificationPreferences: (user as any).notificationPreferences || {},
    },
  });
});

// 4. ÉLÈVES MANAGEMENT (CRUD & BULK IMPORT)
app.get('/api/eleves', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  let list = [...inMemoryStore.eleves];

  if (req.user?.role === UserRole.AUTO_ECOLE_ADMIN || req.user?.role === UserRole.ELEVE) {
    list = list.filter((e) => {
      const aeRef = getRefId(e.autoEcole);
      return aeRef === req.user?.autoEcoleId;
    });
  }

  const enriched = list.map((el) => {
    const user = inMemoryStore.getUserById(el.user);
    const ae = inMemoryStore.getAutoEcoleById(el.autoEcole);

    const todayStr = new Date().toISOString().split('T')[0];
    const isExpired = el.dateFinFormation ? el.dateFinFormation < todayStr : false;

    return {
      ...el,
      userDetail: user ? { name: user.name, email: user.email, phone: user.phone } : null,
      autoEcoleDetail: ae ? { name: ae.name, code: ae.codeAutoEcoleUnique } : null,
      isExpired,
    };
  });

  res.json(enriched);
});

app.post('/api/eleves', authMiddleware, requireRoles(UserRole.SUPER_ADMIN, UserRole.AUTO_ECOLE_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  const { name, email, phone, password, dateDebutFormation, dateFinFormation, autoEcoleId, typePermis, programmePermisId } = req.body;

  const targetAeId = req.user?.role === UserRole.SUPER_ADMIN ? autoEcoleId : req.user?.autoEcoleId;

  if (!name || !email || !password || !dateDebutFormation || !dateFinFormation || !targetAeId) {
    return res.status(400).json({ error: 'Tous les champs requis doivent être renseignés.' });
  }

  const ae = inMemoryStore.getAutoEcoleById(targetAeId);
  if (!ae) {
    return res.status(404).json({ error: 'Auto-école introuvable.' });
  }

  const selectedTypePermis = (typePermis || 'B').trim().toUpperCase();
  let selectedProgId = programmePermisId;
  if (!selectedProgId) {
    const matchedProg = inMemoryStore.programmesPermis.find((p) => p.typePermis === selectedTypePermis);
    if (matchedProg) {
      selectedProgId = matchedProg._id;
    }
  }

  const existingUser = inMemoryStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ error: 'Un utilisateur avec cette adresse email existe déjà.' });
  }

  const aeIndex = ae.codeAutoEcoleUnique.split('-')[2] || '001';
  const totalStudentsInAe = inMemoryStore.eleves.filter((e) => {
    const aeRef = getRefId(e.autoEcole);
    return aeRef === ae._id;
  }).length + 1;

  const codeEleveUnique = `AE${aeIndex}-ELV${String(totalStudentsInAe).padStart(3, '0')}`;

  const userId = `user-eleve-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const newUser: User = {
    _id: userId,
    _type: 'user',
    name,
    email,
    phone: phone || '',
    role: UserRole.ELEVE,
    autoEcole: { _type: 'reference', _ref: ae._id },
    passwordHash: password,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  inMemoryStore.users.push(newUser);

  const eleveId = `eleve-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const newEleve: Eleve = {
    _id: eleveId,
    _type: 'eleve',
    user: { _type: 'reference', _ref: userId },
    autoEcole: { _type: 'reference', _ref: ae._id },
    codeEleveUnique,
    typePermis: selectedTypePermis,
    programmePermis: selectedProgId ? { _type: 'reference', _ref: selectedProgId } : undefined,
    dateDebutFormation,
    dateFinFormation,
    formationActive: true,
    progressionGlobal: 0,
    isBlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  inMemoryStore.eleves.push(newEleve);
  inMemoryStore.syncEleveToSanity(newEleve, newUser);

  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.CREATION_ELEVE,
    `Création de l'élève ${name} (${codeEleveUnique}) - Permis ${selectedTypePermis} du ${dateDebutFormation} au ${dateFinFormation}`,
    ae._id
  );

  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.CHOIX_TYPE_PERMIS_POUR_ELEVE,
    `Attribution du Permis ${selectedTypePermis} pour l'élève ${name} (${codeEleveUnique})`,
    ae._id
  );

  res.status(201).json({
    eleve: newEleve,
    user: newUser,
    codeEleveUnique,
  });
});

// CSV Bulk Import Route
app.post('/api/eleves/bulk-import', authMiddleware, requireRoles(UserRole.SUPER_ADMIN, UserRole.AUTO_ECOLE_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  const { csvText, studentsList, autoEcoleId } = req.body;
  const targetAeId = req.user?.role === UserRole.SUPER_ADMIN ? autoEcoleId : req.user?.autoEcoleId;

  const ae = inMemoryStore.getAutoEcoleById(targetAeId);
  if (!ae) {
    return res.status(404).json({ error: 'Auto-école cible introuvable.' });
  }

  let rawRows: Array<{ name: string; email: string; phone?: string; password?: string; dateDebutFormation?: string; dateFinFormation?: string }> = [];

  if (Array.isArray(studentsList) && studentsList.length > 0) {
    rawRows = studentsList;
  } else if (typeof csvText === 'string' && csvText.trim().length > 0) {
    const lines = csvText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length === 0) {
      return res.status(400).json({ error: 'Fichier CSV vide ou format invalide.' });
    }

    const firstLineLower = lines[0].toLowerCase();
    const hasHeader = firstLineLower.includes('nom') || firstLineLower.includes('name') || firstLineLower.includes('email');
    const dataLines = hasHeader ? lines.slice(1) : lines;

    for (const line of dataLines) {
      const parts = line.split(/[,;]/).map((p) => p.trim().replace(/^["']|["']$/g, ''));
      if (parts.length >= 2) {
        rawRows.push({
          name: parts[0],
          email: parts[1],
          phone: parts[2] || '',
          password: parts[3] || 'password123',
          dateDebutFormation: parts[4] || new Date().toISOString().split('T')[0],
          dateFinFormation: parts[5] || new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        });
      }
    }
  } else {
    return res.status(400).json({ error: 'Aucune donnée CSV fournie.' });
  }

  if (rawRows.length === 0) {
    return res.status(400).json({ error: 'Aucun élève valide à importer n\'a été détecté dans le fichier.' });
  }

  const importedStudents: any[] = [];
  const errors: string[] = [];

  const todayStr = new Date().toISOString().split('T')[0];
  const defaultEndStr = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  for (let index = 0; index < rawRows.length; index++) {
    const row = rawRows[index];
    const name = row.name?.trim();
    const email = row.email?.trim().toLowerCase();
    const phone = row.phone?.trim() || '';
    const password = row.password?.trim() || 'password123';
    const dateDebutFormation = row.dateDebutFormation?.trim() || todayStr;
    const dateFinFormation = row.dateFinFormation?.trim() || defaultEndStr;

    if (!name || !email) {
      errors.push(`Ligne ${index + 1}: Le nom et l'email sont obligatoires.`);
      continue;
    }

    const existingUser = inMemoryStore.users.find((u) => u.email.toLowerCase() === email);
    if (existingUser) {
      errors.push(`Ligne ${index + 1} (${email}): Un utilisateur avec cet email existe déjà.`);
      continue;
    }

    const aeIndex = ae.codeAutoEcoleUnique.split('-')[2] || '001';
    const totalStudentsInAe = inMemoryStore.eleves.filter((e) => {
      const aeRef = getRefId(e.autoEcole);
      return aeRef === ae._id;
    }).length + 1;

    const codeEleveUnique = `AE${aeIndex}-ELV${String(totalStudentsInAe).padStart(3, '0')}`;

    const userId = `user-eleve-csv-${Date.now()}-${index}-${Math.floor(Math.random() * 1000)}`;
    const newUser: User = {
      _id: userId,
      _type: 'user',
      name,
      email,
      phone,
      role: UserRole.ELEVE,
      autoEcole: { _type: 'reference', _ref: ae._id },
      passwordHash: password,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const eleveId = `eleve-csv-${Date.now()}-${index}-${Math.floor(Math.random() * 1000)}`;
    const newEleve: Eleve = {
      _id: eleveId,
      _type: 'eleve',
      user: { _type: 'reference', _ref: userId },
      autoEcole: { _type: 'reference', _ref: ae._id },
      codeEleveUnique,
      dateDebutFormation,
      dateFinFormation,
      formationActive: true,
      progressionGlobal: 0,
      isBlocked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    inMemoryStore.users.push(newUser);
    inMemoryStore.eleves.push(newEleve);
    inMemoryStore.syncEleveToSanity(newEleve, newUser);

    importedStudents.push({
      _id: eleveId,
      name,
      email,
      codeEleveUnique,
    });
  }

  if (importedStudents.length > 0) {
    inMemoryStore.addLog(
      req.user!.userId,
      ActionType.CREATION_ELEVE,
      `Importation CSV groupée de ${importedStudents.length} élèves dans l'auto-école ${ae.name}`,
      ae._id
    );
  }

  res.json({
    success: true,
    importedCount: importedStudents.length,
    errorCount: errors.length,
    errors,
    importedStudents,
  });
});

app.put('/api/eleves/:id', authMiddleware, requireRoles(UserRole.SUPER_ADMIN, UserRole.AUTO_ECOLE_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const eleve = inMemoryStore.getEleveById(id);

  if (!eleve) {
    return res.status(404).json({ error: 'Élève non trouvé.' });
  }

  const aeRef = getRefId(eleve.autoEcole);
  if (req.user?.role === UserRole.AUTO_ECOLE_ADMIN && aeRef !== req.user.autoEcoleId) {
    return res.status(403).json({ error: 'Accès non autorisé à cet élève.' });
  }

  const { name, phone, dateDebutFormation, dateFinFormation, isBlocked, formationActive, typePermis, programmePermisId } = req.body;

  const user = inMemoryStore.getUserById(eleve.user);
  if (user) {
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    user.updatedAt = new Date().toISOString();
  }

  if (typePermis && typePermis !== eleve.typePermis) {
    const oldPermis = eleve.typePermis || 'Non défini';
    eleve.typePermis = typePermis.trim().toUpperCase();

    inMemoryStore.addLog(
      req.user!.userId,
      ActionType.CHANGEMENT_TYPE_PERMIS_POUR_ELEVE,
      `Changement du type de permis de l'élève ${user?.name || ''} : ${oldPermis} ➔ ${eleve.typePermis}`,
      aeRef
    );
  }

  if (programmePermisId) {
    eleve.programmePermis = { _type: 'reference', _ref: programmePermisId };
  } else if (typePermis) {
    const matchedProg = inMemoryStore.programmesPermis.find((p) => p.typePermis === typePermis.trim().toUpperCase());
    if (matchedProg) {
      eleve.programmePermis = { _type: 'reference', _ref: matchedProg._id };
    }
  }

  if (dateDebutFormation) eleve.dateDebutFormation = dateDebutFormation;
  if (dateFinFormation) eleve.dateFinFormation = dateFinFormation;
  if (isBlocked !== undefined) eleve.isBlocked = isBlocked;
  if (formationActive !== undefined) eleve.formationActive = formationActive;

  eleve.updatedAt = new Date().toISOString();

  if (user) inMemoryStore.syncEleveToSanity(eleve, user);

  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.MODIFICATION_ELEVE,
    `Mise à jour du dossier élève ${user?.name || ''} (${eleve.codeEleveUnique})`,
    aeRef
  );

  res.json(eleve);
});

app.delete('/api/eleves/:id', authMiddleware, requireRoles(UserRole.SUPER_ADMIN, UserRole.AUTO_ECOLE_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const index = inMemoryStore.eleves.findIndex((e) => e._id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Élève non trouvé.' });
  }

  const eleve = inMemoryStore.eleves[index];
  const aeRef = getRefId(eleve.autoEcole);

  if (req.user?.role === UserRole.AUTO_ECOLE_ADMIN && aeRef !== req.user.autoEcoleId) {
    return res.status(403).json({ error: 'Accès non autorisé.' });
  }

  inMemoryStore.eleves.splice(index, 1);

  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.MODIFICATION_ELEVE,
    `Suppression de l'élève code ${eleve.codeEleveUnique}`,
    aeRef
  );

  res.json({ success: true, message: 'Élève supprimé.' });
});

// 4.5 PROGRAMMES DE PERMIS (CRUD)
app.get('/api/programmes-permis', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const list = inMemoryStore.programmesPermis.map((prog) => {
    const moduleIds = (prog.modules || []).map((m: any) => getRefId(m)).filter(Boolean);
    const matchedModules = inMemoryStore.modules.filter((mod) => moduleIds.includes(mod._id));
    return {
      ...prog,
      moduleDetails: matchedModules,
      moduleCount: matchedModules.length,
    };
  });
  res.json(list);
});

app.post('/api/programmes-permis', authMiddleware, requireRoles(UserRole.SUPER_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  const { typePermis, titreProgramme, descriptionProgramme, moduleIds, isActive } = req.body;

  if (!typePermis || !titreProgramme) {
    return res.status(400).json({ error: 'Le type de permis et le titre du programme sont obligatoires.' });
  }

  const progId = `prog-permis-${Date.now()}`;
  const modulesRef = Array.isArray(moduleIds)
    ? moduleIds.map((id: string) => ({ _type: 'reference' as const, _ref: id }))
    : [];

  const newProg: ProgrammePermis = {
    _id: progId,
    _type: 'programmePermis',
    typePermis: typePermis.trim().toUpperCase(),
    titreProgramme: titreProgramme.trim(),
    descriptionProgramme: descriptionProgramme || '',
    modules: modulesRef,
    isActive: isActive !== undefined ? isActive : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  inMemoryStore.programmesPermis.push(newProg);

  if (Array.isArray(moduleIds)) {
    moduleIds.forEach((mId: string) => {
      const mod = inMemoryStore.modules.find((m) => m._id === mId);
      if (mod) {
        mod.typePermis = newProg.typePermis;
        mod.programmePermis = { _type: 'reference', _ref: newProg._id };
      }
    });
  }

  inMemoryStore.syncProgrammePermisToSanity(newProg);

  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.CREATION_PROGRAMME_PERMIS,
    `Création du programme pour le permis ${newProg.typePermis} : "${newProg.titreProgramme}"`
  );

  res.status(201).json(newProg);
});

app.put('/api/programmes-permis/:id', authMiddleware, requireRoles(UserRole.SUPER_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const prog = inMemoryStore.getProgrammePermisById(id);

  if (!prog) {
    return res.status(404).json({ error: 'Programme de permis introuvable.' });
  }

  const { typePermis, titreProgramme, descriptionProgramme, moduleIds, isActive } = req.body;

  if (typePermis) prog.typePermis = typePermis.trim().toUpperCase();
  if (titreProgramme) prog.titreProgramme = titreProgramme.trim();
  if (descriptionProgramme !== undefined) prog.descriptionProgramme = descriptionProgramme;
  if (isActive !== undefined) prog.isActive = isActive;

  if (Array.isArray(moduleIds)) {
    prog.modules = moduleIds.map((mId: string) => ({ _type: 'reference' as const, _ref: mId }));

    moduleIds.forEach((mId: string) => {
      const mod = inMemoryStore.modules.find((m) => m._id === mId);
      if (mod) {
        mod.typePermis = prog.typePermis;
        mod.programmePermis = { _type: 'reference', _ref: prog._id };
      }
    });
  }

  prog.updatedAt = new Date().toISOString();
  inMemoryStore.syncProgrammePermisToSanity(prog);

  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.MODIFICATION_PROGRAMME_PERMIS,
    `Mise à jour du programme permis ${prog.typePermis} : "${prog.titreProgramme}"`
  );

  res.json(prog);
});

app.delete('/api/programmes-permis/:id', authMiddleware, requireRoles(UserRole.SUPER_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const index = inMemoryStore.programmesPermis.findIndex((p) => p._id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Programme de permis non trouvé.' });
  }

  const removed = inMemoryStore.programmesPermis.splice(index, 1)[0];
  inMemoryStore.deleteSanityDocument(id);

  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.MODIFICATION_PROGRAMME_PERMIS,
    `Suppression du programme permis ${removed.typePermis} ("${removed.titreProgramme}")`
  );

  res.json({ message: 'Programme de permis supprimé avec succès.', programme: removed });
});

// 5. MODULES & QUIZZES
app.post('/api/modules/seed-permis-b', authMiddleware, requireRoles(UserRole.SUPER_ADMIN), async (req: AuthenticatedRequest, res: Response) => {
  inMemoryStore.seedPermisBContent();
  await inMemoryStore.seedInitialDatasetToSanity();
  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.CREATION_PROGRAMME_PERMIS,
    'Réinitialisation et injection du programme et modules Permis B complets (10 modules, YouTube FR, mini-quizzes & quizzes finaux).'
  );
  res.json({
    message: 'Programme et modules complets Permis B réinitialisés et injectés avec succès !',
    program: inMemoryStore.getProgrammePermisById('prog-permis-b'),
    modulesCount: inMemoryStore.modules.filter((m) => m.typePermis === 'B').length,
  });
});

app.get('/api/modules', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const modulesSorted = [...inMemoryStore.modules]
    .filter((m) => m.isActive)
    .sort((a, b) => a.ordre - b.ordre)
    .map((mod) => {
      const quiz = inMemoryStore.quizzes.find((q) => {
        const modRef = getRefId(q.module);
        return modRef === mod._id;
      });
      return { ...mod, quiz };
    });

  res.json(modulesSorted);
});

app.post('/api/modules', authMiddleware, requireRoles(UserRole.SUPER_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  const { code, title, summary, description, learningObjectives, ordre, videoUrl, durationSeconds, tempsMinimumVisionnage, scoreMinimumQuiz, lecons } = req.body;

  if (!title || !videoUrl) {
    return res.status(400).json({ error: 'Titre et URL vidéo obligatoires.' });
  }

  const newModule: ModuleFormation = {
    _id: `mod-${Date.now()}`,
    _type: 'moduleFormation',
    code: code || `MOD-00${inMemoryStore.modules.length + 1}`,
    title,
    summary: summary || description || 'Résumé du module de formation.',
    learningObjectives: Array.isArray(learningObjectives) ? learningObjectives : [],
    ordre: ordre || inMemoryStore.modules.length + 1,
    videoUrl,
    durationSeconds: durationSeconds || 180,
    tempsMinimumVisionnage: tempsMinimumVisionnage || Math.round((durationSeconds || 180) * 0.8),
    scoreMinimumQuiz: scoreMinimumQuiz || 70,
    isActive: true,
    lecons: Array.isArray(lecons) ? lecons : [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  inMemoryStore.modules.push(newModule);
  inMemoryStore.syncModuleToSanity(newModule);

  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.MODIFICATION_MODULE,
    `Module de formation créé : ${title}`
  );

  res.status(201).json(newModule);
});

app.put('/api/modules/:id', authMiddleware, requireRoles(UserRole.SUPER_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const mod = inMemoryStore.modules.find((m) => m._id === id);

  if (!mod) {
    return res.status(404).json({ error: 'Module non trouvé.' });
  }

  const { code, title, summary, learningObjectives, ordre, videoUrl, durationSeconds, tempsMinimumVisionnage, scoreMinimumQuiz, isActive, lecons } = req.body;

  if (code !== undefined) mod.code = code;
  if (title) mod.title = title;
  if (summary !== undefined) mod.summary = summary;
  if (Array.isArray(learningObjectives)) mod.learningObjectives = learningObjectives;
  if (ordre !== undefined) mod.ordre = ordre;
  if (videoUrl) mod.videoUrl = videoUrl;
  if (durationSeconds) mod.durationSeconds = durationSeconds;
  if (tempsMinimumVisionnage !== undefined) mod.tempsMinimumVisionnage = tempsMinimumVisionnage;
  if (scoreMinimumQuiz !== undefined) mod.scoreMinimumQuiz = scoreMinimumQuiz;
  if (isActive !== undefined) mod.isActive = isActive;
  if (Array.isArray(lecons)) mod.lecons = lecons;

  mod.updatedAt = new Date().toISOString();
  inMemoryStore.syncModuleToSanity(mod);

  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.MODIFICATION_MODULE,
    `Module de formation mis à jour : ${mod.title}`
  );

  res.json(mod);
});

app.delete('/api/modules/:id', authMiddleware, requireRoles(UserRole.SUPER_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const index = inMemoryStore.modules.findIndex((m) => m._id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Module non trouvé.' });
  }

  const removed = inMemoryStore.modules.splice(index, 1)[0];
  inMemoryStore.deleteSanityDocument(id);

  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.MODIFICATION_MODULE,
    `Module de formation supprimé : ${removed.title}`
  );

  res.json({ message: 'Module supprimé avec succès.', module: removed });
});

app.post('/api/quizzes', authMiddleware, requireRoles(UserRole.SUPER_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  const { moduleId, questions, timerSeconds, scoreMinimum, title } = req.body;

  if (!moduleId || !questions || !Array.isArray(questions)) {
    return res.status(400).json({ error: 'Module ID et liste de questions valides requis.' });
  }

  const mod = inMemoryStore.modules.find((m) => m._id === moduleId);
  if (mod && scoreMinimum !== undefined) {
    mod.scoreMinimumQuiz = scoreMinimum;
  }

  let quiz = inMemoryStore.quizzes.find((q) => {
    const mRef = getRefId(q.module);
    return mRef === moduleId;
  });

  if (quiz) {
    quiz.questions = questions;
    quiz.timerSeconds = timerSeconds || 600;
    if (title) quiz.title = title;
    if (scoreMinimum !== undefined) quiz.scoreMinimum = scoreMinimum;
    quiz.updatedAt = new Date().toISOString();
  } else {
    quiz = {
      _id: `quiz-${Date.now()}`,
      _type: 'quiz',
      title: title || `Quiz - ${mod?.title || 'Module'}`,
      module: { _type: 'reference', _ref: moduleId },
      timerSeconds: timerSeconds || 600,
      scoreMinimum: scoreMinimum || mod?.scoreMinimumQuiz || 70,
      questions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryStore.quizzes.push(quiz);
  }

  if (mod) {
    mod.quiz = quiz;
  }

  inMemoryStore.syncQuizToSanity(quiz);

  res.json(quiz);
});

// 6. PROGRESSION & LEARNING PATH
app.get('/api/progression/:eleveId', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { eleveId } = req.params;

  const eleve = inMemoryStore.getEleveById(eleveId);
  if (!eleve) {
    return res.status(404).json({ error: 'Élève non trouvé.' });
  }

  const aeRef = getRefId(eleve.autoEcole);
  if (req.user?.role === UserRole.AUTO_ECOLE_ADMIN && aeRef !== req.user.autoEcoleId) {
    return res.status(403).json({ error: 'Accès non autorisé.' });
  }

  const activeModules = inMemoryStore.getModulesForEleve(eleve._id);

  const progId = eleve.programmePermis
    ? typeof eleve.programmePermis === 'string'
      ? eleve.programmePermis
      : (eleve.programmePermis as any)._ref || (eleve.programmePermis as any)._id
    : null;
  const programmePermisDetail = progId ? inMemoryStore.getProgrammePermisById(progId) : null;

  const eleveProgressions = inMemoryStore.progressions.filter((p) => {
    const elRef = getRefId(p.eleve);
    return elRef === eleve._id;
  });

  let previousValidated = true;

  const structuredProgression = activeModules.map((mod) => {
    const quiz = inMemoryStore.quizzes.find((q) => {
      const mRef = getRefId(q.module);
      return mRef === mod._id;
    });

    const prog = eleveProgressions.find((p) => {
      const mRef = getRefId(p.module);
      return mRef === mod._id;
    });

    const lecons = mod.lecons && mod.lecons.length > 0 ? mod.lecons : [
      {
        _id: `lec-${mod._id}-default`,
        _type: 'lecon' as const,
        title: mod.title,
        ordre: 1,
        description: mod.summary || 'Contenu pédagogique principal.',
        videoUrl: mod.videoUrl,
        durationSeconds: mod.durationSeconds,
        tempsMinimumVisionnageSeconds: mod.tempsMinimumVisionnage,
        hasInlineQuiz: false,
      }
    ];

    const leconProgressionsMap = prog?.leconProgressions || {};
    let previousLessonCompleted = true;

    const leconStatuses = lecons.map((lec, lIdx) => {
      const lecProg = leconProgressionsMap[lec._id];
      const videoWatchTimeSeconds = lecProg?.videoWatchTimeSeconds ?? (prog?.videoWatchTimeSeconds || 0);
      const hasCompletedVideo = videoWatchTimeSeconds >= lec.tempsMinimumVisionnageSeconds || (prog?.hasCompletedVideo ?? false);
      const inlineQuizScore = lecProg?.inlineQuizScore ?? null;
      const isInlineQuizPassed = lec.hasInlineQuiz ? (lecProg?.isInlineQuizPassed ?? false) : true;
      const isCompleted = hasCompletedVideo && isInlineQuizPassed;

      const isLessonLocked = lIdx > 0 ? !previousLessonCompleted : false;

      if (!isCompleted) {
        previousLessonCompleted = false;
      }

      return {
        lecon: lec,
        videoWatchTimeSeconds,
        hasCompletedVideo,
        inlineQuizScore,
        isInlineQuizPassed,
        isCompleted,
        isLessonLocked,
      };
    });

    const areAllLessonsCompleted = leconStatuses.every((ls) => ls.isCompleted);
    const isLocked = !previousValidated;
    const isVideoTimeCompleted = areAllLessonsCompleted;
    const isQuizUnlocked = areAllLessonsCompleted && !isLocked;
    const isValidated = prog ? prog.isModuleValidated : false;

    if (!isValidated) {
      previousValidated = false;
    }

    return {
      module: mod,
      quiz,
      lecons: leconStatuses,
      progression: prog || {
        videoWatchTimeSeconds: 0,
        hasCompletedVideo: false,
        quizScore: 0,
        quizAttemptCount: 0,
        isModuleValidated: false,
      },
      isLocked,
      areAllLessonsCompleted,
      isVideoTimeCompleted,
      isQuizUnlocked,
      isValidated,
    };
  });

  res.json({
    eleve,
    programmePermisDetail,
    structuredProgression,
  });
});

// Track video watch time
app.post('/api/progression/watch-time', authMiddleware, requireRoles(UserRole.ELEVE), (req: AuthenticatedRequest, res: Response) => {
  const { eleveId, moduleId, leconId, watchSeconds, isFinished } = req.body;

  if (!eleveId || !moduleId || typeof watchSeconds !== 'number') {
    return res.status(400).json({ error: 'Données de visionnage invalides.' });
  }

  const eleve = inMemoryStore.getEleveById(eleveId);
  const mod = inMemoryStore.modules.find((m) => m._id === moduleId);

  if (!eleve || !mod) {
    return res.status(404).json({ error: 'Élève ou module introuvable.' });
  }

  let prog = inMemoryStore.progressions.find((p) => {
    const elRef = getRefId(p.eleve);
    const mRef = getRefId(p.module);
    return elRef === eleve._id && mRef === mod._id;
  });

  if (!prog) {
    prog = {
      _id: `prog-${Date.now()}`,
      _type: 'progressionModule',
      eleve: { _type: 'reference', _ref: eleve._id },
      module: { _type: 'reference', _ref: mod._id },
      videoWatchTimeSeconds: watchSeconds,
      hasCompletedVideo: false,
      leconProgressions: {},
      quizScore: 0,
      quizAttemptCount: 0,
      isModuleValidated: false,
      lastActivityAt: new Date().toISOString(),
    };
    inMemoryStore.progressions.push(prog);
  }

  if (!prog.leconProgressions) prog.leconProgressions = {};

  const targetLecId = leconId || (mod.lecons?.[0]?._id ?? `lec-${mod._id}-default`);
  const targetLec = mod.lecons?.find((l) => l._id === targetLecId) || {
    _id: targetLecId,
    tempsMinimumVisionnageSeconds: mod.tempsMinimumVisionnage,
    hasInlineQuiz: false,
  };

  const prevLecProg = prog.leconProgressions[targetLecId] || {
    leconId: targetLecId,
    videoWatchTimeSeconds: 0,
    hasCompletedVideo: false,
    inlineQuizScore: null,
    isInlineQuizPassed: false,
    isCompleted: false,
  };

  const reqWatchSeconds = isFinished ? targetLec.tempsMinimumVisionnageSeconds : watchSeconds;
  const newWatchTime = Math.max(prevLecProg.videoWatchTimeSeconds, reqWatchSeconds);
  const hasCompletedLecVideo = isFinished || newWatchTime >= targetLec.tempsMinimumVisionnageSeconds;
  const isLecCompleted = hasCompletedLecVideo && (!targetLec.hasInlineQuiz || (prevLecProg.isInlineQuizPassed ?? false));

  prog.leconProgressions[targetLecId] = {
    ...prevLecProg,
    videoWatchTimeSeconds: newWatchTime,
    hasCompletedVideo: hasCompletedLecVideo,
    isCompleted: isLecCompleted,
  };

  prog.videoWatchTimeSeconds = Math.max(prog.videoWatchTimeSeconds, newWatchTime);
  prog.lastActivityAt = new Date().toISOString();

  res.json({
    progression: prog,
    leconProgression: prog.leconProgressions[targetLecId],
    isLessonVideoCompleted: hasCompletedLecVideo,
  });
});

// Submit Inline Lesson Quiz attempt
app.post('/api/progression/submit-lesson-quiz', authMiddleware, requireRoles(UserRole.ELEVE), (req: AuthenticatedRequest, res: Response) => {
  const { eleveId, moduleId, leconId, userAnswers } = req.body;

  const eleve = inMemoryStore.getEleveById(eleveId);
  const mod = inMemoryStore.modules.find((m) => m._id === moduleId);

  if (!eleve || !mod) {
    return res.status(404).json({ error: 'Élève ou module introuvable.' });
  }

  const lecon = mod.lecons?.find((l) => l._id === leconId);
  if (!lecon || !lecon.inlineQuiz || lecon.inlineQuiz.length === 0) {
    return res.status(400).json({ error: 'Aucun mini-quiz trouvé pour cette leçon.' });
  }

  let correctCount = 0;
  lecon.inlineQuiz.forEach((q, idx) => {
    if (userAnswers && userAnswers[idx] === q.correctOptionIndex) {
      correctCount++;
    }
  });

  const totalQuestions = lecon.inlineQuiz.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercentage >= 70;

  let prog = inMemoryStore.progressions.find((p) => {
    const elRef = getRefId(p.eleve);
    const mRef = getRefId(p.module);
    return elRef === eleve._id && mRef === mod._id;
  });

  if (!prog) {
    prog = {
      _id: `prog-${Date.now()}`,
      _type: 'progressionModule',
      eleve: { _type: 'reference', _ref: eleve._id },
      module: { _type: 'reference', _ref: mod._id },
      videoWatchTimeSeconds: 0,
      hasCompletedVideo: false,
      leconProgressions: {},
      quizScore: 0,
      quizAttemptCount: 0,
      isModuleValidated: false,
      lastActivityAt: new Date().toISOString(),
    };
    inMemoryStore.progressions.push(prog);
  }

  if (!prog.leconProgressions) prog.leconProgressions = {};

  const prevLecProg = prog.leconProgressions[leconId] || {
    leconId,
    videoWatchTimeSeconds: lecon.tempsMinimumVisionnageSeconds,
    hasCompletedVideo: true,
    isCompleted: false,
  };

  prog.leconProgressions[leconId] = {
    ...prevLecProg,
    inlineQuizScore: scorePercentage,
    isInlineQuizPassed: passed,
    isCompleted: prevLecProg.hasCompletedVideo && passed,
  };

  prog.lastActivityAt = new Date().toISOString();

  res.json({
    scorePercentage,
    correctCount,
    totalQuestions,
    passed,
    leconProgression: prog.leconProgressions[leconId],
  });
});

// Submit Quiz attempt
app.post('/api/progression/submit-quiz', authMiddleware, requireRoles(UserRole.ELEVE), (req: AuthenticatedRequest, res: Response) => {
  const { eleveId, moduleId, userAnswers } = req.body;

  const eleve = inMemoryStore.getEleveById(eleveId);
  const mod = inMemoryStore.modules.find((m) => m._id === moduleId);

  if (!eleve || !mod) {
    return res.status(404).json({ error: 'Élève ou module introuvable.' });
  }

  const quiz = inMemoryStore.quizzes.find((q) => {
    const mRef = getRefId(q.module);
    return mRef === mod._id;
  });

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return res.status(400).json({ error: 'Aucun quiz associé à ce module.' });
  }

  let correctCount = 0;
  quiz.questions.forEach((q, idx) => {
    if (userAnswers && userAnswers[idx] === q.correctOptionIndex) {
      correctCount++;
    }
  });

  const totalQuestions = quiz.questions.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercentage >= mod.scoreMinimumQuiz;

  let prog = inMemoryStore.progressions.find((p) => {
    const elRef = getRefId(p.eleve);
    const mRef = getRefId(p.module);
    return elRef === eleve._id && mRef === mod._id;
  });

  if (!prog) {
    prog = {
      _id: `prog-${Date.now()}`,
      _type: 'progressionModule',
      eleve: { _type: 'reference', _ref: eleve._id },
      module: { _type: 'reference', _ref: mod._id },
      videoWatchTimeSeconds: mod.tempsMinimumVisionnage,
      hasCompletedVideo: true,
      quizScore: scorePercentage,
      quizAttemptCount: 1,
      isModuleValidated: passed,
      lastActivityAt: new Date().toISOString(),
    };
    inMemoryStore.progressions.push(prog);
  } else {
    prog.quizAttemptCount += 1;
    prog.quizScore = Math.max(prog.quizScore, scorePercentage);
    if (passed) {
      prog.isModuleValidated = true;
    }
    prog.lastActivityAt = new Date().toISOString();
  }

  const studentModules = inMemoryStore.getModulesForEleve(eleve._id);
  const totalProgramModules = Math.max(1, studentModules.length);
  const allEleveProg = inMemoryStore.progressions.filter((p) => {
    const elRef = getRefId(p.eleve);
    const mRef = getRefId(p.module);
    return elRef === eleve._id && p.isModuleValidated && studentModules.some((sm) => sm._id === mRef);
  });

  const validatedCount = allEleveProg.length;
  const overallPercentage = Math.round((validatedCount / totalProgramModules) * 100);
  eleve.progressionGlobal = Math.min(100, overallPercentage);

  const userObj = inMemoryStore.getUserById(eleve.user);
  const aeRef = getRefId(eleve.autoEcole);

  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.QUIZ_PASSE,
    `Élève ${userObj?.name || ''} (${eleve.codeEleveUnique}) a passé le Quiz "${mod.title}" : Score ${scorePercentage}% (${passed ? 'RÉUSSI' : 'ÉCHOUÉ'})`,
    aeRef
  );

  inMemoryStore.syncProgressionToSanity(prog);

  let certificatRecord: Certificat | undefined;
  if (overallPercentage >= 100) {
    let cert = inMemoryStore.certificats.find((c) => {
      const elRef = getRefId(c.eleve);
      return elRef === eleve._id;
    });

    if (!cert) {
      cert = {
        _id: `cert-${Date.now()}`,
        _type: 'certificat',
        eleve: { _type: 'reference', _ref: eleve._id },
        autoEcole: { _type: 'reference', _ref: aeRef },
        dateEmission: new Date().toISOString(),
        certificateCode: `CERT-${new Date().getFullYear()}-MATOA-${Math.floor(10000 + Math.random() * 90000)}`,
        status: CertificatStatus.GENERE,
        createdAt: new Date().toISOString(),
      };
      inMemoryStore.certificats.push(cert);

      inMemoryStore.addLog(
        req.user!.userId,
        ActionType.CERTIFICAT_GENERE,
        `Certificat Officiel Matoa généré pour l'élève ${userObj?.name || ''} (${cert.certificateCode})`,
        aeRef
      );
    }
    certificatRecord = cert;
    inMemoryStore.syncCertificatToSanity(cert);
  }

  res.json({
    scorePercentage,
    correctCount,
    totalQuestions,
    passed,
    isModuleValidated: prog.isModuleValidated,
    overallProgression: eleve.progressionGlobal,
    certificatRecord,
  });
});

// 7. CERTIFICAT (Get & Generate)
app.get('/api/certificats', authMiddleware, requireRoles(UserRole.SUPER_ADMIN, UserRole.AUTO_ECOLE_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  let targetEleves = [...inMemoryStore.eleves];

  if (req.user?.role === UserRole.AUTO_ECOLE_ADMIN) {
    targetEleves = targetEleves.filter((e) => getRefId(e.autoEcole) === req.user?.autoEcoleId);
  }

  const enrichedCertificates = targetEleves.map((eleve) => {
    const user = inMemoryStore.getUserById(eleve.user);
    const ae = inMemoryStore.getAutoEcoleById(eleve.autoEcole);
    const cert = inMemoryStore.certificats.find((c) => getRefId(c.eleve) === eleve._id);

    return {
      eleve,
      user: user ? { _id: user._id, name: user.name, email: user.email, phone: user.phone } : null,
      autoEcole: ae ? { _id: ae._id, name: ae.name, codeAutoEcoleUnique: ae.codeAutoEcoleUnique, couleursTheme: ae.couleursTheme, logo: ae.logo, slogan: ae.slogan } : null,
      certificat: cert || null,
      isEligible: eleve.progressionGlobal >= 100 && eleve.formationActive,
    };
  });

  res.json(enrichedCertificates);
});

app.post('/api/certificats/generate', authMiddleware, requireRoles(UserRole.SUPER_ADMIN, UserRole.AUTO_ECOLE_ADMIN), (req: AuthenticatedRequest, res: Response) => {
  const { eleveId } = req.body;
  const eleve = inMemoryStore.getEleveById(eleveId);

  if (!eleve) {
    return res.status(404).json({ error: 'Élève non trouvé.' });
  }

  const aeRef = getRefId(eleve.autoEcole);
  if (req.user?.role === UserRole.AUTO_ECOLE_ADMIN && aeRef !== req.user.autoEcoleId) {
    return res.status(403).json({ error: 'Accès non autorisé.' });
  }

  let cert = inMemoryStore.certificats.find((c) => getRefId(c.eleve) === eleve._id);

  if (!cert) {
    cert = {
      _id: `cert-${Date.now()}`,
      _type: 'certificat',
      eleve: { _type: 'reference', _ref: eleve._id },
      autoEcole: { _type: 'reference', _ref: aeRef },
      dateEmission: new Date().toISOString(),
      certificateCode: `CERT-${new Date().getFullYear()}-MATOA-${Math.floor(10000 + Math.random() * 90000)}`,
      status: CertificatStatus.GENERE,
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.certificats.push(cert);
  } else {
    cert.status = CertificatStatus.GENERE;
    cert.dateEmission = new Date().toISOString();
  }

  inMemoryStore.syncCertificatToSanity(cert);

  const userObj = inMemoryStore.getUserById(eleve.user);
  inMemoryStore.addLog(
    req.user!.userId,
    ActionType.CERTIFICAT_GENERE,
    `Génération manuelle du certificat pour l'élève ${userObj?.name || ''} (${cert.certificateCode})`,
    aeRef
  );

  res.json({ success: true, certificat: cert });
});

app.get('/api/certificats/:eleveId', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { eleveId } = req.params;
  const eleve = inMemoryStore.getEleveById(eleveId);

  if (!eleve) {
    return res.status(404).json({ error: 'Élève introuvable.' });
  }

  const cert = inMemoryStore.certificats.find((c) => {
    const elRef = getRefId(c.eleve);
    return elRef === eleve._id;
  });

  const user = inMemoryStore.getUserById(eleve.user);
  const ae = inMemoryStore.getAutoEcoleById(eleve.autoEcole);

  res.json({
    certificat: cert || null,
    eleve,
    user,
    autoEcole: ae,
    isEligible: eleve.progressionGlobal >= 100 && eleve.formationActive,
  });
});

app.post('/api/certificats/download', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { eleveId } = req.body;
  const eleve = inMemoryStore.getEleveById(eleveId);

  if (!eleve) {
    return res.status(404).json({ error: 'Élève non trouvé.' });
  }

  let cert = inMemoryStore.certificats.find((c) => {
    const elRef = getRefId(c.eleve);
    return elRef === eleve._id;
  });

  if (cert) {
    cert.status = CertificatStatus.TELECHARGE;
    const user = inMemoryStore.getUserById(eleve.user);
    const aeRef = getRefId(eleve.autoEcole);

    inMemoryStore.addLog(
      req.user!.userId,
      ActionType.CERTIFICAT_TELECHARGE,
      `Certificat téléchargé pour l'élève ${user?.name || ''} (${cert.certificateCode})`,
      aeRef
    );
  }

  res.json({ success: true, certificat: cert });
});

// 8. LOGS D'ACTIVITÉ
app.get('/api/logs', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  let logs = [...inMemoryStore.logs];

  if (req.user?.role === UserRole.AUTO_ECOLE_ADMIN) {
    logs = logs.filter((l) => {
      const aeRef = getRefId(l.autoEcole);
      return aeRef === req.user?.autoEcoleId;
    });
  } else if (req.user?.role === UserRole.ELEVE) {
    logs = logs.filter((l) => {
      const uRef = getRefId(l.actorUser);
      return uRef === req.user?.userId;
    });
  }

  res.json(logs);
});

// 9. OVERVIEW STATS
app.get('/api/stats', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const todayStr = new Date().toISOString().split('T')[0];

  if (req.user?.role === UserRole.SUPER_ADMIN) {
    const totalSchools = inMemoryStore.autoEcoles.length;
    const activeSchools = inMemoryStore.autoEcoles.filter((a) => a.isActive).length;
    const totalStudents = inMemoryStore.eleves.length;
    const activeStudents = inMemoryStore.eleves.filter(
      (e) => e.formationActive && !e.isBlocked && e.dateFinFormation >= todayStr
    ).length;
    const completedStudents = inMemoryStore.eleves.filter((e) => e.progressionGlobal >= 100).length;

    const avgProgress =
      totalStudents > 0
        ? Math.round(inMemoryStore.eleves.reduce((acc, curr) => acc + curr.progressionGlobal, 0) / totalStudents)
        : 0;

    const schoolsProgression = inMemoryStore.autoEcoles.map((ae) => {
      const aeStudents = inMemoryStore.eleves.filter((e) => getRefId(e.autoEcole) === ae._id);
      const aeAvg =
        aeStudents.length > 0
          ? Math.round(aeStudents.reduce((acc, c) => acc + c.progressionGlobal, 0) / aeStudents.length)
          : 0;
      const aeCompleted = aeStudents.filter((e) => e.progressionGlobal >= 100).length;
      return {
        schoolName: ae.name,
        studentCount: aeStudents.length,
        avgProgress: aeAvg,
        completedCount: aeCompleted,
      };
    });

    const activeModules = inMemoryStore.modules.filter((m) => m.isActive).sort((a, b) => a.ordre - b.ordre);
    const modulesCompletion = activeModules.map((mod) => {
      const validatedCount = inMemoryStore.progressions.filter((p) => {
        const mRef = getRefId(p.module);
        return mRef === mod._id && p.isModuleValidated;
      }).length;
      const completionRate = totalStudents > 0 ? Math.round((validatedCount / totalStudents) * 100) : 0;
      return {
        moduleTitle: mod.title,
        validatedCount,
        totalStudents,
        completionRate,
      };
    });

    const progressionDistribution = [
      { range: '0 - 25%', count: inMemoryStore.eleves.filter((e) => e.progressionGlobal <= 25).length },
      {
        range: '26 - 50%',
        count: inMemoryStore.eleves.filter((e) => e.progressionGlobal > 25 && e.progressionGlobal <= 50).length,
      },
      {
        range: '51 - 75%',
        count: inMemoryStore.eleves.filter((e) => e.progressionGlobal > 50 && e.progressionGlobal <= 75).length,
      },
      {
        range: '76 - 99%',
        count: inMemoryStore.eleves.filter((e) => e.progressionGlobal > 75 && e.progressionGlobal < 100).length,
      },
      { range: '100% Certifié', count: inMemoryStore.eleves.filter((e) => e.progressionGlobal >= 100).length },
    ];

    const months = ['Janv', 'Févr', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil'];
    const enrollmentTrends = months.map((m, idx) => ({
      month: m,
      inscriptions: Math.max(1, (idx + 1) * 2 + (totalStudents % (idx + 2))),
      certifications: Math.max(0, Math.floor(((idx + 1) * completedStudents) / 7)),
    }));

    return res.json({
      totalSchools,
      activeSchools,
      totalStudents,
      activeStudents,
      completedStudents,
      avgProgress,
      schoolsProgression,
      modulesCompletion,
      progressionDistribution,
      enrollmentTrends,
    });
  }

  if (req.user?.role === UserRole.AUTO_ECOLE_ADMIN) {
    const aeId = req.user.autoEcoleId;
    const schoolStudents = inMemoryStore.eleves.filter((e) => {
      const aeRef = getRefId(e.autoEcole);
      return aeRef === aeId;
    });

    const totalStudents = schoolStudents.length;
    const activeStudents = schoolStudents.filter(
      (e) => e.formationActive && !e.isBlocked && e.dateFinFormation >= todayStr
    ).length;
    const completedStudents = schoolStudents.filter((e) => e.progressionGlobal >= 100).length;
    const expiredStudents = schoolStudents.filter((e) => e.dateFinFormation < todayStr).length;
    const blockedStudents = schoolStudents.filter((e) => e.isBlocked).length;

    const avgProgress =
      totalStudents > 0
        ? Math.round(schoolStudents.reduce((acc, curr) => acc + curr.progressionGlobal, 0) / totalStudents)
        : 0;

    const activeModules = inMemoryStore.modules.filter((m) => m.isActive).sort((a, b) => a.ordre - b.ordre);
    const studentIds = new Set(schoolStudents.map((s) => s._id));

    const modulesCompletion = activeModules.map((mod) => {
      const validatedCount = inMemoryStore.progressions.filter((p) => {
        const mRef = getRefId(p.module);
        const elRef = getRefId(p.eleve);
        return mRef === mod._id && studentIds.has(elRef!) && p.isModuleValidated;
      }).length;
      const completionRate = totalStudents > 0 ? Math.round((validatedCount / totalStudents) * 100) : 0;
      return {
        moduleTitle: mod.title,
        validatedCount,
        totalStudents,
        completionRate,
      };
    });

    const progressionDistribution = [
      { range: '0 - 25%', count: schoolStudents.filter((e) => e.progressionGlobal <= 25).length },
      {
        range: '26 - 50%',
        count: schoolStudents.filter((e) => e.progressionGlobal > 25 && e.progressionGlobal <= 50).length,
      },
      {
        range: '51 - 75%',
        count: schoolStudents.filter((e) => e.progressionGlobal > 50 && e.progressionGlobal <= 75).length,
      },
      {
        range: '76 - 99%',
        count: schoolStudents.filter((e) => e.progressionGlobal > 75 && e.progressionGlobal < 100).length,
      },
      { range: '100% Validé', count: schoolStudents.filter((e) => e.progressionGlobal >= 100).length },
    ];

    const statusBreakdown = [
      { status: 'Actifs en cours', count: activeStudents, fill: '#10b981' },
      { status: 'Certifiés (100%)', count: completedStudents, fill: '#f59e0b' },
      { status: 'Période Expirée', count: expiredStudents, fill: '#ef4444' },
      { status: 'Accès Bloqué', count: blockedStudents, fill: '#6b7280' },
    ];

    const months = ['Janv', 'Févr', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil'];
    const enrollmentTrends = months.map((m, idx) => ({
      month: m,
      inscriptions: Math.max(1, Math.floor((totalStudents * (idx + 1)) / 7)),
    }));

    return res.json({
      totalStudents,
      activeStudents,
      completedStudents,
      expiredStudents,
      avgProgress,
      modulesCompletion,
      progressionDistribution,
      statusBreakdown,
      enrollmentTrends,
    });
  }

  res.status(403).json({ error: 'Rôle non pris en charge pour les statistiques.' });
});

// Catch-all for API 404 (always return JSON)
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: `Route API introuvable : ${req.method} ${req.originalUrl || req.url}` });
});

// Global API error handler (always return JSON)
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Erreur API serveur :', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({ error: err.message || 'Erreur interne du serveur' });
});

export { app };
export default app;
