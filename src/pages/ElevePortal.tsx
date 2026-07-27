import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ModuleFormation, Quiz, ProgressionModule, Certificat } from '../types';
import { CertificateModal } from '../components/CertificateModal';
import { generateCertificatePDF } from '../lib/certificatePdfService';
import {
  GraduationCap,
  PlayCircle,
  CheckCircle2,
  Lock,
  Award,
  Clock,
  AlertTriangle,
  HelpCircle,
  History,
  Download,
  School,
  Sparkles,
  Check,
  ChevronRight,
  RefreshCw,
  BookOpen,
  Video,
  Maximize2,
  Minimize2,
  User,
  BarChart3,
  TrendingUp,
  Target,
  ShieldCheck,
} from 'lucide-react';

export const ElevePortal: React.FC = () => {
  const { token, user, autoEcole, eleve } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'modules' | 'profile' | 'certificat' | 'logs'>('modules');

  const [structuredProgression, setStructuredProgression] = useState<any[]>([]);
  const [eleveDetail, setEleveDetail] = useState<any>(eleve);
  const [certificat, setCertificat] = useState<Certificat | null>(null);

  // Active Video Player state
  const [activeModuleItem, setActiveModuleItem] = useState<any | null>(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const inlineQuizContainerRef = useRef<HTMLDivElement | null>(null);
  const moduleQuizContainerRef = useRef<HTMLDivElement | null>(null);

  const [isFullscreenVideo, setIsFullscreenVideo] = useState(false);
  const [isFullscreenInlineQuiz, setIsFullscreenInlineQuiz] = useState(false);
  const [isFullscreenModuleQuiz, setIsFullscreenModuleQuiz] = useState(false);

  const toggleContainerFullscreen = (ref: React.RefObject<HTMLDivElement | null>, state: boolean, setter: (val: boolean) => void) => {
    if (!ref.current) return;
    if (!document.fullscreenElement) {
      ref.current.requestFullscreen().then(() => setter(true)).catch(() => setter(!state));
    } else {
      document.exitFullscreen().then(() => setter(false)).catch(() => setter(false));
    }
  };

  useEffect(() => {
    const handleFSChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreenVideo(false);
        setIsFullscreenInlineQuiz(false);
        setIsFullscreenModuleQuiz(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  // Active Inline Lesson Quiz Modal state
  const [activeInlineQuizLesson, setActiveInlineQuizLesson] = useState<any | null>(null);
  const [userInlineAnswers, setUserInlineAnswers] = useState<Record<number, number>>({});
  const [inlineQuizSubmittedResult, setInlineQuizSubmittedResult] = useState<any | null>(null);

  // Active Module Quiz Modal state
  const [activeQuizItem, setActiveQuizItem] = useState<any | null>(null);
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<number, number>>({});
  const [quizTimerLeft, setQuizTimerLeft] = useState<number>(600);
  const [quizSubmittedResult, setQuizSubmittedResult] = useState<any | null>(null);

  // Certificate Modal state
  const [showCertModal, setShowCertModal] = useState(false);

  // Logs state
  const [logs, setLogs] = useState<any[]>([]);

  // Check if student training period is expired or blocked
  const todayStr = new Date().toISOString().split('T')[0];
  const isExpired = eleveDetail?.dateFinFormation ? eleveDetail.dateFinFormation < todayStr : false;
  const isBlocked = eleveDetail?.isBlocked || isExpired;

  const primaryColor = autoEcole?.couleursTheme?.primaryColor || '#2563eb';
  const secondaryColor = autoEcole?.couleursTheme?.secondaryColor || '#059669';

  // Profile View Computed Statistics
  const totalWatchTimeSeconds = structuredProgression.reduce((acc, modItem) => {
    const modLessonsWatch = (modItem.lecons || []).reduce((sum: number, l: any) => sum + (l.videoWatchTimeSeconds || 0), 0);
    return acc + modLessonsWatch;
  }, 0);

  const watchHours = Math.floor(totalWatchTimeSeconds / 3600);
  const watchMinutes = Math.floor((totalWatchTimeSeconds % 3600) / 60);

  const completedModulesCount = structuredProgression.filter((sp) => sp.isCompleted).length;
  const totalModulesCount = structuredProgression.length;

  const quizScoresList: number[] = [];
  structuredProgression.forEach((sp) => {
    if (typeof sp.quizScore === 'number') quizScoresList.push(sp.quizScore);
    (sp.lecons || []).forEach((l: any) => {
      if (typeof l.inlineQuizScore === 'number') quizScoresList.push(l.inlineQuizScore);
    });
  });

  const averageQuizScore = quizScoresList.length > 0
    ? Math.round(quizScoresList.reduce((a, b) => a + b, 0) / quizScoresList.length)
    : null;

  useEffect(() => {
    if (eleveDetail?._id) {
      fetchProgression();
      fetchCertificat();
      fetchLogs();
    }
  }, [eleveDetail?._id]);

  const fetchProgression = async () => {
    if (!eleveDetail?._id) return;
    try {
      const res = await fetch(`/api/progression/${eleveDetail._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        const updatedProg = data.structuredProgression || [];
        setStructuredProgression(updatedProg);
        if (data.eleve) setEleveDetail(data.eleve);

        // Set default active module if none selected or refresh activeModuleItem
        if (!activeModuleItem && updatedProg.length > 0) {
          const firstUnlocked = updatedProg.find((sp: any) => !sp.isLocked) || updatedProg[0];
          setActiveModuleItem(firstUnlocked);
          setSelectedLessonIndex(0);
          const firstLec = firstUnlocked.lecons?.[0];
          setVideoCurrentTime(firstLec?.videoWatchTimeSeconds || 0);
        } else if (activeModuleItem) {
          const refreshed = updatedProg.find((sp: any) => sp.module._id === activeModuleItem.module._id);
          if (refreshed) {
            setActiveModuleItem(refreshed);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCertificat = async () => {
    if (!eleveDetail?._id) return;
    try {
      const res = await fetch(`/api/certificats/${eleveDetail._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCertificat(data.certificat);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setLogs(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  // Video playback time update handler
  const handleVideoTimeUpdate = async () => {
    if (!videoRef.current || !activeModuleItem || isBlocked) return;

    const currentLecStatus = activeModuleItem.lecons?.[selectedLessonIndex];
    const currentLec = currentLecStatus?.lecon;
    const currentTime = Math.floor(videoRef.current.currentTime);
    setVideoCurrentTime(currentTime);

    // Sync watch time every 5 seconds
    if (currentTime > 0 && currentTime % 5 === 0) {
      try {
        const res = await fetch('/api/progression/watch-time', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eleveId: eleveDetail._id,
            moduleId: activeModuleItem.module._id,
            leconId: currentLec?._id,
            watchSeconds: currentTime,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.isLessonVideoCompleted) {
            fetchProgression();
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Open Inline Lesson Quiz Modal
  const handleStartInlineQuiz = (leconStatus: any) => {
    if (isBlocked || !leconStatus?.hasCompletedVideo) return;
    setActiveInlineQuizLesson(leconStatus.lecon);
    setUserInlineAnswers({});
    setInlineQuizSubmittedResult(null);
  };

  // Submit Inline Lesson Quiz
  const handleSubmitInlineQuiz = async () => {
    if (!activeModuleItem || !activeInlineQuizLesson) return;

    const answersArray = activeInlineQuizLesson.inlineQuiz?.map((_: any, idx: number) => userInlineAnswers[idx] ?? -1);

    try {
      const res = await fetch('/api/progression/submit-lesson-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eleveId: eleveDetail._id,
          moduleId: activeModuleItem.module._id,
          leconId: activeInlineQuizLesson._id,
          userAnswers: answersArray,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setInlineQuizSubmittedResult(result);
        fetchProgression();
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Active Quiz Timer Effect
  useEffect(() => {
    if (!activeQuizItem || quizSubmittedResult) return;

    if (quizTimerLeft <= 0) {
      handleSubmitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setQuizTimerLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuizItem, quizSubmittedResult, quizTimerLeft]);

  const formatQuizTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Open Quiz Modal
  const handleStartQuiz = (item: any) => {
    if (isBlocked || !item.isQuizUnlocked) return;
    setActiveQuizItem(item);
    setUserQuizAnswers({});
    setQuizSubmittedResult(null);
    setQuizTimerLeft(item.quiz?.timerSeconds || 600);
  };

  // Submit Quiz Answers
  const handleSubmitQuiz = async () => {
    if (!activeQuizItem) return;

    const answersArray = activeQuizItem.quiz?.questions?.map((_: any, idx: number) => userQuizAnswers[idx] ?? -1);

    try {
      const res = await fetch('/api/progression/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eleveId: eleveDetail._id,
          moduleId: activeQuizItem.module._id,
          userAnswers: answersArray,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setQuizSubmittedResult(result);
        fetchProgression();
        fetchCertificat();
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Download Certificate PDF action
  const handleDownloadCertificate = async () => {
    try {
      // 1. Generate branded PDF
      await generateCertificatePDF({
        elementId: 'certificate-render-node',
        certificat,
        eleve: eleveDetail,
        user: user!,
        autoEcole,
      });

      // 2. Sync download status to server
      const res = await fetch('/api/certificats/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eleveId: eleveDetail._id }),
      });

      if (res.ok) {
        fetchCertificat();
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Dynamic Branded Header */}
      <div
        className="py-8 px-4 sm:px-8 border-b border-slate-200 transition-colors duration-300 relative overflow-hidden shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            {autoEcole?.logo ? (
              <img
                src={autoEcole.logo}
                alt={autoEcole.name}
                className="w-16 h-16 rounded-2xl object-cover bg-white/10 p-1 border border-white/20 shadow-lg shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                <School className="w-8 h-8" />
              </div>
            )}

            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 text-white px-3 py-0.5 rounded-full backdrop-blur-sm inline-block mb-1">
                Portail Élève Officiel
              </span>
              <h1 className="text-2xl font-black text-white tracking-tight">{autoEcole?.name}</h1>
              <p className="text-xs text-white/90">
                Bienvenue, <strong className="text-white font-bold">{user?.name}</strong> | Code Élève :{' '}
                <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded text-white">
                  {eleveDetail?.codeEleveUnique}
                </span>
              </p>
            </div>
          </div>

          {/* Progress Badge Card */}
          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/25 min-w-[240px] shadow-xs">
            <div className="flex items-center justify-between text-xs text-white mb-1">
              <span className="font-bold">Progression du Code</span>
              <span className="font-black font-mono text-sm">{eleveDetail?.progressionGlobal || 0}%</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2.5 overflow-hidden p-0.5">
              <div
                className="bg-white h-full rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${eleveDetail?.progressionGlobal || 0}%` }}
              />
            </div>
            <p className="text-[10px] text-white/90 mt-1.5 text-right font-medium">
              {eleveDetail?.progressionGlobal >= 100
                ? '🎉 Formation 100% Complétée !'
                : 'Modules théoriques en cours'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        {/* EXPIRED OR BLOCKED BANNER */}
        {isBlocked && (
          <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-2xl text-red-900 space-y-2 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-red-900">
                  {isExpired ? 'Période de Formation Expirée' : 'Accès aux Modules Suspendu'}
                </h3>
                <p className="text-xs text-red-700 font-medium">
                  {isExpired
                    ? `Votre période de formation s'est terminée le ${eleveDetail.dateFinFormation}. Conformément aux règles métier, votre accès aux vidéos et quiz est verrouillé.`
                    : 'Votre auto-école a suspendu votre compte. Veuillez contacter votre administration.'}
                </p>
              </div>
            </div>
            <p className="text-xs font-bold text-red-800 pt-2 border-t border-red-200">
              Veuillez contacter {autoEcole?.name} au {autoEcole?.contact?.phone || autoEcole?.contact?.email} pour réactiver votre formation.
            </p>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 space-x-2">
          <button
            onClick={() => setActiveTab('modules')}
            className={`py-3 px-5 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 ${
              activeTab === 'modules'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-b-2 border-emerald-600'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Parcours de Code</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-5 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 ${
              activeTab === 'profile'
                ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-b-2 border-purple-600'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t('studentProfile')}</span>
          </button>

          <button
            onClick={() => setActiveTab('certificat')}
            className={`py-3 px-5 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 ${
              activeTab === 'certificat'
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-b-2 border-amber-600'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Mon Certificat Officiel</span>
            {eleveDetail?.progressionGlobal >= 100 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`py-3 px-5 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 ${
              activeTab === 'logs'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-b-2 border-blue-600'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Mon Historique</span>
          </button>
        </div>

        {/* Animated Active Tab View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {/* TAB 1: PARCOURS DE CODE */}
            {activeTab === 'modules' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Sequential Modules List */}
            <div className="space-y-4 lg:col-span-1">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Parcours Verrouillé (1 à 1)
              </h3>

              <div className="space-y-3">
                {structuredProgression.map((item, idx) => {
                  const isSelected = activeModuleItem?.module?._id === item.module._id;

                  return (
                    <div
                      key={item.module._id}
                      onClick={() => {
                        if (!item.isLocked && !isBlocked) {
                          setActiveModuleItem(item);
                          setVideoCurrentTime(item.progression?.videoWatchTimeSeconds || 0);
                        }
                      }}
                      className={`p-4 rounded-2xl border transition-all ${
                        item.isLocked || isBlocked
                          ? 'bg-slate-100/60 border-slate-200 opacity-60 cursor-not-allowed'
                          : isSelected
                          ? 'bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-500/20 cursor-pointer'
                          : 'bg-white border-slate-200 hover:border-slate-300 cursor-pointer shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              item.isValidated
                                ? 'bg-emerald-600 text-white'
                                : item.isLocked
                                ? 'bg-slate-200 text-slate-500'
                                : 'bg-blue-600 text-white'
                            }`}
                          >
                            {item.isValidated ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-900 line-clamp-1">
                            {item.module.title}
                          </span>
                        </div>

                        {item.isLocked || isBlocked ? (
                          <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                        ) : item.isValidated ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Validé
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                            Disponible
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">
                        {item.module.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                        <span>Min vidéo : {item.module.tempsMinimumVisionnage}s</span>
                        <span>Quiz requis : {item.module.scoreMinimumQuiz}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Active Module Player & Quiz Launcher */}
            <div className="lg:col-span-2 space-y-6">
              {activeModuleItem ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
                  {/* Module Code & Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                          {activeModuleItem.module.code || `MOD-00${activeModuleItem.module.ordre}`}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          Module {activeModuleItem.module.ordre}
                        </span>
                      </div>
                      <h2 className="text-lg font-black text-slate-900 mt-1 tracking-tight">
                        {activeModuleItem.module.title}
                      </h2>
                    </div>

                    <div>
                      {activeModuleItem.isValidated ? (
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-full border border-emerald-200 flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Module Validé</span>
                        </span>
                      ) : activeModuleItem.areAllLessonsCompleted ? (
                        <span className="px-3 py-1 bg-purple-50 text-purple-800 font-bold text-xs rounded-full border border-purple-200 flex items-center space-x-1">
                          <HelpCircle className="w-4 h-4 text-purple-600" />
                          <span>Leçons Terminées &rarr; Quiz de Module Débloqué</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-full border border-amber-200">
                          En cours d'apprentissage
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Module Summary & Learning Objectives */}
                  {(activeModuleItem.module.summary || activeModuleItem.module.learningObjectives?.length > 0) && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                      {activeModuleItem.module.summary && (
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[10px] text-slate-500 mb-1">
                            Résumé du Module
                          </h4>
                          <p className="text-slate-700 leading-relaxed font-medium">
                            {activeModuleItem.module.summary}
                          </p>
                        </div>
                      )}

                      {activeModuleItem.module.learningObjectives?.length > 0 && (
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[10px] text-slate-500 mb-1.5">
                            Objectifs Pédagogiques
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                            {activeModuleItem.module.learningObjectives.map((obj: string, oIdx: number) => (
                              <li key={oIdx} className="flex items-start space-x-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Lessons Navigation Tabs */}
                  {activeModuleItem.lecons && activeModuleItem.lecons.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <span>Leçons du Module ({activeModuleItem.lecons.length})</span>
                        </h3>
                        <span className="text-[11px] font-bold text-slate-500">
                          Progrès : {activeModuleItem.lecons.filter((l: any) => l.isCompleted).length} / {activeModuleItem.lecons.length} complétée(s)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {activeModuleItem.lecons.map((lecStatus: any, lIdx: number) => {
                          const isActiveLesson = selectedLessonIndex === lIdx;
                          const isLessonLocked = lecStatus.isLessonLocked || activeModuleItem.isLocked;

                          return (
                            <button
                              key={lecStatus.lecon._id || lIdx}
                              disabled={isLessonLocked}
                              onClick={() => {
                                if (isLessonLocked) return;
                                setSelectedLessonIndex(lIdx);
                                setVideoCurrentTime(lecStatus.videoWatchTimeSeconds || 0);
                              }}
                              className={`p-3 rounded-xl border text-left transition relative flex flex-col justify-between ${
                                isLessonLocked
                                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
                                  : isActiveLesson
                                  ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                                  : lecStatus.isCompleted
                                  ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300'
                                  : 'bg-white border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="text-[10px] font-mono font-bold text-slate-500">
                                  Leçon {lecStatus.lecon.ordre}
                                </span>
                                {isLessonLocked ? (
                                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                                ) : lecStatus.isCompleted ? (
                                  <span className="w-4 h-4 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px]">
                                    ✓
                                  </span>
                                ) : (
                                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                                )}
                              </div>
                              <span className="text-xs font-bold text-slate-900 line-clamp-1 mt-1">
                                {lecStatus.lecon.title}
                              </span>
                              <div className="text-[10px] text-slate-500 mt-2 flex items-center space-x-2">
                                <Video className="w-3 h-3 text-slate-400" />
                                <span>{Math.round(lecStatus.lecon.tempsMinimumVisionnageSeconds / 60)} min</span>
                                {lecStatus.lecon.hasInlineQuiz && (
                                  <span className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 font-bold">
                                    Mini-Quiz
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Active Selected Lesson Detail & Player */}
                  {(() => {
                    const currentLecStatus = activeModuleItem.lecons?.[selectedLessonIndex] || {
                      lecon: {
                        title: activeModuleItem.module.title,
                        description: activeModuleItem.module.description,
                        videoUrl: activeModuleItem.module.videoUrl,
                        tempsMinimumVisionnageSeconds: activeModuleItem.module.tempsMinimumVisionnage,
                        hasInlineQuiz: false,
                      },
                      videoWatchTimeSeconds: activeModuleItem.progression?.videoWatchTimeSeconds || 0,
                      hasCompletedVideo: activeModuleItem.progression?.hasCompletedVideo || false,
                      isCompleted: activeModuleItem.isValidated,
                    };
                    const lec = currentLecStatus.lecon;

                    return (
                      <div className="space-y-4 pt-2 border-t border-slate-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                              Leçon Active #{selectedLessonIndex + 1}
                            </span>
                            <h3 className="text-base font-black text-slate-900">{lec.title}</h3>
                          </div>
                          {currentLecStatus.hasCompletedVideo && (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center space-x-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Vidéo Validée</span>
                            </span>
                          )}
                        </div>

                        {/* Lesson Description */}
                        {lec.description && (
                          <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                            {lec.description}
                          </div>
                        )}

                        {/* Video Player Header & Fullscreen Button */}
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                            <Video className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <span>Session vidéo d'apprentissage</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => toggleContainerFullscreen(videoContainerRef, isFullscreenVideo, setIsFullscreenVideo)}
                            className="px-3 py-1.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border border-slate-700 shadow-xs"
                            title="Passer la vidéo en mode immersif sans distraction"
                          >
                            {isFullscreenVideo ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                            <span>{isFullscreenVideo ? 'Quitter Plein Écran' : 'Mode Plein Écran'}</span>
                          </button>
                        </div>

                        {/* Video Player Container */}
                        <div
                          ref={videoContainerRef}
                          className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg ${
                            isFullscreenVideo ? 'fixed inset-0 z-50 rounded-none w-screen h-screen flex flex-col justify-center items-center bg-black' : 'aspect-video w-full'
                          }`}
                        >
                          <video
                            ref={videoRef}
                            src={lec.videoUrl}
                            onTimeUpdate={handleVideoTimeUpdate}
                            controls
                            className="w-full h-full object-contain"
                          />
                          {isFullscreenVideo && (
                            <button
                              type="button"
                              onClick={() => toggleContainerFullscreen(videoContainerRef, isFullscreenVideo, setIsFullscreenVideo)}
                              className="absolute top-4 right-4 z-50 bg-slate-900/90 text-white p-2.5 rounded-xl border border-slate-700 font-bold text-xs flex items-center space-x-2 shadow-xl hover:bg-slate-800"
                            >
                              <Minimize2 className="w-4 h-4" />
                              <span>Quitter le plein écran</span>
                            </button>
                          )}
                        </div>

                        {/* Video Progress Bar Tracker */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600 font-bold">Temps de visionnage de la leçon</span>
                            <span className="font-mono text-slate-900 font-extrabold">
                              {videoCurrentTime}s / {lec.tempsMinimumVisionnageSeconds}s requis
                            </span>
                          </div>

                          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden p-0.5 border border-slate-300">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-emerald-600 h-full rounded-full transition-all duration-300 shadow-xs"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (videoCurrentTime / Math.max(1, lec.tempsMinimumVisionnageSeconds)) * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Inline Lesson Quiz Trigger */}
                        {lec.hasInlineQuiz && (
                          <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl flex items-center justify-between gap-3 text-xs">
                            <div>
                              <span className="font-bold text-purple-900 flex items-center space-x-1.5">
                                <HelpCircle className="w-4 h-4 text-purple-600" />
                                <span>Mini-Quiz de Révision de la Leçon</span>
                              </span>
                              <p className="text-purple-700 mt-0.5 font-medium">
                                {currentLecStatus.isInlineQuizPassed
                                  ? `Mini-quiz validé (${currentLecStatus.inlineQuizScore}%)`
                                  : 'Répondez aux questions rapides pour tester vos connaissances avant la suite.'}
                              </p>
                            </div>

                            <button
                              onClick={() => handleStartInlineQuiz(currentLecStatus)}
                              disabled={!currentLecStatus.hasCompletedVideo || isBlocked}
                              className={`px-4 py-2 rounded-xl font-bold text-xs shadow-xs transition shrink-0 ${
                                !currentLecStatus.hasCompletedVideo || isBlocked
                                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                                  : currentLecStatus.isInlineQuizPassed
                                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                  : 'bg-purple-600 text-white hover:bg-purple-700'
                              }`}
                            >
                              {!currentLecStatus.hasCompletedVideo
                                ? 'Visionner la vidéo'
                                : currentLecStatus.isInlineQuizPassed
                                ? 'Refaire le Mini-Quiz'
                                : 'Commencer le Mini-Quiz'}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Module Final Quiz Trigger Section */}
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                        <HelpCircle className="w-4 h-4 text-blue-600" />
                        <span>Évaluation Finale du Module ({activeModuleItem.module.scoreMinimumQuiz}% Requis)</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        Une fois toutes les leçons terminées, passez le quiz final du module pour débloquer le module suivant.
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartQuiz(activeModuleItem)}
                      disabled={!activeModuleItem.areAllLessonsCompleted || isBlocked}
                      className={`px-6 py-3 rounded-xl text-xs font-bold text-white shadow-xs transition flex items-center space-x-2 shrink-0 ${
                        !activeModuleItem.areAllLessonsCompleted || isBlocked
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>
                        {!activeModuleItem.areAllLessonsCompleted
                          ? 'Compléter toutes les leçons d\'abord'
                          : 'Commencer le Quiz de Module'}
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 font-medium shadow-xs">
                  <p>Sélectionnez un module pour démarrer les cours.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: PROFILE & STATS */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Profile Overview Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-md border border-purple-400">
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : 'EL'}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{user?.name}</h2>
                      {eleveDetail?.progressionGlobal >= 100 && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 flex items-center space-x-1">
                          <Award className="w-3 h-3 text-amber-600" />
                          <span>{t('certifiedBadge')}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{user?.email}</p>
                    {eleveDetail?.telephone && (
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">Tél: {eleveDetail.telephone}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">{t('codeUnique')}</span>
                    <p className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">{eleveDetail?.codeEleveUnique}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Auto-École</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{autoEcole?.name || 'Matoa Auto-École'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Accès Formation</span>
                    <div className="mt-0.5">
                      {isExpired ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          Expiré
                        </span>
                      ) : isBlocked ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                          Suspendu
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          Valide
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('learningTime')}</span>
                  <div className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">
                    {watchHours > 0 ? `${watchHours}h ${watchMinutes}m` : `${watchMinutes} min`}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Temps de visionnage vidéo cumulé
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('completionProgress')}</span>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">
                    {eleveDetail?.progressionGlobal || 0}%
                  </p>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${eleveDetail?.progressionGlobal || 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('quizAverage')}</span>
                  <div className="p-2 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-xl">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">
                    {averageQuizScore !== null ? `${averageQuizScore}%` : '—'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {quizScoresList.length} épreuve(s) passée(s)
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Modules Validés</span>
                  <div className="p-2 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-xl">
                    <Target className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">
                    {completedModulesCount} / {totalModulesCount}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Modules théoriques débloqués
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Progression per Module */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">{t('moduleProgressDetails')}</h3>

              <div className="space-y-4">
                {structuredProgression.map((sp, idx) => {
                  const modLessonsWatch = (sp.lecons || []).reduce((sum: number, l: any) => sum + (l.videoWatchTimeSeconds || 0), 0);
                  const completedLecCount = (sp.lecons || []).filter((l: any) => l.isCompleted).length;
                  const totalLecCount = (sp.lecons || []).length;

                  return (
                    <div
                      key={sp.module._id || idx}
                      className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 bg-slate-50/50 dark:bg-slate-800/30"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-3">
                          <span className="px-2.5 py-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-mono font-bold">
                            {sp.module.code}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{sp.module.title}</h4>
                        </div>

                        <div className="flex items-center space-x-2">
                          {sp.isCompleted ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 flex items-center space-x-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Validé (100%)</span>
                            </span>
                          ) : sp.isLocked ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center space-x-1">
                              <Lock className="w-3 h-3" />
                              <span>Verrouillé</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700 flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-blue-600" />
                              <span>En cours ({sp.progressionPct || 0}%)</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar & Details */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                          <span>Progression Module</span>
                          <span>{sp.progressionPct || 0}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              sp.isCompleted ? 'bg-emerald-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${sp.progressionPct || 0}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs font-medium text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
                        <div>
                          Leçons : <strong className="text-slate-900 dark:text-white">{completedLecCount} / {totalLecCount} terminées</strong>
                        </div>
                        <div>
                          Visionnage : <strong className="text-slate-900 dark:text-white">{Math.floor(modLessonsWatch / 60)} min {modLessonsWatch % 60} sec</strong>
                        </div>
                        <div>
                          Quiz Final : <strong className="text-slate-900 dark:text-white">{typeof sp.quizScore === 'number' ? `${sp.quizScore}%` : 'Non passé'}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CERTIFICAT */}
        {activeTab === 'certificat' && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-6 shadow-xs">
            <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Certificat Officiel Matoa</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Attestation de fin de formation théorique certifiée par l'établissement{' '}
                <strong className="text-slate-800">{autoEcole?.name}</strong>.
              </p>
            </div>

            {eleveDetail?.progressionGlobal >= 100 ? (
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl">
                  🎉 Félicitations ! Vous avez validé 100% des modules théoriques. Votre attestation est prête.
                </div>

                <button
                  onClick={() => setShowCertModal(true)}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs transition inline-flex items-center space-x-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Consulter & Imprimer Mon Certificat</span>
                </button>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium rounded-xl">
                🔒 Complétez l'ensemble des modules théoriques à 100% pour débloquer votre attestation.
                Progression actuelle : <strong className="text-slate-900 font-bold">{eleveDetail?.progressionGlobal || 0}%</strong>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Historique de vos Activités</h2>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-white">
              <div className="divide-y divide-slate-800">
                {logs.map((log) => (
                  <div key={log._id} className="p-4 text-xs flex items-start space-x-3 hover:bg-slate-800/40 transition-colors">
                    <div className="p-2 rounded-xl bg-slate-800 text-emerald-400 shrink-0 border border-slate-700">
                      <History className="w-4 h-4" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{log.typeAction}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
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

      {/* INLINE LESSON QUIZ MODAL */}
      {activeInlineQuizLesson && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <div
            ref={inlineQuizContainerRef}
            className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-all ${
              isFullscreenInlineQuiz ? 'w-screen h-screen max-w-none rounded-none p-6 overflow-y-auto' : 'rounded-2xl max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                  Mini-Quiz de Leçon
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                  {activeInlineQuizLesson.title}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => toggleContainerFullscreen(inlineQuizContainerRef, isFullscreenInlineQuiz, setIsFullscreenInlineQuiz)}
                  className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center space-x-1 border border-slate-200 dark:border-slate-700"
                  title="Activer le mode plein écran"
                >
                  {isFullscreenInlineQuiz ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isFullscreenInlineQuiz ? 'Normal' : 'Plein Écran'}</span>
                </button>

                <button
                  onClick={() => setActiveInlineQuizLesson(null)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>
            </div>

            {inlineQuizSubmittedResult ? (
              <div className="text-center space-y-6 py-2">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto border-2 ${
                    inlineQuizSubmittedResult.passed
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                      : 'bg-amber-50 border-amber-500 text-amber-600'
                  }`}
                >
                  {inlineQuizSubmittedResult.passed ? (
                    <CheckCircle2 className="w-8 h-8" />
                  ) : (
                    <AlertTriangle className="w-8 h-8" />
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {inlineQuizSubmittedResult.passed ? 'Mini-Quiz Validé !' : 'Continuez vos Révisions'}
                  </h3>
                  <p className="text-2xl font-black font-mono mt-1 text-slate-900">
                    {inlineQuizSubmittedResult.scorePercentage}%
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {inlineQuizSubmittedResult.correctCount} bonne(s) réponse(s) sur {inlineQuizSubmittedResult.totalQuestions}
                  </p>
                </div>

                {/* Explication de chaque question */}
                <div className="space-y-3 text-left border-t border-slate-200 pt-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Correction et Explications
                  </h4>
                  {activeInlineQuizLesson.inlineQuiz?.map((q: any, qIdx: number) => {
                    const isUserCorrect = userInlineAnswers[qIdx] === q.correctOptionIndex;
                    return (
                      <div
                        key={qIdx}
                        className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                          isUserCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-red-50/60 border-red-200'
                        }`}
                      >
                        <p className="font-bold text-slate-900">
                          {qIdx + 1}. {q.questionText}
                        </p>
                        <p className="text-[11px] font-medium text-slate-700">
                          Votre réponse :{' '}
                          <strong className={isUserCorrect ? 'text-emerald-700' : 'text-red-700'}>
                            {q.options?.[userInlineAnswers[qIdx]] || 'Non répondue'}
                          </strong>
                        </p>
                        {!isUserCorrect && (
                          <p className="text-[11px] font-medium text-emerald-800">
                            Réponse correcte : <strong>{q.options?.[q.correctOptionIndex]}</strong>
                          </p>
                        )}
                        {q.explanation && (
                          <p className="text-[10px] text-slate-600 bg-white/80 p-2 rounded border border-slate-200 font-medium mt-1">
                            💡 <strong>Explication :</strong> {q.explanation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => setInlineQuizSubmittedResult(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center space-x-1 border border-slate-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Réessayer</span>
                  </button>

                  <button
                    onClick={() => setActiveInlineQuizLesson(null)}
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            ) : (
              /* Inline Quiz Questions Form */
              <div className="space-y-5 text-xs">
                {activeInlineQuizLesson.inlineQuiz?.map((q: any, qIdx: number) => (
                  <div key={qIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <p className="font-bold text-sm text-slate-900">
                      Q{qIdx + 1}. {q.questionText}
                    </p>

                    <div className="space-y-2">
                      {q.options?.map((opt: string, oIdx: number) => (
                        <label
                          key={oIdx}
                          className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition ${
                            userInlineAnswers[qIdx] === oIdx
                              ? 'bg-purple-50 border-purple-500 text-purple-900 font-bold'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`inline-q-${qIdx}`}
                            checked={userInlineAnswers[qIdx] === oIdx}
                            onChange={() => setUserInlineAnswers({ ...userInlineAnswers, [qIdx]: oIdx })}
                            className="text-purple-600 focus:ring-purple-500"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleSubmitInlineQuiz}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl shadow-xs transition"
                >
                  Valider le Mini-Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUIZ INTERACTIVE MODAL */}
      {activeQuizItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <div
            ref={moduleQuizContainerRef}
            className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-all ${
              isFullscreenModuleQuiz ? 'w-screen h-screen max-w-none rounded-none p-6 overflow-y-auto' : 'rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300">
                  Évaluation Quiz — {activeQuizItem.module.title}
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                  Score minimum requis : {activeQuizItem.module.scoreMinimumQuiz}%
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                {!quizSubmittedResult && (
                  <div
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold border ${
                      quizTimerLeft < 60
                        ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800 animate-pulse'
                        : 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>{formatQuizTimer(quizTimerLeft)}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => toggleContainerFullscreen(moduleQuizContainerRef, isFullscreenModuleQuiz, setIsFullscreenModuleQuiz)}
                  className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center space-x-1 border border-slate-200 dark:border-slate-700"
                  title="Activer le mode plein écran"
                >
                  {isFullscreenModuleQuiz ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isFullscreenModuleQuiz ? 'Normal' : 'Plein Écran'}</span>
                </button>

                <button
                  onClick={() => setActiveQuizItem(null)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Quiz Result View */}
            {quizSubmittedResult ? (
              <div className="text-center space-y-6 py-4">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto border-2 ${
                    quizSubmittedResult.passed
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                      : 'bg-red-50 border-red-500 text-red-600'
                  }`}
                >
                  {quizSubmittedResult.passed ? (
                    <CheckCircle2 className="w-10 h-10" />
                  ) : (
                    <AlertTriangle className="w-10 h-10" />
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {quizSubmittedResult.passed ? 'Quiz Réussi !' : 'Score Insuffisant'}
                  </h3>
                  <p className="text-2xl font-black font-mono mt-1 text-slate-900">
                    {quizSubmittedResult.scorePercentage}%
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {quizSubmittedResult.correctCount} bonne(s) réponse(s) sur {quizSubmittedResult.totalQuestions}
                  </p>
                </div>

                {quizSubmittedResult.passed ? (
                  <p className="text-xs text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 font-bold">
                    🎉 Bravo ! Le module est désormais validé. Le module suivant a été débloqué dans votre parcours.
                  </p>
                ) : (
                  <p className="text-xs text-red-800 bg-red-50 p-3 rounded-xl border border-red-200 font-bold">
                    Vous devez obtenir au moins {activeQuizItem.module.scoreMinimumQuiz}% pour valider ce module. Révisez le cours et réessayez.
                  </p>
                )}

                <div className="flex justify-center space-x-3">
                  {!quizSubmittedResult.passed && (
                    <button
                      onClick={() => setQuizSubmittedResult(null)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center space-x-1 border border-slate-200"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Réessayer le Quiz</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveQuizItem(null)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Fermer et Continuer
                  </button>
                </div>
              </div>
            ) : (
              /* Quiz Questions Form */
              <div className="space-y-6 text-xs">
                {activeQuizItem.quiz?.questions?.map((q: any, qIdx: number) => (
                  <div key={qIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <p className="font-bold text-sm text-slate-900">
                      Q{qIdx + 1}. {q.questionText}
                    </p>

                    <div className="space-y-2">
                      {q.options?.map((opt: string, oIdx: number) => (
                        <label
                          key={oIdx}
                          className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition ${
                            userQuizAnswers[qIdx] === oIdx
                              ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q-${qIdx}`}
                            checked={userQuizAnswers[qIdx] === oIdx}
                            onChange={() => setUserQuizAnswers({ ...userQuizAnswers, [qIdx]: oIdx })}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleSubmitQuiz}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs transition"
                >
                  Valider et Soumettre Mes Réponses
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* OFFICIAL CERTIFICATE RENDERER MODAL */}
      {showCertModal && (
        <CertificateModal
          certificat={certificat}
          eleve={eleveDetail}
          user={user!}
          autoEcole={autoEcole}
          onClose={() => setShowCertModal(false)}
          onDownload={handleDownloadCertificate}
        />
      )}
    </div>
  );
};
