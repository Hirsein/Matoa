import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ModuleFormation, Quiz, ProgressionModule, Certificat } from '../types';
import { CertificateModal } from '../components/CertificateModal';
import { generateCertificatePDF } from '../lib/certificatePdfService';
import { ModuleProgressionCharts } from '../components/ModuleProgressionCharts';
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
  Bell,
  BellRing,
  Calendar,
  X,
  CheckCheck,
  Info,
  MessageSquare,
  Search,
} from 'lucide-react';

interface YoutubePlayerProps {
  videoUrl: string;
  onTimeUpdate: (currentTime: number, isFinished?: boolean) => void;
  savedTime: number;
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({
  videoUrl,
  onTimeUpdate,
  savedTime,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);

  const getYoutubeId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYoutubeId(videoUrl);

  useEffect(() => {
    if (!videoId) return;

    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    let player: any = null;

    const startTracking = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (player && typeof player.getCurrentTime === 'function') {
          const currentTime = Math.floor(player.getCurrentTime());
          onTimeUpdate(currentTime);
        }
      }, 1000);
    };

    const stopTracking = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const initPlayer = () => {
      if (!containerRef.current) return;

      const placeholder = document.createElement('div');
      placeholder.className = 'w-full h-full';
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(placeholder);

      player = new (window as any).YT.Player(placeholder, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event: any) => {
            playerRef.current = event.target;
            if (savedTime > 0) {
              event.target.seekTo(savedTime, true);
            }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING = 1
            if (event.data === 1) {
              startTracking();
            } else {
              stopTracking();
              // YT.PlayerState.ENDED = 0
              if (event.data === 0) {
                const finalTime = player && typeof player.getDuration === 'function' 
                  ? Math.floor(player.getDuration()) 
                  : savedTime;
                onTimeUpdate(finalTime, true);
              }
            }
          },
        },
      });
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      const timer = setInterval(() => {
        if ((window as any).YT && (window as any).YT.Player) {
          clearInterval(timer);
          initPlayer();
        }
      }, 100);

      return () => {
        clearInterval(timer);
        stopTracking();
        if (player && typeof player.destroy === 'function') {
          player.destroy();
        }
      };
    }

    return () => {
      stopTracking();
      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
    };
  }, [videoId, savedTime]);

  if (!videoId) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400 text-xs">
        Format de vidéo non supporté
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full" />;
};

const isYoutubeUrl = (url: string): boolean => {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
};

export const ElevePortal: React.FC = () => {
  const { token, user, autoEcole, eleve } = useAuth();
  const { t, language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'modules' | 'profile' | 'certificat' | 'logs' | 'panneau'>('modules');

  const [structuredProgression, setStructuredProgression] = useState<any[]>([]);
  const [eleveDetail, setEleveDetail] = useState<any>(eleve);
  const [certificat, setCertificat] = useState<Certificat | null>(null);

  // Panneau State
  const [eleves, setEleves] = useState<any[]>([]);
  const [elevesLoading, setElevesLoading] = useState(false);
  const [elevesError, setElevesError] = useState<string | null>(null);
  const [eleveSearch, setEleveSearch] = useState('');

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

  // Notifications System state
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState<'ALL' | 'COURS' | 'PLANNING'>('ALL');
  const [readNotifIds, setReadNotifIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`matoa_read_notifs_${eleve?.user}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const markNotificationAsRead = (id: string) => {
    if (!readNotifIds.includes(id)) {
      const updated = [...readNotifIds, id];
      setReadNotifIds(updated);
      try {
        localStorage.setItem(`matoa_read_notifs_${eleve?.user}`, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const markAllNotificationsAsRead = (ids: string[]) => {
    const combined = Array.from(new Set([...readNotifIds, ...ids]));
    setReadNotifIds(combined);
    try {
      localStorage.setItem(`matoa_read_notifs_${eleve?.user}`, JSON.stringify(combined));
    } catch (e) {
      console.error(e);
    }
  };

  // Check if student training period is expired or blocked
  const todayStr = new Date().toISOString().split('T')[0];
  const isExpired = eleveDetail?.dateFinFormation ? eleveDetail.dateFinFormation < todayStr : false;
  const isBlocked = eleveDetail?.isBlocked || isExpired;

  // Dynamic Notifications calculation
  const notificationsList = React.useMemo(() => {
    const notifs: any[] = [];

    // 1. Cours Théoriques Notifications
    structuredProgression.forEach((sp: any) => {
      if (!sp.isLocked) {
        notifs.push({
          id: `notif-course-${sp.module._id}`,
          type: 'COURS',
          title: t('newCourseNotificationTitle', { title: sp.module.title }),
          message: t('newCourseNotificationBody', { type: sp.module.typePermis || 'B', count: sp.lecons?.length || 0 }),
          timestamp: 'Disponible',
          targetTab: 'modules',
          moduleId: sp.module._id,
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
        });
      }
    });

    // 2. Planning & Expiration Notifications
    if (eleveDetail?.dateFinFormation) {
      const isSoonExpired = (new Date(eleveDetail.dateFinFormation).getTime() - new Date().getTime()) / (1000 * 3600 * 24) < 15;
      notifs.push({
        id: `notif-planning-${eleveDetail._id}`,
        type: 'PLANNING',
        title: isExpired
          ? t('planningExpiredNotifTitle')
          : isSoonExpired
          ? t('planningImminentNotifTitle')
          : t('planningActiveNotifTitle'),
        message: isExpired
          ? t('planningExpiredNotifBody', { date: eleveDetail.dateFinFormation })
          : t('planningActiveNotifBody', { start: eleveDetail.dateDebutFormation || 'Début', end: eleveDetail.dateFinFormation }),
        timestamp: t('accountStatusBadge'),
        targetTab: 'profile',
        badgeColor: isExpired ? 'bg-red-100 text-red-800 border-red-200' : 'bg-purple-100 text-purple-800 border-purple-200',
      });
    }

    // 3. Certificat / Réussite
    if (eleveDetail?.progressionGlobal >= 100) {
      notifs.push({
        id: `notif-cert-${eleveDetail._id}`,
        type: 'CERTIFICATE',
        title: t('certAvailableNotifTitle'),
        message: t('certAvailableNotifBody'),
        timestamp: t('validationBadge'),
        targetTab: 'certificat',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      });
    }

    return notifs;
  }, [structuredProgression, eleveDetail, isExpired, t]);

  const unreadNotifs = notificationsList.filter((n) => !readNotifIds.includes(n.id));

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

  useEffect(() => {
    if (activeTab !== 'panneau') return;
    const fetchEleves = async () => {
      setElevesLoading(true);
      setElevesError(null);
      try {
        const res = await fetch('/api/eleves', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to load students');
        const data = await res.json();
        setEleves(data);
      } catch (e: any) {
        setElevesError(e.message);
      } finally {
        setElevesLoading(false);
      }
    };
    fetchEleves();
  }, [activeTab, token]);

  // Synchroniser le temps de visionnage de la vidéo (native ou YouTube)
  const syncWatchTime = async (currentTime: number, isFinished?: boolean) => {
    if (!activeModuleItem || isBlocked) return;

    const currentLecStatus = activeModuleItem.lecons?.[selectedLessonIndex];
    const currentLec = currentLecStatus?.lecon;
    setVideoCurrentTime(currentTime);

    // Sync watch time if isFinished is true OR every 5 seconds
    if (isFinished || (currentTime > 0 && currentTime % 5 === 0)) {
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
            isFinished: !!isFinished,
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

  // Video playback time update handler for native HTML5 video
  const handleVideoTimeUpdate = async () => {
    if (!videoRef.current) return;
    syncWatchTime(Math.floor(videoRef.current.currentTime));
  };

  // Handler for native HTML5 video completion
  const handleVideoEnded = async () => {
    if (!activeModuleItem) return;
    const currentLecStatus = activeModuleItem.lecons?.[selectedLessonIndex];
    const currentLec = currentLecStatus?.lecon;
    const duration = videoRef.current ? Math.floor(videoRef.current.duration || 0) : 0;
    syncWatchTime(duration, true);
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
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 text-white px-3 py-0.5 rounded-full backdrop-blur-sm inline-block">
                  {t('officialStudentPortalBadge')}
                </span>
                <span className="text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full shadow-xs">
                  {t('permisPrefix')} {eleveDetail?.typePermis || 'B'}
                </span>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">{autoEcole?.name}</h1>
              <p className="text-xs text-white/90">
                {t('welcomeStudentPrefix')} <strong className="text-white font-bold">{user?.name}</strong> | {t('studentCodeLabel')}{' '}
                <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded text-white">
                  {eleveDetail?.codeEleveUnique}
                </span>
              </p>
            </div>
          </div>

          {/* Header Controls & Progress Badge Card */}
          <div className="flex items-center space-x-3">
            {/* Notification Bell Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotificationPanel(!showNotificationPanel)}
                className="relative p-3 bg-white/20 hover:bg-white/30 text-white rounded-2xl backdrop-blur-md border border-white/30 transition shadow-sm flex items-center justify-center focus:outline-none"
                title="Notifications & Alertes de formation"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-sm animate-pulse">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Modal / Popover */}
              <AnimatePresence>
                {showNotificationPanel && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-50 overflow-hidden text-slate-900 dark:text-white"
                  >
                    {/* Panel Header */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BellRing className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-sm font-black tracking-tight">{t('notifCenterTitle')}</h3>
                        {unreadNotifs.length > 0 && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-full">
                            {unreadNotifs.length} {t('unreadBadge')}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setShowNotificationPanel(false)}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex border-b border-slate-100 dark:border-slate-800 px-3 py-2 bg-white dark:bg-slate-900 gap-1 overflow-x-auto text-[11px] font-bold">
                      <button
                        onClick={() => setNotificationFilter('ALL')}
                        className={`px-3 py-1 rounded-xl transition ${
                          notificationFilter === 'ALL'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {t('allNotifsTab')} ({notificationsList.length})
                      </button>
                      <button
                        onClick={() => setNotificationFilter('COURS')}
                        className={`px-3 py-1 rounded-xl transition ${
                          notificationFilter === 'COURS'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {t('courseNotifsTab')}
                      </button>
                      <button
                        onClick={() => setNotificationFilter('PLANNING')}
                        className={`px-3 py-1 rounded-xl transition ${
                          notificationFilter === 'PLANNING'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {t('planningNotifsTab')}
                      </button>
                    </div>

                    {/* Notification List */}
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                      {notificationsList.filter((n) => notificationFilter === 'ALL' || n.type === notificationFilter).length === 0 ? (
                        <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-xs font-medium">
                          {t('noNotificationsAvailable')}
                        </div>
                      ) : (
                        notificationsList
                          .filter((n) => notificationFilter === 'ALL' || n.type === notificationFilter)
                          .map((notif) => {
                            const isRead = readNotifIds.includes(notif.id);
                            return (
                              <div
                                key={notif.id}
                                onClick={() => {
                                  markNotificationAsRead(notif.id);
                                  if (notif.targetTab) setActiveTab(notif.targetTab);
                                  setShowNotificationPanel(false);
                                }}
                                className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition cursor-pointer relative ${
                                  !isRead ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${notif.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                                      {notif.type}
                                    </span>
                                    <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                                  </div>

                                  {!isRead && (
                                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1" />
                                  )}
                                </div>

                                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5">{notif.title}</h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{notif.message}</p>
                              </div>
                            );
                          })
                      )}
                    </div>

                    {/* Footer Actions */}
                    {unreadNotifs.length > 0 && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-center">
                        <button
                          onClick={() => markAllNotificationsAsRead(notificationsList.map((n) => n.id))}
                          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center space-x-1 mx-auto"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>{t('markAllAsReadBtn')}</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress Badge Card */}
            <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/25 min-w-[240px] shadow-xs">
              <div className="flex items-center justify-between text-xs text-white mb-1">
                <span className="font-bold">{t('codeProgressCardTitle')}</span>
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
                  ? t('training100CompletedBadge')
                  : t('modulesInProgressBadge')}
              </p>
            </div>
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
                  {isExpired ? t('trainingPeriodExpiredTitle') : t('accessToModulesSuspendedTitle')}
                </h3>
                <p className="text-xs text-red-700 font-medium">
                  {isExpired
                    ? t('trainingPeriodExpiredDesc', { date: eleveDetail.dateFinFormation })
                    : t('accountSuspendedDesc')}
                </p>
              </div>
            </div>
            <p className="text-xs font-bold text-red-800 pt-2 border-t border-red-200">
              {t('contactSchoolToReactivate', { school: autoEcole?.name, contact: autoEcole?.contact?.phone || autoEcole?.contact?.email })}
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
            <span>{t('tabCodePath')}</span>
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
            <span>{t('tabMyOfficialCert')}</span>
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
            <span>{t('tabMyHistory')}</span>
          </button>
          <button
            onClick={() => setActiveTab('panneau')}
            className={`py-3 px-5 text-xs font-bold rounded-t-xl transition flex items-center space-x-2 ${
              activeTab === 'panneau'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-b-2 border-indigo-600'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>{t('tabStudentPanel')}</span>
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
              <div className="space-y-6">
                {/* Active Notifications Alert Banner */}
                {unreadNotifs.length > 0 && (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl flex items-center justify-between shadow-xs">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
                        <Bell className="w-5 h-5 animate-bounce" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">
                          {t('newCoursesAndAlertsBanner')} ({unreadNotifs.length} {t('unreadBadge')})
                        </h4>
                        <p className="text-xs text-blue-700 font-medium">
                          {unreadNotifs[0].title} — <span className="opacity-90">{unreadNotifs[0].message}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowNotificationPanel(true)}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-2xs whitespace-nowrap shrink-0"
                    >
                      {t('seeAllAlertsBtn')}
                    </button>
                  </div>
                )}

                {/* Visual Chart Component */}
                <ModuleProgressionCharts
                  structuredProgression={structuredProgression}
                  onSelectModule={(item) => {
                    if (!item.isLocked && !isBlocked) {
                      setActiveModuleItem(item);
                      setVideoCurrentTime(item.progression?.videoWatchTimeSeconds || 0);
                    }
                  }}
                  activeModuleId={activeModuleItem?.module?._id}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Sequential Modules List */}
            <div className="space-y-4 lg:col-span-1">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t('lockedPathNotice')}
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
                            {t('validatedBadge')}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                            {t('availableBadge')}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">
                        {item.module.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                        <span>{t('minVideoLabel')} {item.module.tempsMinimumVisionnage}s</span>
                        <span>{t('quizRequiredLabel')} {item.module.scoreMinimumQuiz}%</span>
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
                          {t('moduleCounterLabel')} {activeModuleItem.module.ordre}
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
                          <span>{t('moduleValidatedBadge')}</span>
                        </span>
                      ) : activeModuleItem.areAllLessonsCompleted ? (
                        <span className="px-3 py-1 bg-purple-50 text-purple-800 font-bold text-xs rounded-full border border-purple-200 flex items-center space-x-1">
                          <HelpCircle className="w-4 h-4 text-purple-600" />
                          <span>{t('lessonsFinishedQuizUnlocked')}</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-full border border-amber-200">
                          {t('inLearningProcess')}
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
                            {t('moduleSummaryTitle')}
                          </h4>
                          <p className="text-slate-700 leading-relaxed font-medium">
                            {activeModuleItem.module.summary}
                          </p>
                        </div>
                      )}

                      {activeModuleItem.module.learningObjectives?.length > 0 && (
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[10px] text-slate-500 mb-1.5">
                            {t('learningObjectivesTitle')}
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
                          <span>{t('moduleLessonsCount')} ({activeModuleItem.lecons.length})</span>
                        </h3>
                        <span className="text-[11px] font-bold text-slate-500">
                          {t('lessonsProgressCounter', {
                            completed: activeModuleItem.lecons.filter((l: any) => l.isCompleted).length,
                            total: activeModuleItem.lecons.length,
                          })}
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
                                  {t('lessonBadge')} {lecStatus.lecon.ordre}
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
                                <span>{Math.round(lecStatus.lecon.tempsMinimumVisionnageSeconds / 60)} {t('minutesShort')}</span>
                                {lecStatus.lecon.hasInlineQuiz && (
                                  <span className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 font-bold">
                                    {t('miniQuizBadge')}
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
                              {t('activeLessonNumber')}{selectedLessonIndex + 1}
                            </span>
                            <h3 className="text-base font-black text-slate-900">{lec.title}</h3>
                          </div>
                          {currentLecStatus.hasCompletedVideo && (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center space-x-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{t('videoValidatedBadge')}</span>
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
                            <span>{t('videoLearningSessionTitle')}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => toggleContainerFullscreen(videoContainerRef, isFullscreenVideo, setIsFullscreenVideo)}
                            className="px-3 py-1.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border border-slate-700 shadow-xs"
                            title={t('immersiveVideoTooltip')}
                          >
                            {isFullscreenVideo ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                            <span>{isFullscreenVideo ? t('exitFullscreen') : t('fullscreenMode')}</span>
                          </button>
                        </div>

                        {/* Video Player Container */}
                        <div
                          ref={videoContainerRef}
                          className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg ${
                            isFullscreenVideo ? 'fixed inset-0 z-50 rounded-none w-screen h-screen flex flex-col justify-center items-center bg-black' : 'aspect-video w-full'
                          }`}
                        >
                          {isYoutubeUrl(lec.videoUrl) ? (
                            <YoutubePlayer
                              videoUrl={lec.videoUrl}
                              onTimeUpdate={syncWatchTime}
                              savedTime={currentLecStatus.videoWatchTimeSeconds || 0}
                            />
                          ) : (
                            <video
                              ref={videoRef}
                              src={lec.videoUrl}
                              onTimeUpdate={handleVideoTimeUpdate}
                              onEnded={handleVideoEnded}
                              controls
                              className="w-full h-full object-contain"
                            />
                          )}
                          {isFullscreenVideo && (
                            <button
                              type="button"
                              onClick={() => toggleContainerFullscreen(videoContainerRef, isFullscreenVideo, setIsFullscreenVideo)}
                              className="absolute top-4 right-4 z-50 bg-slate-900/90 text-white p-2.5 rounded-xl border border-slate-700 font-bold text-xs flex items-center space-x-2 shadow-xl hover:bg-slate-800"
                            >
                              <Minimize2 className="w-4 h-4" />
                              <span>{t('exitFullscreen')}</span>
                            </button>
                          )}
                        </div>

                        {/* Video Progress Bar Tracker */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600 font-bold">{t('lessonWatchTimeLabel')}</span>
                            <span className="font-mono text-slate-900 font-extrabold">
                              {t('watchTimeCounter', { current: videoCurrentTime, required: lec.tempsMinimumVisionnageSeconds })}
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
                                <span>{t('miniQuizRevisionTitle')}</span>
                              </span>
                              <p className="text-purple-700 mt-0.5 font-medium">
                                {currentLecStatus.isInlineQuizPassed
                                  ? t('miniQuizValidatedStatus', { score: currentLecStatus.inlineQuizScore })
                                  : t('miniQuizPendingPrompt')}
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
                                ? t('watchVideoFirstBtn')
                                : currentLecStatus.isInlineQuizPassed
                                ? t('retakeMiniQuizBtn')
                                : t('startMiniQuizBtn')}
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
                        <span>{t('finalModuleQuizHeading', { score: activeModuleItem.module.scoreMinimumQuiz })}</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        {t('finalModuleQuizDesc')}
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
                          ? t('completeAllLessonsFirstBtn')
                          : t('startModuleQuizBtn')}
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 font-medium shadow-xs">
                  <p>{t('selectModuleToStartMessage')}</p>
                </div>
              )}
            </div>
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
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">{t('phonePrefix')} {eleveDetail.telephone}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">{t('codeUnique')}</span>
                    <p className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">{eleveDetail?.codeEleveUnique}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">{t('schoolLabel')}</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{autoEcole?.name || 'Matoa Auto-École'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">{t('trainingAccessField')}</span>
                    <div className="mt-0.5">
                      {isExpired ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          {t('expired')}
                        </span>
                      ) : isBlocked ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                          {t('suspended')}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {t('valid')}
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
                    {t('totalVideoWatchTimeSub')}
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
                    {t('testsPassedCountSub', { count: quizScoresList.length })}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('validatedModulesKpi')}</span>
                  <div className="p-2 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-xl">
                    <Target className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">
                    {completedModulesCount} / {totalModulesCount}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {t('unlockedTheoreticalModules')}
                  </p>
                </div>
              </div>
            </div>

            {/* Circular Charts Visual Breakdown */}
            <ModuleProgressionCharts structuredProgression={structuredProgression} />

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
                              <span>{t('validated100Pct')}</span>
                            </span>
                          ) : sp.isLocked ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center space-x-1">
                              <Lock className="w-3 h-3" />
                              <span>{t('lockedBadge')}</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700 flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-blue-600" />
                              <span>{t('inProgressBadge')} ({sp.progressionPct || 0}%)</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar & Details */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                          <span>{t('moduleProgressLabel')}</span>
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
                          {t('lessonsDetailLine', { completed: completedLecCount, total: totalLecCount })}
                        </div>
                        <div>
                          {t('watchTimeDetailLine', { minutes: Math.floor(modLessonsWatch / 60), seconds: modLessonsWatch % 60 })}
                        </div>
                        <div>
                          {t('finalQuizDetailLine')} <strong className="text-slate-900 dark:text-white">{typeof sp.quizScore === 'number' ? `${sp.quizScore}%` : t('notTakenYet')}</strong>
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
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{t('officialMatoaCertTitle')}</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {t('officialCertDesc')}{' '}
                <strong className="text-slate-800">{autoEcole?.name}</strong>.
              </p>
            </div>

            {eleveDetail?.progressionGlobal >= 100 ? (
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl">
                  {t('congrats100SuccessBanner')}
                </div>

                <button
                  onClick={() => setShowCertModal(true)}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs transition inline-flex items-center space-x-2"
                >
                  <Award className="w-4 h-4" />
                  <span>{t('viewAndPrintCertBtn')}</span>
                </button>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium rounded-xl">
                {t('completeAllModulesToUnlockCert')}{' '}
                {t('currentProgressLabel')} <strong className="text-slate-900 font-bold">{eleveDetail?.progressionGlobal || 0}%</strong>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">{t('activityHistoryTitle')}</h2>

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
                          {new Date(log.timestamp).toLocaleString(language === 'en' ? 'en-US' : 'fr-FR')}
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
        
        {/* TAB 5: PANNEAU */}
        {activeTab === 'panneau' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">{t('studentsPanelTitle')}</h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={eleveSearch}
                onChange={e => setEleveSearch(e.target.value)}
                className="flex-1 p-2 border rounded-md"
              />
              <Search className="w-5 h-5 text-slate-500" />
            </div>

            {elevesLoading ? (
              <p>{t('loadingIndicator')}</p>
            ) : elevesError ? (
              <p className="text-red-600">{elevesError}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-2 text-left">{t('studentCol')}</th>
                      <th className="px-4 py-2 text-left">{t('emailLabel')}</th>
                      <th className="px-4 py-2 text-left">{t('phoneLabel')}</th>
                      <th className="px-4 py-2 text-left">{t('studentCodeCol')}</th>
                      <th className="px-4 py-2 text-left">{t('statusCol')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eleves
                      .filter(e =>
                        (e.user?.name ?? '').toLowerCase().includes(eleveSearch.toLowerCase()) ||
                        (e.codeEleveUnique ?? '').toLowerCase().includes(eleveSearch.toLowerCase())
                      )
                      .map(e => (
                        <tr key={e._id} className="border-t">
                          <td className="px-4 py-2">{e.user?.name || '—'}</td>
                          <td className="px-4 py-2">{e.user?.email || '—'}</td>
                          <td className="px-4 py-2">{e.telephone || '—'}</td>
                          <td className="px-4 py-2 font-mono">{e.codeEleveUnique || '—'}</td>
                          <td className="px-4 py-2">
                            {e.isBlocked ? (
                              <span className="px-2 py-0.5 text-xs font-bold bg-red-50 text-red-800 rounded">{t('blocked')}</span>
                            ) : e.isExpired ? (
                              <span className="px-2 py-0.5 text-xs font-bold bg-amber-50 text-amber-800 rounded">{t('expired')}</span>
                            ) : (
                              <span className="px-2 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-800 rounded">{t('valid')}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
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
                  {t('miniQuizLessonModalBadge')}
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
                  title={t('fullscreenMode')}
                >
                  {isFullscreenInlineQuiz ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isFullscreenInlineQuiz ? t('normalMode') : t('fullscreenMode')}</span>
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
                    {inlineQuizSubmittedResult.passed ? t('miniQuizPassedTitle') : t('continueRevisingTitle')}
                  </h3>
                  <p className="text-2xl font-black font-mono mt-1 text-slate-900">
                    {inlineQuizSubmittedResult.scorePercentage}%
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {t('goodAnswersSummary', {
                      correct: inlineQuizSubmittedResult.correctCount,
                      total: inlineQuizSubmittedResult.totalQuestions,
                    })}
                  </p>
                </div>

                {/* Explication de chaque question */}
                <div className="space-y-3 text-left border-t border-slate-200 pt-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    {t('correctionAndExplanationsTitle')}
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
                          {t('yourAnswerLabel')}{' '}
                          <strong className={isUserCorrect ? 'text-emerald-700' : 'text-red-700'}>
                            {q.options?.[userInlineAnswers[qIdx]] || t('unansweredQuestion')}
                          </strong>
                        </p>
                        {!isUserCorrect && (
                          <p className="text-[11px] font-medium text-emerald-800">
                            {t('correctAnswerLabel')} <strong>{q.options?.[q.correctOptionIndex]}</strong>
                          </p>
                        )}
                        {q.explanation && (
                          <p className="text-[10px] text-slate-600 bg-white/80 p-2 rounded border border-slate-200 font-medium mt-1">
                            💡 <strong>{t('explanationLabel')}</strong> {q.explanation}
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
                    <span>{t('retryBtn')}</span>
                  </button>

                  <button
                    onClick={() => setActiveInlineQuizLesson(null)}
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    {t('close')}
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
                  {t('validateMiniQuizBtn')}
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
                  {t('quizEvaluationModalBadge')} {activeQuizItem.module.title}
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                  {t('minScoreRequiredBadge')} {activeQuizItem.module.scoreMinimumQuiz}%
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
                  title={t('fullscreenMode')}
                >
                  {isFullscreenModuleQuiz ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isFullscreenModuleQuiz ? t('normalMode') : t('fullscreenMode')}</span>
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
                    {quizSubmittedResult.passed ? t('quizSucceededTitle') : t('insufficientScoreTitle')}
                  </h3>
                  <p className="text-2xl font-black font-mono mt-1 text-slate-900">
                    {quizSubmittedResult.scorePercentage}%
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {t('goodAnswersSummary', {
                      correct: quizSubmittedResult.correctCount,
                      total: quizSubmittedResult.totalQuestions,
                    })}
                  </p>
                </div>

                {quizSubmittedResult.passed ? (
                  <p className="text-xs text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 font-bold">
                    {t('quizPassedSuccessDesc')}
                  </p>
                ) : (
                  <p className="text-xs text-red-800 bg-red-50 p-3 rounded-xl border border-red-200 font-bold">
                    {t('quizFailedScoreDesc', { score: activeQuizItem.module.scoreMinimumQuiz })}
                  </p>
                )}

                <div className="flex justify-center space-x-3">
                  {!quizSubmittedResult.passed && (
                    <button
                      onClick={() => setQuizSubmittedResult(null)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center space-x-1 border border-slate-200"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>{t('retryQuizBtn')}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveQuizItem(null)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    {t('closeAndContinueBtn')}
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
                  {t('submitMyAnswersBtn')}
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
