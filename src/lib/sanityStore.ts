import { createClient } from '@sanity/client';
import {
  User,
  AutoEcole,
  Eleve,
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

// Sanity client configuration with user credentials
const sanityProjectId = process.env.SANITY_PROJECT_ID || (import.meta as any).env?.VITE_SANITY_PROJECT_ID || 'cchdhqvw';
const sanityDataset = process.env.SANITY_DATASET || (import.meta as any).env?.VITE_SANITY_DATASET || 'production';
const sanityToken = process.env.SANITY_API_TOKEN || (import.meta as any).env?.VITE_SANITY_API_TOKEN || 'skQ2mYgpmed6uhwu38MwFSre6YJGsW47WtG0cOWWj2xb8I5juJGIbRe4MihlNcXwAdmOnYA2VPDBkclEgTWXvEgpozPhLmcuNaD7VKeIr8k8vh2USFsAdg0JscqVE27YAeQR6FMjNtcAscpsaA4bvg5Q44ww1HcUjAfiqVbO8qiTyq543J5K';

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
const INITIAL_AUTO_ECOLES: AutoEcole[] = [
  {
    _id: 'ae-001',
    _type: 'autoEcole',
    name: 'Auto-École Conduite Passion',
    adresse: '15 Boulevard Haussmann, 75009 Paris',
    contact: {
      phone: '01 42 68 50 10',
      email: 'contact@conduitepassion.fr',
    },
    codeAutoEcoleUnique: 'MATOA-AE-001',
    logo: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=150&auto=format&fit=crop&q=80',
    couleursTheme: {
      primaryColor: '#2563eb', // Royal Blue
      secondaryColor: '#059669', // Emerald Green
    },
    slogan: 'L\'excellence de l\'apprentissage du code de la route et de la conduite.',
    isActive: true,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    _id: 'ae-002',
    _type: 'autoEcole',
    name: 'Auto-École Permis Zen',
    adresse: '42 Rue Saint-Ferréol, 13001 Marseille',
    contact: {
      phone: '04 91 33 20 40',
      email: 'admin@permiszen.fr',
    },
    codeAutoEcoleUnique: 'MATOA-AE-002',
    logo: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=150&auto=format&fit=crop&q=80',
    couleursTheme: {
      primaryColor: '#7c3aed', // Purple
      secondaryColor: '#db2777', // Pink
    },
    slogan: 'Passez votre permis en toute sérénité à Marseille.',
    isActive: true,
    createdAt: '2026-02-01T09:00:00Z',
    updatedAt: '2026-02-01T09:00:00Z',
  },
];

const INITIAL_USERS: User[] = [
  {
    _id: 'user-super-admin',
    _type: 'user',
    name: 'Matoa Super Admin',
    email: 'admin@matoa.fr',
    phone: '01 00 00 00 00',
    role: UserRole.SUPER_ADMIN,
    passwordHash: 'password123',
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    _id: 'user-ae-001',
    _type: 'user',
    name: 'Directeur Conduite Passion',
    email: 'contact@conduitepassion.fr',
    phone: '01 42 68 50 10',
    role: UserRole.AUTO_ECOLE_ADMIN,
    autoEcole: { _type: 'reference', _ref: 'ae-001' },
    passwordHash: 'password123',
    isActive: true,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    _id: 'user-ae-002',
    _type: 'user',
    name: 'Directeur Permis Zen',
    email: 'admin@permiszen.fr',
    phone: '04 91 33 20 40',
    role: UserRole.AUTO_ECOLE_ADMIN,
    autoEcole: { _type: 'reference', _ref: 'ae-002' },
    passwordHash: 'password123',
    isActive: true,
    createdAt: '2026-02-01T09:00:00Z',
    updatedAt: '2026-02-01T09:00:00Z',
  },
  {
    _id: 'user-eleve-1',
    _type: 'user',
    name: 'Jean Dupont',
    email: 'jean.dupont@email.fr',
    phone: '06 12 34 56 78',
    role: UserRole.ELEVE,
    autoEcole: { _type: 'reference', _ref: 'ae-001' },
    passwordHash: 'password123',
    isActive: true,
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z',
  },
  {
    _id: 'user-eleve-2',
    _type: 'user',
    name: 'Marie Curie',
    email: 'marie.curie@email.fr',
    phone: '06 98 76 54 32',
    role: UserRole.ELEVE,
    autoEcole: { _type: 'reference', _ref: 'ae-001' },
    passwordHash: 'password123',
    isActive: true,
    createdAt: '2026-02-15T11:00:00Z',
    updatedAt: '2026-02-15T11:00:00Z',
  },
  {
    _id: 'user-eleve-3',
    _type: 'user',
    name: 'Luc Martin',
    email: 'luc.martin@email.fr',
    phone: '06 55 44 33 22',
    role: UserRole.ELEVE,
    autoEcole: { _type: 'reference', _ref: 'ae-001' },
    passwordHash: 'password123',
    isActive: true,
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2025-11-01T08:00:00Z',
  },
  {
    _id: 'user-eleve-4',
    _type: 'user',
    name: 'Sophie Bernard',
    email: 'sophie.b@email.fr',
    phone: '07 11 22 33 44',
    role: UserRole.ELEVE,
    autoEcole: { _type: 'reference', _ref: 'ae-002' },
    passwordHash: 'password123',
    isActive: true,
    createdAt: '2026-03-10T14:00:00Z',
    updatedAt: '2026-03-10T14:00:00Z',
  },
];

const INITIAL_ELEVES: Eleve[] = [
  {
    _id: 'eleve-001',
    _type: 'eleve',
    user: { _type: 'reference', _ref: 'user-eleve-1' },
    autoEcole: { _type: 'reference', _ref: 'ae-001' },
    codeEleveUnique: 'AE001-ELV001',
    dateDebutFormation: '2026-03-01',
    dateFinFormation: '2026-09-01',
    formationActive: true,
    progressionGlobal: 66,
    isBlocked: false,
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z',
  },
  {
    _id: 'eleve-002',
    _type: 'eleve',
    user: { _type: 'reference', _ref: 'user-eleve-2' },
    autoEcole: { _type: 'reference', _ref: 'ae-001' },
    codeEleveUnique: 'AE001-ELV002',
    dateDebutFormation: '2026-02-15',
    dateFinFormation: '2026-08-15',
    formationActive: true,
    progressionGlobal: 100,
    isBlocked: false,
    createdAt: '2026-02-15T11:00:00Z',
    updatedAt: '2026-02-15T11:00:00Z',
  },
  {
    _id: 'eleve-003',
    _type: 'eleve',
    user: { _type: 'reference', _ref: 'user-eleve-3' },
    autoEcole: { _type: 'reference', _ref: 'ae-001' },
    codeEleveUnique: 'AE001-ELV003',
    dateDebutFormation: '2025-11-01',
    dateFinFormation: '2026-02-01', // Expired!
    formationActive: false,
    progressionGlobal: 33,
    isBlocked: true, // Expired date automatically blocks module access
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2025-11-01T08:00:00Z',
  },
  {
    _id: 'eleve-004',
    _type: 'eleve',
    user: { _type: 'reference', _ref: 'user-eleve-4' },
    autoEcole: { _type: 'reference', _ref: 'ae-002' },
    codeEleveUnique: 'AE002-ELV001',
    dateDebutFormation: '2026-03-10',
    dateFinFormation: '2026-10-10',
    formationActive: true,
    progressionGlobal: 33,
    isBlocked: false,
    createdAt: '2026-03-10T14:00:00Z',
    updatedAt: '2026-03-10T14:00:00Z',
  },
];

const INITIAL_MODULES: ModuleFormation[] = [
  {
    _id: 'mod-1',
    _type: 'moduleFormation',
    code: 'MOD-001',
    title: 'Module 1 : Signalisation et Panneaux de Signalisation',
    summary: 'Ce module pose les bases fondamentales de la signalisation routière en France. L\'élève y apprend à identifier instantanément les formes, les couleurs et la typologie de chaque panneau. À la fin de ce module, l\'élève sera capable d\'anticiper les dangers, de respecter les interdictions et d\'exécuter les obligations de conduite.',
    learningObjectives: [
      'Reconnaître les formes (triangulaire, rond, carré) et les couleurs des panneaux',
      'Distinguer les panneaux de danger, d\'interdiction, d\'obligation et d\'indication',
      'Identifier la distance d\'implantation des panneaux en et hors agglomération',
      'Analyser les panonceaux complémentaires sous les panneaux principaux',
    ],
    ordre: 1,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    durationSeconds: 410,
    tempsMinimumVisionnage: 328, // 80%
    scoreMinimumQuiz: 70,
    isActive: true,
    lecons: [
      {
        _id: 'lec-1-1',
        _type: 'lecon',
        title: 'Leçon 1 : Formes et couleurs de la signalisation',
        ordre: 1,
        description: 'Chaque panneau est un code visuel instantané. La forme indique la nature du message : le triangle annonce un danger, le cercle ordonne (interdiction en bordure rouge ou obligation en fond bleu), le carré ou rectangle informe. La couleur renforce la préavisabilité (jaune = temporaire, blanc = permanent).',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        durationSeconds: 120,
        tempsMinimumVisionnageSeconds: 96,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'Quelle est la signification d\'un panneau de forme triangulaire ?',
            options: ['Interdiction', 'Danger potentiel', 'Obligation', 'Information'],
            correctOptionIndex: 1,
            explanation: 'Les panneaux triangulaires annoncent toujours un danger.',
          },
          {
            questionText: 'Un panneau à fond jaune indique :',
            options: ['Une obligation permanente', 'Une signalisation temporaire de chantier', 'Une zone touristique', 'Une interdiction de nuit'],
            correctOptionIndex: 1,
            explanation: 'Le jaune est réservé aux signalisations temporaires (chantiers, déviations).',
          },
        ],
      },
      {
        _id: 'lec-1-2',
        _type: 'lecon',
        title: 'Leçon 2 : Panneaux de danger et distances d\'implantation',
        ordre: 2,
        description: 'Les panneaux de danger sont placés en avance pour permettre d\'adapter sa vitesse. En agglomération, ils sont positionnés à environ 50 mètres du danger. Hors agglomération, ils sont implantés à environ 150 mètres. Les panonceaux d\'étendue indiquent la longueur sur laquelle s\'applique le danger.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        durationSeconds: 150,
        tempsMinimumVisionnageSeconds: 120,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'À quelle distance d\'un danger un panneau est-il placé hors agglomération ?',
            options: ['50 mètres', '100 mètres', '150 mètres', '300 mètres'],
            correctOptionIndex: 2,
            explanation: 'Hors agglomération, le panneau est implanté à 150 mètres du danger.',
          },
        ],
      },
      {
        _id: 'lec-1-3',
        _type: 'lecon',
        title: 'Leçon 3 : Interdictions, obligations et panonceaux',
        ordre: 3,
        description: 'Les panneaux ronds à bordure rouge interdisent à partir du panneau jusqu\'à la prochaine intersection ou panneau de fin. Les panneaux ronds bleus imposent une obligation (ex: voie vélos, vitesse minimale). Les panonceaux précisent à qui s\'adresse le panneau ou la distance exacte.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        durationSeconds: 140,
        tempsMinimumVisionnageSeconds: 112,
        hasInlineQuiz: false,
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    _id: 'mod-2',
    _type: 'moduleFormation',
    code: 'MOD-002',
    title: 'Module 2 : Priorités de Passage et Règles d\'Intersection',
    summary: 'Les intersections constituent les zones les plus critiques en matière de sécurité routière. Ce module passe en revue la règle fondamentale de la priorité à droite, le fonctionnement des panneaux STOP et Céder le Passage, ainsi que les carrefours à sens giratoire. À la fin de ce module, l\'élève saura franchir tout type d\'intersection en sécurité.',
    learningObjectives: [
      'Appliquer la règle de la priorité à droite en l\'absence de panneau',
      'Distinguer l\'obligation d\'arrêt absolu du STOP du Céder le Passage',
      'Maîtriser les règles d\'insertion et de placement dans un carrefour giratoire',
      'Anticiper la présence des véhicules prioritaires à gyrophares bleus',
    ],
    ordre: 2,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    durationSeconds: 540,
    tempsMinimumVisionnage: 432,
    scoreMinimumQuiz: 70,
    isActive: true,
    lecons: [
      {
        _id: 'lec-2-1',
        _type: 'lecon',
        title: 'Leçon 1 : La règle fondamentale de la priorité à droite',
        ordre: 1,
        description: 'Sans signalisation spécifique, la priorité à droite s\'applique à toutes les intersections. Il faut ralentir, observer l\'angle mort à droite et être en mesure de s\'arrêter si un véhicule survient. La priorité à droite s\'applique également dans les parkings et voies privées ouvertes à la circulation.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoybreaks.mp4',
        durationSeconds: 160,
        tempsMinimumVisionnageSeconds: 128,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'En l\'absence de marquage au sol ou panneau, qui passe en premier ?',
            options: ['Le véhicule arrivant à gauche', 'Le véhicule arrivant à droite', 'Le plus gros véhicule', 'Le plus rapide'],
            correctOptionIndex: 1,
            explanation: 'En l\'absence de signalisation, la priorité appartient au véhicule de droite.',
          },
        ],
      },
      {
        _id: 'lec-2-2',
        _type: 'lecon',
        title: 'Leçon 2 : STOP, Céder le Passage et marquages au sol',
        ordre: 2,
        description: 'Au panneau STOP, l\'arrêt complet des roues est obligatoire à la ligne de retrait, même si la voie est totalement libre. Au Céder le Passage, l\'arrêt n\'est pas obligatoire s\'il n\'y a personne, mais il faut céder le passage à gauche et à droite.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        durationSeconds: 180,
        tempsMinimumVisionnageSeconds: 144,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'Devez-vous vous arrêter complètement au Céder le Passage si la voie est libre ?',
            options: ['Oui, au moins 3 secondes', 'Non, si aucun usager n\'arrive', 'Oui, si un piéton attend', 'Non, la nuit seulement'],
            correctOptionIndex: 1,
            explanation: 'Au Céder le Passage, l\'arrêt n\'est obligatoire que si la voie prioritaire est occupée.',
          },
        ],
      },
      {
        _id: 'lec-2-3',
        _type: 'lecon',
        title: 'Leçon 3 : Carrefours à sens giratoire et ronds-points',
        ordre: 3,
        description: 'En France, sur un carrefour à sens giratoire, les usagers déjà engagés sur l\'anneau sont prioritaires (présence de panneaux Céder le Passage à l\'entrée). Pour tourner à droite ou aller en face, placez-vous sur la voie de droite.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        durationSeconds: 200,
        tempsMinimumVisionnageSeconds: 160,
        hasInlineQuiz: false,
      },
    ],
    createdAt: '2026-01-02T00:00:00Z',
    updatedAt: '2026-01-02T00:00:00Z',
  },
  {
    _id: 'mod-3',
    _type: 'moduleFormation',
    code: 'MOD-003',
    title: 'Module 3 : Vitesse, Distances de Sécurité et Éco-Conduite',
    summary: 'Adapter sa vitesse et maintenir une distance de sécurité suffisante sont les deux facteurs majeurs pour éviter les collisions. Ce module explique le calcul de la distance d\'arrêt, l\'impact de la vitesse sur la distance de freinage et les principes d\'une conduite économique et écologique.',
    learningObjectives: [
      'Calculer la distance parcourue pendant le temps de réaction',
      'Évaluer la distance de freinage selon l\'état de la chaussée (sèche / mouillée)',
      'Calculer la distance de sécurité minimale (règle des 2 secondes)',
      'Mettre en pratique les règles d\'éco-conduite pour réduire sa consommation',
    ],
    ordre: 3,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    durationSeconds: 320,
    tempsMinimumVisionnage: 256,
    scoreMinimumQuiz: 70,
    isActive: true,
    lecons: [
      {
        _id: 'lec-3-1',
        _type: 'lecon',
        title: 'Leçon 1 : Temps de réaction et distance d\'arrêt',
        ordre: 1,
        description: 'Le temps de réaction moyen d\'un conducteur vigilant est d\'environ 1 seconde. Durant cette seconde, la voiture parcourt une distance égale à la dizaine de la vitesse multipliée par 3 (ex: à 50 km/h -> 5 x 3 = 15 mètres). La distance de freinage varie avec le carré de la vitesse !',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2012.mp4',
        durationSeconds: 150,
        tempsMinimumVisionnageSeconds: 120,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'À 90 km/h, quelle distance parcourt-on environ pendant 1 seconde de temps de réaction ?',
            options: ['15 mètres', '27 mètres', '45 mètres', '90 mètres'],
            correctOptionIndex: 1,
            explanation: 'Astuce : 9 x 3 = 27 mètres parcourus en 1 seconde à 90 km/h.',
          },
        ],
      },
      {
        _id: 'lec-3-2',
        _type: 'lecon',
        title: 'Leçon 2 : Distances de sécurité et conditions météo',
        ordre: 2,
        description: 'La distance de sécurité minimale correspond à la distance parcourue pendant 2 secondes (dizaine de la vitesse x 6). Sur chaussée mouillée, la distance de freinage est multipliée par 2 !',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        durationSeconds: 170,
        tempsMinimumVisionnageSeconds: 136,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'Sur chaussée mouillée, la distance de freinage est :',
            options: ['Identique', 'Doublée', 'Triplée', 'Divisée par deux'],
            correctOptionIndex: 1,
            explanation: 'L\'adhérence réduite sur sol mouillée double la distance de freinage.',
          },
        ],
      },
    ],
    createdAt: '2026-01-03T00:00:00Z',
    updatedAt: '2026-01-03T00:00:00Z',
  },
];

const INITIAL_QUIZZES: Quiz[] = [
  {
    _id: 'quiz-mod-1',
    _type: 'quiz',
    module: { _type: 'reference', _ref: 'mod-1' },
    timerSeconds: 600, // 10 min
    questions: [
      {
        questionText: 'Un panneau triangulaire bordé de rouge indique :',
        options: [
          'Une interdiction stricte',
          'Un danger potentiel à venir',
          'Une obligation absolue',
          'Une simple indication touristique',
        ],
        correctOptionIndex: 1,
        explanation: 'Les panneaux triangulaires à fond blanc et bordure rouge annoncent un danger.',
      },
      {
        questionText: 'À quelle distance d\'un danger en agglomération un panneau de danger est-il implanté ?',
        options: ['Environ 150 mètres', 'Environ 50 mètres', 'Au niveau exact du danger', 'À 300 mètres'],
        correctOptionIndex: 1,
        explanation: 'En agglomération, la vitesse étant plus réduite, les panneaux sont placés à ~50m.',
      },
      {
        questionText: 'Que signifie un panneau rond bleu avec un symbole de vélo ?',
        options: [
          'Piste ou bande obligatoire pour les cycles',
          'Interdiction aux vélos',
          'Stationnement vélo réservé',
          'Fin de voie verte',
        ],
        correctOptionIndex: 0,
        explanation: 'Un panneau rond bleu indique une obligation, ici la voie obligatoire pour cycles.',
      },
      {
        questionText: 'À quelle vitesse maximale devez-vous rouler en ville en agglomération standard ?',
        options: ['30 km/h', '50 km/h', '70 km/h', '80 km/h'],
        correctOptionIndex: 1,
        explanation: 'Sauf indication contraire ou zone 30, la vitesse maximale autorisée en agglomération est de 50 km/h.',
      },
      {
        questionText: 'Un panneau rond bordé de rouge avec un fond blanc signifie :',
        options: ['Une interdiction', 'Une fin d\'obligation', 'Un danger imminent', 'Une direction conseillée'],
        correctOptionIndex: 0,
        explanation: 'Les panneaux ronds à bordure rouge sont des panneaux d\'interdiction.',
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    _id: 'quiz-mod-2',
    _type: 'quiz',
    module: { _type: 'reference', _ref: 'mod-2' },
    timerSeconds: 600,
    questions: [
      {
        questionText: 'En l\'absence de toute signalisation à une intersection, quelle règle s\'applique ?',
        options: [
          'Priorité au véhicule roulant le plus vite',
          'Priorité absolue à gauche',
          'Priorité à droite',
          'Premier arrivé, premier servi',
        ],
        correctOptionIndex: 2,
        explanation: 'Sans signalisation spécifique, la priorité à droite s\'applique obligatoirement.',
      },
      {
        questionText: 'Face à un panneau "Céder le passage", devez-vous impérativement marquer un temps d\'arrêt ?',
        options: [
          'Oui, toujours au moins 3 secondes',
          'Non, uniquement si des usagers arrivent sur la voie prioritaire',
          'Oui, sauf la nuit',
          'Non, les vélos ont la priorité',
        ],
        correctOptionIndex: 1,
        explanation: 'Contrairement au Stop, le marquer de l\'arrêt n\'est pas obligatoire s\'il n\'y a personne.',
      },
      {
        questionText: 'Qui a la priorité dans un carrefour à sens giratoire en France ?',
        options: [
          'Les véhicules entrant dans le giratoire',
          'Les véhicules déjà engagés dans l\'anneau',
          'Les poids lourds uniquement',
          'Le véhicule venant de la voie la plus à droite',
        ],
        correctOptionIndex: 1,
        explanation: 'Les usagers engagés sur l\'anneau du carrefour giratoire sont prioritaires.',
      },
      {
        questionText: 'Au panneau STOP, où devez-vous marquer l\'arrêt complet des roues ?',
        options: [
          'À la hauteur du panneau STOP',
          'À la ligne blanche continue de retrait s\'il y en a une',
          'Au milieu du carrefour',
          'Seulement s\'il y a un autre véhicule',
        ],
        correctOptionIndex: 1,
        explanation: 'L\'arrêt au STOP doit être effectué à la ligne de marquage au sol de retrait.',
      },
      {
        questionText: 'Devant un véhicule de secours (ambulance/pompiers) avec feux bleus et sirène 2 tons, vous devez :',
        options: [
          'Conserver votre trajectoire et accélérer',
          'Faciliter le passage en vous serrant ou vous arrêtant dès que possible',
          'Piler sur place immédiatement',
          'Les dépasser rapidement',
        ],
        correctOptionIndex: 1,
        explanation: 'Vous devez céder le passage et faciliter la progression des véhicules d\'urgence prioritaires.',
      },
    ],
    createdAt: '2026-01-02T00:00:00Z',
    updatedAt: '2026-01-02T00:00:00Z',
  },
  {
    _id: 'quiz-mod-3',
    _type: 'quiz',
    module: { _type: 'reference', _ref: 'mod-3' },
    timerSeconds: 600,
    questions: [
      {
        questionText: 'Quelle est la formule approximative pour évaluer la distance de sécurité minimale sur autoroute à 130 km/h ?',
        options: [
          'Multiplier le chiffre des dizaines par 2',
          'Multiplier le chiffre des dizaines par 6 (ex: 13 x 6 = 78 mètres)',
          'Multiplier la vitesse par 3',
          'Compter 1 seconde entre deux véhicules',
        ],
        correctOptionIndex: 1,
        explanation: 'Distance de sécurité en mètres ≈ (chiffre des dizaines de la vitesse) × 6, soit ~78m à 130 km/h.',
      },
      {
        questionText: 'En cas de pluie sur autoroute, la vitesse maximale autorisée passe de 130 km/h à :',
        options: ['120 km/h', '110 km/h', '100 km/h', '90 km/h'],
        correctOptionIndex: 1,
        explanation: 'Par temps de pluie, la vitesse limite sur autoroute s\'abaisse à 110 km/h.',
      },
      {
        questionText: 'L\'éco-conduite permet de réduire sa consommation de carburant de :',
        options: ['1 à 2 %', 'Jusqu\'à 15 à 20 %', '50 %', 'Elle n\'a aucun impact'],
        correctOptionIndex: 1,
        explanation: 'Une conduite souple et anticipative réduit la consommation et l\'usure de 15 à 20%.',
      },
      {
        questionText: 'Pendant le temps de réaction (moyen 1 sec), à 50 km/h vous parcourez environ :',
        options: ['5 mètres', '15 mètres', '25 mètres', '50 mètres'],
        correctOptionIndex: 1,
        explanation: 'Multipliez la dizaine de la vitesse par 3 : 5 x 3 = 15 mètres.',
      },
      {
        questionText: 'Quelle est la distance de freinage sur sol mouillé par rapport à un sol sec ?',
        options: ['Identique', 'Doublée (multipliée par 2)', 'Divisée par 2', 'Triplée'],
        correctOptionIndex: 1,
        explanation: 'L\'eau réduit l\'adhérence des pneumatiques et double la distance de freinage.',
      },
    ],
    createdAt: '2026-01-03T00:00:00Z',
    updatedAt: '2026-01-03T00:00:00Z',
  },
];

const INITIAL_PROGRESSIONS: ProgressionModule[] = [
  // Jean Dupont (eleve-001) progress
  {
    _id: 'prog-001-mod-1',
    _type: 'progressionModule',
    eleve: { _type: 'reference', _ref: 'eleve-001' },
    module: { _type: 'reference', _ref: 'mod-1' },
    videoWatchTimeSeconds: 120,
    hasCompletedVideo: true,
    quizScore: 100,
    quizAttemptCount: 1,
    isModuleValidated: true,
    lastActivityAt: '2026-03-05T14:20:00Z',
  },
  {
    _id: 'prog-001-mod-2',
    _type: 'progressionModule',
    eleve: { _type: 'reference', _ref: 'eleve-001' },
    module: { _type: 'reference', _ref: 'mod-2' },
    videoWatchTimeSeconds: 150,
    hasCompletedVideo: true,
    quizScore: 100,
    quizAttemptCount: 1,
    isModuleValidated: true,
    lastActivityAt: '2026-03-12T16:00:00Z',
  },
  {
    _id: 'prog-001-mod-3',
    _type: 'progressionModule',
    eleve: { _type: 'reference', _ref: 'eleve-001' },
    module: { _type: 'reference', _ref: 'mod-3' },
    videoWatchTimeSeconds: 60,
    hasCompletedVideo: false,
    quizScore: 0,
    quizAttemptCount: 0,
    isModuleValidated: false,
    lastActivityAt: '2026-03-15T09:30:00Z',
  },

  // Marie Curie (eleve-002) completed 100%
  {
    _id: 'prog-002-mod-1',
    _type: 'progressionModule',
    eleve: { _type: 'reference', _ref: 'eleve-002' },
    module: { _type: 'reference', _ref: 'mod-1' },
    videoWatchTimeSeconds: 120,
    hasCompletedVideo: true,
    quizScore: 100,
    quizAttemptCount: 1,
    isModuleValidated: true,
    lastActivityAt: '2026-02-20T10:00:00Z',
  },
  {
    _id: 'prog-002-mod-2',
    _type: 'progressionModule',
    eleve: { _type: 'reference', _ref: 'eleve-002' },
    module: { _type: 'reference', _ref: 'mod-2' },
    videoWatchTimeSeconds: 150,
    hasCompletedVideo: true,
    quizScore: 100,
    quizAttemptCount: 1,
    isModuleValidated: true,
    lastActivityAt: '2026-02-25T11:00:00Z',
  },
  {
    _id: 'prog-002-mod-3',
    _type: 'progressionModule',
    eleve: { _type: 'reference', _ref: 'eleve-002' },
    module: { _type: 'reference', _ref: 'mod-3' },
    videoWatchTimeSeconds: 180,
    hasCompletedVideo: true,
    quizScore: 100,
    quizAttemptCount: 1,
    isModuleValidated: true,
    lastActivityAt: '2026-03-01T15:00:00Z',
  },
];

const INITIAL_LOGS: LogActivite[] = [
  {
    _id: 'log-001',
    _type: 'logActivite',
    actorUser: { _type: 'reference', _ref: 'user-super-admin' },
    actorName: 'Matoa Super Admin',
    actorRole: UserRole.SUPER_ADMIN,
    typeAction: ActionType.CREATION_AUTO_ECOLE,
    description: 'Super Admin a créé l\'auto-école "Auto-École Conduite Passion" (Code: MATOA-AE-001).',
    timestamp: '2026-01-10T10:00:00Z',
  },
  {
    _id: 'log-002',
    _type: 'logActivite',
    actorUser: { _type: 'reference', _ref: 'user-ae-001' },
    actorName: 'Directeur Conduite Passion',
    actorRole: UserRole.AUTO_ECOLE_ADMIN,
    autoEcole: { _type: 'reference', _ref: 'ae-001' },
    typeAction: ActionType.CREATION_ELEVE,
    description: 'Auto-école Conduite Passion a inscrit l\'élève Jean Dupont (AE001-ELV001).',
    timestamp: '2026-03-01T10:05:00Z',
  },
  {
    _id: 'log-003',
    _type: 'logActivite',
    actorUser: { _type: 'reference', _ref: 'user-eleve-1' },
    actorName: 'Jean Dupont',
    actorRole: UserRole.ELEVE,
    autoEcole: { _type: 'reference', _ref: 'ae-001' },
    typeAction: ActionType.QUIZ_PASSE,
    description: 'L\'élève Jean Dupont a réussi le Quiz du Module 1 avec un score de 100%.',
    timestamp: '2026-03-05T14:20:00Z',
  },
  {
    _id: 'log-004',
    _type: 'logActivite',
    actorUser: { _type: 'reference', _ref: 'user-eleve-2' },
    actorName: 'Marie Curie',
    actorRole: UserRole.ELEVE,
    autoEcole: { _type: 'reference', _ref: 'ae-001' },
    typeAction: ActionType.CERTIFICAT_GENERE,
    description: 'Certificat de fin de formation théorique généré pour l\'élève Marie Curie.',
    timestamp: '2026-03-01T15:05:00Z',
  },
];

const INITIAL_CERTIFICATS: Certificat[] = [
  {
    _id: 'cert-001',
    _type: 'certificat',
    eleve: { _type: 'reference', _ref: 'eleve-002' },
    autoEcole: { _type: 'reference', _ref: 'ae-001' },
    dateEmission: '2026-03-01T15:05:00Z',
    certificateCode: 'CERT-2026-MATOA-88392',
    status: CertificatStatus.GENERE,
    createdAt: '2026-03-01T15:05:00Z',
  },
];

const INITIAL_SETTINGS: GlobalSettings = {
  defaultMinWatchPercentage: 80,
  defaultMinQuizScore: 70,
  allowMultipleSessions: false,
  maintenanceMode: false,
};

// In-Memory Data Store class
class InMemorySanityStore {
  public autoEcoles: AutoEcole[] = [...INITIAL_AUTO_ECOLES];
  public users: User[] = [...INITIAL_USERS];
  public eleves: Eleve[] = [...INITIAL_ELEVES];
  public modules: ModuleFormation[] = [...INITIAL_MODULES];
  public quizzes: Quiz[] = [...INITIAL_QUIZZES];
  public progressions: ProgressionModule[] = [...INITIAL_PROGRESSIONS];
  public logs: LogActivite[] = [...INITIAL_LOGS];
  public certificats: Certificat[] = [...INITIAL_CERTIFICATS];
  public settings: GlobalSettings = { ...INITIAL_SETTINGS };

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
}

export const inMemoryStore = new InMemorySanityStore();
