import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { User, Lock, Bell, CheckCircle2, AlertTriangle, Shield, Save, X } from 'lucide-react';

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserSettingsModal: React.FC<UserSettingsModalProps> = ({ isOpen, onClose }) => {
  const { user, token, updateUserProfile } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications'>('profile');

  // Form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notifications state
  const [notifyModuleUnlock, setNotifyModuleUnlock] = useState(true);
  const [notifyQuizResult, setNotifyQuizResult] = useState(true);
  const [notifyExpiryWarning, setNotifyExpiryWarning] = useState(true);
  const [notifySms, setNotifySms] = useState(false);

  // Status feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (activeTab === 'password') {
      if (!newPassword) {
        setMessage({ type: 'error', text: 'Veuillez saisir un nouveau mot de passe.' });
        return;
      }
      if (newPassword !== confirmPassword) {
        setMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas.' });
        return;
      }
    }

    setLoading(true);

    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          currentPassword: activeTab === 'password' ? currentPassword : undefined,
          newPassword: activeTab === 'password' ? newPassword : undefined,
          notificationPreferences: {
            notifyModuleUnlock,
            notifyQuizResult,
            notifyExpiryWarning,
            notifySms,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la mise à jour des paramètres.');

      setMessage({ type: 'success', text: 'Vos paramètres ont été mis à jour avec succès.' });

      // Update auth context
      updateUserProfile({
        name: data.user.name,
        email: data.user.email,
      });

      // Clear password fields if changed
      if (activeTab === 'password') {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Une erreur est survenue.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Paramètres du Compte</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Gérez vos informations personnelles et préférences</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center space-x-1 border-b border-slate-200 dark:border-slate-800 my-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center space-x-1.5 px-3 py-2.5 border-b-2 transition ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profil Personnel</span>
          </button>

          <button
            onClick={() => setActiveTab('password')}
            className={`flex items-center space-x-1.5 px-3 py-2.5 border-b-2 transition ${
              activeTab === 'password'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sécurité & Mot de Passe</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center space-x-1.5 px-3 py-2.5 border-b-2 transition ${
              activeTab === 'notifications'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Notifications</span>
          </button>
        </div>

        {/* Message alert */}
        {message && (
          <div
            className={`p-3 rounded-xl border mb-4 text-xs flex items-center space-x-2 ${
              message.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'profile' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Adresse Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Numéro de Téléphone
                </label>
                <input
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-300">Rôle sur Matoa :</span> {user.role}
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  placeholder="Minimum 6 caractères"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  placeholder="Répétez le nouveau mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Déblocage de Nouveaux Modules</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Recevoir un email quand un module est déverrouillé</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyModuleUnlock}
                  onChange={(e) => setNotifyModuleUnlock(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Résultats des Quiz & Certificats</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Confirmation par email lors de la réussite des quiz</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyQuizResult}
                  onChange={(e) => setNotifyQuizResult(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Rappel Expiration Formation</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Alertes 15 jours avant la date de fin de validité</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyExpiryWarning}
                  onChange={(e) => setNotifyExpiryWarning(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Notifications SMS</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Alerte directe sur mobile (optionnel)</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifySms}
                  onChange={(e) => setNotifySms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600"
                />
              </label>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-xs transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-xs text-xs flex items-center space-x-1.5 transition"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Enregistrement...' : 'Enregistrer'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
