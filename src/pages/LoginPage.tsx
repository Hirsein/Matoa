import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { UserRole } from '../types';
import { ShieldCheck, School, GraduationCap, Key, ArrowRight, AlertCircle, Sun, Moon } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Échec de la connexion.');
      }

      login(data);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Theme Toggle Top-Right */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 border border-slate-200 dark:border-slate-800 shadow-sm active:scale-90 flex items-center justify-center"
          title={theme === 'dark' ? 'Basculer en mode clair' : 'Basculer en mode sombre'}
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
          Matoa
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
          Plateforme SaaS Multi-Tenant réservée aux Auto-Écoles
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
              <span>Élève</span>
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
              <span>Auto-École</span>
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
              <span>Super Admin</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2 font-medium">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. ELEVE LOGIN FIELDS */}
            {loginType === UserRole.ELEVE && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Code Unique Auto-École *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="MATOA-AE-..."
                    value={codeAutoEcole}
                    onChange={(e) => setCodeAutoEcole(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white dark:focus:bg-slate-800"
                  />
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Fourni par votre auto-école lors de votre inscription.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Code Élève (ou Email) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Entrez votre code élève ou email"
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
                  Adresse Email Professionnelle *
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
                Mot de passe *
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
                <span>Connexion en cours...</span>
              ) : (
                <>
                  <span>Se connecter à mon espace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-500 font-medium mt-6">
          Matoa SaaS &copy; 2026 — Plateforme sécurisée de formation auto-école.
        </p>
      </div>
    </div>
  );
};
