import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

export const translations = {
  fr: {
    appName: 'Matoa',
    platformSubtitle: 'SaaS Auto-Écoles',
    logout: 'Déconnexion',
    roleSuperAdmin: 'Super Admin',
    roleAutoEcole: 'Admin Auto-École',
    roleEleve: 'Élève',
    themeLight: 'Mode Clair',
    themeDark: 'Mode Sombre',
    language: 'Langue',
    exportPdf: 'Exporter en PDF',
    exportExcel: 'Exporter en Excel (CSV)',
    exportStats: 'Exporter les Statistiques',
    exportStudentsList: 'Exporter la Liste des Élèves',
    searchPlaceholder: 'Rechercher un élève, email, code...',
    allSchools: 'Toutes les auto-écoles',
    filterBySchool: 'Filtrer par école',
    totalStudents: 'Total Élèves',
    activeStudents: 'Élèves Actifs',
    certifiedStudents: 'Élèves Certifiés (100%)',
    averageProgress: 'Progression Moyenne',
    completionRate: 'Taux de réussite',
    modulesCompletion: 'Réussite par Module',
    enrollmentTrends: 'Tendances d\'Inscriptions',
    statusBreakdown: 'Répartition des Statuts',
    schoolBranding: 'Personnalisation & Branding',
    bulkImportCsv: 'Import CSV Groupé',
    addStudent: 'Inscrire un Élève',
    actions: 'Actions',
    status: 'Statut',
    progress: 'Progression',
    codeUnique: 'Code Unique',
    name: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    startDate: 'Date Début',
    endDate: 'Date Fin',
    blocked: 'Bloqué',
    active: 'Actif',
    expired: 'Expiré',
    completed: 'Certifié',
    save: 'Enregistrer',
    cancel: 'Annuler',
    close: 'Fermer',
    quizTitle: 'Évaluation Quiz',
    startQuiz: 'Commencer le Quiz',
    minScoreRequired: 'Score minimum requis',
    downloadCertificate: 'Télécharger le Certificat',
    recentLogs: 'Journal des Activités',
    studentProfile: 'Mon Profil Élève',
    panneau: 'Panneau',
    learningTime: 'Temps de visionnage total',
    myStatistics: 'Mes Statistiques',
    quizAverage: 'Moyenne des Quiz',
    completionProgress: 'Progression globale',
    moduleProgressDetails: 'Détail par Module de Formation',
    certifiedBadge: 'Certificat Obtenu',
    notStarted: 'Non commencé',
    filterStatusAll: 'Tous les statuts',
    filterStatusInProgress: 'En cours (1-99%)',
    filterStatusCompleted: 'Terminé / Certifié (100%)',
    filterStatusFailed: 'Non commencé (0%)',
    filterStatusExpired: 'Expiré',
    filterStatusBlocked: 'Suspendu / Bloqué',
    advancedSearch: 'Recherche avancée',
  },
  en: {
    appName: 'Matoa',
    platformSubtitle: 'Driving School SaaS',
    logout: 'Log Out',
    roleSuperAdmin: 'Super Admin',
    roleAutoEcole: 'Driving School Admin',
    roleEleve: 'Student',
    themeLight: 'Light Mode',
    themeDark: 'Dark Mode',
    language: 'Language',
    exportPdf: 'Export to PDF',
    exportExcel: 'Export to Excel (CSV)',
    exportStats: 'Export Statistics',
    exportStudentsList: 'Export Students List',
    searchPlaceholder: 'Search student, email, code...',
    allSchools: 'All driving schools',
    filterBySchool: 'Filter by school',
    totalStudents: 'Total Students',
    activeStudents: 'Active Students',
    certifiedStudents: 'Certified Students (100%)',
    averageProgress: 'Average Progress',
    completionRate: 'Completion Rate',
    modulesCompletion: 'Completion by Module',
    enrollmentTrends: 'Enrollment Trends',
    statusBreakdown: 'Status Breakdown',
    schoolBranding: 'Customization & Branding',
    bulkImportCsv: 'CSV Bulk Import',
    addStudent: 'Register Student',
    actions: 'Actions',
    status: 'Status',
    progress: 'Progress',
    codeUnique: 'Unique Code',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    startDate: 'Start Date',
    endDate: 'End Date',
    blocked: 'Blocked',
    active: 'Active',
    expired: 'Expired',
    completed: 'Certified',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    quizTitle: 'Quiz Evaluation',
    startQuiz: 'Start Quiz',
    minScoreRequired: 'Minimum score required',
    downloadCertificate: 'Download Certificate',
    recentLogs: 'Activity Audit Log',
    studentProfile: 'My Student Profile',
    learningTime: 'Total Watch / Study Time',
    myStatistics: 'My Performance Statistics',
    quizAverage: 'Quiz Average Score',
    completionProgress: 'Overall Progression',
    moduleProgressDetails: 'Module Progression Breakdown',
    certifiedBadge: 'Certificate Earned',
    notStarted: 'Not Started',
    filterStatusAll: 'All Statuses',
    filterStatusInProgress: 'In Progress (1-99%)',
    filterStatusCompleted: 'Completed / Certified (100%)',
    filterStatusFailed: 'Not Started (0%)',
    filterStatusExpired: 'Expired',
    filterStatusBlocked: 'Suspended / Blocked',
    advancedSearch: 'Advanced Search',
  },
};

type TranslationKey = keyof typeof translations.fr;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('matoa_lang');
    return (saved === 'en' || saved === 'fr') ? saved : 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('matoa_lang', lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations['fr'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
