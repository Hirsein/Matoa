import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { UserRole } from '../types';
import { parseJsonResponse } from '../lib/api';
import { ShieldCheck, School, GraduationCap, Key, ArrowRight, AlertCircle, Sun, Moon, Globe } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
  // Determine initial login type from URL pathname
  const getInitialRole = (): UserRole => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('superadmin') || path.includes('super-admin')) return UserRole.SUPER_ADMIN;
    if (path.includes('autoecole') || path.includes('auto-ecole')) return UserRole.AUTO_ECOLE_ADMIN;
    return UserRole.ELEVE;
  };

  const [loginType, setLoginType] = useState<UserRole>(getInitialRole);

  const updateUrlForRole = (role: UserRole) => {
    let path = '/login-eleve';
    if (role === UserRole.SUPER_ADMIN) path = '/login-superadmin';
    if (role === UserRole.AUTO_ECOLE_ADMIN) path = '/login-autoecole';
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  // Initial Form states
  const [email, setEmail] = useState('');
  const [codeAutoEcole, setCodeAutoEcole] = useState('');
  const [codeEleveUnique, setCodeEleveUnique] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleChange = (role: UserRole) => {
    setLoginType(role);
    updateUrlForRole(role);
    setError(null);
    setEmail('');
    setPassword('');
    setCodeAutoEcole('');
    setCodeEleveUnique('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loginType,
          email,
          codeAutoEcole,
          codeEleveUnique,
          password,
        }),
      });

      const data = await parseJsonResponse(res);

      login(data);
    } catch (err: any) {
      setError(err.message || t('errorOccurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Language & Theme Toggle Top-Right */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
        {/* Language selector */}
        <button
          onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
          className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-1.5 active:scale-95"
          title={t('language')}
        >
          <Globe className="w-3.5 h-3.5 text-blue-500" />
          <span>{language === 'fr' ? 'EN' : 'FR'}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 border border-slate-200 dark:border-slate-800 shadow-sm active:scale-90 flex items-center justify-center"
          title={theme === 'dark' ? t('switchThemeToLight') : t('switchThemeToDark')}
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 transition-transform duration-500 rotate-0 hover:rotate-90" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300 transition-transform duration-500 rotate-0 hover:-rotate-45" />
          )}
        </button>
      </div>

      {/* Background Subtle Geometric Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 dark:bg-blue-950/40 rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-100 dark:bg-emerald-950/40 rounded-full blur-3xl pointer-events-none opacity-60" />

      {/* Main Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-slate-900/90 dark:bg-slate-900 rounded-3xl border border-blue-500/30 shadow-xl flex items-center justify-center p-2 overflow-hidden hover:scale-105 transition-transform duration-300">
            <img src="/matoa-logo.png" alt="Matoa Logo" className="w-full h-full object-contain filter drop-shadow-md" />
          </div>
        </div>

        <h2 className="mt-4 text-center text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
          {t('appName')}
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
          {t('platformSubtitleLong')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          {/* Role Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 pb-2 space-x-1">
            <button
              onClick={() => handleRoleChange(UserRole.ELEVE)}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1 transition ${
                loginType === UserRole.ELEVE
                  ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t('loginStudentTab')}</span>
            </button>

            <button
              onClick={() => handleRoleChange(UserRole.AUTO_ECOLE_ADMIN)}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1 transition ${
                loginType === UserRole.AUTO_ECOLE_ADMIN
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <School className="w-4 h-4" />
              <span>{t('loginSchoolTab')}</span>
            </button>

            <button
              onClick={() => handleRoleChange(UserRole.SUPER_ADMIN)}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1 transition ${
                loginType === UserRole.SUPER_ADMIN
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 bg-purple-50/50 dark:bg-purple-950/30'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t('loginAdminTab')}</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className={`mb-5 p-4 rounded-2xl text-xs flex items-start space-x-3 font-medium shadow-sm transition-all duration-200 ${
                error.toLowerCase().includes('suspendu') || error.toLowerCase().includes('bloqué') || error.toLowerCase().includes('suspended') || error.toLowerCase().includes('blocked')
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-2 border-amber-500/60 text-amber-900 dark:text-amber-200'
                  : 'bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
              }`}
            >
              <AlertCircle
                className={`w-5 h-5 mt-0.5 shrink-0 ${
                  error.toLowerCase().includes('suspendu') || error.toLowerCase().includes('bloqué') || error.toLowerCase().includes('suspended') || error.toLowerCase().includes('blocked')
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              />
              <div className="space-y-1">
                {(error.toLowerCase().includes('suspendu') || error.toLowerCase().includes('bloqué') || error.toLowerCase().includes('suspended') || error.toLowerCase().includes('blocked')) && (
                  <p className="font-extrabold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300">
                    {t('loginSuspendedTitle')}
                  </p>
                )}
                <p className="leading-relaxed font-semibold">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. ELEVE LOGIN FIELDS */}
            {loginType === UserRole.ELEVE && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('loginAutoEcoleCode')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('loginAutoEcoleCodePlaceholder')}
                    value={codeAutoEcole}
                    onChange={(e) => setCodeAutoEcole(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white dark:focus:bg-slate-800"
                  />
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {t('loginAutoEcoleCodeHint')}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('loginStudentCodeOrEmail')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('loginStudentCodePlaceholder')}
                    value={codeEleveUnique}
                    onChange={(e) => setCodeEleveUnique(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white dark:focus:bg-slate-800"
                  />
                </div>
              </>
            )}

            {/* 2. AUTO-ECOLE & SUPER ADMIN EMAIL FIELD */}
            {loginType !== UserRole.ELEVE && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t('loginEmailProfessional')}
                </label>
                <input
                  type="email"
                  required
                  placeholder={
                    loginType === UserRole.SUPER_ADMIN ? 'admin@domaine.com' : 'votre.email@autoecole.fr'
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-800"
                />
              </div>
            )}

            {/* PASSWORD FIELD */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {t('loginPassword')}
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-800"
                />
                <Key className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-sm font-bold text-white shadow-md transition ${
                loginType === UserRole.ELEVE
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : loginType === UserRole.AUTO_ECOLE_ADMIN
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {loading ? (
                <span>{t('loginConnecting')}</span>
              ) : (
                <>
                  <span>{t('loginSubmit')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-500 font-medium mt-6">
          {t('copyrightFooter')}
        </p>
      </div>
    </div>
  );
};
