import { createClient } from '@sanity/client';
import {
  User,
  AutoEcole,
  Eleve,
  ProgrammePermis,
  ModuleFormation,
  Quiz,
  ProgressionModule,
  LogActivite,
  Certificat,
  UserRole,
  ActionType,
  CertificatStatus,
  GlobalSettings,
} from '../types';
import { PERMIS_B_PROGRAMME, PERMIS_B_MODULES, PERMIS_B_QUIZZES } from './permisBData';

// Initial Seed Data for local datastore / fallback
const INITIAL_PROGRAMMES_PERMIS: ProgrammePermis[] = [PERMIS_B_PROGRAMME];

// Sanity client configuration with user credentials
const sanityProjectId = process.env.SANITY_PROJECT_ID || (import.meta as any).env?.VITE_SANITY_PROJECT_ID || 'cchdhqvw';
const sanityDataset = process.env.SANITY_DATASET || (import.meta as any).env?.VITE_SANITY_DATASET || 'production';
const sanityToken = process.env.SANITY_API_TOKEN || (import.meta as any).env?.VITE_SANITY_API_TOKEN || 'skEGKHtehXGVW6vZV3vOQxxnJPuM2ySmjAvkYWI68CtKUgJOt5lOBLgtBeLKQhUNgtNgoPNpp6ewuJumw2t7PZdJdnBObPSh0Z886EQpZOsTkh6O9uc1ySmCt3MYP2XFzcDNlcwSkyPBSdarV6O6rxmXveGpkA5lb7mLFyOJ5TKZj00n6LRh';

export const liveSanityClient = sanityProjectId
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      token: sanityToken,
      apiVersion: '2024-01-01',
      useCdn: false,
    })
  : null;

// Initial Seed Data for local datastore / fallback
const INITIAL_AUTO_ECOLES: AutoEcole[] = [];

const INITIAL_USERS: User[] = [
  {
    _id: 'user-super-admin',
    _type: 'user',
    name: 'Matoa Super Admin',
    email: 'matoa@gmail.com',
    phone: '01 00 00 00 00',
    role: UserRole.SUPER_ADMIN,
    passwordHash: 'qlac485!',
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

const INITIAL_ELEVES: Eleve[] = [];

const INITIAL_MODULES: ModuleFormation[] = [
  ...PERMIS_B_MODULES,
  // --- MODULES PERMIS A (MOTO) ---
  {
    _id: 'mod-m-1',
    _type: 'moduleFormation',
    code: 'MOD-M01',
    title: 'Module Moto 1 : Équipements, Trajectoires & Sécurité Moto',
    summary: 'Ce module est spécifiquement conçu pour les candidats au Permis Moto (A/A2). Il traite des équipements obligatoires, de la trajectoire de sécurité en virage et de la lisibilité de la route à deux-roues.',
    learningObjectives: [
      'Connaître la réglementation sur les équipements de protection individuelle (EPI)',
      'Maîtriser la trajectoire de sécurité en courbe (extérieur, point de corde, sortie)',
      'Détecter les pièges de la chaussée (plaques d\'égout, bandes blanches mouillées, gravillons)',
      'Comprendre l\'effet gyroscopique et le contre-braquage',
    ],
    ordre: 1,
    typePermis: 'A',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-a' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    durationSeconds: 380,
    tempsMinimumVisionnage: 304,
    scoreMinimumQuiz: 75,
    isActive: true,
    lecons: [
      {
        _id: 'lec-m-1-1',
        _type: 'lecon',
        title: 'Leçon 1 : Équipements de protection obligatoire et passive',
        ordre: 1,
        description: 'À moto, la carrosserie c\'est le motard. Le casque attaché homologué ECE 22.06 et les gants certifiés CE sont obligatoires.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        durationSeconds: 180,
        tempsMinimumVisionnageSeconds: 144,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'Quels équipements sont légalement obligatoires à moto en France ?',
            options: ['Casque homologué uniquement', 'Casque homologué et gants certifiés CE', 'Casque, gants et gilet airbag', 'Casque et blouson en cuir'],
            correctOptionIndex: 1,
            explanation: 'En France, le casque attaché et les gants certifiés CE sont les deux équipements légalement obligatoires.',
          },
        ],
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    _id: 'mod-m-2',
    _type: 'moduleFormation',
    code: 'MOD-M02',
    title: 'Module Moto 2 : Épreuve Théorique Moto (ETM) & Dangers Spécifiques',
    summary: 'Préparation à l\'ETM (Code Moto). Analyse du freinage d\'urgence avec/sans ABS et des risques d\'invisibilité.',
    learningObjectives: [
      'Appliquer les règles de la circulation inter-files (CIF) légalisée',
      'Doser le freinage avant/arrière et comprendre le transfert de masse',
    ],
    ordre: 2,
    typePermis: 'A',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-a' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoybreaks.mp4',
    durationSeconds: 420,
    tempsMinimumVisionnage: 336,
    scoreMinimumQuiz: 75,
    isActive: true,
    lecons: [
      {
        _id: 'lec-m-2-1',
        _type: 'lecon',
        title: 'Leçon 1 : Répartition du freinage et adhérence',
        ordre: 1,
        description: 'Le frein avant fournit environ 70% de la puissance de freinage à moto grâce au transfert de charge vers l\'avant.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoybreaks.mp4',
        durationSeconds: 210,
        tempsMinimumVisionnageSeconds: 168,
        hasInlineQuiz: false,
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  // --- MODULES PERMIS C (POIDS LOURD) ---
  {
    _id: 'mod-c-1',
    _type: 'moduleFormation',
    code: 'MOD-C01',
    title: 'Module Poids Lourd 1 : Réglementation Sociale & Temps de Conduite (RSE)',
    summary: 'Formation spécifique au transport de marchandises (Permis C). Maîtrise des temps de conduite journaliers (9h max) et des pauses obligatoires.',
    learningObjectives: [
      'Connaître les limites légales de conduite journalière et hebdomadaire',
      'Gérer les pauses obligatoires (45 min toutes les 4h30)',
    ],
    ordre: 1,
    typePermis: 'C',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-c' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    durationSeconds: 450,
    tempsMinimumVisionnage: 360,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: 'lec-c-1-1',
        _type: 'lecon',
        title: 'Leçon 1 : Règles de conduite et de repos RSE',
        ordre: 1,
        description: 'Un conducteur poids lourd doit interrompre sa conduite au plus tard après 4h30 par une pause d\'au moins 45 minutes.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        durationSeconds: 220,
        tempsMinimumVisionnageSeconds: 176,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'Quelle est la durée maximale de conduite continue autorisée pour un Poids Lourd avant une pause ?',
            options: ['3 heures', '4 heures et 30 minutes', '6 heures', '8 heures'],
            correctOptionIndex: 1,
            explanation: 'La RSE impose une pause de 45 min après maximum 4h30 de conduite.',
          },
        ],
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    _id: 'mod-c-2',
    _type: 'moduleFormation',
    code: 'MOD-C02',
    title: 'Module Poids Lourd 2 : Gabarit, Inertie & Sécurité du Chargement',
    summary: 'Angles morts massifs des camions, balayages en virage, répartition des charges sur les essieux.',
    learningObjectives: [
      'Calculer les déports arrière et balayages en manœuvre',
      'Vérifier l\'arrimage et le centrage du chargement',
    ],
    ordre: 2,
    typePermis: 'C',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-c' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    durationSeconds: 400,
    tempsMinimumVisionnage: 320,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: 'lec-c-2-1',
        _type: 'lecon',
        title: 'Leçon 1 : Balayage et déport dans les virages serrés',
        ordre: 1,
        description: 'L\'empattement long des poids lourds provoque un balayage arrière important.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        durationSeconds: 200,
        tempsMinimumVisionnageSeconds: 160,
        hasInlineQuiz: false,
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  // --- MODULES PERMIS D (BUS) ---
  {
    _id: 'mod-d-1',
    _type: 'moduleFormation',
    code: 'MOD-D01',
    title: 'Module Bus 1 : Sécurité des Passagers & Évacuation d\'Urgence',
    summary: 'Formation théorique Permis D dédiée aux véhicules de transport en commun de personnes. Sécurité à bord et consignes d\'évacuation.',
    learningObjectives: [
      'Gérer la sécurité et le confort des passagers',
      'Appliquer les procédures d\'évacuation rapide en cas d\'urgence',
    ],
    ordre: 1,
    typePermis: 'D',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-d' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2012.mp4',
    durationSeconds: 390,
    tempsMinimumVisionnage: 312,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: 'lec-d-1-1',
        _type: 'lecon',
        title: 'Leçon 1 : Prise en charge des usagers et procédures d\'urgence',
        ordre: 1,
        description: 'Le conducteur de bus est responsable de la sécurité de tous les voyageurs transportés.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2012.mp4',
        durationSeconds: 190,
        tempsMinimumVisionnageSeconds: 152,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'En cas d\'urgence à bord d\'un autocar, quelle est la priorité absolue ?',
            options: ['Tenter d\'éteindre le feu seul', 'Évacuer immédiatement tous les passagers', 'Appeler son entreprise', 'Continuer jusqu\'à la gare'],
            correctOptionIndex: 1,
            explanation: 'Immobiliser le véhicule et faire évacuer les passagers sans délai.',
          },
        ],
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    _id: 'mod-d-2',
    _type: 'moduleFormation',
    code: 'MOD-D02',
    title: 'Module Bus 2 : Voies Réservées & Priorité aux Arrêts de Bus',
    summary: 'Règles spécifiques concernant l\'utilisation des voies de bus et le départ des arrêts en agglomération.',
    learningObjectives: [
      'Comprendre la priorité de réinsertion des bus quittant un arrêt en agglomération',
    ],
    ordre: 2,
    typePermis: 'D',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-d' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    durationSeconds: 360,
    tempsMinimumVisionnage: 288,
    scoreMinimumQuiz: 75,
    isActive: true,
    lecons: [
      {
        _id: 'lec-d-2-1',
        _type: 'lecon',
        title: 'Leçon 1 : Signalisation et priorité de sortie d\'arrêt',
        ordre: 1,
        description: 'En agglomération, les automobilistes doivent ralentir et céder le passage au bus indiquant son intention de quitter son arrêt.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        durationSeconds: 180,
        tempsMinimumVisionnageSeconds: 144,
        hasInlineQuiz: false,
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

const INITIAL_QUIZZES: Quiz[] = [...PERMIS_B_QUIZZES];

const INITIAL_PROGRESSIONS: ProgressionModule[] = [];

const INITIAL_LOGS: LogActivite[] = [];

const INITIAL_CERTIFICATS: Certificat[] = [];

const INITIAL_SETTINGS: GlobalSettings = {
  defaultMinWatchPercentage: 80,
  defaultMinQuizScore: 70,
  allowMultipleSessions: false,
  maintenanceMode: false,
};

// In-Memory Data Store class
class InMemorySanityStore {
  public autoEcoles: AutoEcole[] = [];
  public users: User[] = [
    {
      _id: 'user-super-admin',
      _type: 'user',
      name: 'Matoa Super Admin',
      email: 'matoa@gmail.com',
      phone: '01 00 00 00 00',
      role: UserRole.SUPER_ADMIN,
      passwordHash: 'qlac485!',
      isActive: true,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
  ];
  public eleves: Eleve[] = [];
  public programmesPermis: ProgrammePermis[] = [];
  public modules: ModuleFormation[] = [];
  public quizzes: Quiz[] = [];
  public progressions: ProgressionModule[] = [];
  public logs: LogActivite[] = [];
  public certificats: Certificat[] = [];
  public settings: GlobalSettings = { ...INITIAL_SETTINGS };

  public seedPermisBContent() {
    const existingProgIdx = this.programmesPermis.findIndex((p) => p._id === PERMIS_B_PROGRAMME._id);
    if (existingProgIdx >= 0) {
      this.programmesPermis[existingProgIdx] = { ...PERMIS_B_PROGRAMME };
    } else {
      this.programmesPermis.unshift({ ...PERMIS_B_PROGRAMME });
    }

    PERMIS_B_MODULES.forEach((mod) => {
      const idx = this.modules.findIndex((m) => m._id === mod._id);
      if (idx >= 0) {
        this.modules[idx] = { ...mod };
      } else {
        this.modules.push({ ...mod });
      }
    });

    PERMIS_B_QUIZZES.forEach((qz) => {
      const idx = this.quizzes.findIndex((q) => q._id === qz._id);
      if (idx >= 0) {
        this.quizzes[idx] = { ...qz };
      } else {
        this.quizzes.push({ ...qz });
      }
    });
  }

  public clearDemoData() {
    this.autoEcoles = [];
    this.eleves = [];
    this.programmesPermis = [];
    this.modules = [];
    this.quizzes = [];
    this.progressions = [];
    this.logs = [];
    this.certificats = [];
  }

  // Helper to resolve autoEcole reference or object
  public getAutoEcoleById(idOrRef: string | any): AutoEcole | undefined {
    if (!idOrRef) return undefined;
    const refId = typeof idOrRef === 'string' ? idOrRef : idOrRef._ref || idOrRef._id;
    return this.autoEcoles.find((ae) => ae._id === refId);
  }

  // Helper to resolve user reference
  public getUserById(idOrRef: string | any): User | undefined {
    if (!idOrRef) return undefined;
    const refId = typeof idOrRef === 'string' ? idOrRef : idOrRef._ref || idOrRef._id;
    return this.users.find((u) => u._id === refId);
  }

  // Helper to resolve eleve reference
  public getEleveById(idOrRef: string | any): Eleve | undefined {
    if (!idOrRef) return undefined;
    const refId = typeof idOrRef === 'string' ? idOrRef : idOrRef._ref || idOrRef._id;
    return this.eleves.find((el) => el._id === refId);
  }

  // Helper to resolve programmePermis reference
  public getProgrammePermisById(idOrRef: string | any): ProgrammePermis | undefined {
    if (!idOrRef) return undefined;
    const refId = typeof idOrRef === 'string' ? idOrRef : idOrRef._ref || idOrRef._id;
    return this.programmesPermis.find((p) => p._id === refId);
  }

  // Get modules filtered for a student's assigned program or permit type
  public getModulesForEleve(eleveId: string): ModuleFormation[] {
    const eleve = this.getEleveById(eleveId);
    if (!eleve) return this.modules.filter((m) => m.isActive);

    const progId = eleve.programmePermis
      ? typeof eleve.programmePermis === 'string'
        ? eleve.programmePermis
        : (eleve.programmePermis as any)._ref || (eleve.programmePermis as any)._id
      : null;

    if (progId) {
      const prog = this.getProgrammePermisById(progId);
      if (prog && prog.modules && prog.modules.length > 0) {
        const moduleIds = prog.modules.map((m: any) => (typeof m === 'string' ? m : m._ref || m._id));
        const matched = this.modules.filter((m) => moduleIds.includes(m._id) && m.isActive);
        if (matched.length > 0) {
          return matched.sort((a, b) => a.ordre - b.ordre);
        }
      }
    }

    // Fallback filter by typePermis
    const typeP = eleve.typePermis || 'B';
    const filteredByType = this.modules.filter(
      (m) =>
        m.isActive &&
        (m.typePermis === typeP ||
          !m.typePermis ||
          (m.programmePermis &&
            (typeof m.programmePermis === 'string'
              ? this.getProgrammePermisById(m.programmePermis)?.typePermis === typeP
              : (m.programmePermis as any).typePermis === typeP)))
    );

    if (filteredByType.length > 0) {
      return filteredByType.sort((a, b) => a.ordre - b.ordre);
    }

    // Ultimate fallback: return active modules sorted
    return this.modules.filter((m) => m.isActive).sort((a, b) => a.ordre - b.ordre);
  }

  // Helper for safe weak references in Sanity mutations
  private toWeakRef(refObjOrId: any) {
    if (!refObjOrId) return undefined;
    const refId = typeof refObjOrId === 'string' ? refObjOrId : refObjOrId._ref || refObjOrId._id;
    if (!refId) return undefined;
    return { _type: 'reference', _ref: refId, _weak: true };
  }

  // Add Log Entry
  public addLog(
    actorUser: User | string,
    typeAction: ActionType,
    description: string,
    autoEcoleId?: string
  ): LogActivite {
    const userObj = typeof actorUser === 'string' ? this.getUserById(actorUser) : actorUser;
    const aeId = autoEcoleId || (userObj?.autoEcole ? (typeof userObj.autoEcole === 'string' ? userObj.autoEcole : (userObj.autoEcole as any)._ref || (userObj.autoEcole as any)._id) : undefined);

    const newLog: LogActivite = {
      _id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      _type: 'logActivite',
      actorUser: userObj ? { _type: 'reference', _ref: userObj._id } : { _type: 'reference', _ref: 'system' },
      actorName: userObj?.name || 'Système',
      actorRole: userObj?.role || UserRole.SUPER_ADMIN,
      autoEcole: aeId ? { _type: 'reference', _ref: aeId } : undefined,
      typeAction,
      description,
      timestamp: new Date().toISOString(),
    };

    this.logs.unshift(newLog);
    this.syncLogToSanity(newLog);
    return newLog;
  }

  // Sanity Mutations Sync
  public async syncAutoEcoleToSanity(ae: AutoEcole) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: ae._id,
        _type: 'autoEcole',
        name: ae.name,
        codeAutoEcoleUnique: ae.codeAutoEcoleUnique,
        adresse: ae.adresse,
        contact: ae.contact,
        logo: ae.logo,
        slogan: ae.slogan,
        couleursTheme: ae.couleursTheme,
        isActive: ae.isActive,
        createdAt: ae.createdAt,
        updatedAt: ae.updatedAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (autoEcole):', err);
    }
  }

  public async syncLogToSanity(log: LogActivite) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: log._id,
        _type: 'logActivite',
        actorUser: this.toWeakRef(log.actorUser),
        actorName: log.actorName,
        actorRole: log.actorRole,
        autoEcole: this.toWeakRef(log.autoEcole),
        typeAction: log.typeAction,
        description: log.description,
        timestamp: log.timestamp,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (logActivite):', err);
    }
  }

  public async syncUserToSanity(user: User) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: user._id,
        _type: 'user',
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        autoEcole: this.toWeakRef(user.autoEcole),
        passwordHash: user.passwordHash,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (user):', err);
    }
  }

  public async deleteSanityDocument(docId: string) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.delete(docId);
    } catch (err) {
      console.warn('Sanity delete warning:', err);
    }
  }

  public async syncProgrammePermisToSanity(prog: ProgrammePermis) {
    if (!liveSanityClient) return;
    try {
      const moduleRefs = (prog.modules || []).map((m: any) => this.toWeakRef(m)).filter(Boolean);
      await liveSanityClient.createOrReplace({
        _id: prog._id,
        _type: 'programmePermis',
        typePermis: prog.typePermis,
        titreProgramme: prog.titreProgramme,
        descriptionProgramme: prog.descriptionProgramme,
        modules: moduleRefs,
        isActive: prog.isActive,
        createdAt: prog.createdAt,
        updatedAt: prog.updatedAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (programmePermis):', err);
    }
  }

  public async syncEleveToSanity(eleve: Eleve, user: User) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: user._id,
        _type: 'user',
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        autoEcole: this.toWeakRef(user.autoEcole),
        passwordHash: user.passwordHash,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });

      await liveSanityClient.createOrReplace({
        _id: eleve._id,
        _type: 'eleve',
        user: this.toWeakRef(eleve.user),
        autoEcole: this.toWeakRef(eleve.autoEcole),
        codeEleveUnique: eleve.codeEleveUnique,
        typePermis: eleve.typePermis,
        programmePermis: this.toWeakRef(eleve.programmePermis),
        dateDebutFormation: eleve.dateDebutFormation,
        dateFinFormation: eleve.dateFinFormation,
        isBlocked: eleve.isBlocked,
        formationActive: eleve.formationActive,
        progressionGlobal: eleve.progressionGlobal,
        createdAt: eleve.createdAt,
        updatedAt: eleve.updatedAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (eleve/user):', err);
    }
  }

  public async syncProgressionToSanity(prog: ProgressionModule) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: prog._id,
        _type: 'progressionModule',
        eleve: this.toWeakRef(prog.eleve),
        module: this.toWeakRef(prog.module),
        videoWatchTimeSeconds: prog.videoWatchTimeSeconds,
        hasCompletedVideo: prog.hasCompletedVideo,
        quizScore: prog.quizScore,
        quizAttemptCount: prog.quizAttemptCount,
        isModuleValidated: prog.isModuleValidated,
        lastActivityAt: prog.lastActivityAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (progression):', err);
    }
  }

  public async syncModuleToSanity(mod: ModuleFormation) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: mod._id,
        _type: 'moduleFormation',
        code: mod.code,
        title: mod.title,
        summary: mod.summary,
        learningObjectives: mod.learningObjectives,
        ordre: mod.ordre,
        videoUrl: mod.videoUrl,
        durationSeconds: mod.durationSeconds,
        tempsMinimumVisionnage: mod.tempsMinimumVisionnage,
        scoreMinimumQuiz: mod.scoreMinimumQuiz,
        typePermis: mod.typePermis,
        programmePermis: this.toWeakRef(mod.programmePermis),
        isActive: mod.isActive,
        lecons: mod.lecons,
        createdAt: mod.createdAt,
        updatedAt: mod.updatedAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (moduleFormation):', err);
    }
  }

  public async syncQuizToSanity(quiz: Quiz) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: quiz._id,
        _type: 'quiz',
        title: quiz.title,
        module: this.toWeakRef(quiz.module),
        timerSeconds: quiz.timerSeconds,
        scoreMinimum: quiz.scoreMinimum,
        questions: quiz.questions,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (quiz):', err);
    }
  }

  public async syncCertificatToSanity(cert: Certificat) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: cert._id,
        _type: 'certificat',
        eleve: this.toWeakRef(cert.eleve),
        autoEcole: this.toWeakRef(cert.autoEcole),
        dateEmission: cert.dateEmission,
        certificateCode: cert.certificateCode,
        status: cert.status,
        createdAt: cert.createdAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (certificat):', err);
    }
  }

  public async purgeDemoElevesFromSanity() {
    if (!liveSanityClient) return;
    try {
      const demoIds = [
        'ae-001', 'ae-002', 'user-ae-001', 'user-ae-002',
        'eleve-001', 'eleve-002', 'eleve-003', 'eleve-004',
        'user-eleve-1', 'user-eleve-2', 'user-eleve-3', 'user-eleve-4',
        'prog-001-mod-1', 'prog-001-mod-2', 'prog-001-mod-3',
        'prog-002-mod-1', 'prog-002-mod-2', 'prog-002-mod-3',
        'cert-001'
      ];
      for (const id of demoIds) {
        try {
          await liveSanityClient.delete(id);
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.warn('Nettoyage démo warning:', err);
    }
  }

  public async seedInitialDatasetToSanity() {
    if (!liveSanityClient) return;
    console.log('🌱 Seeding default initial data into Sanity Cloud...');
    if (this.autoEcoles.length === 0) this.autoEcoles = [...INITIAL_AUTO_ECOLES];
    if (this.users.length <= 1) this.users = [...INITIAL_USERS];
    if (this.eleves.length === 0) this.eleves = [...INITIAL_ELEVES];
    if (this.programmesPermis.length === 0) this.programmesPermis = [...INITIAL_PROGRAMMES_PERMIS];
    if (this.modules.length === 0) this.modules = [...INITIAL_MODULES];
    if (this.quizzes.length === 0) this.quizzes = [...INITIAL_QUIZZES];
    if (this.progressions.length === 0) this.progressions = [...INITIAL_PROGRESSIONS];
    if (this.logs.length === 0) this.logs = [...INITIAL_LOGS];
    if (this.certificats.length === 0) this.certificats = [...INITIAL_CERTIFICATS];

    try {
      for (const ae of this.autoEcoles) await this.syncAutoEcoleToSanity(ae);
      for (const u of this.users) await this.syncUserToSanity(u);
      for (const prog of this.programmesPermis) await this.syncProgrammePermisToSanity(prog);
      for (const m of this.modules) await this.syncModuleToSanity(m);
      for (const q of this.quizzes) await this.syncQuizToSanity(q);
      for (const e of this.eleves) {
        const u = this.users.find((usr) => usr._id === (typeof e.user === 'string' ? e.user : (e.user as any)._ref || (e.user as any)._id));
        if (u) await this.syncEleveToSanity(e, u);
      }
      for (const pr of this.progressions) await this.syncProgressionToSanity(pr);
      for (const c of this.certificats) await this.syncCertificatToSanity(c);
      for (const l of this.logs) await this.syncLogToSanity(l);
      console.log('✅ Seeding Sanity Cloud complet !');
    } catch (err) {
      console.warn('Erreur durant le seeding Sanity Cloud:', err);
    }
  }

  public async loadFromSanity() {
    // Clean up demo student records from Sanity Cloud
    await this.purgeDemoElevesFromSanity();

    if (!liveSanityClient) return;
    try {
      console.log('🔄 Sync avec Sanity Cloud (project ID: cchdhqvw)...');
      const [
        remoteAutoEcoles,
        remoteUsers,
        remoteEleves,
        remoteProgrammes,
        remoteModules,
        remoteQuizzes,
        remoteProgressions,
        remoteLogs,
        remoteCertificats
      ] = await Promise.all([
        liveSanityClient.fetch<AutoEcole[]>(`*[_type == "autoEcole"]`),
        liveSanityClient.fetch<User[]>(`*[_type == "user"]`),
        liveSanityClient.fetch<Eleve[]>(`*[_type == "eleve"]`),
        liveSanityClient.fetch<ProgrammePermis[]>(`*[_type == "programmePermis"]`),
        liveSanityClient.fetch<ModuleFormation[]>(`*[_type == "moduleFormation"]`),
        liveSanityClient.fetch<Quiz[]>(`*[_type == "quiz"]`),
        liveSanityClient.fetch<ProgressionModule[]>(`*[_type == "progressionModule"]`),
        liveSanityClient.fetch<LogActivite[]>(`*[_type == "logActivite"]`),
        liveSanityClient.fetch<Certificat[]>(`*[_type == "certificat"]`),
      ]);

      if (remoteAutoEcoles && remoteAutoEcoles.length > 0) {
        this.autoEcoles = remoteAutoEcoles.filter(
          (ae) =>
            ae._id !== 'ae-001' &&
            ae._id !== 'ae-002' &&
            ae.codeAutoEcoleUnique !== 'MATOA-AE-001' &&
            ae.codeAutoEcoleUnique !== 'MATOA-AE-002' &&
            !ae.name?.includes('Conduite Passion') &&
            !ae.name?.includes('Permis Zen')
        );
      } else {
        this.autoEcoles = [];
      }

      // Filter out demo student users, demo auto-école admins, and demo eleves
      const isDemoId = (id: string) =>
        id.startsWith('eleve-00') ||
        id.startsWith('user-eleve-') ||
        id === 'ae-001' || id === 'ae-002' ||
        id === 'user-ae-001' || id === 'user-ae-002' ||
        ['eleve-001', 'eleve-002', 'eleve-003', 'eleve-004', 'user-eleve-1', 'user-eleve-2', 'user-eleve-3', 'user-eleve-4'].includes(id);

      if (remoteUsers && remoteUsers.length > 0) {
        this.users = remoteUsers.filter(
          (u) =>
            !isDemoId(u._id) &&
            u.email !== 'contact@conduitepassion.fr' &&
            u.email !== 'admin@permiszen.fr'
        );
      } else {
        this.users = [...INITIAL_USERS];
      }

      if (remoteEleves && remoteEleves.length > 0) {
        this.eleves = remoteEleves.filter((e) => !isDemoId(e._id));
      } else {
        this.eleves = [];
      }

      if (remoteProgrammes && remoteProgrammes.length > 0) this.programmesPermis = remoteProgrammes;
      if (remoteModules && remoteModules.length > 0) this.modules = remoteModules;
      if (remoteQuizzes && remoteQuizzes.length > 0) this.quizzes = remoteQuizzes;

      if (remoteProgressions && remoteProgressions.length > 0) {
        this.progressions = remoteProgressions.filter((pr) => {
          const elId = typeof pr.eleve === 'string' ? pr.eleve : (pr.eleve as any)?._ref || (pr.eleve as any)?._id;
          return elId && !isDemoId(elId) && !pr._id.startsWith('prog-00');
        });
      } else {
        this.progressions = [];
      }

      if (remoteLogs && remoteLogs.length > 0) this.logs = remoteLogs;

      if (remoteCertificats && remoteCertificats.length > 0) {
        this.certificats = remoteCertificats.filter((c) => {
          const elId = typeof c.eleve === 'string' ? c.eleve : (c.eleve as any)?._ref || (c.eleve as any)?._id;
          return elId && !isDemoId(elId) && c._id !== 'cert-001';
        });
      } else {
        this.certificats = [];
      }

      // Always ensure Super Admin user exists with matoa@gmail.com / qlac485!
      let superAdmin = this.users.find((u) => u.role === UserRole.SUPER_ADMIN);
      if (!superAdmin) {
        superAdmin = {
          _id: 'user-super-admin',
          _type: 'user',
          name: 'Matoa Super Admin',
          email: 'matoa@gmail.com',
          phone: '01 00 00 00 00',
          role: UserRole.SUPER_ADMIN,
          passwordHash: 'qlac485!',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        this.users.unshift(superAdmin);
        await this.syncUserToSanity(superAdmin);
      } else {
        superAdmin.email = 'matoa@gmail.com';
        superAdmin.passwordHash = 'qlac485!';
        await this.syncUserToSanity(superAdmin);
      }

      // If remote dataset is empty, seed initial data into Sanity Cloud
      if (!remoteAutoEcoles || remoteAutoEcoles.length === 0 || !remoteModules || remoteModules.length === 0) {
        await this.seedInitialDatasetToSanity();
      }

      // Ensure complete Permis B programme & modules exist in store
      this.seedPermisBContent();

      console.log(`✅ Sanity Synchronisé ! (${this.autoEcoles.length} auto-écoles, ${this.users.length} utilisateurs, ${this.eleves.length} élèves, ${this.modules.length} modules)`);
    } catch (err) {
      console.warn('⚠️ Avertissement lors de la synchronisation Sanity:', err);
    }
  }
}

export const inMemoryStore = new InMemorySanityStore();
