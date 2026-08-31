import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { exportStudentsToCSV, exportCoursesToCSV, exportDashboardStatsToPDF, exportLogsToCSV, exportLogsToJSON } from '../lib/exportService';
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
  Lock,
  Info,
} from 'lucide-react';

export const AutoEcoleDashboard: React.FC = () => {
  const { token, autoEcole, updateAutoEcoleBranding } = useAuth();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'overview' | 'branding' | 'eleves' | 'progression' | 'certificats' | 'logs'>('overview');

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

  // Advanced Filter & Sort State
  const [progressionTierFilter, setProgressionTierFilter] = useState<'ALL' | 'NOT_STARTED' | 'TIER_1_49' | 'TIER_50_99' | 'COMPLETED_100'>('ALL');
  const [certificatStatusFilter, setCertificatStatusFilter] = useState<'ALL' | 'NOT_ELIGIBLE' | 'ELIGIBLE' | 'GENERE' | 'TELECHARGE'>('ALL');
  const [sortBy, setSortBy] = useState<'RECENT' | 'PROG_DESC' | 'PROG_ASC' | 'NAME_ASC' | 'NAME_DESC'>('RECENT');

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

  // Programmes Permis
  const [programmesPermis, setProgrammesPermis] = useState<any[]>([]);
  const [newStudentTypePermis, setNewStudentTypePermis] = useState('B');
  const [newStudentProgId, setNewStudentProgId] = useState('');
  const [permitFilter, setPermitFilter] = useState<string>('ALL');

  // Quick Student Search & Logo File Upload State
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [showQuickSearchDropdown, setShowQuickSearchDropdown] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);

  const matchingQuickStudents = React.useMemo(() => {
    if (!quickSearchQuery || quickSearchQuery.trim().length === 0) return [];
    const q = quickSearchQuery.toLowerCase().trim();
    return eleves.filter((e) => {
      const name = e.userDetail?.name?.toLowerCase() || '';
      const code = e.codeEleveUnique?.toLowerCase() || '';
      const email = e.userDetail?.email?.toLowerCase() || '';
      const phone = (e.telephone || e.userDetail?.phone || '').toLowerCase();
      const permis = (e.typePermis || 'B').toLowerCase();
      return (
        name.includes(q) ||
        code.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        `permis ${permis}`.includes(q)
      );
    }).slice(0, 8);
  }, [quickSearchQuery, eleves]);

  const filteredAndSortedEleves = React.useMemo(() => {
    return eleves
      .filter((e) => {
        // 1. Search query
        const matchesSearch =
          !eleveSearch ||
          e.userDetail?.name?.toLowerCase().includes(eleveSearch.toLowerCase()) ||
          e.codeEleveUnique?.toLowerCase().includes(eleveSearch.toLowerCase()) ||
          e.userDetail?.email?.toLowerCase().includes(eleveSearch.toLowerCase());

        if (!matchesSearch) return false;

        // 2. Permit filter
        if (permitFilter !== 'ALL' && (e.typePermis || 'B') !== permitFilter) return false;

        // 3. Status filter
        if (statusFilter === 'EXPIRED' && !e.isExpired) return false;
        if (statusFilter === 'BLOCKED' && (!e.isBlocked || e.isExpired)) return false;
        if (statusFilter === 'COMPLETED' && e.progressionGlobal !== 100) return false;
        if (statusFilter === 'NOT_STARTED' && (e.progressionGlobal !== 0 || e.isExpired || e.isBlocked)) return false;
        if (statusFilter === 'IN_PROGRESS' && (e.progressionGlobal === 0 || e.progressionGlobal === 100 || e.isExpired || e.isBlocked)) return false;

        // 4. Progression Tier filter
        const prog = e.progressionGlobal || 0;
        if (progressionTierFilter === 'NOT_STARTED' && prog !== 0) return false;
        if (progressionTierFilter === 'TIER_1_49' && (prog < 1 || prog > 49)) return false;
        if (progressionTierFilter === 'TIER_50_99' && (prog < 50 || prog > 99)) return false;
        if (progressionTierFilter === 'COMPLETED_100' && prog !== 100) return false;

        // 5. Certificate Status filter
        if (certificatStatusFilter !== 'ALL') {
          const certItem = certificates.find((c) => {
            const elId = typeof c.eleve === 'string' ? c.eleve : c.eleve?._id;
            return elId === e._id;
          });
          const hasCert = !!certItem?.certificat;
          const certStatus = certItem?.certificat?.status;

          if (certificatStatusFilter === 'NOT_ELIGIBLE' && prog === 100) return false;
          if (certificatStatusFilter === 'ELIGIBLE' && (prog < 100 || hasCert)) return false;
          if (certificatStatusFilter === 'GENERE' && (!hasCert || certStatus !== 'GENERE')) return false;
          if (certificatStatusFilter === 'TELECHARGE' && (!hasCert || certStatus !== 'TELECHARGE')) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'PROG_DESC') return (b.progressionGlobal || 0) - (a.progressionGlobal || 0);
        if (sortBy === 'PROG_ASC') return (a.progressionGlobal || 0) - (b.progressionGlobal || 0);
        if (sortBy === 'NAME_ASC') return (a.userDetail?.name || '').localeCompare(b.userDetail?.name || '');
        if (sortBy === 'NAME_DESC') return (a.userDetail?.name || '').localeCompare(a.userDetail?.name || '');
        return 0;
      });
  }, [eleves, eleveSearch, permitFilter, statusFilter, progressionTierFilter, certificatStatusFilter, sortBy, certificates]);

  const handleLogoFileChange = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setFeedback({ type: 'error', text: 'Veuillez sélectionner un fichier image valide (PNG, JPG, SVG, WebP).' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFeedback({ type: 'error', text: 'L\'image dépasse 5 Mo. Veuillez choisir une image plus légère.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target?.result as string;
      if (base64Data) {
        setLogoUrl(base64Data);
        setFeedback({ type: 'success', text: `Logo "${file.name}" importé avec succès depuis votre terminal ! Cliquez sur "Enregistrer" pour appliquer.` });
      }
    };
    reader.readAsDataURL(file);
  };

  // Feedback
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchStats();
    fetchEleves();
    fetchLogs();
    fetchCertificates();
    fetchModules();
    fetchProgrammesPermis();
  }, [token]);

  const fetchProgrammesPermis = async () => {
    try {
      const res = await fetch('/api/programmes-permis', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setProgrammesPermis(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

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
    if (!filteredAndSortedEleves || filteredAndSortedEleves.length === 0) {
      setFeedback({ type: 'error', text: 'Aucun élève correspondant aux filtres à exporter.' });
      return;
    }

    const filtered = filteredAndSortedEleves;

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
      setModVideoUrl('');
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
          typePermis: newStudentTypePermis,
          programmePermisId: newStudentProgId || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de l\'inscription de l\'élève.');

      setFeedback({
        type: 'success',
        text: `Élève ${newStudentName} inscrit (Permis ${newStudentTypePermis}) avec le code unique ${data.codeEleveUnique} !`,
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
          typePermis: selectedEleveForEdit.typePermis || 'B',
          programmePermisId: selectedEleveForEdit.programmePermisId || undefined,
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
                  {t('uniqueCode')} : {autoEcole?.codeAutoEcoleUnique}
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">{autoEcole?.name}</h1>
              <p className="text-xs text-slate-500 italic">
                "{autoEcole?.slogan || t('theoreticalLearningPlatform')}"
              </p>
            </div>
          </div>

          {/* Quick Search Bar for Instant Student Lookup */}
          <div className="relative flex-1 max-w-md w-full my-2 md:my-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder={t('quickSearchStudentPlaceholder')}
                value={quickSearchQuery}
                onChange={(e) => {
                  setQuickSearchQuery(e.target.value);
                  setShowQuickSearchDropdown(true);
                }}
                onFocus={() => setShowQuickSearchDropdown(true)}
                className="w-full pl-10 pr-9 py-2 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs transition"
              />
              {quickSearchQuery && (
                <button
                  onClick={() => {
                    setQuickSearchQuery('');
                    setShowQuickSearchDropdown(false);
                  }}
                  className="absolute right-3 top-2 text-slate-400 hover:text-slate-600 text-xs font-bold p-0.5"
                  title={t('clearSearch')}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Search Auto-complete Dropdown */}
            {showQuickSearchDropdown && quickSearchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/80 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>{t('foldersFound', { count: matchingQuickStudents.length })}</span>
                  <button
                    onClick={() => setShowQuickSearchDropdown(false)}
                    className="text-slate-400 hover:text-slate-600 text-[10px]"
                  >
                    {t('close')}
                  </button>
                </div>

                {matchingQuickStudents.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500 font-medium">
                    {t('noStudentMatching', { query: quickSearchQuery })}
                  </div>
                ) : (
                  matchingQuickStudents.map((st) => (
                    <div
                      key={st._id}
                      className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer"
                      onClick={() => {
                        setEleveSearch(st.codeEleveUnique || st.userDetail?.name || '');
                        setActiveTab('eleves');
                        setShowQuickSearchDropdown(false);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-black text-xs flex items-center justify-center border border-blue-200/60 shrink-0">
                          {(st.userDetail?.name || 'E').slice(0, 2).toUpperCase()}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                              {st.userDetail?.name}
                            </h4>
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                              {st.codeEleveUnique}
                            </span>
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                              {t('permisPrefix')} {st.typePermis || 'B'}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            <span>{st.userDetail?.email}</span>
                            {st.telephone && <span>• {t('telPrefix')} {st.telephone}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 self-end sm:self-center shrink-0">
                        <div className="text-right mr-2 hidden sm:block">
                          <span className="text-xs font-black text-slate-900 dark:text-white">
                            {st.progressionGlobal || 0}%
                          </span>
                          <p className="text-[9px] text-slate-400">{t('progress')}</p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInspectProgression(st);
                            setShowQuickSearchDropdown(false);
                          }}
                          className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-bold rounded-lg text-[10px] border border-blue-200 dark:border-blue-800 transition"
                        >
                          {t('tracking')}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEleveForEdit(st);
                            setShowQuickSearchDropdown(false);
                          }}
                          className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-bold rounded-lg text-[10px] border border-slate-200 dark:border-slate-700 transition"
                        >
                          {t('edit')}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => exportDashboardStatsToPDF(`Statistiques - ${autoEcole?.name || 'Auto-École'}`, stats, eleves)}
              className="inline-flex items-center space-x-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs transition"
              title={t('exportPdf')}
            >
              <Download className="w-4 h-4 text-red-500" />
              <span>{t('exportPdf')}</span>
            </button>

            <button
              onClick={() => exportStudentsToCSV(eleves, `eleves_${autoEcole?.codeAutoEcoleUnique || 'autoecole'}.csv`)}
              className="inline-flex items-center space-x-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs transition"
              title={t('exportCsv')}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>{t('csvStudents')}</span>
            </button>

            <button
              onClick={() => exportCoursesToCSV(modules, `cours_modules_${autoEcole?.codeAutoEcoleUnique || 'autoecole'}.csv`)}
              className="inline-flex items-center space-x-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs transition"
              title={t('exportCoursesCsv')}
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{t('csvCourses')}</span>
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
            <span>{t('tabOverview')}</span>
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
            <span>{t('tabBranding')}</span>
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
            <span>{t('tabStudents', { count: eleves.length })}</span>
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
            <span>{t('tabProgression')}</span>
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
            <span>{t('tabCertificates', { count: certificates.filter(c => c.certificat).length })}</span>
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
            <span>{t('tabSchoolLogs')}</span>
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
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('totalStudents')}</p>
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-900/50">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">{stats?.totalStudents || 0}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">{t('studentsUnderSchool')}</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('activeTrainingStatus')}</p>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                    <UserCheck className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">{stats?.activeStudents || 0}</h3>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-bold">{t('validNonExpiredPeriod')}</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('averageProgress')}</p>
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-xl border border-purple-100 dark:border-purple-900/50">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">{stats?.avgProgress || 0}%</h3>
                <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-1 font-bold">{t('avgProgressCourses')}</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('expiredTrainings')}</p>
                  <div className="p-2 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-100 dark:border-amber-900/50">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">{stats?.expiredStudents || 0}</h3>
                <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-bold">{t('autoBlocked')}</p>
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
                      {t('moduleSuccessRate')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('moduleSuccessRateSubSchool')}</p>
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-xs"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {t('schoolStatsChip')}
                  </span>
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
                  <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">{t('studentsStatusTitle')}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('trainingStatusDistribution')}</p>
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
                      {t('studentEnrollmentEvolution')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('monthlyEnrollmentEvolution')}</p>
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
                        name={t('studentEnrollmentLegend')}
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
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-4 tracking-tight">{t('latestRegisteredStudents')}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
                  <thead className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-400 dark:text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <tr>
                      <th className="p-3 rounded-l-lg">{t('firstLastNameTh')}</th>
                      <th className="p-3">{t('studentUniqueCodeTh')}</th>
                      <th className="p-3">{t('trainingEndTh')}</th>
                      <th className="p-3">{t('progress')}</th>
                      <th className="p-3">{t('accessStatus')}</th>
                      <th className="p-3 rounded-r-lg text-right">{t('action')}</th>
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
                              {t('expired')}
                            </span>
                          ) : el.isBlocked ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                              {t('blocked')}
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {t('active')}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleInspectProgression(el)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-bold"
                          >
                            {t('details')}
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
                <span>{t('studentSpaceCustomization')}</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {t('brandingSubtitle')}
              </p>

              <div className="space-y-4 text-xs pt-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 flex items-center justify-between">
                    <span>{t('schoolLogo')}</span>
                    <span className="text-[10px] text-slate-500 font-normal">{t('directImportOrUrl')}</span>
                  </label>

                  {/* Direct Terminal/Device File Dropzone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingLogo(true);
                    }}
                    onDragLeave={() => setIsDraggingLogo(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingLogo(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleLogoFileChange(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-4 border-2 border-dashed rounded-2xl transition text-center cursor-pointer ${
                      isDraggingLogo
                        ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/40'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/40 hover:bg-slate-100/80 dark:hover:bg-slate-800'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleLogoFileChange(e.target.files[0]);
                        }
                      }}
                    />

                    {logoUrl ? (
                      <div className="flex items-center justify-center space-x-4">
                        <img
                          src={logoUrl}
                          alt="Aperçu Logo"
                          className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-white p-1 shadow-sm"
                        />
                        <div className="text-left">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
                            <span>{t('logoLoaded')}</span>
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {t('clickToChangeImage')}
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLogoUrl('');
                            }}
                            className="text-[10px] text-red-600 hover:underline font-bold mt-1"
                          >
                            {t('deleteLogo')}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 py-1">
                        <UploadCloud className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto" />
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {t('importFromDevice')}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {t('dragDropLogoHelp')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fallback URL Input */}
                  <div className="mt-2.5">
                    <details className="text-[11px] text-slate-500 dark:text-slate-400">
                      <summary className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer font-medium">
                        {t('orPasteDirectUrl')}
                      </summary>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        className="w-full px-3 py-2 mt-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-xs focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-600"
                      />
                    </details>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      {t('primaryColorHint')}
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
                      {t('secondaryColorHint')}
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
                    {t('sloganOrWelcome')}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t('sloganWelcomePlaceholder')}
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
                  {t('saveAndApplyBrand')}
                </button>
              </div>
            </div>

            {/* Live Preview */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-700">{t('livePreview')}</h3>
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
              <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{t('studentsManagementTitle')}</h2>

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

                {/* Permit Type Filter Dropdown */}
                <select
                  value={permitFilter}
                  onChange={(e) => setPermitFilter(e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                >
                  <option value="ALL">{t('allPermitsOption')}</option>
                  <option value="B">{t('permisBOption')}</option>
                </select>

                <button
                  type="button"
                  onClick={handleExportStudentsCSV}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs flex items-center space-x-1.5"
                  title={t('exportFilteredCsv')}
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

            {/* Advanced Filter Toolbar */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300 font-bold pr-2 border-r border-slate-200 dark:border-slate-700">
                  <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{t('advancedFilters')}</span>
                </div>

                {/* Progression Filter */}
                <div className="flex items-center space-x-1 bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold text-slate-500 dark:text-slate-400">{t('progressionFilterLabel')}</span>
                  <select
                    value={progressionTierFilter}
                    onChange={(e) => setProgressionTierFilter(e.target.value as any)}
                    className="bg-transparent font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">{t('allProgressionsOption')}</option>
                    <option value="NOT_STARTED">{t('notStartedProgOption')}</option>
                    <option value="TIER_1_49">{t('tier1to49Option')}</option>
                    <option value="TIER_50_99">{t('tier50to99Option')}</option>
                    <option value="COMPLETED_100">{t('completed100Option')}</option>
                  </select>
                </div>

                {/* Certificate Status Filter */}
                <div className="flex items-center space-x-1 bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-semibold text-slate-500 dark:text-slate-400">{t('certificateFilterLabel')}</span>
                  <select
                    value={certificatStatusFilter}
                    onChange={(e) => setCertificatStatusFilter(e.target.value as any)}
                    className="bg-transparent font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">{t('allCertificatesOption')}</option>
                    <option value="NOT_ELIGIBLE">{t('notEligibleCertOption')}</option>
                    <option value="ELIGIBLE">{t('eligibleCertOption')}</option>
                    <option value="GENERE">{t('generatedCertOption')}</option>
                    <option value="TELECHARGE">{t('downloadedCertOption')}</option>
                  </select>
                </div>

                {/* Sort By Filter */}
                <div className="flex items-center space-x-1 bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">{t('sortByLabel')}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="RECENT">{t('recentEnrollmentsSort')}</option>
                    <option value="PROG_DESC">{t('progDescSort')}</option>
                    <option value="PROG_ASC">{t('progAscSort')}</option>
                    <option value="NAME_ASC">{t('nameAscSort')}</option>
                    <option value="NAME_DESC">{t('nameDescSort')}</option>
                  </select>
                </div>
              </div>

              {/* Reset Filters button if active */}
              {(progressionTierFilter !== 'ALL' || certificatStatusFilter !== 'ALL' || sortBy !== 'RECENT' || statusFilter !== 'ALL' || permitFilter !== 'ALL' || eleveSearch) && (
                <button
                  onClick={() => {
                    setProgressionTierFilter('ALL');
                    setCertificatStatusFilter('ALL');
                    setSortBy('RECENT');
                    setStatusFilter('ALL');
                    setPermitFilter('ALL');
                    setEleveSearch('');
                  }}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 ml-auto"
                >
                  <span>{t('resetFilters')}</span>
                </button>
              )}
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
                  <thead className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-400 dark:text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <tr>
                      <th className="p-3">{t('name')}</th>
                      <th className="p-3">{t('codeUnique')}</th>
                      <th className="p-3">{t('permisPrefix')}</th>
                      <th className="p-3">{t('trainingPeriodTh')}</th>
                      <th className="p-3">{t('progress')}</th>
                      <th className="p-3">{t('attestationTh')}</th>
                      <th className="p-3">{t('status')}</th>
                      <th className="p-3 text-right">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredAndSortedEleves.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500 font-medium">
                          {t('noStudentMatched')}
                        </td>
                      </tr>
                    ) : (
                      filteredAndSortedEleves.map((el) => {
                        const certMatch = certificates.find((c) => {
                          const elId = typeof c.eleve === 'string' ? c.eleve : c.eleve?._id;
                          return elId === el._id;
                        });
                        const cert = certMatch?.certificat;

                        return (
                          <tr key={el._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="p-3 font-bold text-slate-900 dark:text-white">
                              {el.userDetail?.name}
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{el.userDetail?.email}</p>
                            </td>
                            <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">{el.codeEleveUnique}</td>
                            <td className="p-3 font-bold">
                              <span className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                {t('permisPrefix')} {el.typePermis || 'B'}
                              </span>
                            </td>
                            <td className="p-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                              {t('dateFromTo', { start: el.dateDebutFormation, end: el.dateFinFormation })}
                            </td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-slate-900 dark:text-white">{el.progressionGlobal}%</span>
                                <div className="w-16 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      el.progressionGlobal === 100
                                        ? 'bg-emerald-500'
                                        : el.progressionGlobal >= 50
                                        ? 'bg-blue-500'
                                        : 'bg-amber-500'
                                    }`}
                                    style={{ width: `${el.progressionGlobal}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="p-3 font-bold">
                              {cert ? (
                                cert.status === 'TELECHARGE' ? (
                                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center w-fit space-x-1">
                                    <FileCheck className="w-3 h-3 text-emerald-600" />
                                    <span>{t('downloaded')}</span>
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center w-fit space-x-1">
                                    <Award className="w-3 h-3 text-blue-600" />
                                    <span>{t('generated')}</span>
                                  </span>
                                )
                              ) : el.progressionGlobal === 100 ? (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center w-fit space-x-1">
                                  <Sparkles className="w-3 h-3 text-amber-500" />
                                  <span>{t('eligible100')}</span>
                                </span>
                              ) : (
                                <span className="text-[11px] text-slate-400 font-medium">{t('notEligible')}</span>
                              )}
                            </td>
                            <td className="p-3">
                              {el.isExpired ? (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center w-fit space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{t('expired')}</span>
                                </span>
                              ) : el.isBlocked ? (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-center w-fit space-x-1">
                                  <UserX className="w-3 h-3" />
                                  <span>{t('suspended')}</span>
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center w-fit space-x-1">
                                  <UserCheck className="w-3 h-3" />
                                  <span>{t('validAccess')}</span>
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-right space-x-1.5">
                              <button
                                onClick={() => handleInspectProgression(el)}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 rounded-lg transition text-xs font-bold border border-slate-200 dark:border-slate-700"
                                title={t('viewProgression')}
                              >
                                {t('tracking')}
                              </button>
                              <button
                                onClick={async () => {
                                  try {
                                    const res = await fetch(`/api/eleves/${el._id}`, {
                                      method: 'PUT',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`,
                                      },
                                      body: JSON.stringify({ isBlocked: !el.isBlocked }),
                                    });
                                    if (res.ok) {
                                      setFeedback({
                                        type: 'success',
                                        text: el.isBlocked
                                          ? `Compte de l'élève ${el.userDetail?.name} débloqué avec succès.`
                                          : `Compte de l'élève ${el.userDetail?.name} suspendu (déconnexion automatique activée).`,
                                      });
                                      fetchEleves();
                                      fetchStats();
                                      fetchLogs();
                                    }
                                  } catch (e) {
                                    console.error(e);
                                  }
                                }}
                                className={`px-2.5 py-1 rounded-lg transition text-xs font-bold border ${
                                  el.isBlocked
                                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                                    : 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                                }`}
                                title={el.isBlocked ? 'Débloquer l\'accès élève' : 'Suspendre/Bloquer l\'accès élève'}
                              >
                                {el.isBlocked ? t('unblock') : t('block')}
                              </button>
                              <button
                                onClick={() => setSelectedEleveForEdit(el)}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition text-xs font-bold border border-slate-200 dark:border-slate-700"
                                title={t('edit')}
                              >
                                {t('edit')}
                              </button>
                              <button
                                onClick={() => handleDeleteStudent(el._id)}
                                className="px-2.5 py-1 bg-red-50 hover:bg-red-100 dark:bg-red-950/60 dark:hover:bg-red-900/80 text-red-700 dark:text-red-300 rounded-lg transition text-xs font-bold border border-red-200 dark:border-red-800"
                                title={t('delete')}
                              >
                                {t('delete')}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SUIVI DE PROGRESSION */}
        {activeTab === 'progression' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>{t('progressionCourseTrackingTitle')}</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {t('progressionCourseTrackingSub')}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => exportCoursesToCSV(modules, `cours_modules_${autoEcole?.codeAutoEcoleUnique || 'ecole'}.csv`)}
                  className="px-3.5 py-2 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold rounded-xl border border-blue-200 dark:border-blue-800 text-xs flex items-center space-x-1.5 transition shadow-2xs hover:bg-blue-100"
                  title={t('exportCoursesCsv')}
                >
                  <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                  <span>{t('exportCoursesCsv')}</span>
                </button>

                <button
                  onClick={() => exportStudentsToCSV(eleves, `eleves_${autoEcole?.codeAutoEcoleUnique || 'ecole'}.csv`)}
                  className="px-3.5 py-2 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs flex items-center space-x-1.5 transition shadow-2xs hover:bg-emerald-100"
                  title={t('exportStudentsCsv')}
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>{t('exportStudentsCsv')}</span>
                </button>
              </div>
            </div>

            {/* Visual Recharts Widget for Course Progression */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1 uppercase tracking-wider">
                {t('globalTheoreticalModuleProgression')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                {t('globalTheoreticalModuleProgressionSub')}
              </p>

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
                        fontWeight: '600',
                      }}
                    />
                    <Bar
                      dataKey="completionRate"
                      name={t('successRate')}
                      fill={secondaryColor || (isDark ? '#10b981' : '#059669')}
                      radius={[8, 8, 0, 0]}
                      isAnimationActive={true}
                      animationDuration={1200}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredAndSortedEleves.map((el) => (
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
                    <p className="text-xs text-slate-500 font-medium">{t('trainingEndLabel')} {el.dateFinFormation}</p>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${el.progressionGlobal}%` }}
                    />
                  </div>

                  <div className="text-[11px] text-blue-600 font-bold text-right">
                    {t('seeModulesDetails')}
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
                  <span>{t('trainingCertificatesManagementTitle')}</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  {t('trainingCertificatesManagementSub')}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={fetchCertificates}
                  className="px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex items-center space-x-2 transition shadow-2xs"
                  title={t('refresh')}
                >
                  <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
                  <span>{t('refresh')}</span>
                </button>
              </div>
            </div>

            {/* Key Certificate Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('generatedCertificatesCard')}</span>
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-800">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {certificates.filter((c) => c.certificat && (c.certificat.status === 'GENERE' || c.certificat.status === 'TELECHARGE')).length}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('officialCertificatesAwarded')}</p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('downloadedCertificatesCard')}</span>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-800">
                    <Download className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {certificates.filter((c) => c.certificat && c.certificat.status === 'TELECHARGE').length}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('exportedByStudentsOrSchool')}</p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('eligibleToIssueCard')}</span>
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-100 dark:border-amber-800">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {certificates.filter((c) => c.isEligible && (!c.certificat || c.certificat.status === 'EN_COURS')).length}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('validated100Progress')}</p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('inTrainingCard')}</span>
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl border border-slate-200 dark:border-slate-700">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {certificates.filter((c) => !c.isEligible).length}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('progressInProgressSub')}</p>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={t('searchCertPlaceholder')}
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
                  {t('allCertsFilter')} ({certificates.length})
                </button>
                <button
                  onClick={() => setCertStatusFilter('GENERE')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    certStatusFilter === 'GENERE'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {t('generatedCertsFilter')}
                </button>
                <button
                  onClick={() => setCertStatusFilter('TELECHARGE')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    certStatusFilter === 'TELECHARGE'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {t('downloadedCertsFilter')}
                </button>
                <button
                  onClick={() => setCertStatusFilter('ELIGIBLE')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    certStatusFilter === 'ELIGIBLE'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {t('eligibleCertsFilter')}
                </button>
                <button
                  onClick={() => setCertStatusFilter('NON_ELIGIBLE')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    certStatusFilter === 'NON_ELIGIBLE'
                      ? 'bg-slate-700 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {t('inProgressCertsFilter')}
                </button>
              </div>
            </div>

            {/* Certificates Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <th className="p-3.5">{t('studentAndIdTh')}</th>
                      <th className="p-3.5">{t('progressTh')}</th>
                      <th className="p-3.5">{t('certificateStatusTh')}</th>
                      <th className="p-3.5">{t('codeAndIssueTh')}</th>
                      <th className="p-3.5 text-right">{t('actions')}</th>
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
                                  <span>{t('downloaded')}</span>
                                </span>
                              ) : cert?.status === 'GENERE' ? (
                                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                  <Award className="w-3 h-3 text-blue-600" />
                                  <span>{t('generated')}</span>
                                </span>
                              ) : item.isEligible ? (
                                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 animate-pulse">
                                  <Sparkles className="w-3 h-3 text-amber-600" />
                                  <span>{t('eligible100')}</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span>{t('inProgressCertsFilter')} (&lt;100%)</span>
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
                                <span className="text-[11px] text-slate-400 italic">{t('notIssued')}</span>
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
                                    <span>{t('generate')}</span>
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
                                      <span>{t('preview')}</span>
                                    </button>

                                    <button
                                      onClick={() => handleDownloadPdfCertificate(item)}
                                      disabled={isExportingPdf}
                                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg transition text-xs font-bold shadow-2xs flex items-center space-x-1"
                                      title="Télécharger l'attestation au format PDF"
                                    >
                                      <Download className="w-3 h-3" />
                                      <span>{t('pdf')}</span>
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
              <h2 className="text-lg font-black text-slate-900 tracking-tight">{t('schoolActionsLogTitle')}</h2>

              <div className="flex items-center space-x-2 flex-wrap">
                <button
                  onClick={() => exportLogsToCSV(logs, `logs_audit_${autoEcole?.codeAutoEcoleUnique || 'ecole'}.csv`)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs flex items-center space-x-1.5 transition shadow-xs"
                  title="Exporter le journal d'activité en CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('exportCsv')}</span>
                </button>

                <button
                  onClick={() => exportLogsToJSON(logs, `logs_audit_${autoEcole?.codeAutoEcoleUnique || 'ecole'}.json`)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs flex items-center space-x-1.5 transition shadow-xs"
                  title="Exporter le journal d'activité en JSON"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t('exportJson')}</span>
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MODAL: NEW ELEVE */}
      {showEleveModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900">{t('registerNewStudentModalTitle')}</h3>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('studentFullNameRequired')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('studentNamePlaceholder')}
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('studentEmailRequired')}</label>
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
                  <label className="block text-slate-700 font-bold mb-1">{t('studentPhoneLabel')}</label>
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
                <label className="block text-slate-700 font-bold mb-1">{t('initialStudentPasswordRequired')}</label>
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
                  <label className="block text-slate-700 font-bold mb-1">{t('targetPermisCategoryRequired')}</label>
                  <select
                    value={newStudentTypePermis}
                    onChange={(e) => {
                      setNewStudentTypePermis(e.target.value);
                      // Auto-select program for this permit type if available
                      const matched = programmesPermis.find((p) => p.typePermis === e.target.value);
                      setNewStudentProgId(matched ? matched._id : '');
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option value="B">{t('permisBOption')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('trainingProgramLabel')}</label>
                  <select
                    value={newStudentProgId}
                    onChange={(e) => setNewStudentProgId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option value="">{t('standardProgramDefault')}</option>
                    {programmesPermis
                      .filter((p) => !p.typePermis || p.typePermis === newStudentTypePermis)
                      .map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.titre} ({p.modulesCount || p.moduleIds?.length || 0} {t('modulesCountSuffix')})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('startDateRequired')}</label>
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
                    {t('endDateRequired')}
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
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                >
                  {t('generateRegistrationBtn')}
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
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">{t('csvBulkImportModalTitle')}</h3>
                  <p className="text-xs text-slate-500 font-medium">{t('csvBulkImportSubtitle')}</p>
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
                <span className="font-bold text-slate-700">{t('csvExpectedFormat')}</span>
              </div>
              <button
                type="button"
                onClick={downloadCsvTemplate}
                className="inline-flex items-center space-x-1 px-3 py-1.5 bg-white border border-slate-200 text-purple-700 hover:bg-purple-50 rounded-lg font-bold shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('downloadCsvTemplateBtn')}</span>
              </button>
            </div>

            {/* Input Options: File picker OR raw text */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {t('step1SelectCsvFile')}
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
                  {t('step2OrPasteCsv')}
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
                      {t('previewDetectedStudents')} ({csvParsedRows.length})
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {t('validFormatBadge')}
                    </span>
                  </div>

                  <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-[11px] text-slate-700">
                      <thead className="bg-slate-100 text-slate-500 font-bold uppercase text-[9px] sticky top-0">
                        <tr>
                          <th className="p-2">{t('name')}</th>
                          <th className="p-2">{t('email')}</th>
                          <th className="p-2">{t('studentPhoneLabel')}</th>
                          <th className="p-2">{t('endOfTrainingTh')}</th>
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
                        ? t('csvImportCompletedSuccess', { count: csvImportResult.importedCount })
                        : t('csvImportResultTitle')}
                    </span>
                  </div>

                  {csvImportResult.errors && csvImportResult.errors.length > 0 && (
                    <div className="text-[11px] space-y-1">
                      <p className="font-bold text-red-700">{t('alertsAndWarnings')} ({csvImportResult.errors.length}) :</p>
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
                {t('close')}
              </button>
              <button
                type="button"
                disabled={csvImportLoading || csvParsedRows.length === 0}
                onClick={handleExecuteCsvImport}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-xs text-xs flex items-center space-x-1.5"
              >
                {csvImportLoading ? (
                  <span>{t('importingInProgress')}</span>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>{t('launchImportBtn')} ({csvParsedRows.length})</span>
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
              {t('editStudentModalTitle')} {selectedEleveForEdit.codeEleveUnique}
            </h3>

            <form onSubmit={handleUpdateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('studentFullNameTh')}</label>
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
                  <label className="block text-slate-700 font-bold mb-1">{t('categoryPermisLabel')}</label>
                  <select
                    value={selectedEleveForEdit.typePermis || 'B'}
                    onChange={(e) =>
                      setSelectedEleveForEdit({
                        ...selectedEleveForEdit,
                        typePermis: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option value="B">{t('permisBOption')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('associatedProgramLabel')}</label>
                  <select
                    value={selectedEleveForEdit.programmePermisId || ''}
                    onChange={(e) =>
                      setSelectedEleveForEdit({
                        ...selectedEleveForEdit,
                        programmePermisId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option value="">{t('standardProgramDefault')}</option>
                    {programmesPermis
                      .filter((p) => !p.typePermis || p.typePermis === (selectedEleveForEdit.typePermis || 'B'))
                      .map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.titre} ({p.modulesCount || p.moduleIds?.length || 0} {t('modulesCountSuffix')})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('startDateRequired')}</label>
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
                  <label className="block text-slate-700 font-bold mb-1">{t('endDateRequired')}</label>
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
                  {t('manuallyBlockCheckbox')}
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedEleveForEdit(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  {t('updateBtn')}
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
                {t('globalProgressLabel')}{' '}
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
                        {t('videoWatchedDetails')} {sp.progression?.videoWatchTimeSeconds || 0}s / {sp.module.tempsMinimumVisionnage}{t('secondsRequired')}
                      </p>
                    </div>

                    <div className="text-right">
                      {sp.isValidated ? (
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px]">
                          {t('moduleValidatedBadge', { score: sp.progression?.quizScore })}
                        </span>
                      ) : sp.isLocked ? (
                        <span className="px-2.5 py-1 bg-slate-200 text-slate-600 rounded-full font-bold text-[10px]">
                          {t('locked')}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-bold text-[10px]">
                          {t('inProgress')}
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
                  {t('officialCertPreviewTitle')}
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
                      {t('schoolCodeLabel')} {selectedCertPreview.autoEcole?.codeAutoEcoleUnique || autoEcole?.codeAutoEcoleUnique}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-1 rounded-full border border-amber-300 uppercase tracking-wide">
                    {t('matoaSaaSCertified')}
                  </span>
                </div>
              </div>

              {/* Title Header */}
              <div className="py-2 space-y-1">
                <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                  {t('certificateOfCompletionTitle')}
                </h1>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                  {t('theoreticalDriverTrainingSub')}
                </p>
              </div>

              {/* Recipient Details */}
              <div className="my-6 space-y-2">
                <p className="text-xs text-slate-500 italic">{t('certAwardedTo')}</p>
                <div className="text-2xl font-black text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4 py-1">
                  {selectedCertPreview.user?.name || t('studentFallback')}
                </div>
                <p className="text-xs font-mono text-slate-600 font-bold">
                  {t('studentUniqueCodeLabel')} {selectedCertPreview.eleve?.codeEleveUnique}
                </p>
              </div>

              {/* Verification Text */}
              <p className="text-xs text-slate-700 leading-relaxed max-w-lg mx-auto font-medium">
                {t('certLegalValidationParagraph')} <span className="font-bold text-emerald-700">100%</span>.
              </p>

              {/* Code & Signatures */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4 text-left items-end">
                <div className="space-y-1 text-[11px] text-slate-600">
                  <p className="font-mono font-bold text-slate-900">
                    {t('certCodeLabel')} {selectedCertPreview.certificat?.certificateCode}
                  </p>
                  <p>
                    {t('emissionDateLabel')}{' '}
                    {selectedCertPreview.certificat?.dateEmission
                      ? new Date(selectedCertPreview.certificat.dateEmission).toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR')
                      : 'N/A'}
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <div className="inline-block border-2 border-emerald-600 rounded-xl p-2 bg-emerald-50 text-emerald-800 text-[10px] font-bold text-center shadow-2xs">
                    <ShieldCheck className="w-4 h-4 mx-auto text-emerald-600 mb-0.5" />
                    <span>{t('digitalStampVerified')}</span>
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
                {t('close')}
              </button>

              <button
                onClick={() => handleDownloadPdfCertificate(selectedCertPreview)}
                disabled={isExportingPdf}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>{t('downloadPdfBtn')}</span>
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
                {editingModule ? t('editModuleModalTitle') : t('createModuleModalTitle')}
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
                  <label className="block text-slate-700 font-bold mb-1">{t('moduleTitleRequired')}</label>
                  <input
                    type="text"
                    required
                    placeholder={t('moduleTitlePlaceholder')}
                    value={modTitle}
                    onChange={(e) => setModTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('moduleDescLabel')}</label>
                <textarea
                  rows={3}
                  required
                  placeholder={t('moduleDescPlaceholder')}
                  value={modSummary}
                  onChange={(e) => setModSummary(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {t('programDescAndGoals')}
                </label>
                <textarea
                  rows={3}
                  placeholder={t('programDescPlaceholder')}
                  value={modObjectives}
                  onChange={(e) => setModObjectives(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-600 font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('videoUrlRequired')}</label>
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
                  <label className="block text-slate-700 font-bold mb-1">Ordre *</label>
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
                  <label className="block text-slate-700 font-bold mb-1">{t('durationSeconds')}</label>
                  <input
                    type="number"
                    min="30"
                    value={modDurationSeconds}
                    onChange={(e) => setModDurationSeconds(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('minWatchSeconds')}</label>
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
                  <label className="block text-slate-700 font-bold mb-1">{t('minQuizPct')}</label>
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
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs"
                >
                  {editingModule ? t('saveModuleBtn') : t('createModuleModalTitle')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LESSONS VIEWER (READ-ONLY) */}
      {showLessonModal && selectedModForLessons && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-6 text-slate-900 dark:text-white space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-900/50">
                  {selectedModForLessons.code}
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                  {t('viewLessonsModalTitle')} {selectedModForLessons.title}
                </h3>
              </div>
              <button
                onClick={() => setShowLessonModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 p-3.5 rounded-xl text-purple-900 dark:text-purple-200 text-xs font-medium flex items-center space-x-2">
              <Info className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span>{t('lessonsSuperAdminManagedNotice')}</span>
            </div>

            {/* List of current lessons (Read-Only) */}
            <div className="space-y-4 text-xs">
              {lessonsList.length === 0 ? (
                <div className="p-6 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                  {t('noLessonsConfiguredForModule')}
                </div>
              ) : (
                lessonsList.map((lec, lIdx) => (
                  <div key={lIdx} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white text-xs">
                        {t('lessonNumberPrefix')}{lec.ordre || lIdx + 1} : {lec.title}
                      </span>
                      <span className="text-[10px] font-mono bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded font-bold">
                        {t('minDurationPrefix')} {lec.tempsMinimumVisionnageSeconds || 90}s
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-xs">
                      {lec.description || t('noDescriptionProvided')}
                    </p>

                    {lec.videoUrl && (
                      <div className="pt-2">
                        <a
                          href={lec.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 hover:underline font-bold text-xs"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>{t('openLessonVideoBtn')}</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setShowLessonModal(false)}
                className="px-5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-xs transition"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: QUIZ VIEWER (READ-ONLY) */}
      {showQuizModal && selectedModForQuiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-6 text-slate-900 dark:text-white space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/50">
                  {selectedModForQuiz.code}
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                  {t('quizOfficialPreviewTitle')} {selectedModForQuiz.title}
                </h3>
              </div>
              <button
                onClick={() => setShowQuizModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {/* Quiz Parameters Read-Only */}
            <div className="grid grid-cols-2 gap-4 bg-blue-50/60 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 text-xs">
              <div>
                <span className="block font-bold text-blue-900 dark:text-blue-200 mb-1">{t('regulatoryChronoDuration')}</span>
                <p className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                  {Math.round(quizTimerSecs / 60)} {t('minutesUnit')} ({quizTimerSecs} {t('secondsUnit')})
                </p>
              </div>

              <div>
                <span className="block font-bold text-blue-900 dark:text-blue-200 mb-1">{t('minimumRequiredScore')}</span>
                <p className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">
                  {quizPassingScore}{t('goodAnswersPctSuffix')}
                </p>
              </div>
            </div>

            {/* Questions List Viewer */}
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">
                {t('quizQuestionsListTitle')} ({quizQuestionsList.length})
              </h4>

              {quizQuestionsList.length === 0 ? (
                <p className="text-slate-500 italic p-4 bg-slate-50 rounded-xl">{t('noQuestionsAddedYet')}</p>
              ) : (
                quizQuestionsList.map((q, qIdx) => (
                  <div key={qIdx} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white text-xs">{t('questionNumberPrefix')}{qIdx + 1}</span>
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        {t('correctionIncludedBadge')}
                      </span>
                    </div>

                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {q.questionText}
                    </p>

                    {/* Options */}
                    <div className="space-y-1.5 pt-1">
                      {q.options?.map((optStr, oIdx) => {
                        const isCorrect = q.correctOptionIndex === oIdx;
                        return (
                          <div
                            key={oIdx}
                            className={`px-3 py-2 rounded-xl border text-xs flex items-center justify-between ${
                              isCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span>{optStr}</span>
                            {isCorrect && (
                              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full flex items-center space-x-1">
                                <Check className="w-3 h-3" />
                                <span>{t('correctAnswerBadge')}</span>
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div className="mt-2 p-2.5 bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-900 dark:text-amber-200 text-xs">
                        <span className="font-bold block mb-0.5 uppercase text-[10px] text-amber-800 dark:text-amber-300">{t('pedagogicalExplanationTitle')}</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setShowQuizModal(false)}
                className="px-5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-xs transition"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
