import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ShieldCheck, School, GraduationCap, Sparkles, Key, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  
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

  const handleRoleChange = (role: UserRole) => {
    setLoginType(role);
    updateUrlForRole(role);
  };

  // Form states
  const [email, setEmail] = useState('');
  const [codeAutoEcole, setCodeAutoEcole] = useState('');
  const [codeEleveUnique, setCodeEleveUnique] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Helper for quick demo login fill
  const handleQuickDemo = (role: UserRole) => {
    setError(null);
    setLoginType(role);
    updateUrlForRole(role);

    if (role === UserRole.SUPER_ADMIN) {
      setEmail('admin@matoa.fr');
      setPassword('password123');
      setCodeAutoEcole('');
      setCodeEleveUnique('');
    } else if (role === UserRole.AUTO_ECOLE_ADMIN) {
      setEmail('contact@conduitepassion.fr');
      setPassword('password123');
      setCodeAutoEcole('MATOA-AE-001');
      setCodeEleveUnique('');
    } else if (role === UserRole.ELEVE) {
      setCodeAutoEcole('MATOA-AE-001');
      setCodeEleveUnique('AE001-ELV001');
      setEmail('jean.dupont@email.fr');
      setPassword('password123');
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Background Subtle Geometric Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 dark:bg-blue-950/40 rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-100 dark:bg-emerald-950/40 rounded-full blur-3xl pointer-events-none opacity-60" />

      {/* Main Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl text-white shadow-lg flex items-center justify-center font-black text-2xl italic">
            M
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
          {/* Quick Demo Selector */}
          <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Accès Démo Instantané (1-Clic)
            </p>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleQuickDemo(UserRole.ELEVE)}
                className={`py-1.5 px-2 rounded-lg transition text-center ${
                  loginType === UserRole.ELEVE
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                }`}
              >
                Élève
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo(UserRole.AUTO_ECOLE_ADMIN)}
                className={`py-1.5 px-2 rounded-lg transition text-center ${
                  loginType === UserRole.AUTO_ECOLE_ADMIN
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                }`}
              >
                Auto-École
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo(UserRole.SUPER_ADMIN)}
                className={`py-1.5 px-2 rounded-lg transition text-center ${
                  loginType === UserRole.SUPER_ADMIN
                    ? 'bg-purple-600 text-white font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                }`}
              >
                Super Admin
              </button>
            </div>
          </div>

          {/* Role Tabs */}
          <div className="flex border-b border-slate-200 mb-6 pb-2 space-x-1">
            <button
              onClick={() => {
                handleRoleChange(UserRole.ELEVE);
                setError(null);
              }}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1 transition ${
                loginType === UserRole.ELEVE
                  ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Élève</span>
            </button>

            <button
              onClick={() => {
                handleRoleChange(UserRole.AUTO_ECOLE_ADMIN);
                setError(null);
              }}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1 transition ${
                loginType === UserRole.AUTO_ECOLE_ADMIN
                  ? 'text-blue-700 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Auto-École</span>
            </button>

            <button
              onClick={() => {
                handleRoleChange(UserRole.SUPER_ADMIN);
                setError(null);
              }}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1 transition ${
                loginType === UserRole.SUPER_ADMIN
                  ? 'text-purple-700 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-slate-500 hover:text-slate-800'
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
                  <label className="block text-xs font-bold text-slate-700">
                    Code Unique Auto-École *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: MATOA-AE-001"
                    value={codeAutoEcole}
                    onChange={(e) => setCodeAutoEcole(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                  <p className="mt-1 text-[11px] text-slate-500 font-medium">
                    Fourni par votre auto-école lors de votre inscription.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Code Élève (ou Email) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: AE001-ELV001 ou jean.dupont@email.fr"
                    value={codeEleveUnique}
                    onChange={(e) => setCodeEleveUnique(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>
              </>
            )}

            {/* 2. AUTO-ECOLE & SUPER ADMIN EMAIL FIELD */}
            {loginType !== UserRole.ELEVE && (
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Adresse Email Professionnelle *
                </label>
                <input
                  type="email"
                  required
                  placeholder={
                    loginType === UserRole.SUPER_ADMIN ? 'admin@matoa.fr' : 'contact@conduitepassion.fr'
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>
            )}

            {/* PASSWORD FIELD */}
            <div>
              <label className="block text-xs font-bold text-slate-700">
                Mot de passe *
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
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
