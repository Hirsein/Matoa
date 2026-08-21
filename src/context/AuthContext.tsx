import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, AutoEcole, User, Eleve } from '../types';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  autoEcoleId?: string;
  autoEcoleName?: string;
  codeEleveUnique?: string;
  eleveId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  autoEcole: AutoEcole | null;
  eleve: Eleve | null;
  token: string | null;
  loading: boolean;
  login: (data: { user: AuthUser; autoEcole?: AutoEcole; eleve?: Eleve; token: string }) => void;
  logout: () => void;
  updateAutoEcoleBranding: (updated: Partial<AutoEcole>) => void;
  updateUserProfile: (updated: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [autoEcole, setAutoEcole] = useState<AutoEcole | null>(null);
  const [eleve, setEleve] = useState<Eleve | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('matoa_token'));
  const [loading, setLoading] = useState<boolean>(true);

  // Apply CSS variables for driving school branding
  useEffect(() => {
    if (autoEcole?.couleursTheme) {
      document.documentElement.style.setProperty('--ae-primary', autoEcole.couleursTheme.primaryColor || '#2563eb');
      document.documentElement.style.setProperty('--ae-secondary', autoEcole.couleursTheme.secondaryColor || '#059669');
    } else {
      document.documentElement.style.setProperty('--ae-primary', '#2563eb');
      document.documentElement.style.setProperty('--ae-secondary', '#059669');
    }
  }, [autoEcole]);

  // Verify session on mount
  useEffect(() => {
    async function verifySession() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await res.json();
            setUser(data.user);
            if (data.autoEcole) setAutoEcole(data.autoEcole);
            if (data.eleve) setEleve(data.eleve);
          }
        } else {
          // Token expired, invalid, or account blocked
          localStorage.removeItem('matoa_token');
          setToken(null);
          setUser(null);
          setAutoEcole(null);
          setEleve(null);
        }
      } catch (err) {
        console.error('Erreur vérification session :', err);
      } finally {
        setLoading(false);
      }
    }

    verifySession();
  }, [token]);

  // Real-time active status verification for immediate student eviction upon blocking
  useEffect(() => {
    if (!token || !user) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          if (res.status === 403 || res.status === 401 || errData.isBlocked) {
            console.warn('⚡ Compte suspendu ou session révoquée ! Déconnexion immédiate...');
            logout();
          }
        }
      } catch (err) {
        // Ignore temporary network check errors
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [token, user]);

  const login = (data: { user: AuthUser; autoEcole?: AutoEcole; eleve?: Eleve; token: string }) => {
    localStorage.setItem('matoa_token', data.token);
    setToken(data.token);
    setUser(data.user);
    if (data.autoEcole) setAutoEcole(data.autoEcole);
    if (data.eleve) setEleve(data.eleve);
  };

  const logout = () => {
    localStorage.removeItem('matoa_token');
    setToken(null);
    setUser(null);
    setAutoEcole(null);
    setEleve(null);
  };

  const updateAutoEcoleBranding = (updated: Partial<AutoEcole>) => {
    if (autoEcole) {
      setAutoEcole((prev) => (prev ? { ...prev, ...updated } : null));
    }
  };

  const updateUserProfile = (updated: Partial<AuthUser>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        autoEcole,
        eleve,
        token,
        loading,
        login,
        logout,
        updateAutoEcoleBranding,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
