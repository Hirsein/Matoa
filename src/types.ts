/**
 * Types & Schemas definition for Matoa SaaS - Multi-tenant Auto-École Platform
 */

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  AUTO_ECOLE_ADMIN = 'AUTO_ECOLE_ADMIN',
  ELEVE = 'ELEVE',
}

export interface User {
  _id: string;
  _type: 'user';
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  passwordHash?: string;
  autoEcole?: {
    _type: 'reference';
    _ref: string;
  } | AutoEcole; // Reference or expanded object
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AutoEcoleTheme {
  primaryColor: string; // Hex color code e.g. #2563eb
  secondaryColor: string; // Hex color code e.g. #059669
  accentColor?: string;
}

export interface AutoEcole {
  _id: string;
  _type: 'autoEcole';
  name: string;
  adresse: string;
  contact: {
    phone: string;
    email: string;
  };
  codeAutoEcoleUnique: string; // e.g. MATOA-AE-001
  logo?: string; // Image URL
  couleursTheme: AutoEcoleTheme;
  slogan?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Eleve {
  _id: string;
  _type: 'eleve';
  user: {
    _type: 'reference';
    _ref: string;
  } | User;
  autoEcole: {
    _type: 'reference';
    _ref: string;
  } | AutoEcole;
  codeEleveUnique: string; // Unique for driving school e.g. AE001-ELV045
  dateDebutFormation: string; // YYYY-MM-DD
  dateFinFormation: string; // YYYY-MM-DD
  formationActive: boolean;
  progressionGlobal: number; // 0 - 100
  isBlocked: boolean; // Manually blocked or automatic expiry
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  _key?: string;
  questionText: string;
  image?: string; // Optional image URL (e.g. road sign)
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

export interface Quiz {
  _id: string;
  _type: 'quiz';
  title?: string;
  module?: {
    _type: 'reference';
    _ref: string;
  };
  questions: QuizQuestion[];
  timerSeconds: number; // e.g. 900 for 15 minutes
  scoreMinimum?: number; // e.g. 70 (%)
  createdAt: string;
  updatedAt: string;
}

export interface Lecon {
  _id: string;
  _type: 'lecon';
  title: string;
  ordre: number; // 1, 2, 3...
  description: string; // Structured text description/explanations
  videoUrl: string;
  durationSeconds: number;
  tempsMinimumVisionnageSeconds: number;
  hasInlineQuiz: boolean;
  inlineQuiz?: QuizQuestion[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ModuleFormation {
  _id: string;
  _type: 'moduleFormation';
  code: string; // e.g. "MOD-001"
  title: string;
  summary: string; // 3-5 sentences summary of module goals
  learningObjectives: string[]; // 3-6 clear objectives
  ordre: number; // Position in sequence
  videoUrl: string; // Default video or fallback
  durationSeconds: number; // Total length of video in seconds
  tempsMinimumVisionnage: number; // Min required seconds to watch e.g. 80%
  scoreMinimumQuiz: number; // e.g. 70 (%)
  isActive: boolean;
  lecons: Lecon[]; // Array of lessons belonging to this module
  quiz?: Quiz;
  createdAt: string;
  updatedAt: string;
}

export interface ProgressionLecon {
  leconId: string;
  videoWatchTimeSeconds: number;
  hasCompletedVideo: boolean;
  inlineQuizScore?: number;
  isInlineQuizPassed?: boolean;
  isCompleted: boolean;
}

export interface ProgressionModule {
  _id: string;
  _type: 'progressionModule';
  eleve: {
    _type: 'reference';
    _ref: string;
  };
  module: {
    _type: 'reference';
    _ref: string;
  };
  videoWatchTimeSeconds: number;
  hasCompletedVideo: boolean;
  leconProgressions?: Record<string, ProgressionLecon>; // Keyed by leconId
  quizScore: number; // Percentage 0 - 100
  quizAttemptCount: number;
  isModuleValidated: boolean;
  lastActivityAt: string;
}

export enum ActionType {
  CREATION_AUTO_ECOLE = 'CREATION_AUTO_ECOLE',
  MODIFICATION_AUTO_ECOLE = 'MODIFICATION_AUTO_ECOLE',
  SUPPRESSION_AUTO_ECOLE = 'SUPPRESSION_AUTO_ECOLE',
  SUSPENSION_AUTO_ECOLE = 'SUSPENSION_AUTO_ECOLE',
  ACTIVATION_AUTO_ECOLE = 'ACTIVATION_AUTO_ECOLE',
  CREATION_ELEVE = 'CREATION_ELEVE',
  MODIFICATION_ELEVE = 'MODIFICATION_ELEVE',
  SUSPENSION_ELEVE = 'SUSPENSION_ELEVE',
  CONNEXION_UTILISATEUR = 'CONNEXION_UTILISATEUR',
  DEBUT_MODULE = 'DEBUT_MODULE',
  FIN_MODULE = 'FIN_MODULE',
  QUIZ_PASSE = 'QUIZ_PASSE',
  CERTIFICAT_GENERE = 'CERTIFICAT_GENERE',
  CERTIFICAT_TELECHARGE = 'CERTIFICAT_TELECHARGE',
  MODIFICATION_BRANDING = 'MODIFICATION_BRANDING',
  MODIFICATION_MODULE = 'MODIFICATION_MODULE',
}

export interface LogActivite {
  _id: string;
  _type: 'logActivite';
  actorUser: {
    _type: 'reference';
    _ref: string;
  } | User;
  actorName?: string;
  actorRole: UserRole;
  autoEcole?: {
    _type: 'reference';
    _ref: string;
  } | AutoEcole;
  typeAction: ActionType;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export enum CertificatStatus {
  EN_COURS = 'EN_COURS',
  GENERE = 'GENERE',
  TELECHARGE = 'TELECHARGE',
}

export interface Certificat {
  _id: string;
  _type: 'certificat';
  eleve: {
    _type: 'reference';
    _ref: string;
  } | Eleve;
  autoEcole: {
    _type: 'reference';
    _ref: string;
  } | AutoEcole;
  dateEmission: string;
  urlCertificat?: string;
  certificateCode: string; // e.g. CERT-2026-MATOA-88392
  status: CertificatStatus;
  createdAt: string;
}

export interface GlobalSettings {
  defaultMinWatchPercentage: number; // e.g. 80
  defaultMinQuizScore: number; // e.g. 70
  allowMultipleSessions: boolean;
  maintenanceMode: boolean;
}

export interface AuthSession {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    autoEcoleId?: string;
    autoEcoleName?: string;
    codeEleveUnique?: string;
  };
  autoEcole?: AutoEcole;
  token: string;
}
