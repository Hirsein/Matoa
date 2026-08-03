import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { HeaderNavbar } from './components/HeaderNavbar';
import { LoginPage } from './pages/LoginPage';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import { AutoEcoleDashboard } from './pages/AutoEcoleDashboard';
import { ElevePortal } from './pages/ElevePortal';
import { SplashScreen } from './components/SplashScreen';
import { UserRole } from './types';

const MainAppRouter: React.FC = () => {
  const { user, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  React.useEffect(() => {
    if (loading) return;

    if (!user) {
      if (currentPath === '/' || currentPath === '/login') {
        window.history.replaceState({}, '', '/login-eleve');
        setCurrentPath('/login-eleve');
      }
    } else {
      let targetPath = '/portal-eleve';
      if (user.role === UserRole.SUPER_ADMIN) targetPath = '/super-admin';
      if (user.role === UserRole.AUTO_ECOLE_ADMIN) targetPath = '/dashboard-autoecole';
      if (user.role === UserRole.ELEVE) targetPath = '/portal-eleve';

      if (window.location.pathname !== targetPath) {
        window.history.replaceState({}, '', targetPath);
        setCurrentPath(targetPath);
      }
    }
  }, [user, loading, currentPath]);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} minDurationMs={2200} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl border border-blue-500/30 p-2 shadow-xl mx-auto flex items-center justify-center animate-pulse">
            <img src="/matoa-logo.png" alt="Matoa Logo" className="w-full h-full object-contain" />
          </div>
          <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-medium font-mono">Chargement de Matoa SaaS...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <HeaderNavbar />

      <main>
        {user.role === UserRole.SUPER_ADMIN && <SuperAdminDashboard />}
        {user.role === UserRole.AUTO_ECOLE_ADMIN && <AutoEcoleDashboard />}
        {user.role === UserRole.ELEVE && <ElevePortal />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <MainAppRouter />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

