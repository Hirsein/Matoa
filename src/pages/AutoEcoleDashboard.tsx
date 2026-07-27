import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { exportStudentsToCSV, exportDashboardStatsToPDF, exportLogsToCSV, exportLogsToJSON } from '../lib/exportService';
import { generateCertificatePDF } from '../lib/certificatePdfService';
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
import { Eleve, LogActivite, ActionType, ModuleFormation, Lecon, QuizQuestion } from '../types';
import { BrandingPreviewCard } from '../components/BrandingPreviewCard';
import {
  Users,
  TrendingUp,
  School,
  History,
  Plus,
  Palette,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  UserCheck,
  UserX,
  Edit2,
  Trash2,
  Eye,
  ShieldAlert,
  UploadCloud,
  FileText,
  Download,
  FileSpreadsheet,
  Award,
  FileCheck,
  Printer,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  Video,
  Check,
  Layers,
} from 'lucide-react';

export const AutoEcoleDashboard: React.FC = () => {
  const { token, autoEcole, updateAutoEcoleBranding } = useAuth();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'overview' | 'branding' | 'eleves' | 'programme' | 'progression' | 'certificats' | 'logs'>('overview');

  // Curriculum Management State
  const [modules, setModules] = useState<ModuleFormation[]>([]);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [editingModule, setEditingModule] = useState<ModuleFormation | null>(null);

  // Module Form Fields
  const [modCode, setModCode] = useState('');
  const [modTitle, setModTitle] = useState('');
  const [modSummary, setModSummary] = useState('');
  const [modObjectives, setModObjectives] = useState('');
  const [modOrdre, setModOrdre] = useState(1);
  const [modVideoUrl, setModVideoUrl] = useState('');
  const [modDurationSeconds, setModDurationSeconds] = useState(180);
  const [modMinWatchPct, setModMinWatchPct] = useState(80);
  const [modQuizScoreMin, setModQuizScoreMin] = useState(70);

  // Lesson Configurator Modal State
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedModForLessons, setSelectedModForLessons] = useState<ModuleFormation | null>(null);
  const [lessonsList, setLessonsList] = useState<Lecon[]>([]);

  // Quiz Configurator Modal State
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedModForQuiz, setSelectedModForQuiz] = useState<ModuleFormation | null>(null);
  const [quizTimerSecs, setQuizTimerSecs] = useState(600);
  const [quizPassingScore, setQuizPassingScore] = useState(70);
  const [quizQuestionsList, setQuizQuestionsList] = useState<QuizQuestion[]>([]);

  // Certificates State
  const [certificates, setCertificates] = useState<any[]>([]);
  const [certSearch, setCertSearch] = useState('');
  const [certStatusFilter, setCertStatusFilter] = useState<'ALL' | 'GENERE' | 'TELECHARGE' | 'ELIGIBLE' | 'NON_ELIGIBLE'>('ALL');
  const [selectedCertPreview, setSelectedCertPreview] = useState<any | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // Stats
  const [stats, setStats] = useState<any>(null);

  // Students list
  const [eleves, setEleves] = useState<any[]>([]);
  const [eleveSearch, setEleveSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'IN_PROGRESS' | 'COMPLETED' | 'NOT_STARTED' | 'EXPIRED' | 'BLOCKED'>('ALL');

  // New Student modal
  const [showEleveModal, setShowEleveModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentPassword, setNewStudentPassword] = useState('password123');
  const [newStudentStartDate, setNewStudentStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [newStudentEndDate, setNewStudentEndDate] = useState(
    new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  ); // Default 6 months

  // CSV Bulk Import Modal
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvInputText, setCsvInputText] = useState('');
  const [csvParsedRows, setCsvParsedRows] = useState<any[]>([]);
  const [csvImportLoading, setCsvImportLoading] = useState(false);
  const [csvImportResult, setCsvImportResult] = useState<any | null>(null);

  // Edit Student modal
  const [selectedEleveForEdit, setSelectedEleveForEdit] = useState<any | null>(null);

  // Detailed Progression Modal
  const [selectedEleveForProg, setSelectedEleveForProg] = useState<any | null>(null);
  const [eleveProgressionData, setEleveProgressionData] = useState<any | null>(null);

  // Branding Customization Form
  const [primaryColor, setPrimaryColor] = useState(autoEcole?.couleursTheme?.primaryColor || '#2563eb');
  const [secondaryColor, setSecondaryColor] = useState(autoEcole?.couleursTheme?.secondaryColor || '#059669');
  const [logoUrl, setLogoUrl] = useState(autoEcole?.logo || '');
  const [slogan, setSlogan] = useState(autoEcole?.slogan || '');

  // Tenant Logs
  const [logs, setLogs] = useState<LogActivite[]>([]);

  // Feedback
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchStats();
    fetchEleves();
    fetchLogs();
    fetchCertificates();
    fetchModules();
  }, [token]);

  useEffect(() => {
    if (autoEcole) {
      setPrimaryColor(autoEcole.couleursTheme?.primaryColor || '#2563eb');
      setSecondaryColor(autoEcole.couleursTheme?.secondaryColor || '#059669');
      setLogoUrl(autoEcole.logo || '');
      setSlogan(autoEcole.slogan || '');
    }
  }, [autoEcole]);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setStats(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchEleves = async () => {
    try {
      const res = await fetch('/api/eleves', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setEleves(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportStudentsCSV = () => {
    if (!eleves || eleves.length === 0) {
      setFeedback({ type: 'error', text: 'Aucun élève à exporter.' });
      return;
    }

    const filtered = eleves.filter((e) => {
      const matchesSearch =
        !eleveSearch ||
        e.userDetail?.name?.toLowerCase().includes(eleveSearch.toLowerCase()) ||
        e.codeEleveUnique?.toLowerCase().includes(eleveSearch.toLowerCase()) ||
        e.userDetail?.email?.toLowerCase().includes(eleveSearch.toLowerCase());

      if (!matchesSearch) return false;

      if (statusFilter === 'ALL') return true;
      if (statusFilter === 'EXPIRED') return !!e.isExpired;
      if (statusFilter === 'BLOCKED') return !!e.isBlocked && !e.isExpired;
      if (statusFilter === 'COMPLETED') return e.progressionGlobal === 100;
      if (statusFilter === 'NOT_STARTED') return e.progressionGlobal === 0 && !e.isExpired && !e.isBlocked;
      if (statusFilter === 'IN_PROGRESS') return e.progressionGlobal > 0 && e.progressionGlobal < 100 && !e.isExpired && !e.isBlocked;
      return true;
    });

    const headers = ['Code Eleve', 'Nom Complet', 'Email', 'Telephone', 'Date Debut', 'Date Fin', 'Progression (%)', 'Statut'];
    const rows = filtered.map((el) => {
      const status = el.isExpired ? 'Expiré' : el.isBlocked ? 'Suspendu' : 'Actif';
      return [
        `"${el.codeEleveUnique || ''}"`,
        `"${(el.userDetail?.name || '').replace(/"/g, '""')}"`,
        `"${(el.userDetail?.email || '').replace(/"/g, '""')}"`,
        `"${el.telephone || ''}"`,
        `"${el.dateDebutFormation || ''}"`,
        `"${el.dateFinFormation || ''}"`,
        `"${el.progressionGlobal || 0}"`,
        `"${status}"`,
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `liste_eleves_${autoEcole?.codeAutoEcoleUnique || 'ecole'}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setFeedback({ type: 'success', text: `${filtered.length} élève(s) exporté(s) en CSV.` });
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setLogs(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCertificates = async () => {
    try {
      const res = await fetch('/api/certificats', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setCertificates(await res.json());
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

  const handleOpenModuleModal = (mod?: ModuleFormation) => {
    if (mod) {
      setEditingModule(mod);
      setModCode(mod.code || '');
      setModTitle(mod.title || '');
      setModSummary(mod.summary || '');
      setModObjectives((mod.learningObjectives || []).join('\n'));
      setModOrdre(mod.ordre || 1);
      setModVideoUrl(mod.videoUrl || '');
      setModDurationSeconds(mod.durationSeconds || 180);
      setModMinWatchPct(
        mod.tempsMinimumVisionnage && mod.durationSeconds
          ? Math.round((mod.tempsMinimumVisionnage / mod.durationSeconds) * 100)
          : 80
      );
      setModQuizScoreMin(mod.scoreMinimumQuiz || 70);
    } else {
      setEditingModule(null);
      setModCode(`MOD-00${modules.length + 1}`);
      setModTitle('');
      setModSummary('');
      setModObjectives('');
      setModOrdre(modules.length + 1);
      setModVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
      setModDurationSeconds(180);
      setModMinWatchPct(80);
      setModQuizScoreMin(70);
    }
    setShowModuleModal(true);
  };

  const handleSaveModule = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const objectivesArray = modObjectives
      .split('\n')
      .map((o) => o.trim())
      .filter((o) => o.length > 0);

    const minWatchSecs = Math.round((modDurationSeconds * modMinWatchPct) / 100);

    const payload = {
      code: modCode,
      title: modTitle,
      summary: modSummary,
      description: modSummary,
      learningObjectives: objectivesArray,
      ordre: Number(modOrdre),
      videoUrl: modVideoUrl,
      durationSeconds: Number(modDurationSeconds),
      tempsMinimumVisionnage: minWatchSecs,
      scoreMinimumQuiz: Number(modQuizScoreMin),
    };

    try {
      const url = editingModule ? `/api/modules/${editingModule._id}` : '/api/modules';
      const method = editingModule ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la sauvegarde du module.');

      setFeedback({
        type: 'success',
        text: `Module "${modTitle}" ${editingModule ? 'mis à jour' : 'créé'} avec succès !`,
      });

      setShowModuleModal(false);
      fetchModules();
      fetchLogs();
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message });
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce module ?')) return;

    try {
      const res = await fetch(`/api/modules/${moduleId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setFeedback({ type: 'success', text: 'Module supprimé avec succès.' });
        fetchModules();
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Open Lesson Management
  const handleOpenLessonModal = (mod: ModuleFormation) => {
    setSelectedModForLessons(mod);
    setLessonsList(mod.lecons && mod.lecons.length > 0 ? [...mod.lecons] : []);
    setShowLessonModal(true);
  };

  const handleSaveLessons = async () => {
    if (!selectedModForLessons) return;

    try {
      const res = await fetch(`/api/modules/${selectedModForLessons._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lecons: lessonsList }),
      });

      if (res.ok) {
        setFeedback({ type: 'success', text: 'Leçons mises à jour avec succès !' });
        setShowLessonModal(false);
        fetchModules();
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Open Quiz Configurator
  const handleOpenQuizModal = (mod: ModuleFormation) => {
    setSelectedModForQuiz(mod);
    setQuizTimerSecs(mod.quiz?.timerSeconds || 600);
    setQuizPassingScore(mod.scoreMinimumQuiz || 70);
    setQuizQuestionsList(mod.quiz?.questions ? [...mod.quiz.questions] : []);
    setShowQuizModal(true);
  };

  const handleSaveQuizConfig = async () => {
    if (!selectedModForQuiz) return;

    try {
      const res = await fetch('/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          moduleId: selectedModForQuiz._id,
          timerSeconds: Number(quizTimerSecs),
          scoreMinimum: Number(quizPassingScore),
          questions: quizQuestionsList,
        }),
      });

      if (res.ok) {
        setFeedback({ type: 'success', text: 'Configuration du Quiz enregistrée avec succès !' });
        setShowQuizModal(false);
        fetchModules();
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateCertificate = async (eleveId: string) => {
    try {
      const res = await fetch('/api/certificats/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eleveId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la génération du certificat.');

      setFeedback({ type: 'success', text: `Certificat ${data.certificat.certificateCode} généré avec succès !` });
      fetchCertificates();
      fetchLogs();
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message });
    }
  };

  const handleDownloadPdfCertificate = async (certItem: any) => {
    setIsExportingPdf(true);
    try {
      await fetch('/api/certificats/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eleveId: certItem.eleve._id }),
      });

      const success = await generateCertificatePDF({
        certificat: certItem.certificat,
        eleve: certItem.eleve,
        user: certItem.user || { name: 'Élève', email: '' },
        autoEcole: certItem.autoEcole || autoEcole,
      });

      if (success) {
        setFeedback({ type: 'success', text: `Téléchargement du PDF réussi pour ${certItem.user?.name || 'l\'élève'} !` });
        fetchCertificates();
        fetchLogs();
      } else {
        throw new Error('Échec du rendu du PDF.');
      }
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message || 'Erreur lors de l\'exportation PDF.' });
    } finally {
      setIsExportingPdf(false);
    }
  };

  // CSV Bulk Import Helpers
  const downloadCsvTemplate = () => {
    const content =
      "Nom,Email,Téléphone,MotDePasse,DateDébut,DateFin\nJean Dupont,jean.dupont@example.com,0612345678,pass123,2026-08-01,2027-02-01\nMarie Curie,marie.curie@example.com,0687654321,pass123,2026-08-01,2027-02-01";
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'modele_import_eleves.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setCsvInputText(text);
        parseCsvString(text);
      }
    };
    reader.readAsText(file);
  };

  const parseCsvString = (text: string) => {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    if (lines.length === 0) {
      setCsvParsedRows([]);
      return;
    }

    const firstLineLower = lines[0].toLowerCase();
    const hasHeader =
      firstLineLower.includes('nom') || firstLineLower.includes('name') || firstLineLower.includes('email');
    const dataLines = hasHeader ? lines.slice(1) : lines;

    const parsed = dataLines
      .map((line) => {
        const parts = line.split(/[,;]/).map((p) => p.trim().replace(/^["']|["']$/g, ''));
        return {
          name: parts[0] || '',
          email: parts[1] || '',
          phone: parts[2] || '',
          password: parts[3] || 'password123',
          dateDebutFormation: parts[4] || new Date().toISOString().split('T')[0],
          dateFinFormation: parts[5] || new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        };
      })
      .filter((row) => row.name && row.email);

    setCsvParsedRows(parsed);
  };

  const handleExecuteCsvImport = async () => {
    if (!csvInputText && csvParsedRows.length === 0) return;

    setCsvImportLoading(true);
    setCsvImportResult(null);

    try {
      const res = await fetch('/api/eleves/bulk-import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          csvText: csvInputText,
          studentsList: csvParsedRows,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de l\'importation CSV.');

      setCsvImportResult(data);
      fetchEleves();
      fetchStats();
      fetchLogs();
    } catch (err: any) {
      setCsvImportResult({ success: false, errors: [err.message] });
    } finally {
      setCsvImportLoading(false);
    }
  };

  // Create Student
  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    try {
      const res = await fetch('/api/eleves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newStudentName,
          email: newStudentEmail,
          phone: newStudentPhone,
          password: newStudentPassword,
          dateDebutFormation: newStudentStartDate,
          dateFinFormation: newStudentEndDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de l\'inscription de l\'élève.');

      setFeedback({
        type: 'success',
        text: `Élève ${newStudentName} inscrit avec le code unique ${data.codeEleveUnique} !`,
      });
      setShowEleveModal(false);
      setNewStudentName('');
      setNewStudentEmail('');
      setNewStudentPhone('');
      fetchEleves();
      fetchStats();
      fetchLogs();
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message });
    }
  };

  // Update Student details / block status
  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEleveForEdit) return;

    try {
      const res = await fetch(`/api/eleves/${selectedEleveForEdit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: selectedEleveForEdit.userDetail?.name,
          phone: selectedEleveForEdit.userDetail?.phone,
          dateDebutFormation: selectedEleveForEdit.dateDebutFormation,
          dateFinFormation: selectedEleveForEdit.dateFinFormation,
          isBlocked: selectedEleveForEdit.isBlocked,
        }),
      });

      if (res.ok) {
        setFeedback({ type: 'success', text: 'Informations de l\'élève mises à jour.' });
        setSelectedEleveForEdit(null);
        fetchEleves();
        fetchStats();
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete / Archive student
  const handleDeleteStudent = async (eleveId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) return;

    try {
      const res = await fetch(`/api/eleves/${eleveId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setFeedback({ type: 'success', text: 'Dossier élève supprimé.' });
        fetchEleves();
        fetchStats();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Save Branding changes
  const handleSaveBranding = async () => {
    if (!autoEcole) return;

    try {
      const res = await fetch(`/api/auto-ecoles/${autoEcole._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          logo: logoUrl,
          slogan,
          couleursTheme: {
            primaryColor,
            secondaryColor,
          },
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        updateAutoEcoleBranding(updated);
        setFeedback({ type: 'success', text: 'Thème et branding personnalisé enregistrés avec succès !' });
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Inspect student detailed progression
  const handleInspectProgression = async (eleve: any) => {
    setSelectedEleveForProg(eleve);
    try {
      const res = await fetch(`/api/progression/${eleve._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setEleveProgressionData(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Top Banner Header */}
      <div
        className="py-8 px-4 sm:px-8 border-b border-slate-200 transition-colors duration-300 bg-white"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}15 0%, ${secondaryColor}15 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            {autoEcole?.logo ? (
              <img
                src={autoEcole.logo}
                alt={autoEcole.name}
                className="w-16 h-16 rounded-2xl object-cover bg-white p-1 border border-slate-200 shadow-sm"
              />
            ) : (
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-sm font-bold text-2xl"
                style={{ backgroundColor: primaryColor }}
              >
                <School className="w-8 h-8" />
              </div>
            )}

            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                  Code Unique : {autoEcole?.codeAutoEcoleUnique}
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">{autoEcole?.name}</h1>
              <p className="text-xs text-slate-500 italic">
                "{autoEcole?.slogan || 'Plateforme d\'apprentissage théorique du Code de la Route'}"
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => exportDashboardStatsToPDF(`Statistiques - ${autoEcole?.name || 'Auto-École'}`, stats, eleves)}
              className="inline-flex items-center space-x-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs transition"
              title={t('exportPdf')}
            >
              <Download className="w-4 h-4 text-red-500" />
              <span>PDF</span>
            </button>

            <button
              onClick={() => exportStudentsToCSV(eleves, `eleves_${autoEcole?.codeAutoEcoleUnique || 'autoecole'}.csv`)}
              className="inline-flex items-center space-x-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs transition"
              title={t('exportExcel')}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Excel/CSV</span>
            </button>

            <button
              onClick={() => setShowEleveModal(true)}
              className="inline-flex items-center space-x-1.5 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              <Plus className="w-4 h-4" />
              <span>{t('addStudent')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs font-bold flex items-center justify-between border shadow-xs ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <span>{feedback.text}</span>
            <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-700">
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
            onClick={() => setActiveTab('branding')}
            className={`py-3 px-4 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'branding'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Branding & Thème</span>
          </button>

          <button
            onClick={() => setActiveTab('eleves')}
            className={`py-3 px-4 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'eleves'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Gestion des Élèves ({eleves.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('programme')}
            className={`py-3 px-4 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'programme'
                ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600 font-extrabold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Programme & Leçons ({modules.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('progression')}
            className={`py-3 px-4 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'progression'
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Suivi de Progression</span>
          </button>

          <button
            onClick={() => setActiveTab('certificats')}
            className={`py-3 px-4 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'certificats'
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Certificats & Attestations ({certificates.filter(c => c.certificat).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`py-3 px-4 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'logs'
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Journal de l'Auto-École</span>
          </button>
        </div>

        {/* Animated Active Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Élèves</p>
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-900/50">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">{stats?.totalStudents || 0}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">Élèves sous votre établissement</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">En Formation Active</p>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                    <UserCheck className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">{stats?.activeStudents || 0}</h3>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-bold">Période valide non expirée</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Progression Moyenne</p>
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-xl border border-purple-100 dark:border-purple-900/50">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">{stats?.avgProgress || 0}%</h3>
                <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-1 font-bold">Avancement moyen aux cours</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Formations Expirées</p>
                  <div className="p-2 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-100 dark:border-amber-900/50">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">{stats?.expiredStudents || 0}</h3>
                <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-bold">Bloqués automatiquement</p>
              </motion.div>
            </div>

            {/* RECHARTS ANALYTICS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart 1: Module Completion Rate for this Auto-école */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                      Taux de Réussite par Module
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pourcentage de vos élèves ayant validé chaque module</p>
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-xs"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Statistiques de l'École
                  </span>
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
                        fill={primaryColor || (isDark ? '#3b82f6' : '#2563eb')}
                        radius={[8, 8, 0, 0]}
                        isAnimationActive={true}
                        animationDuration={1200}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Chart 2: Status Breakdown Pie Chart */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs"
              >
                <div className="mb-4">
                  <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">Statut des Élèves</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Répartition par état de formation</p>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats?.statusBreakdown || []}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="count"
                        nameKey="status"
                        isAnimationActive={true}
                        animationDuration={1200}
                      >
                        {(stats?.statusBreakdown || []).map((entry: any, index: number) => {
                          const fallbackColors = isDark
                            ? ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
                            : ['#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed'];
                          const color = entry.fill || fallbackColors[index % fallbackColors.length];
                          return <Cell key={`cell-${index}`} fill={color} stroke={isDark ? '#0f172a' : '#ffffff'} strokeWidth={2} />;
                        })}
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

              {/* Chart 3: Enrollment Trend Area Chart */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                      Évolution des Inscriptions Élèves
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Progression mensuelle des nouveaux inscrits dans votre établissement</p>
                  </div>
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats?.enrollmentTrends || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSchoolInsc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={secondaryColor || '#10b981'} stopOpacity={isDark ? 0.9 : 0.8} />
                          <stop offset="95%" stopColor={secondaryColor || '#10b981'} stopOpacity={0} />
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
                      <Area
                        type="monotone"
                        dataKey="inscriptions"
                        name="Inscriptions élèves"
                        stroke={secondaryColor || (isDark ? '#34d399' : '#059669')}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorSchoolInsc)"
                        isAnimationActive={true}
                        animationDuration={1200}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-4 tracking-tight">Derniers Élèves Inscrits</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
                  <thead className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-400 dark:text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <tr>
                      <th className="p-3 rounded-l-lg">Nom & Prénom</th>
                      <th className="p-3">Code Unique Élève</th>
                      <th className="p-3">Fin de Formation</th>
                      <th className="p-3">Progression</th>
                      <th className="p-3">Statut Accès</th>
                      <th className="p-3 rounded-r-lg text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {eleves.slice(0, 5).map((el) => (
                      <tr key={el._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-bold text-slate-900">
                          {el.userDetail?.name || 'Élève'}
                          <p className="text-[10px] text-slate-500">{el.userDetail?.email}</p>
                        </td>
                        <td className="p-3 font-mono text-emerald-600 font-bold">{el.codeEleveUnique}</td>
                        <td className="p-3 font-mono text-slate-600">{el.dateFinFormation}</td>
                        <td className="p-3">
                          <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                            <div
                              className="bg-emerald-500 h-full rounded-full"
                              style={{ width: `${el.progressionGlobal}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 font-bold mt-0.5 inline-block">
                            {el.progressionGlobal}%
                          </span>
                        </td>
                        <td className="p-3">
                          {el.isExpired ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              Expiré
                            </span>
                          ) : el.isBlocked ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                              Bloqué
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleInspectProgression(el)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-bold"
                          >
                            Détails
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

        {/* TAB 2: BRANDING CUSTOMIZER */}
        {activeTab === 'branding' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-xs">
              <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2 tracking-tight">
                <Palette className="w-5 h-5 text-blue-600" />
                <span>Personnalisation de l'Espace Élève</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Vos élèves verront vos couleurs, votre logo et votre slogan sur leur portail d'apprentissage.
              </p>

              <div className="space-y-4 text-xs pt-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    URL du Logo de l'Auto-École
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Couleur Primaire (Boutons & En-tête)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Couleur Secondaire (Validation / Badges)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl p-1 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Slogan ou Message d'Accueil Élève
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Bienvenue sur l'espace d'entraînement théorique de notre auto-école !"
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveBranding}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition"
                >
                  Enregistrer et Appliquer la Charte
                </button>
              </div>
            </div>

            {/* Live Preview */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-700">Aperçu en Direct</h3>
              <BrandingPreviewCard
                name={autoEcole?.name || 'Votre Auto-École'}
                code={autoEcole?.codeAutoEcoleUnique || 'MATOA-AE-000'}
                logoUrl={logoUrl}
                slogan={slogan}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            </div>
          </div>
        )}

        {/* TAB 3: GESTION DES ÉLÈVES */}
        {activeTab === 'eleves' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{t('actions') === 'Actions' ? 'Gestion de vos Élèves Inscrits' : 'Student Management'}</h2>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Text Search Input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={eleveSearch}
                    onChange={(e) => setEleveSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                  />
                </div>

                {/* Status Filter Dropdown */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                >
                  <option value="ALL">{t('filterStatusAll')}</option>
                  <option value="IN_PROGRESS">{t('filterStatusInProgress')}</option>
                  <option value="COMPLETED">{t('filterStatusCompleted')}</option>
                  <option value="NOT_STARTED">{t('filterStatusFailed')}</option>
                  <option value="EXPIRED">{t('filterStatusExpired')}</option>
                  <option value="BLOCKED">{t('filterStatusBlocked')}</option>
                </select>

                <button
                  type="button"
                  onClick={handleExportStudentsCSV}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs flex items-center space-x-1.5"
                  title="Exporter la liste filtrée au format CSV"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{t('exportExcel')}</span>
                </button>

                <button
                  onClick={() => {
                    setCsvInputText('');
                    setCsvParsedRows([]);
                    setCsvImportResult(null);
                    setShowCsvModal(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs flex items-center space-x-1.5"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{t('bulkImportCsv')}</span>
                </button>

                <button
                  onClick={() => setShowEleveModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('addStudent')}</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
                  <thead className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-400 dark:text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <tr>
                      <th className="p-3">{t('name')}</th>
                      <th className="p-3">{t('codeUnique')}</th>
                      <th className="p-3">Période Formation</th>
                      <th className="p-3">{t('progress')}</th>
                      <th className="p-3">{t('status')}</th>
                      <th className="p-3 text-right">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {eleves
                      .filter((e) => {
                        const matchesSearch =
                          !eleveSearch ||
                          e.userDetail?.name?.toLowerCase().includes(eleveSearch.toLowerCase()) ||
                          e.codeEleveUnique?.toLowerCase().includes(eleveSearch.toLowerCase()) ||
                          e.userDetail?.email?.toLowerCase().includes(eleveSearch.toLowerCase());

                        if (!matchesSearch) return false;

                        if (statusFilter === 'ALL') return true;
                        if (statusFilter === 'EXPIRED') return !!e.isExpired;
                        if (statusFilter === 'BLOCKED') return !!e.isBlocked && !e.isExpired;
                        if (statusFilter === 'COMPLETED') return e.progressionGlobal === 100;
                        if (statusFilter === 'NOT_STARTED') return e.progressionGlobal === 0 && !e.isExpired && !e.isBlocked;
                        if (statusFilter === 'IN_PROGRESS') return e.progressionGlobal > 0 && e.progressionGlobal < 100 && !e.isExpired && !e.isBlocked;
                        return true;
                      })
                      .map((el) => (
                        <tr key={el._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-bold text-slate-900">
                            {el.userDetail?.name}
                            <p className="text-[10px] text-slate-500">{el.userDetail?.email}</p>
                          </td>
                          <td className="p-3 font-mono text-emerald-600 font-bold">{el.codeEleveUnique}</td>
                          <td className="p-3 font-mono text-[11px] text-slate-600">
                            Du {el.dateDebutFormation} au <strong className="text-slate-900">{el.dateFinFormation}</strong>
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-slate-900">{el.progressionGlobal}%</span>
                          </td>
                          <td className="p-3">
                            {el.isExpired ? (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center w-fit space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>Expiré (Accès Bloqué)</span>
                              </span>
                            ) : el.isBlocked ? (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200 flex items-center w-fit space-x-1">
                                <UserX className="w-3 h-3" />
                                <span>Suspendu Manuel</span>
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center w-fit space-x-1">
                                <UserCheck className="w-3 h-3" />
                                <span>Accès Valide</span>
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => handleInspectProgression(el)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-blue-700 rounded-lg transition text-xs font-bold border border-slate-200"
                              title="Voir la progression"
                            >
                              Suivi
                            </button>
                            <button
                              onClick={() => setSelectedEleveForEdit(el)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition text-xs font-bold border border-slate-200"
                              title="Modifier"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(el._id)}
                              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition text-xs font-bold border border-red-200"
                              title="Supprimer"
                            >
                              Supprimer
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

        {/* TAB 4: SUIVI DE PROGRESSION */}
        {activeTab === 'progression' && (
          <div className="space-y-6">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Suivi de la Progression par Élève</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {eleves.map((el) => (
                <div
                  key={el._id}
                  onClick={() => handleInspectProgression(el)}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors cursor-pointer space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {el.codeEleveUnique}
                    </span>
                    <span className="text-xs font-black text-slate-900">{el.progressionGlobal}%</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{el.userDetail?.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">Fin de formation : {el.dateFinFormation}</p>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${el.progressionGlobal}%` }}
                    />
                  </div>

                  <div className="text-[11px] text-blue-600 font-bold text-right">
                    Voir détails des modules &rarr;
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CERTIFICATES MANAGEMENT */}
        {activeTab === 'certificats' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
                  <Award className="w-6 h-6 text-amber-500" />
                  <span>Gestion des Certificats de Formation</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Générez, suivez l'éligibilité et exportez les attestations officielles de réussite au Code de la Route au format PDF.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={fetchCertificates}
                  className="px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex items-center space-x-2 transition shadow-2xs"
                  title="Rafraîchir la liste"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
                  <span>Actualiser</span>
                </button>
              </div>
            </div>

            {/* Key Certificate Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Générés</span>
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-800">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {certificates.filter((c) => c.certificat && (c.certificat.status === 'GENERE' || c.certificat.status === 'TELECHARGE')).length}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Certificats officiels attribués</p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Téléchargés (PDF)</span>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-800">
                    <Download className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {certificates.filter((c) => c.certificat && c.certificat.status === 'TELECHARGE').length}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Exportés par les élèves / auto-école</p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Éligibles à Émettre</span>
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-100 dark:border-amber-800">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {certificates.filter((c) => c.isEligible && (!c.certificat || c.certificat.status === 'EN_COURS')).length}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">100% de progression validée</p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">En Formation</span>
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl border border-slate-200 dark:border-slate-700">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {certificates.filter((c) => !c.isEligible).length}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Progression en cours (&lt; 100%)</p>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher par élève, email, code..."
                  value={certSearch}
                  onChange={(e) => setCertSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto">
                <button
                  onClick={() => setCertStatusFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    certStatusFilter === 'ALL'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Tous ({certificates.length})
                </button>
                <button
                  onClick={() => setCertStatusFilter('GENERE')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    certStatusFilter === 'GENERE'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Générés
                </button>
                <button
                  onClick={() => setCertStatusFilter('TELECHARGE')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    certStatusFilter === 'TELECHARGE'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Téléchargés
                </button>
                <button
                  onClick={() => setCertStatusFilter('ELIGIBLE')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    certStatusFilter === 'ELIGIBLE'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Éligibles
                </button>
                <button
                  onClick={() => setCertStatusFilter('NON_ELIGIBLE')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    certStatusFilter === 'NON_ELIGIBLE'
                      ? 'bg-slate-700 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  En Cours
                </button>
              </div>
            </div>

            {/* Certificates Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <th className="p-3.5">Élève & Identifiant</th>
                      <th className="p-3.5">Progression</th>
                      <th className="p-3.5">Statut Certificat</th>
                      <th className="p-3.5">Code & Émission</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {certificates
                      .filter((item) => {
                        const matchesSearch =
                          !certSearch ||
                          (item.user?.name || '').toLowerCase().includes(certSearch.toLowerCase()) ||
                          (item.user?.email || '').toLowerCase().includes(certSearch.toLowerCase()) ||
                          (item.eleve?.codeEleveUnique || '').toLowerCase().includes(certSearch.toLowerCase()) ||
                          (item.certificat?.certificateCode || '').toLowerCase().includes(certSearch.toLowerCase());

                        if (!matchesSearch) return false;

                        if (certStatusFilter === 'GENERE') return item.certificat && item.certificat.status === 'GENERE';
                        if (certStatusFilter === 'TELECHARGE') return item.certificat && item.certificat.status === 'TELECHARGE';
                        if (certStatusFilter === 'ELIGIBLE') return item.isEligible && (!item.certificat || item.certificat.status === 'EN_COURS');
                        if (certStatusFilter === 'NON_ELIGIBLE') return !item.isEligible;
                        return true;
                      })
                      .map((item) => {
                        const cert = item.certificat;
                        const eleveObj = item.eleve;
                        const userObj = item.user;

                        return (
                          <tr key={eleveObj._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition">
                            <td className="p-3.5">
                              <div className="font-bold text-slate-900 dark:text-white">{userObj?.name || 'Nom non défini'}</div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-2 mt-0.5">
                                <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                  {eleveObj.codeEleveUnique}
                                </span>
                                <span>{userObj?.email}</span>
                              </div>
                            </td>

                            <td className="p-3.5">
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-200 dark:border-slate-700">
                                  <div
                                    className={`h-full rounded-full ${
                                      eleveObj.progressionGlobal >= 100
                                        ? 'bg-emerald-500'
                                        : eleveObj.progressionGlobal >= 50
                                        ? 'bg-blue-500'
                                        : 'bg-amber-500'
                                    }`}
                                    style={{ width: `${eleveObj.progressionGlobal}%` }}
                                  />
                                </div>
                                <span className="font-bold text-slate-900 dark:text-white text-xs">
                                  {eleveObj.progressionGlobal}%
                                </span>
                              </div>
                            </td>

                            <td className="p-3.5">
                              {cert?.status === 'TELECHARGE' ? (
                                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                  <FileCheck className="w-3 h-3 text-emerald-600" />
                                  <span>Téléchargé</span>
                                </span>
                              ) : cert?.status === 'GENERE' ? (
                                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                  <Award className="w-3 h-3 text-blue-600" />
                                  <span>Généré (Prêt)</span>
                                </span>
                              ) : item.isEligible ? (
                                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 animate-pulse">
                                  <Sparkles className="w-3 h-3 text-amber-600" />
                                  <span>Éligible (À Générer)</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span>En Cours (&lt;100%)</span>
                                </span>
                              )}
                            </td>

                            <td className="p-3.5">
                              {cert ? (
                                <div>
                                  <div className="font-mono text-[11px] font-bold text-slate-900 dark:text-white">
                                    {cert.certificateCode}
                                  </div>
                                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                    {new Date(cert.dateEmission).toLocaleDateString('fr-FR')}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-[11px] text-slate-400 italic">Non émis</span>
                              )}
                            </td>

                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                {(!cert || cert.status === 'EN_COURS') && (
                                  <button
                                    onClick={() => handleGenerateCertificate(eleveObj._id)}
                                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-xs font-bold shadow-2xs flex items-center space-x-1"
                                    title="Générer le certificat de formation"
                                  >
                                    <Sparkles className="w-3 h-3" />
                                    <span>Générer</span>
                                  </button>
                                )}

                                {cert && (
                                  <>
                                    <button
                                      onClick={() => setSelectedCertPreview(item)}
                                      className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition text-xs font-bold border border-slate-200 dark:border-slate-700 flex items-center space-x-1"
                                      title="Voir l'aperçu du diplôme"
                                    >
                                      <Eye className="w-3 h-3 text-slate-500" />
                                      <span>Aperçu</span>
                                    </button>

                                    <button
                                      onClick={() => handleDownloadPdfCertificate(item)}
                                      disabled={isExportingPdf}
                                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg transition text-xs font-bold shadow-2xs flex items-center space-x-1"
                                      title="Télécharger l'attestation au format PDF"
                                    >
                                      <Download className="w-3 h-3" />
                                      <span>PDF</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: TENANT LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Journal des Actions de l'Auto-École</h2>

              <div className="flex items-center space-x-2 flex-wrap">
                <button
                  onClick={() => exportLogsToCSV(logs, `logs_audit_${autoEcole?.codeAutoEcoleUnique || 'ecole'}.csv`)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs flex items-center space-x-1.5 transition shadow-xs"
                  title="Exporter le journal d'activité en CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => exportLogsToJSON(logs, `logs_audit_${autoEcole?.codeAutoEcoleUnique || 'ecole'}.json`)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs flex items-center space-x-1.5 transition shadow-xs"
                  title="Exporter le journal d'activité en JSON"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-white">
              <div className="divide-y divide-slate-800">
                {logs.map((log) => (
                  <div key={log._id} className="p-4 hover:bg-slate-800/40 transition text-xs flex items-start space-x-3">
                    <div className="p-2 rounded-xl bg-slate-800 text-blue-400 shrink-0 border border-slate-700">
                      <History className="w-4 h-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{log.actorName}</span>
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

        {/* TAB 7: PROGRAMME & LEÇONS (CURRICULUM MANAGEMENT) */}
        {activeTab === 'programme' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="p-2 bg-purple-50 text-purple-700 rounded-xl">
                    <BookOpen className="w-5 h-5" />
                  </span>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Gestion Pédagogique du Programme de Code
                  </h2>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Configurez le contenu des modules, ajoutez des leçons vidéo, gérez les mini-quiz et définissez les seuils de réussite exigés pour vos élèves.
                </p>
              </div>

              <button
                onClick={() => handleOpenModuleModal()}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau Module de Formation</span>
              </button>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules
                .sort((a, b) => a.ordre - b.ordre)
                .map((mod) => (
                  <div
                    key={mod._id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-slate-300 transition space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                            {mod.code || `MOD-00${mod.ordre}`}
                          </span>
                          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            Ordre #{mod.ordre}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleOpenModuleModal(mod)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Modifier le module"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteModule(mod._id)}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Supprimer le module"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-black text-slate-900 tracking-tight">
                          {mod.title}
                        </h3>
                        <p className="text-xs text-slate-600 font-medium mt-1 line-clamp-2">
                          {mod.summary || mod.description || 'Aucun résumé défini.'}
                        </p>
                      </div>

                      {/* Learning Objectives */}
                      {mod.learningObjectives && mod.learningObjectives.length > 0 && (
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Objectifs Pédagogiques ({mod.learningObjectives.length})
                          </p>
                          <ul className="text-xs text-slate-700 font-medium space-y-0.5">
                            {mod.learningObjectives.slice(0, 3).map((obj, i) => (
                              <li key={i} className="flex items-center space-x-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                                <span className="truncate">{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Config Metrics Pills */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="bg-blue-50/70 border border-blue-200 p-2.5 rounded-xl text-blue-900 font-medium">
                          <span className="block text-[10px] uppercase font-bold text-blue-700">Visionnage Vidéo</span>
                          <span className="font-bold">Min : {mod.tempsMinimumVisionnage}s</span> ({Math.round((mod.tempsMinimumVisionnage / (mod.durationSeconds || 180)) * 100)}%)
                        </div>

                        <div className="bg-emerald-50/70 border border-emerald-200 p-2.5 rounded-xl text-emerald-900 font-medium">
                          <span className="block text-[10px] uppercase font-bold text-emerald-700">Seuil Requis Quiz</span>
                          <span className="font-bold font-mono text-xs">{mod.scoreMinimumQuiz}% de bonnes réponses</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Cards: Lessons & Quiz Config */}
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenLessonModal(mod)}
                        className="p-2.5 bg-slate-50 hover:bg-purple-50 hover:border-purple-300 border border-slate-200 rounded-xl text-slate-700 hover:text-purple-900 font-bold text-xs flex items-center justify-between transition"
                      >
                        <div className="flex items-center space-x-1.5">
                          <Video className="w-3.5 h-3.5 text-purple-600" />
                          <span>Leçons ({mod.lecons?.length || 0})</span>
                        </div>
                        <span className="text-[10px] font-mono text-purple-700">Gérer →</span>
                      </button>

                      <button
                        onClick={() => handleOpenQuizModal(mod)}
                        className="p-2.5 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 rounded-xl text-slate-700 hover:text-blue-900 font-bold text-xs flex items-center justify-between transition"
                      >
                        <div className="flex items-center space-x-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                          <span>Quiz ({mod.quiz?.questions?.length || 0} Q)</span>
                        </div>
                        <span className="text-[10px] font-mono text-blue-700">Éditer →</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MODAL: NEW ELEVE */}
      {showEleveModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900">Inscrire un Nouvel Élève</h3>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nom Complet Élève *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Jean Dupont"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Élève *</label>
                  <input
                    type="email"
                    required
                    placeholder="jean.dupont@email.fr"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Téléphone</label>
                  <input
                    type="text"
                    placeholder="06 12 34 56 78"
                    value={newStudentPhone}
                    onChange={(e) => setNewStudentPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Mot de passe initial *</label>
                <input
                  type="password"
                  required
                  value={newStudentPassword}
                  onChange={(e) => setNewStudentPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Date Début Formation *</label>
                  <input
                    type="date"
                    required
                    value={newStudentStartDate}
                    onChange={(e) => setNewStudentStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Date Fin (Blocage Auto) *
                  </label>
                  <input
                    type="date"
                    required
                    value={newStudentEndDate}
                    onChange={(e) => setNewStudentEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEleveModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Générer Inscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CSV BULK IMPORT */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 text-slate-900 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Importation Groupée d'Élèves (CSV)</h3>
                  <p className="text-xs text-slate-500 font-medium">Ajoutez rapidement plusieurs élèves à votre établissement</p>
                </div>
              </div>
              <button
                onClick={() => setShowCsvModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Actions: Download Template & Upload */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <span className="font-bold text-slate-700">Format attendu : Nom, Email, Téléphone, Password, DateDébut, DateFin</span>
              </div>
              <button
                type="button"
                onClick={downloadCsvTemplate}
                className="inline-flex items-center space-x-1 px-3 py-1.5 bg-white border border-slate-200 text-purple-700 hover:bg-purple-50 rounded-lg font-bold shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger Modèle CSV</span>
              </button>
            </div>

            {/* Input Options: File picker OR raw text */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  1. Sélectionner un fichier .CSV
                </label>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileUpload}
                  className="w-full text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Ou 2. Coller directement le contenu CSV
                </label>
                <textarea
                  rows={4}
                  placeholder="Nom,Email,Téléphone,MotDePasse,DateDebut,DateFin&#10;Jean Dupont,jean.dupont@email.fr,0612345678,pass123,2026-08-01,2027-02-01"
                  value={csvInputText}
                  onChange={(e) => {
                    setCsvInputText(e.target.value);
                    parseCsvString(e.target.value);
                  }}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* Preview Parsed Rows */}
              {csvParsedRows.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      Aperçu des élèves détectés ({csvParsedRows.length})
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Format Valide
                    </span>
                  </div>

                  <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-[11px] text-slate-700">
                      <thead className="bg-slate-100 text-slate-500 font-bold uppercase text-[9px] sticky top-0">
                        <tr>
                          <th className="p-2">Nom</th>
                          <th className="p-2">Email</th>
                          <th className="p-2">Téléphone</th>
                          <th className="p-2">Fin Formation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {csvParsedRows.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="p-2 font-bold text-slate-900">{row.name}</td>
                            <td className="p-2 font-mono text-slate-600">{row.email}</td>
                            <td className="p-2 text-slate-500">{row.phone || '-'}</td>
                            <td className="p-2 font-mono text-slate-500">{row.dateFinFormation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Import Results Summary */}
              {csvImportResult && (
                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    csvImportResult.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  <div className="flex items-center space-x-2 font-bold">
                    {csvImportResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                    <span>
                      {csvImportResult.importedCount !== undefined
                        ? `Importation terminée : ${csvImportResult.importedCount} élèves créés avec succès.`
                        : 'Résultat de l\'importation'}
                    </span>
                  </div>

                  {csvImportResult.errors && csvImportResult.errors.length > 0 && (
                    <div className="text-[11px] space-y-1">
                      <p className="font-bold text-red-700">Alertes / Avertissements ({csvImportResult.errors.length}) :</p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 font-mono">
                        {csvImportResult.errors.map((err: string, idx: number) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowCsvModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs"
              >
                Fermer
              </button>
              <button
                type="button"
                disabled={csvImportLoading || csvParsedRows.length === 0}
                onClick={handleExecuteCsvImport}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-xs text-xs flex items-center space-x-1.5"
              >
                {csvImportLoading ? (
                  <span>Importation en cours...</span>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>Lancer L'Importation ({csvParsedRows.length})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT ELEVE */}
      {selectedEleveForEdit && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900">
              Modifier l'Élève — {selectedEleveForEdit.codeEleveUnique}
            </h3>

            <form onSubmit={handleUpdateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nom Complet</label>
                <input
                  type="text"
                  value={selectedEleveForEdit.userDetail?.name || ''}
                  onChange={(e) =>
                    setSelectedEleveForEdit({
                      ...selectedEleveForEdit,
                      userDetail: { ...selectedEleveForEdit.userDetail, name: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Date Début</label>
                  <input
                    type="date"
                    value={selectedEleveForEdit.dateDebutFormation}
                    onChange={(e) =>
                      setSelectedEleveForEdit({
                        ...selectedEleveForEdit,
                        dateDebutFormation: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Date Fin (Blocage Auto)</label>
                  <input
                    type="date"
                    value={selectedEleveForEdit.dateFinFormation}
                    onChange={(e) =>
                      setSelectedEleveForEdit({
                        ...selectedEleveForEdit,
                        dateFinFormation: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="blockCheck"
                  checked={selectedEleveForEdit.isBlocked}
                  onChange={(e) =>
                    setSelectedEleveForEdit({
                      ...selectedEleveForEdit,
                      isBlocked: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-red-600 bg-slate-50 border-slate-300"
                />
                <label htmlFor="blockCheck" className="text-red-600 font-bold">
                  Bloquer / Suspendre manuellement l'accès aux cours
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedEleveForEdit(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DETAILED PROGRESSION INSPECTOR */}
      {selectedEleveForProg && eleveProgressionData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 text-slate-900 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="font-mono text-xs text-emerald-700 font-bold">
                  {selectedEleveForProg.codeEleveUnique}
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {selectedEleveForProg.userDetail?.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEleveForProg(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600 font-medium">
                Progression Globale :{' '}
                <strong className="text-emerald-700 text-sm font-black">
                  {eleveProgressionData.eleve?.progressionGlobal}%
                </strong>
              </p>

              <div className="space-y-2">
                {eleveProgressionData.structuredProgression?.map((sp: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{sp.module.title}</p>
                      <p className="text-slate-500 text-[11px] font-medium">
                        Temps de vidéo vu : {sp.progression?.videoWatchTimeSeconds || 0}s / {sp.module.tempsMinimumVisionnage}s requis
                      </p>
                    </div>

                    <div className="text-right">
                      {sp.isValidated ? (
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px]">
                          Module Validé ({sp.progression?.quizScore}%)
                        </span>
                      ) : sp.isLocked ? (
                        <span className="px-2.5 py-1 bg-slate-200 text-slate-600 rounded-full font-bold text-[10px]">
                          Verrouillé
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-bold text-[10px]">
                          En Cours
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CERTIFICATE DIPLOMA PREVIEW */}
      {selectedCertPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-slate-900 dark:text-white space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Aperçu du Certificat Officiel
                </h3>
              </div>
              <button
                onClick={() => setSelectedCertPreview(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold p-1 rounded-lg text-sm"
              >
                ✕
              </button>
            </div>

            {/* Render node for DOM capture */}
            <div
              id="certificate-render-node"
              className="bg-white text-slate-900 p-8 rounded-xl border-4 border-double border-amber-500 shadow-md relative overflow-hidden space-y-6 font-sans text-center"
              style={{
                backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #fefce8 100%)',
              }}
            >
              {/* Header section with Auto-école Branding */}
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
                <div className="flex items-center space-x-3 text-left">
                  {selectedCertPreview.autoEcole?.logo ? (
                    <img
                      src={selectedCertPreview.autoEcole.logo}
                      alt="Logo"
                      className="w-12 h-12 object-contain rounded-lg border border-slate-200 p-1 bg-white"
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-xs"
                      style={{ backgroundColor: selectedCertPreview.autoEcole?.couleursTheme?.primaryColor || primaryColor }}
                    >
                      <School className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-black text-slate-900 text-base leading-tight uppercase">
                      {selectedCertPreview.autoEcole?.name || autoEcole?.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-bold">
                      Code Établissement : {selectedCertPreview.autoEcole?.codeAutoEcoleUnique || autoEcole?.codeAutoEcoleUnique}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-1 rounded-full border border-amber-300 uppercase tracking-wide">
                    MATOA SaaS Certifié
                  </span>
                </div>
              </div>

              {/* Title Header */}
              <div className="py-2 space-y-1">
                <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                  ATTESTATION DE RÉUSSITE
                </h1>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                  Formation Théorique au Code de la Route
                </p>
              </div>

              {/* Recipient Details */}
              <div className="my-6 space-y-2">
                <p className="text-xs text-slate-500 italic">Le présent certificat est décerné officiellement à :</p>
                <div className="text-2xl font-black text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4 py-1">
                  {selectedCertPreview.user?.name || 'Nom Élève'}
                </div>
                <p className="text-xs font-mono text-slate-600 font-bold">
                  Code Unique Élève : {selectedCertPreview.eleve?.codeEleveUnique}
                </p>
              </div>

              {/* Verification Text */}
              <p className="text-xs text-slate-700 leading-relaxed max-w-lg mx-auto font-medium">
                Pour avoir suivi et validé l'intégralité des modules de formation théorique de sécurité routière avec un score de validation global de <span className="font-bold text-emerald-700">100%</span>.
              </p>

              {/* Code & Signatures */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4 text-left items-end">
                <div className="space-y-1 text-[11px] text-slate-600">
                  <p className="font-mono font-bold text-slate-900">
                    Code : {selectedCertPreview.certificat?.certificateCode}
                  </p>
                  <p>
                    Date d'émission :{' '}
                    {selectedCertPreview.certificat?.dateEmission
                      ? new Date(selectedCertPreview.certificat.dateEmission).toLocaleDateString('fr-FR')
                      : 'N/A'}
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <div className="inline-block border-2 border-emerald-600 rounded-xl p-2 bg-emerald-50 text-emerald-800 text-[10px] font-bold text-center shadow-2xs">
                    <ShieldCheck className="w-4 h-4 mx-auto text-emerald-600 mb-0.5" />
                    <span>CACHET NUMÉRIQUE VALIDÉ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setSelectedCertPreview(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 transition"
              >
                Fermer
              </button>

              <button
                onClick={() => handleDownloadPdfCertificate(selectedCertPreview)}
                disabled={isExportingPdf}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: MODULE EDITOR / CREATOR */}
      {showModuleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 text-slate-900 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {editingModule ? 'Éditer le Module de Formation' : 'Nouveau Module de Formation'}
              </h3>
              <button
                onClick={() => setShowModuleModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModule} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Code Module *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: MOD-001"
                    value={modCode}
                    onChange={(e) => setModCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">Titre du Module *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Signalisation et Règles de Circulation"
                    value={modTitle}
                    onChange={(e) => setModTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Résumé & Objectifs Globaux *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Présentation des principales règles de priorité, panneaux routiers..."
                  value={modSummary}
                  onChange={(e) => setModSummary(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Objectifs Pédagogiques (1 par ligne)
                </label>
                <textarea
                  rows={3}
                  placeholder="Comprenne les panneaux d'interdiction&#10;Maîtrise la priorité à droite&#10;Sache identifier les usagers vulnérables"
                  value={modObjectives}
                  onChange={(e) => setModObjectives(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-600 font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">URL Vidéo Principale *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={modVideoUrl}
                    onChange={(e) => setModVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Ordre dans le Parcours *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={modOrdre}
                    onChange={(e) => setModOrdre(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Durée Vidéo (s)</label>
                  <input
                    type="number"
                    min="30"
                    value={modDurationSeconds}
                    onChange={(e) => setModDurationSeconds(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Visionnage Requis (%)</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={modMinWatchPct}
                    onChange={(e) => setModMinWatchPct(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Seuil Quiz (%)</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={modQuizScoreMin}
                    onChange={(e) => setModQuizScoreMin(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono font-bold text-purple-700"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModuleModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs"
                >
                  {editingModule ? 'Enregistrer les Modifications' : 'Créer le Module'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LESSONS CONFIGURATOR */}
      {showLessonModal && selectedModForLessons && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 text-slate-900 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {selectedModForLessons.code}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  Gestion des Leçons — {selectedModForLessons.title}
                </h3>
              </div>
              <button
                onClick={() => setShowLessonModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            {/* List of current lessons */}
            <div className="space-y-4 text-xs">
              {lessonsList.map((lec, lIdx) => (
                <div key={lIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Leçon #{lIdx + 1}</span>
                    <button
                      onClick={() => setLessonsList(lessonsList.filter((_, i) => i !== lIdx))}
                      className="text-red-600 hover:text-red-800 font-bold text-[11px] hover:bg-red-50 p-1 rounded"
                    >
                      Supprimer
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Titre Leçon</label>
                      <input
                        type="text"
                        value={lec.title}
                        onChange={(e) => {
                          const updated = [...lessonsList];
                          updated[lIdx].title = e.target.value;
                          setLessonsList(updated);
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Ordre</label>
                      <input
                        type="number"
                        value={lec.ordre}
                        onChange={(e) => {
                          const updated = [...lessonsList];
                          updated[lIdx].ordre = Number(e.target.value);
                          setLessonsList(updated);
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">URL Vidéo Leçon</label>
                    <input
                      type="url"
                      value={lec.videoUrl}
                      onChange={(e) => {
                        const updated = [...lessonsList];
                        updated[lIdx].videoUrl = e.target.value;
                        setLessonsList(updated);
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Description Pédagogique</label>
                    <textarea
                      rows={2}
                      value={lec.description}
                      onChange={(e) => {
                        const updated = [...lessonsList];
                        updated[lIdx].description = e.target.value;
                        setLessonsList(updated);
                      }}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setLessonsList([
                    ...lessonsList,
                    {
                      _id: `lec-${Date.now()}`,
                      _type: 'lecon',
                      title: `Nouvelle Leçon ${lessonsList.length + 1}`,
                      ordre: lessonsList.length + 1,
                      description: 'Explication détaillée de la leçon.',
                      videoUrl: selectedModForLessons.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                      durationSeconds: 120,
                      tempsMinimumVisionnageSeconds: 90,
                      hasInlineQuiz: true,
                    },
                  ])
                }
                className="w-full py-2.5 border-2 border-dashed border-purple-300 hover:border-purple-500 bg-purple-50/50 hover:bg-purple-50 text-purple-800 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une Leçon</span>
              </button>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setShowLessonModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveLessons}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs text-xs"
              >
                Enregistrer les Leçons
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: QUIZ CONFIGURATOR */}
      {showQuizModal && selectedModForQuiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 text-slate-900 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedModForQuiz.code}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  Configuration du Quiz du Module — {selectedModForQuiz.title}
                </h3>
              </div>
              <button
                onClick={() => setShowQuizModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Quiz Parameters: Timer & Threshold */}
            <div className="grid grid-cols-2 gap-4 bg-blue-50/60 p-4 rounded-xl border border-blue-200 text-xs">
              <div>
                <label className="block font-bold text-blue-900 mb-1">Timer Chrono (Minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={Math.round(quizTimerSecs / 60)}
                  onChange={(e) => setQuizTimerSecs(Number(e.target.value) * 60)}
                  className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl font-mono text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-blue-900 mb-1">Seuil de Réussite Exigé (%)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={quizPassingScore}
                  onChange={(e) => setQuizPassingScore(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl font-mono text-emerald-700 font-black"
                />
              </div>
            </div>

            {/* Questions List Builder */}
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Questions du Quiz ({quizQuestionsList.length})
              </h4>

              {quizQuestionsList.map((q, qIdx) => (
                <div key={qIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">Question #{qIdx + 1}</span>
                    <button
                      onClick={() => setQuizQuestionsList(quizQuestionsList.filter((_, i) => i !== qIdx))}
                      className="text-red-600 hover:text-red-800 font-bold text-[11px] hover:bg-red-50 p-1 rounded"
                    >
                      Supprimer Question
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Énoncé de la Question *</label>
                    <input
                      type="text"
                      required
                      value={q.questionText}
                      onChange={(e) => {
                        const updated = [...quizQuestionsList];
                        updated[qIdx].questionText = e.target.value;
                        setQuizQuestionsList(updated);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  {/* 4 Choices */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-[11px] font-bold text-slate-700">Options de Réponse (Cochez la bonne option) :</label>
                    {q.options?.map((optStr, oIdx) => (
                      <div key={oIdx} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`correct-opt-${qIdx}`}
                          checked={q.correctOptionIndex === oIdx}
                          onChange={() => {
                            const updated = [...quizQuestionsList];
                            updated[qIdx].correctOptionIndex = oIdx;
                            setQuizQuestionsList(updated);
                          }}
                          className="text-purple-600 focus:ring-purple-500 shrink-0"
                        />
                        <input
                          type="text"
                          value={optStr}
                          onChange={(e) => {
                            const updated = [...quizQuestionsList];
                            updated[qIdx].options[oIdx] = e.target.value;
                            setQuizQuestionsList(updated);
                          }}
                          className={`w-full px-3 py-1.5 rounded-lg border text-xs ${
                            q.correctOptionIndex === oIdx
                              ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-900'
                              : 'bg-white border-slate-200 text-slate-800'
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Explication Pédagogique (Correction)</label>
                    <textarea
                      rows={2}
                      placeholder="Explication affichée à l'élève lors de la correction immédiate..."
                      value={q.explanation || ''}
                      onChange={(e) => {
                        const updated = [...quizQuestionsList];
                        updated[qIdx].explanation = e.target.value;
                        setQuizQuestionsList(updated);
                      }}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setQuizQuestionsList([
                    ...quizQuestionsList,
                    {
                      questionText: 'Nouvelle question de code...',
                      options: ['Option A', 'Option B', 'Option C', 'Option D'],
                      correctOptionIndex: 0,
                      explanation: 'Explication théorique selon le code de la route.',
                    },
                  ])
                }
                className="w-full py-2.5 border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50 text-blue-800 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une Question au Quiz</span>
              </button>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setShowQuizModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveQuizConfig}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs text-xs"
              >
                Enregistrer le Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
