import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { exportStudentsToCSV, exportDashboardStatsToPDF, exportLogsToCSV, exportLogsToJSON } from '../lib/exportService';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import {
  AutoEcole,
  ModuleFormation,
  ProgrammePermis,
  Quiz,
  LogActivite as LogType,
  LogActivite,
  UserRole,
  ActionType,
} from '../types';
import {
  School,
  Users,
  BookOpen,
  History,
  Plus,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Video,
  Clock,
  HelpCircle,
  TrendingUp,
  Search,
  Filter,
  Edit2,
  Trash2,
  Lock,
  Sparkles,
  Download,
  FileSpreadsheet,
  FileText,
  Award,
  Layers,
  Car,
  RefreshCw,
} from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  const { token } = useAuth();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'overview' | 'schools' | 'programmes' | 'modules' | 'logs'>('overview');

  // Programmes de Permis
  const [programmes, setProgrammes] = useState<any[]>([]);
  const [showProgrammeModal, setShowProgrammeModal] = useState(false);
  const [editingProgramme, setEditingProgramme] = useState<any | null>(null);
  const [progTypePermis, setProgTypePermis] = useState('B');
  const [progTitre, setProgTitre] = useState('');
  const [progDescription, setProgDescription] = useState('');
  const [progModuleIds, setProgModuleIds] = useState<string[]>([]);


  // Stats
  const [stats, setStats] = useState<any>(null);

  // Auto-écoles
  const [schools, setSchools] = useState<AutoEcole[]>([]);
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSchoolAddress, setNewSchoolAddress] = useState('');
  const [newSchoolEmail, setNewSchoolEmail] = useState('');
  const [newSchoolPhone, setNewSchoolPhone] = useState('');
  const [newSchoolPassword, setNewSchoolPassword] = useState('password123');
  const [newSchoolPrimaryColor, setNewSchoolPrimaryColor] = useState('#2563eb');
  const [newSchoolSecondaryColor, setNewSchoolSecondaryColor] = useState('#059669');
  const [newSchoolSlogan, setNewSchoolSlogan] = useState('');

  // Edit Auto-école state
  const [editingSchool, setEditingSchool] = useState<AutoEcole | null>(null);
  const [editSchoolName, setEditSchoolName] = useState('');
  const [editSchoolAddress, setEditSchoolAddress] = useState('');
  const [editSchoolPhone, setEditSchoolPhone] = useState('');
  const [editSchoolEmail, setEditSchoolEmail] = useState('');
  const [editSchoolSlogan, setEditSchoolSlogan] = useState('');
  const [editSchoolLogo, setEditSchoolLogo] = useState('');
  const [editSchoolPrimaryColor, setEditSchoolPrimaryColor] = useState('#2563eb');
  const [editSchoolSecondaryColor, setEditSchoolSecondaryColor] = useState('#059669');

  // Delete Auto-école state
  const [deletingSchool, setDeletingSchool] = useState<AutoEcole | null>(null);

  // Modules & Quizzes
  const [modules, setModules] = useState<ModuleFormation[]>([]);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [moduleVideoUrl, setModuleVideoUrl] = useState('');
  const [moduleDuration, setModuleDuration] = useState(180);
  const [moduleMinWatch, setModuleMinWatch] = useState(144);
  const [moduleMinScore, setModuleMinScore] = useState(70);

  // Quiz Editor state
  const [selectedModuleForQuiz, setSelectedModuleForQuiz] = useState<ModuleFormation | null>(null);
  const [quizTimer, setQuizTimer] = useState(600);
  const [quizQuestions, setQuizQuestions] = useState<
    Array<{
      questionText: string;
      options: string[];
      correctOptionIndex: number;
      explanation?: string;
    }>
  >([]);

  // Lesson Manager state
  const [selectedModuleForLessons, setSelectedModuleForLessons] = useState<ModuleFormation | null>(null);
  const [moduleLessons, setModuleLessons] = useState<any[]>([]);

  // Logs
  const [logs, setLogs] = useState<LogActivite[]>([]);
  const [logSearch, setLogSearch] = useState('');

  // Notifications / feedback
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch initial data
  useEffect(() => {
    fetchStats();
    fetchSchools();
    fetchProgrammes();
    fetchModules();
    fetchLogs();
  }, [token]);

  const fetchProgrammes = async () => {
    try {
      const res = await fetch('/api/programmes-permis', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setProgrammes(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenNewProgramme = () => {
    setEditingProgramme(null);
    setProgTypePermis('B');
    setProgTitre('Programme complet Permis B – voiture');
    setProgDescription('Formation théorique officielle de la conduite automobile.');
    setProgModuleIds(modules.map((m) => m._id));
    setShowProgrammeModal(true);
  };

  const handleOpenEditProgramme = (prog: any) => {
    setEditingProgramme(prog);
    setProgTypePermis(prog.typePermis || 'B');
    setProgTitre(prog.titreProgramme || '');
    setProgDescription(prog.descriptionProgramme || '');
    const mIds = (prog.modules || []).map((m: any) => (typeof m === 'string' ? m : m._ref || m._id));
    setProgModuleIds(mIds);
    setShowProgrammeModal(true);
  };

  const handleSaveProgramme = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(null);

    try {
      const url = editingProgramme ? `/api/programmes-permis/${editingProgramme._id}` : '/api/programmes-permis';
      const method = editingProgramme ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          typePermis: progTypePermis,
          titreProgramme: progTitre,
          descriptionProgramme: progDescription,
          moduleIds: progModuleIds,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de l\'enregistrement du programme.');

      setFeedbackMsg({
        type: 'success',
        text: `Programme Permis ${progTypePermis} enregistré avec succès !`,
      });
      setShowProgrammeModal(false);
      fetchProgrammes();
      fetchLogs();
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err.message });
    }
  };

  const handleDeleteProgramme = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce programme de permis ?')) return;

    try {
      const res = await fetch(`/api/programmes-permis/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setFeedbackMsg({ type: 'success', text: 'Programme supprimé avec succès.' });
        fetchProgrammes();
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setStats(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSchools = async () => {
    try {
      const res = await fetch('/api/auto-ecoles', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setSchools(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchModules = async () => {
    try {
      const res = await fetch('/api/modules', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setModules(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const handleSeedPermisB = async () => {
    if (!window.confirm('Voulez-vous réinitialiser et injecter le programme complet Permis B (10 modules avec leçons, vidéos YouTube FR, mini-quizzes 5Q et quiz finaux 10Q) ?')) {
      return;
    }
    try {
      const res = await fetch('/api/modules/seed-permis-b', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        alert(data.message || 'Programme Permis B injecté avec succès !');
        fetchModules();
        fetchProgrammes();
      } else {
        alert('Erreur lors de l\'injection du programme Permis B.');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur réseau lors de l\'injection du Permis B.');
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setLogs(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  // Create new Driving School
  const handleCreateSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(null);

    try {
      const res = await fetch('/api/auto-ecoles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newSchoolName,
          adresse: newSchoolAddress,
          contact: { phone: newSchoolPhone, email: newSchoolEmail },
          slogan: newSchoolSlogan,
          primaryColor: newSchoolPrimaryColor,
          secondaryColor: newSchoolSecondaryColor,
          adminEmail: newSchoolEmail,
          adminPassword: newSchoolPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la création.');

      setFeedbackMsg({ type: 'success', text: `Auto-école ${newSchoolName} créée avec succès !` });
      setShowSchoolModal(false);
      setNewSchoolName('');
      setNewSchoolEmail('');
      setNewSchoolAddress('');
      setNewSchoolPhone('');
      fetchSchools();
      fetchStats();
      fetchLogs();
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err.message });
    }
  };

  // Toggle school active/suspended status
  const handleToggleSchoolStatus = async (school: AutoEcole) => {
    try {
      const res = await fetch(`/api/auto-ecoles/${school._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isActive: !school.isActive,
        }),
      });

      if (res.ok) {
        setFeedbackMsg({
          type: 'success',
          text: `Statut de ${school.name} mis à jour (${!school.isActive ? 'Actif' : 'Suspendu'}).`,
        });
        fetchSchools();
        fetchStats();
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Open edit modal for auto-école
  const handleOpenEditSchool = (school: AutoEcole) => {
    setEditingSchool(school);
    setEditSchoolName(school.name);
    setEditSchoolAddress(school.adresse || '');
    setEditSchoolPhone(school.contact?.phone || '');
    setEditSchoolEmail(school.contact?.email || '');
    setEditSchoolSlogan(school.slogan || '');
    setEditSchoolLogo(school.logo || '');
    setEditSchoolPrimaryColor(school.couleursTheme?.primaryColor || '#2563eb');
    setEditSchoolSecondaryColor(school.couleursTheme?.secondaryColor || '#059669');
  };

  // Submit edit auto-école update
  const handleUpdateSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSchool) return;

    try {
      const res = await fetch(`/api/auto-ecoles/${editingSchool._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editSchoolName,
          adresse: editSchoolAddress,
          contact: { phone: editSchoolPhone, email: editSchoolEmail },
          slogan: editSchoolSlogan,
          logo: editSchoolLogo,
          couleursTheme: {
            primaryColor: editSchoolPrimaryColor,
            secondaryColor: editSchoolSecondaryColor,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la mise à jour de l\'auto-école.');

      setFeedbackMsg({ type: 'success', text: `Auto-école ${editSchoolName} mise à jour avec succès !` });
      setEditingSchool(null);
      fetchSchools();
      fetchStats();
      fetchLogs();
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err.message });
    }
  };

  // Delete auto-école
  const handleDeleteSchool = async () => {
    if (!deletingSchool) return;

    try {
      const res = await fetch(`/api/auto-ecoles/${deletingSchool._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la suppression de l\'auto-école.');

      setFeedbackMsg({ type: 'success', text: data.message });
      setDeletingSchool(null);
      fetchSchools();
      fetchStats();
      fetchLogs();
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err.message });
    }
  };

  // Create new Module
  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/modules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: moduleTitle,
          description: moduleDescription,
          videoUrl: moduleVideoUrl,
          durationSeconds: Number(moduleDuration),
          tempsMinimumVisionnage: Number(moduleMinWatch),
          scoreMinimumQuiz: Number(moduleMinScore),
        }),
      });

      if (res.ok) {
        setFeedbackMsg({ type: 'success', text: 'Nouveau module de formation théorique ajouté !' });
        setShowModuleModal(false);
        setModuleTitle('');
        setModuleDescription('');
        setModuleVideoUrl('');
        fetchModules();
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Open Lesson Manager Modal
  const handleOpenLessonEditor = (mod: ModuleFormation) => {
    setSelectedModuleForLessons(mod);
    setModuleLessons(mod.lecons ? JSON.parse(JSON.stringify(mod.lecons)) : []);
  };

  // Save Lessons
  const handleSaveLessons = async () => {
    if (!selectedModuleForLessons) return;

    try {
      const res = await fetch(`/api/modules/${selectedModuleForLessons._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lecons: moduleLessons,
        }),
      });

      if (res.ok) {
        setFeedbackMsg({
          type: 'success',
          text: `Les leçons et mini-quiz (5Q) du module "${selectedModuleForLessons.title}" ont été enregistrés avec succès !`,
        });
        setSelectedModuleForLessons(null);
        fetchModules();
        fetchLogs();
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Erreur lors de l\'enregistrement des leçons.');
      }
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err.message });
    }
  };

  // Helper to generate 5 pre-filled mini-quiz questions for a lesson
  const generate5MiniQuizQuestions = (lessonTitle: string) => [
    {
      questionText: `1. Concernant [${lessonTitle}], quelle est la règle fondamentale ?`,
      options: ['Option A (Correcte)', 'Option B', 'Option C', 'Option D'],
      correctOptionIndex: 0,
      explanation: 'Explication pédagogique de la règle.',
    },
    {
      questionText: `2. Quel danger particulier devez-vous anticiper sur ce sujet ?`,
      options: ['Risque faible', 'Perte d\'adhérence ou masquage visuel (Correct)', 'Aucun risque', 'Vitesse excessive uniquement'],
      correctOptionIndex: 1,
      explanation: 'Anticiper les angles morts et la vitesse adaptée.',
    },
    {
      questionText: `3. Quelle est la distance ou consigne de sécurité à respecter ?`,
      options: ['5 mètres', '2 secondes d\'intervalle au minimum (Correct)', 'Pas de distance', '100 mètres'],
      correctOptionIndex: 1,
      explanation: 'L\'intervalle de sécurité légal est d\'au moins 2 secondes.',
    },
    {
      questionText: `4. Que devez-vous faire en priorité avant d\'effectuer la manœuvre ?`,
      options: ['Klaxonner', 'Contrôler rétroviseurs et angle mort + clignotant (Correct)', 'Accélérer', 'Freiner brusquement'],
      correctOptionIndex: 1,
      explanation: 'Toujours vérifier les rétroviseurs et l\'angle mort avant toute manœuvre.',
    },
    {
      questionText: `5. Quelle sanction s\'applique en cas d\'infraction à cette règle ?`,
      options: ['Avertissement verbal', 'Amende forfaire et retrait de points (Correct)', 'Aucune sanction', 'Confiscation immédiate du véhicule'],
      correctOptionIndex: 1,
      explanation: 'Le non-respect de la réglementation entraîne une amende et retrait de points.',
    },
  ];

  // Helper to prefill 10 questions for final module quiz
  const generate10ModuleQuizQuestions = (moduleTitle: string) => Array.from({ length: 10 }, (_, i) => ({
    questionText: `${i + 1}. [${moduleTitle}] Question ${i + 1} du Quiz de Fin de Module :`,
    options: [
      `Option ${i + 1}.1 (Réponse exacte)`,
      `Option ${i + 1}.2`,
      `Option ${i + 1}.3`,
      `Option ${i + 1}.4`,
    ],
    correctOptionIndex: 0,
    explanation: `Explication détaillée de la réponse ${i + 1} du module ${moduleTitle}.`,
  }));

  // Open Quiz Modal
  const handleOpenQuizEditor = (mod: ModuleFormation) => {
    setSelectedModuleForQuiz(mod);
    if (mod.quiz && mod.quiz.questions && mod.quiz.questions.length > 0) {
      setQuizTimer(mod.quiz.timerSeconds || 600);
      setQuizQuestions(mod.quiz.questions);
    } else {
      setQuizTimer(600);
      setQuizQuestions(generate10ModuleQuizQuestions(mod.title));
    }
  };

  // Save Quiz
  const handleSaveQuiz = async () => {
    if (!selectedModuleForQuiz) return;

    try {
      const res = await fetch('/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          moduleId: selectedModuleForQuiz._id,
          timerSeconds: quizTimer,
          questions: quizQuestions,
        }),
      });

      if (res.ok) {
        setFeedbackMsg({ type: 'success', text: 'Quiz enregistré avec succès pour ce module.' });
        setSelectedModuleForQuiz(null);
        fetchModules();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Top Banner Header */}
      <div className="bg-white border-b border-slate-200 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-purple-50 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full border border-purple-200 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('platformAdminBadge')}</span>
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
              {t('superAdminDashboardTitle')}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {t('superAdminDashboardSubtitle')}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => exportDashboardStatsToPDF(t('globalNetworkReport'), stats, [])}
              className="inline-flex items-center space-x-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs transition"
              title={t('exportPdf')}
            >
              <Download className="w-4 h-4 text-red-500" />
              <span>{t('exportPdfReport')}</span>
            </button>

            <button
              onClick={() => setShowSchoolModal(true)}
              className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>{t('createSchoolBtn')}</span>
            </button>
            <button
              onClick={() => setShowModuleModal(true)}
              className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>{t('createModuleBtn')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        {/* Feedback Alert */}
        {feedbackMsg && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs font-bold flex items-center justify-between border shadow-xs ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <span>{feedbackMsg.text}</span>
            <button onClick={() => setFeedbackMsg(null)} className="text-slate-400 hover:text-slate-700">
              ✕
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-8 space-x-1 sm:space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'overview'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{t('tabOverview')}</span>
          </button>

          <button
            onClick={() => setActiveTab('schools')}
            className={`py-3 px-4 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'schools'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <School className="w-4 h-4" />
            <span>{t('tabSchoolsFleet')} ({schools.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('programmes')}
            className={`py-3 px-4 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'programmes'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t('tabLicencePrograms')} ({programmes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('modules')}
            className={`py-3 px-4 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'modules'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t('tabModulesAndQuizzes')} ({modules.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`py-3 px-4 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'logs'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <History className="w-4 h-4" />
            <span>{t('tabActivityLogs')}</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('totalSchools')}</p>
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                    <School className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mt-2">{stats?.totalSchools || 0}</h3>
                <p className="text-[11px] text-emerald-600 mt-1 font-bold">
                  {stats?.activeSchools || 0} {t('activeSchoolsCount')}
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('totalStudentsRegistered')}</p>
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mt-2">{stats?.totalStudents || 0}</h3>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">{t('acrossAllSchools')}</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('averageProgress')}</p>
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mt-2">{stats?.avgProgress || 0}%</h3>
                <p className="text-[11px] text-purple-600 mt-1 font-bold">{t('studentsCodeProgress')}</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('certificatesEarned')}</p>
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mt-2">{stats?.completedStudents || 0}</h3>
                <p className="text-[11px] text-amber-600 mt-1 font-bold">{t('fullCompletedTrainings')}</p>
              </div>
            </div>

            {/* RECHARTS ANALYTICS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart 1: Enrollment & Certification Trends */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                      {t('enrollmentAndCertTrends')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('monthlyNetworkEvolution')}</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900/50">
                    SaaS Analytics
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats?.enrollmentTrends || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorInsc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={isDark ? 0.9 : 0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorCert" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={isDark ? 0.9 : 0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#64748b' }} stroke={isDark ? '#475569' : '#cbd5e1'} />
                      <YAxis tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#64748b' }} stroke={isDark ? '#475569' : '#cbd5e1'} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? '#0f172a' : '#1e293b',
                          borderColor: isDark ? '#334155' : '#0f172a',
                          borderRadius: '12px',
                          color: '#f8fafc',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px', color: isDark ? '#cbd5e1' : '#475569' }} />
                      <Area
                        type="monotone"
                        dataKey="inscriptions"
                        name={t('inscriptionsLegend')}
                        stroke={isDark ? '#60a5fa' : '#2563eb'}
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorInsc)"
                        isAnimationActive={true}
                        animationDuration={1200}
                      />
                      <Area
                        type="monotone"
                        dataKey="certifications"
                        name={t('certificationsLegend')}
                        stroke={isDark ? '#34d399' : '#10b981'}
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorCert)"
                        isAnimationActive={true}
                        animationDuration={1200}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Chart 2: Student Progression Distribution */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs"
              >
                <div className="mb-4">
                  <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">{t('progressBreakdown')}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('progressDistributionRanges')}</p>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats?.progressionDistribution || []}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="count"
                        nameKey="range"
                        isAnimationActive={true}
                        animationDuration={1200}
                      >
                        {(isDark
                          ? ['#3b82f6', '#06b6d4', '#a855f7', '#f59e0b', '#10b981']
                          : ['#2563eb', '#0891b2', '#7c3aed', '#d97706', '#059669']
                        ).map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} stroke={isDark ? '#0f172a' : '#ffffff'} strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? '#0f172a' : '#1e293b',
                          borderColor: isDark ? '#334155' : '#0f172a',
                          borderRadius: '12px',
                          color: '#f8fafc',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', color: isDark ? '#cbd5e1' : '#475569' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Chart 3: Module Completion Rates */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                      {t('moduleSuccessRate')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('moduleSuccessRateSub')}</p>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats?.modulesCompletion || []} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                      <XAxis dataKey="moduleTitle" tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#64748b' }} stroke={isDark ? '#475569' : '#cbd5e1'} />
                      <YAxis tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#64748b' }} stroke={isDark ? '#475569' : '#cbd5e1'} unit="%" domain={[0, 100]} />
                      <Tooltip
                        formatter={(value: any) => [`${value}%`, t('successRate')]}
                        contentStyle={{
                          backgroundColor: isDark ? '#0f172a' : '#1e293b',
                          borderColor: isDark ? '#334155' : '#0f172a',
                          borderRadius: '12px',
                          color: '#f8fafc',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      />
                      <Bar
                        dataKey="completionRate"
                        name={t('successRate')}
                        fill={isDark ? '#a855f7' : '#8b5cf6'}
                        radius={[8, 8, 0, 0]}
                        isAnimationActive={true}
                        animationDuration={1200}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="text-base font-black text-slate-900 mb-4 tracking-tight">
                {t('recentPartnerSchools')}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50/80 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <tr>
                      <th className="p-3 rounded-l-lg">{t('schoolNameTh')}</th>
                      <th className="p-3">{t('schoolCodeTh')}</th>
                      <th className="p-3">{t('contactTh')}</th>
                      <th className="p-3">{t('studentsEnrolledTh')}</th>
                      <th className="p-3">{t('status')}</th>
                      <th className="p-3 rounded-r-lg text-right">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {schools.map((school) => (
                      <tr key={school._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-bold text-slate-900">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: school.couleursTheme?.primaryColor || '#2563eb' }}
                            />
                            <span>{school.name}</span>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-blue-600 font-bold">{school.codeAutoEcoleUnique}</td>
                        <td className="p-3 text-slate-600 font-medium">{school.contact?.email}</td>
                        <td className="p-3 font-bold text-slate-800">{(school as any).studentCount || 0}</td>
                        <td className="p-3">
                          {school.isActive ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {t('active')}
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                              {t('suspended')}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleToggleSchoolStatus(school)}
                            className="text-xs text-slate-600 hover:text-slate-900 font-bold px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition border border-slate-200"
                          >
                            {school.isActive ? t('suspendBtn') : t('activateBtn')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PARC AUTO-ÉCOLES */}
        {activeTab === 'schools' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">{t('manageSchoolsFleetTitle')}</h2>
              <button
                onClick={() => setShowSchoolModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>{t('newSchoolBtn')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schools.map((school) => (
                <div
                  key={school._id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-xs"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-2"
                    style={{
                      background: `linear-gradient(90deg, ${school.couleursTheme?.primaryColor || '#2563eb'}, ${
                        school.couleursTheme?.secondaryColor || '#059669'
                      })`,
                    }}
                  />

                  <div className="flex items-start justify-between mt-2">
                    <div>
                      <span className="font-mono text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {school.codeAutoEcoleUnique}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-1">{school.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{school.adresse}</p>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        school.isActive
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {school.isActive ? t('operational') : t('suspended')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 italic my-3 border-l-2 border-slate-300 pl-3">
                    "{school.slogan || t('noSloganFallback')}"
                  </p>

                  <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p>
                      <strong className="text-slate-800">{t('adminContactEmail')}</strong> {school.contact?.email}
                    </p>
                    <p>
                      <strong className="text-slate-800">{t('phoneLabel')}</strong> {school.contact?.phone || t('notProvided')}
                    </p>
                    <p>
                      <strong className="text-slate-800">{t('studentsCountLabel')}</strong> {(school as any).studentCount || 0}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                      <span>{t('themeLabel')}</span>
                      <span
                        className="w-4 h-4 rounded-full border border-slate-300"
                        style={{ backgroundColor: school.couleursTheme?.primaryColor }}
                        title={t('primaryColor')}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-slate-300"
                        style={{ backgroundColor: school.couleursTheme?.secondaryColor }}
                        title={t('secondaryColor')}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenEditSchool(school)}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl transition bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center space-x-1"
                        title={t('edit')}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>{t('edit')}</span>
                      </button>

                      <button
                        onClick={() => setDeletingSchool(school)}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl transition bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 flex items-center space-x-1"
                        title={t('delete')}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t('delete')}</span>
                      </button>

                      <button
                        onClick={() => handleToggleSchoolStatus(school)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                          school.isActive
                            ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                        }`}
                      >
                        {school.isActive ? t('suspendBtn') : t('activateBtn')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2.5: PROGRAMMES DE PERMIS */}
        {activeTab === 'programmes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  {t('licenceProgramsTitle')}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {t('licenceProgramsSubtitle')}
                </p>
              </div>

              <button
                onClick={handleOpenNewProgramme}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>{t('newProgramBtn')}</span>
              </button>
            </div>

            {programmes.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
                <Layers className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                <p className="text-sm font-bold text-slate-700">{t('noProgramDefined')}</p>
                <p className="text-xs mt-1">
                  {t('noProgramDefinedHelp')}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programmes.map((prog) => {
                  const permitColors: Record<string, string> = {
                    A: 'bg-orange-100 text-orange-800 border-orange-300',
                    B: 'bg-blue-100 text-blue-800 border-blue-300',
                    C: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    D: 'bg-purple-100 text-purple-800 border-purple-300',
                  };
                  const badgeColor = permitColors[prog.typePermis] || 'bg-slate-100 text-slate-800 border-slate-300';

                  return (
                    <div
                      key={prog._id}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${badgeColor} flex items-center space-x-1`}
                          >
                            <Car className="w-3.5 h-3.5 mr-1 inline" />
                            {t('permisPrefix')} {prog.typePermis}
                          </span>
                          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                            {prog.moduleCount || (prog.modules?.length || 0)} Module(s)
                          </span>
                        </div>

                        <h3 className="text-base font-black text-slate-900">{prog.titreProgramme}</h3>
                        <p className="text-xs text-slate-600 mt-1">{prog.descriptionProgramme}</p>

                        <div className="mt-4 pt-3 border-t border-slate-100">
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                            {t('modulesIncludedInProgram')}
                          </p>
                          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                            {prog.moduleDetails && prog.moduleDetails.length > 0 ? (
                              prog.moduleDetails.map((m: any) => (
                                <div
                                  key={m._id}
                                  className="flex items-center text-xs text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 font-medium"
                                >
                                  <BookOpen className="w-3.5 h-3.5 text-blue-600 mr-2 shrink-0" />
                                  <span className="truncate">
                                    M{m.ordre} : {m.title}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <p className="text-xs text-slate-400 italic">{t('allActiveModules')}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEditProgramme(prog)}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl transition bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center space-x-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>{t('edit')}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProgramme(prog._id)}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl transition bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 flex items-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{t('delete')}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MODULES & QUIZZES */}
        {activeTab === 'modules' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">{t('theoreticalModulesTitle')}</h2>
                <p className="text-xs text-slate-500 font-medium">
                  {t('theoreticalModulesSubtitle')}
                </p>
              </div>

              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <button
                  onClick={handleSeedPermisB}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center space-x-1.5"
                  title={t('resetPermisBBtn')}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{t('resetPermisBBtn')}</span>
                </button>

                <button
                  onClick={() => setShowModuleModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('newModuleBtn')}</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {modules.map((mod) => {
                const lessonCount = mod.lecons?.length || 0;
                const quizQuestionCount = mod.quiz?.questions?.length || 0;

                return (
                  <div
                    key={mod._id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <span className="bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-1 rounded-lg border border-blue-200">
                          {t('orderPrefix')} {mod.ordre}
                        </span>
                        {mod.typePermis && (
                          <span className="bg-purple-50 text-purple-700 font-bold text-xs px-2 py-0.5 rounded-md border border-purple-200">
                            {t('permisPrefix')} {mod.typePermis}
                          </span>
                        )}
                        <h3 className="text-base font-bold text-slate-900">{mod.title}</h3>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2">{mod.summary || mod.description}</p>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-700 font-medium pt-1">
                        <span className="flex items-center space-x-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                          <span className="font-bold">{lessonCount} {t('lessonsChip')}</span>
                        </span>

                        <span className="flex items-center space-x-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                          <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
                          <span className="font-bold">{t('quizEndChip')} {quizQuestionCount} / 10 Qs</span>
                        </span>

                        <span className="flex items-center space-x-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t('minScoreChip')} {mod.scoreMinimumQuiz}%</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenLessonEditor(mod)}
                        className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold rounded-xl transition flex items-center space-x-1.5"
                      >
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span>{t('manageLessonsAndMiniQuiz')}</span>
                      </button>

                      <button
                        onClick={() => handleOpenQuizEditor(mod)}
                        className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold rounded-xl transition flex items-center space-x-1.5"
                      >
                        <HelpCircle className="w-4 h-4 text-purple-600" />
                        <span>{t('finalModuleQuizAction')} ({quizQuestionCount}/10 Qs)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: LOGS D'ACTIVITÉ */}
        {activeTab === 'logs' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">{t('globalLogsTitle')}</h2>

              <div className="flex items-center space-x-2 flex-wrap">
                <div className="relative max-w-xs">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder={t('searchLogsPlaceholder')}
                    value={logSearch}
                    onChange={(e) => setLogSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                  />
                </div>

                <button
                  onClick={() => exportLogsToCSV(logs, 'matoa_audit_logs.csv')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs flex items-center space-x-1.5 transition shadow-xs"
                  title={t('exportCsv')}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('exportCsv')}</span>
                </button>

                <button
                  onClick={() => exportLogsToJSON(logs, 'matoa_audit_logs.json')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs flex items-center space-x-1.5 transition shadow-xs"
                  title={t('exportJson')}
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t('exportJson')}</span>
                </button>
              </div>
            </div>

            {/* Geometric Balance High-Contrast Dark Card for Activity Feed */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-white">
              <div className="divide-y divide-slate-800">
                {logs
                  .filter((l) => l.description.toLowerCase().includes(logSearch.toLowerCase()))
                  .map((log) => (
                    <div key={log._id} className="p-4 hover:bg-slate-800/40 transition text-xs flex items-start space-x-3">
                      <div className="p-2 rounded-xl bg-slate-800 text-blue-400 shrink-0 mt-0.5 border border-slate-700">
                        <History className="w-4 h-4" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white">{log.actorName || t('userFallback')}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                              {log.actorRole}
                            </span>
                            <span className="font-mono text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                              {log.typeAction}
                            </span>
                          </div>

                          <span className="text-[11px] text-slate-400 font-mono">
                            {new Date(log.timestamp).toLocaleString('fr-FR')}
                          </span>
                        </div>

                        <p className="text-slate-300 font-medium">{log.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: CREATE AUTO-ECOLE */}
      {showSchoolModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900">{t('registerNewSchoolModalTitle')}</h3>

            <form onSubmit={handleCreateSchool} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('schoolNameRequired')}</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Auto-École Conduite Passion"
                  value={newSchoolName}
                  onChange={(e) => setNewSchoolName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('physicalAddress')}</label>
                <input
                  type="text"
                  placeholder="Ex: 15 Boulevard Haussmann, Paris"
                  value={newSchoolAddress}
                  onChange={(e) => setNewSchoolAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('adminEmailRequired')}</label>
                  <input
                    type="email"
                    required
                    placeholder="admin@ecole.fr"
                    value={newSchoolEmail}
                    onChange={(e) => setNewSchoolEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('initialPasswordRequired')}</label>
                  <input
                    type="password"
                    required
                    value={newSchoolPassword}
                    onChange={(e) => setNewSchoolPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('primaryColor')}</label>
                  <input
                    type="color"
                    value={newSchoolPrimaryColor}
                    onChange={(e) => setNewSchoolPrimaryColor(e.target.value)}
                    className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('secondaryColor')}</label>
                  <input
                    type="color"
                    value={newSchoolSecondaryColor}
                    onChange={(e) => setNewSchoolSecondaryColor(e.target.value)}
                    className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('slogan')}</label>
                <input
                  type="text"
                  placeholder={t('sloganPlaceholder')}
                  value={newSchoolSlogan}
                  onChange={(e) => setNewSchoolSlogan(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSchoolModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  {t('createSchoolSubmit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT AUTO-ECOLE */}
      {editingSchool && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <h3 className="text-lg font-black text-slate-900">
                {t('editSchoolModalTitle')} — {editingSchool.codeAutoEcoleUnique}
              </h3>
              <button
                type="button"
                onClick={() => setEditingSchool(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateSchool} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('schoolNameRequired')}</label>
                <input
                  type="text"
                  required
                  value={editSchoolName}
                  onChange={(e) => setEditSchoolName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('physicalAddress')}</label>
                <input
                  type="text"
                  value={editSchoolAddress}
                  onChange={(e) => setEditSchoolAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('contactEmail')}</label>
                  <input
                    type="email"
                    value={editSchoolEmail}
                    onChange={(e) => setEditSchoolEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('phoneLabel')}</label>
                  <input
                    type="tel"
                    value={editSchoolPhone}
                    onChange={(e) => setEditSchoolPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('primaryColor')}</label>
                  <input
                    type="color"
                    value={editSchoolPrimaryColor}
                    onChange={(e) => setEditSchoolPrimaryColor(e.target.value)}
                    className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('secondaryColor')}</label>
                  <input
                    type="color"
                    value={editSchoolSecondaryColor}
                    onChange={(e) => setEditSchoolSecondaryColor(e.target.value)}
                    className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('logoUrl')}</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editSchoolLogo}
                  onChange={(e) => setEditSchoolLogo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('slogan')}</label>
                <input
                  type="text"
                  value={editSchoolSlogan}
                  onChange={(e) => setEditSchoolSlogan(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingSchool(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  {t('updateSchoolSubmit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE AUTO-ECOLE CONFIRMATION */}
      {deletingSchool && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-red-600">
              <div className="p-3 bg-red-100 rounded-full">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{t('deleteSchoolModalTitle')}</h3>
                <p className="text-xs text-slate-500 font-bold">{deletingSchool.name} ({deletingSchool.codeAutoEcoleUnique})</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-red-50 p-3 rounded-xl border border-red-200 font-medium leading-relaxed">
              <strong>{t('attentionStrong')}</strong> {t('deleteSchoolWarning')}
            </p>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingSchool(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs"
              >
                {t('cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteSchool}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-xs flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t('confirmDeletionBtn')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {showModuleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900">{t('newModuleModalTitle')}</h3>

            <form onSubmit={handleCreateModule} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('moduleTitleRequired')}</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Module 4 : Les Feux et l'Éclairage"
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('description')}</label>
                <textarea
                  rows={2}
                  placeholder="Contenu synthétique du cours..."
                  value={moduleDescription}
                  onChange={(e) => setModuleDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('videoUrlRequired')}</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={moduleVideoUrl}
                  onChange={(e) => setModuleVideoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('durationSec')}</label>
                  <input
                    type="number"
                    value={moduleDuration}
                    onChange={(e) => setModuleDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('minWatchSec')}</label>
                  <input
                    type="number"
                    value={moduleMinWatch}
                    onChange={(e) => setModuleMinWatch(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('minQuizPercent')}</label>
                  <input
                    type="number"
                    value={moduleMinScore}
                    onChange={(e) => setModuleMinScore(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModuleModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                >
                  {t('saveModuleSubmit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: QUIZ EDITOR (MODULE FINAL 10 QUESTIONS) */}
      {selectedModuleForQuiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 text-slate-900 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {t('moduleFinalQuizTitle')}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {t('editQuizFor', { title: selectedModuleForQuiz.title })}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedModuleForQuiz(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between bg-purple-50 p-3 rounded-xl border border-purple-100">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('finalQuizTimerSec')}</label>
                  <input
                    type="number"
                    value={quizTimer}
                    onChange={(e) => setQuizTimer(Number(e.target.value))}
                    className="w-32 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-purple-900">{t('totalQuestionsCount', { count: quizQuestions.length })}</p>
                  <button
                    type="button"
                    onClick={() => setQuizQuestions(generate10ModuleQuizQuestions(selectedModuleForQuiz.title))}
                    className="mt-1 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] rounded-lg transition"
                  >
                    {t('generate10QuestionsBtn')}
                  </button>
                </div>
              </div>

              {quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-700">{t('questionNumber', { number: qIdx + 1 })}</span>
                    <button
                      type="button"
                      onClick={() => setQuizQuestions(quizQuestions.filter((_, i) => i !== qIdx))}
                      className="text-red-600 hover:text-red-800 font-bold text-xs"
                    >
                      {t('delete')}
                    </button>
                  </div>

                  <input
                    type="text"
                    value={q.questionText}
                    onChange={(e) => {
                      const updated = [...quizQuestions];
                      updated[qIdx].questionText = e.target.value;
                      setQuizQuestions(updated);
                    }}
                    placeholder={t('questionTitlePlaceholder')}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium"
                  />

                  <p className="text-[11px] text-slate-500 font-bold mt-2">{t('responseOptionsCheck')}</p>
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`correct-${qIdx}`}
                        checked={q.correctOptionIndex === oIdx}
                        onChange={() => {
                          const updated = [...quizQuestions];
                          updated[qIdx].correctOptionIndex = oIdx;
                          setQuizQuestions(updated);
                        }}
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...quizQuestions];
                          updated[qIdx].options[oIdx] = e.target.value;
                          setQuizQuestions(updated);
                        }}
                        className="flex-1 px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-900 text-xs font-medium"
                      />
                    </div>
                  ))}

                  <div className="pt-2">
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">{t('pedagogicalExplanation')}</label>
                    <input
                      type="text"
                      value={q.explanation || ''}
                      onChange={(e) => {
                        const updated = [...quizQuestions];
                        updated[qIdx].explanation = e.target.value;
                        setQuizQuestions(updated);
                      }}
                      placeholder="Explication affichée après le choix..."
                      className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700 text-xs"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setQuizQuestions([
                    ...quizQuestions,
                    {
                      questionText: `Question ${quizQuestions.length + 1}`,
                      options: ['Option A', 'Option B', 'Option C', 'Option D'],
                      correctOptionIndex: 0,
                      explanation: 'Explication pédagogique',
                    },
                  ])
                }
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200"
              >
                {t('addQuizQuestionBtn')}
              </button>

              <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedModuleForQuiz(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200"
                >
                  {t('cancel')}
                </button>
                <button
                  type="button"
                  onClick={handleSaveQuiz}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs"
                >
                  {t('saveFinalQuizBtn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: LESSON MANAGER & MINI-QUIZ 5Q */}
      {selectedModuleForLessons && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 text-slate-900 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {t('moduleStructureHeader')}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {t('manageLessonsFor', { title: selectedModuleForLessons.title })}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedModuleForLessons(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xs">
              {moduleLessons.map((lec, lIdx) => (
                <div key={lec._id || lIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-black text-blue-700 text-sm">{t('lessonNumber', { number: lIdx + 1, total: moduleLessons.length })}</span>
                    <button
                      type="button"
                      onClick={() => setModuleLessons(moduleLessons.filter((_, i) => i !== lIdx))}
                      className="text-red-600 hover:text-red-800 font-bold text-xs"
                    >
                      {t('deleteLessonBtn')}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="md:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">{t('lessonTitle')}</label>
                      <input
                        type="text"
                        value={lec.title || ''}
                        onChange={(e) => {
                          const updated = [...moduleLessons];
                          updated[lIdx].title = e.target.value;
                          setModuleLessons(updated);
                        }}
                        placeholder="Titre de la leçon..."
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-medium text-slate-900"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">{t('lessonSummaryDesc')}</label>
                      <textarea
                        rows={2}
                        value={lec.description || ''}
                        onChange={(e) => {
                          const updated = [...moduleLessons];
                          updated[lIdx].description = e.target.value;
                          setModuleLessons(updated);
                        }}
                        placeholder="Court résumé de cette leçon..."
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{t('videoUrl')}</label>
                      <input
                        type="text"
                        value={lec.videoUrl || ''}
                        onChange={(e) => {
                          const updated = [...moduleLessons];
                          updated[lIdx].videoUrl = e.target.value;
                          setModuleLessons(updated);
                        }}
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">{t('durationSec')}</label>
                        <input
                          type="number"
                          value={lec.durationSeconds || 180}
                          onChange={(e) => {
                            const updated = [...moduleLessons];
                            updated[lIdx].durationSeconds = Number(e.target.value);
                            setModuleLessons(updated);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">{t('minWatchSec')}</label>
                        <input
                          type="number"
                          value={lec.tempsMinimumVisionnageSeconds || 144}
                          onChange={(e) => {
                            const updated = [...moduleLessons];
                            updated[lIdx].tempsMinimumVisionnageSeconds = Number(e.target.value);
                            setModuleLessons(updated);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mini Quiz 5 Questions */}
                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-3 mt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`hasQuiz-${lIdx}`}
                          checked={lec.hasInlineQuiz ?? true}
                          onChange={(e) => {
                            const updated = [...moduleLessons];
                            updated[lIdx].hasInlineQuiz = e.target.checked;
                            setModuleLessons(updated);
                          }}
                        />
                        <label htmlFor={`hasQuiz-${lIdx}`} className="font-black text-purple-900 text-xs">
                          {t('activateMiniQuiz5Q')}
                        </label>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...moduleLessons];
                          updated[lIdx].hasInlineQuiz = true;
                          updated[lIdx].inlineQuiz = generate5MiniQuizQuestions(lec.title || `Leçon ${lIdx + 1}`);
                          setModuleLessons(updated);
                        }}
                        className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-[11px] rounded-lg transition"
                      >
                        {t('generate5MiniQuizBtn')}
                      </button>
                    </div>

                    {lec.hasInlineQuiz !== false && (
                      <div className="space-y-3 pt-2">
                        <p className="text-[11px] font-bold text-slate-500">
                          {t('miniQuizQuestionsHeader', { count: lec.inlineQuiz?.length || 0 })}
                        </p>

                        {(lec.inlineQuiz || []).map((q: any, qIdx: number) => (
                          <div key={qIdx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-purple-800">Mini-Q{qIdx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...moduleLessons];
                                  updated[lIdx].inlineQuiz = updated[lIdx].inlineQuiz.filter((_: any, i: number) => i !== qIdx);
                                  setModuleLessons(updated);
                                }}
                                className="text-red-600 font-bold text-[11px]"
                              >
                                {t('deleteQuestionBtn')}
                              </button>
                            </div>

                            <input
                              type="text"
                              value={q.questionText}
                              onChange={(e) => {
                                const updated = [...moduleLessons];
                                updated[lIdx].inlineQuiz[qIdx].questionText = e.target.value;
                                setModuleLessons(updated);
                              }}
                              className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-900 font-medium"
                              placeholder={t('questionTitlePlaceholder')}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                              {q.options?.map((opt: string, oIdx: number) => (
                                <div key={oIdx} className="flex items-center space-x-1.5">
                                  <input
                                    type="radio"
                                    name={`lec-${lIdx}-q-${qIdx}`}
                                    checked={q.correctOptionIndex === oIdx}
                                    onChange={() => {
                                      const updated = [...moduleLessons];
                                      updated[lIdx].inlineQuiz[qIdx].correctOptionIndex = oIdx;
                                      setModuleLessons(updated);
                                    }}
                                  />
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                      const updated = [...moduleLessons];
                                      updated[lIdx].inlineQuiz[qIdx].options[oIdx] = e.target.value;
                                      setModuleLessons(updated);
                                    }}
                                    className="w-full px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-800 text-[11px]"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...moduleLessons];
                            if (!updated[lIdx].inlineQuiz) updated[lIdx].inlineQuiz = [];
                            updated[lIdx].inlineQuiz.push({
                              questionText: `Question ${updated[lIdx].inlineQuiz.length + 1}`,
                              options: ['Option A', 'Option B', 'Option C', 'Option D'],
                              correctOptionIndex: 0,
                              explanation: 'Explication',
                            });
                            setModuleLessons(updated);
                          }}
                          className="w-full py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-lg border border-purple-200 text-center"
                        >
                          {t('addMiniQuizQuestionBtn')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  setModuleLessons([
                    ...moduleLessons,
                    {
                      _id: `lec-${Date.now()}`,
                      title: `Leçon ${moduleLessons.length + 1}`,
                      ordre: moduleLessons.length + 1,
                      description: 'Description de la leçon...',
                      videoUrl: '',
                      durationSeconds: 180,
                      tempsMinimumVisionnageSeconds: 144,
                      hasInlineQuiz: true,
                      inlineQuiz: generate5MiniQuizQuestions(`Leçon ${moduleLessons.length + 1}`),
                    },
                  ]);
                }}
                className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-black rounded-xl border border-blue-200 text-center"
              >
                {t('addLessonToModuleBtn')}
              </button>

              <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedModuleForLessons(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200"
                >
                  {t('cancel')}
                </button>
                <button
                  type="button"
                  onClick={handleSaveLessons}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  {t('saveLessonsAndMiniQuizBtn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PROGRAMME PERMIS */}
      {showProgrammeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-black">
                  {editingProgramme ? t('editLicenceProgramModalTitle') : t('newLicenceProgramModalTitle')}
                </h3>
                <p className="text-xs text-slate-400">
                  {t('programModalSub')}
                </p>
              </div>
              <button
                onClick={() => setShowProgrammeModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgramme} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('categoryTypePermis')}
                </label>
                <select
                  value={progTypePermis}
                  onChange={(e) => setProgTypePermis(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 font-bold bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="B">Permis B (Voiture / Véhicule léger)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('programTitleRequired')}
                </label>
                <input
                  type="text"
                  value={progTitre}
                  onChange={(e) => setProgTitre(e.target.value)}
                  placeholder="ex. Programme Permis B - Conduite Automobile"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('programDescGoals')}
                </label>
                <textarea
                  value={progDescription}
                  onChange={(e) => setProgDescription(e.target.value)}
                  rows={2}
                  placeholder="Objectifs pédagogiques et règles de la formation..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {t('selectModulesForProgram')}
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-200 rounded-xl p-3 bg-slate-50">
                  {modules.map((m) => {
                    const isChecked = progModuleIds.includes(m._id);
                    return (
                      <label
                        key={m._id}
                        className="flex items-center space-x-2 text-xs text-slate-800 cursor-pointer hover:bg-white p-1.5 rounded-lg border border-transparent hover:border-slate-200 transition"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setProgModuleIds([...progModuleIds, m._id]);
                            } else {
                              setProgModuleIds(progModuleIds.filter((id) => id !== m._id));
                            }
                          }}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="font-bold">Module {m.ordre} :</span>
                        <span className="truncate">{m.title}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowProgrammeModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-xl"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  {t('saveProgramSubmit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
