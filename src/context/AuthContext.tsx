import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole } from '../types';
import { api } from '../services/api';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: UserProfile;
  isLoading: boolean;
  isAdmin: boolean;
  isIndustry: boolean;
  isUMKM: boolean;
  isGuest: boolean;
  login: (email: string, role?: UserRole) => Promise<void>;
  register: (name: string, email: string, role: UserRole, organization: string, phone: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  switchRole: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>({
    id: 'guest',
    name: 'Pengunjung (Tamu)',
    email: '-',
    role: 'user',
    roleLabel: 'Guest / Belum Login',
    organization: '-',
    phone: '-'
  });
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const current = await api.auth.getCurrentUser();
        setUser(current);
      } catch (err) {
        console.error('Failed to load user', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, role?: UserRole) => {
    setIsLoading(true);
    try {
      const loggedUser = await api.auth.login(email, role);
      setUser(loggedUser);
      addToast(`Selamat datang kembali, ${loggedUser.name}! (${loggedUser.roleLabel})`, 'success');
    } catch (err: any) {
      addToast(err.message || 'Gagal masuk akun', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, role: UserRole, organization: string, phone: string) => {
    setIsLoading(true);
    try {
      const newUser = await api.auth.register(name, email, role, organization, phone);
      setUser(newUser);
      addToast(`Pendaftaran berhasil! Selamat datang di WasteToWealth, ${newUser.name}.`, 'success');
    } catch (err: any) {
      addToast(err.message || 'Gagal mendaftar', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      const updated = await api.auth.updateProfile(data);
      setUser(updated);
      addToast('Profil akun berhasil diperbarui!', 'success');
    } catch (err: any) {
      addToast('Gagal memperbarui profil', 'error');
      throw err;
    }
  };

  const switchRole = async (newRole: UserRole) => {
    const demoUsers = await api.auth.getDemoUsers();
    const targetUser = demoUsers.find((u) => u.role === newRole) || {
      ...user,
      role: newRole,
      roleLabel: newRole === 'industry' ? 'Pabrik Industri' : newRole === 'umkm' ? 'Pengrajin UMKM' : newRole === 'admin' ? 'Admin Kurator' : 'Siswa / Mahasiswa'
    };
    await api.auth.setCurrentUser(targetUser);
    setUser(targetUser);
    addToast(`Beralih peran: ${targetUser.roleLabel}`, 'info');
  };

  const logout = async () => {
    await api.auth.logout();
    const guest = await api.auth.getCurrentUser();
    setUser(guest);
    addToast('Anda telah keluar dan kini berada dalam mode Pengunjung (Tamu).', 'info');
  };

  const isGuest = user.id === 'guest';
  const isAdmin = !isGuest && user.role === 'admin';
  const isIndustry = !isGuest && user.role === 'industry';
  const isUMKM = !isGuest && user.role === 'umkm';

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAdmin,
      isIndustry,
      isUMKM,
      isGuest,
      login,
      register,
      updateProfile,
      switchRole,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
