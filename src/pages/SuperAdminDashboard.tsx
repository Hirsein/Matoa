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
} from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  const { token } = useAuth();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'overview' | 'schools' | 'modules' | 'logs'>('overview');


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

  // Logs
  const [logs, setLogs] = useState<LogActivite[]>([]);
  const [logSearch, setLogSearch] = useState('');

  // Notifications / feedback
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch initial data
  useEffect(() => {
    fetchStats();
    fetchSchools();
    fetchModules();
    fetchLogs();
  }, [token]);

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

  // Open Quiz Modal
  const handleOpenQuizEditor = (mod: ModuleFormation) => {
    setSelectedModuleForQuiz(mod);
    if (mod.quiz) {
      setQuizTimer(mod.quiz.timerSeconds || 600);
      setQuizQuestions(mod.quiz.questions || []);
    } else {
      setQuizTimer(600);
      setQuizQuestions([
        {
          questionText: 'Question exemple 1',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctOptionIndex: 0,
          explanation: 'Explication corrective',
        },
      ]);
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
                <span>Plateforme SaaS Admin</span>
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
              Tableau de Bord Super Admin Matoa
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Supervision globale du parc auto-écoles, gestion des modules théoriques et audit des logs.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => exportDashboardStatsToPDF('Rapport Global Réseau Matoa', stats, [])}
              className="inline-flex items-center space-x-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs transition"
              title={t('exportPdf')}
            >
              <Download className="w-4 h-4 text-red-500" />
              <span>Rapport PDF</span>
            </button>

            <button
              onClick={() => setShowSchoolModal(true)}
              className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Créer une Auto-École</span>
            </button>
            <button
              onClick={() => setShowModuleModal(true)}
              className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Créer un Module</span>
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
            <span>Vue d'Ensemble</span>
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
            <span>Parc Auto-Écoles ({schools.length})</span>
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
            <span>Modules & Quiz ({modules.length})</span>
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
            <span>Journal d'Activité Globale</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Auto-Écoles</p>
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                    <School className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mt-2">{stats?.totalSchools || 0}</h3>
                <p className="text-[11px] text-emerald-600 mt-1 font-bold">
                  {stats?.activeSchools || 0} établissement(s) actif(s)
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Élèves Inscrits</p>
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mt-2">{stats?.totalStudents || 0}</h3>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Sur l'ensemble des établissements</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Progression Moyenne</p>
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mt-2">{stats?.avgProgress || 0}%</h3>
                <p className="text-[11px] text-purple-600 mt-1 font-bold">Avancement des élèves au Code</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Certificats Décrochés</p>
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mt-2">{stats?.completedStudents || 0}</h3>
                <p className="text-[11px] text-amber-600 mt-1 font-bold">Formations 100% complétées</p>
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
                      Tendances d'Inscriptions & Certifications
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Évolution mensuelle globale sur le réseau</p>
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
                        name="Inscriptions"
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
                        name="Certifications"
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
                  <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">Répartition de la Progression</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Répartition par tranches d'avancement</p>
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
                      Taux de Validation des Modules Théoriques
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pourcentage d'élèves ayant réussi chaque module</p>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats?.modulesCompletion || []} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                      <XAxis dataKey="moduleTitle" tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#64748b' }} stroke={isDark ? '#475569' : '#cbd5e1'} />
                      <YAxis tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#64748b' }} stroke={isDark ? '#475569' : '#cbd5e1'} unit="%" domain={[0, 100]} />
                      <Tooltip
                        formatter={(value: any) => [`${value}%`, 'Taux de réussite']}
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
                        name="Taux de réussite (%)"
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
                Auto-Écoles Partenaires Récentes
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50/80 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <tr>
                      <th className="p-3 rounded-l-lg">Nom Établissement</th>
                      <th className="p-3">Code AE Unique</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Élèves Inscrits</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3 rounded-r-lg text-right">Actions</th>
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
                        <td className="p-3 font-bold text-slate-800">{(school as any).studentCount || 0} élèves</td>
                        <td className="p-3">
                          {school.isActive ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Actif
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                              Suspendu
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleToggleSchoolStatus(school)}
                            className="text-xs text-slate-600 hover:text-slate-900 font-bold px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition border border-slate-200"
                          >
                            {school.isActive ? 'Suspendre' : 'Activer'}
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
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Gestion du Parc des Auto-Écoles</h2>
              <button
                onClick={() => setShowSchoolModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Nouvelle Auto-École</span>
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
                      {school.isActive ? 'Opérationnel' : 'Suspendu'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 italic my-3 border-l-2 border-slate-300 pl-3">
                    "{school.slogan || 'Sans slogan spécifique.'}"
                  </p>

                  <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p>
                      <strong className="text-slate-800">Email Contact Admin :</strong> {school.contact?.email}
                    </p>
                    <p>
                      <strong className="text-slate-800">Téléphone :</strong> {school.contact?.phone || 'Non renseigné'}
                    </p>
                    <p>
                      <strong className="text-slate-800">Élèves enregistrés :</strong> {(school as any).studentCount || 0}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                      <span>Thème :</span>
                      <span
                        className="w-4 h-4 rounded-full border border-slate-300"
                        style={{ backgroundColor: school.couleursTheme?.primaryColor }}
                        title="Primaire"
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-slate-300"
                        style={{ backgroundColor: school.couleursTheme?.secondaryColor }}
                        title="Secondaire"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenEditSchool(school)}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl transition bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center space-x-1"
                        title="Modifier les informations de l'auto-école"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Modifier</span>
                      </button>

                      <button
                        onClick={() => setDeletingSchool(school)}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl transition bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 flex items-center space-x-1"
                        title="Supprimer définitivement cette auto-école"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Supprimer</span>
                      </button>

                      <button
                        onClick={() => handleToggleSchoolStatus(school)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                          school.isActive
                            ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                        }`}
                      >
                        {school.isActive ? 'Suspendre' : 'Activer'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MODULES & QUIZZES */}
        {activeTab === 'modules' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Modules de Formation Théorique</h2>
                <p className="text-xs text-slate-500 font-medium">
                  Définissez l'ordre du parcours, le temps de visionnage minimum et les quiz obligatoires.
                </p>
              </div>

              <button
                onClick={() => setShowModuleModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau Module</span>
              </button>
            </div>

            <div className="space-y-4">
              {modules.map((mod) => (
                <div
                  key={mod._id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center space-x-2">
                      <span className="bg-slate-100 text-blue-700 font-bold text-xs px-2.5 py-1 rounded-lg border border-slate-200">
                        Ordre {mod.ordre}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{mod.title}</h3>
                    </div>

                    <p className="text-xs text-slate-600">{mod.description}</p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-700 font-medium pt-1">
                      <span className="flex items-center space-x-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                        <Video className="w-3.5 h-3.5 text-blue-600" />
                        <span>Durée : {mod.durationSeconds}s</span>
                      </span>

                      <span className="flex items-center space-x-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Min visionnage : {mod.tempsMinimumVisionnage}s</span>
                      </span>

                      <span className="flex items-center space-x-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                        <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
                        <span>Score min Quiz : {mod.scoreMinimumQuiz}%</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <button
                      onClick={() => handleOpenQuizEditor(mod)}
                      className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold rounded-xl transition flex items-center space-x-1.5"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>{mod.quiz ? 'Éditer le Quiz' : 'Créer le Quiz'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LOGS D'ACTIVITÉ */}
        {activeTab === 'logs' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Journal d'Activité de la Plateforme</h2>

              <div className="flex items-center space-x-2 flex-wrap">
                <div className="relative max-w-xs">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Rechercher dans les logs..."
                    value={logSearch}
                    onChange={(e) => setLogSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                  />
                </div>

                <button
                  onClick={() => exportLogsToCSV(logs, 'matoa_audit_logs.csv')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs flex items-center space-x-1.5 transition shadow-xs"
                  title="Exporter les logs d'activité en CSV pour audit"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => exportLogsToJSON(logs, 'matoa_audit_logs.json')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs flex items-center space-x-1.5 transition shadow-xs"
                  title="Exporter les logs d'activité en JSON pour audit"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Export JSON</span>
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
                            <span className="font-bold text-white">{log.actorName || 'Utilisateur'}</span>
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
            <h3 className="text-lg font-black text-slate-900">Inscrire une Nouvelle Auto-École</h3>

            <form onSubmit={handleCreateSchool} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nom de l'établissement *</label>
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
                <label className="block text-slate-700 font-bold mb-1">Adresse Physique</label>
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
                  <label className="block text-slate-700 font-bold mb-1">Email Admin *</label>
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
                  <label className="block text-slate-700 font-bold mb-1">Mot de passe initial *</label>
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
                  <label className="block text-slate-700 font-bold mb-1">Couleur Primaire</label>
                  <input
                    type="color"
                    value={newSchoolPrimaryColor}
                    onChange={(e) => setNewSchoolPrimaryColor(e.target.value)}
                    className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Couleur Secondaire</label>
                  <input
                    type="color"
                    value={newSchoolSecondaryColor}
                    onChange={(e) => setNewSchoolSecondaryColor(e.target.value)}
                    className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Slogan</label>
                <input
                  type="text"
                  placeholder="Slogan d'accueil..."
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
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Créer et Générer Code AE
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
                Modifier l'Auto-École — {editingSchool.codeAutoEcoleUnique}
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
                <label className="block text-slate-700 font-bold mb-1">Nom de l'établissement *</label>
                <input
                  type="text"
                  required
                  value={editSchoolName}
                  onChange={(e) => setEditSchoolName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Adresse Physique</label>
                <input
                  type="text"
                  value={editSchoolAddress}
                  onChange={(e) => setEditSchoolAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Contact</label>
                  <input
                    type="email"
                    value={editSchoolEmail}
                    onChange={(e) => setEditSchoolEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Téléphone</label>
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
                  <label className="block text-slate-700 font-bold mb-1">Couleur Primaire</label>
                  <input
                    type="color"
                    value={editSchoolPrimaryColor}
                    onChange={(e) => setEditSchoolPrimaryColor(e.target.value)}
                    className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Couleur Secondaire</label>
                  <input
                    type="color"
                    value={editSchoolSecondaryColor}
                    onChange={(e) => setEditSchoolSecondaryColor(e.target.value)}
                    className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">URL du Logo</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editSchoolLogo}
                  onChange={(e) => setEditSchoolLogo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Slogan</label>
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
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Mettre à jour l'Auto-École
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
                <h3 className="text-lg font-black text-slate-900">Supprimer l'Auto-École ?</h3>
                <p className="text-xs text-slate-500 font-bold">{deletingSchool.name} ({deletingSchool.codeAutoEcoleUnique})</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-red-50 p-3 rounded-xl border border-red-200 font-medium leading-relaxed">
              <strong>Attention :</strong> Cette action est irréversible. La suppression de cet établissement entraînera la suppression définitive de tous les comptes élèves associés ainsi que l'historique d'activité de ce tenant.
            </p>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingSchool(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDeleteSchool}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-xs flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirmer la Suppression</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {showModuleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900">Nouveau Module de Formation Théorique</h3>

            <form onSubmit={handleCreateModule} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Titre du Module *</label>
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
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Contenu synthétique du cours..."
                  value={moduleDescription}
                  onChange={(e) => setModuleDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">URL de la Vidéo MP4 *</label>
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
                  <label className="block text-slate-700 font-bold mb-1">Durée (sec)</label>
                  <input
                    type="number"
                    value={moduleDuration}
                    onChange={(e) => setModuleDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Min Visionnage (sec)</label>
                  <input
                    type="number"
                    value={moduleMinWatch}
                    onChange={(e) => setModuleMinWatch(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Min Quiz (%)</label>
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
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Enregistrer Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: QUIZ EDITOR */}
      {selectedModuleForQuiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 text-slate-900 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-lg font-black text-slate-900">
              Édition du Quiz — {selectedModuleForQuiz.title}
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Chrono du Quiz (secondes)</label>
                <input
                  type="number"
                  value={quizTimer}
                  onChange={(e) => setQuizTimer(Number(e.target.value))}
                  className="w-32 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-700">Question {qIdx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setQuizQuestions(quizQuestions.filter((_, i) => i !== qIdx))}
                      className="text-red-600 hover:text-red-800 font-bold text-xs"
                    >
                      Supprimer
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
                    placeholder="Intitulé de la question..."
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium"
                  />

                  <p className="text-[11px] text-slate-500 font-bold mt-2">Options de réponse :</p>
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
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setQuizQuestions([
                    ...quizQuestions,
                    {
                      questionText: 'Nouvelle question',
                      options: ['Option A', 'Option B', 'Option C', 'Option D'],
                      correctOptionIndex: 0,
                    },
                  ])
                }
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200"
              >
                + Ajouter une question
              </button>

              <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedModuleForQuiz(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSaveQuiz}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Enregistrer Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
