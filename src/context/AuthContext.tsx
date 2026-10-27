import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const ADMIN_EMAIL = 'javeediqbal1436@gmail.com';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  adminEmail: string;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = Boolean(
    user && user.email && user.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()
  );

  const syncUserProfile = async (u: User, role: 'admin' | 'shopper') => {
    try {
      await setDoc(
        doc(db, 'users', u.uid),
        {
          id: u.uid,
          email: u.email || '',
          displayName: u.displayName || 'Shopper',
          role,
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (err) {
      console.debug('User profile sync skipped/handled:', err);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    const isOwner = result.user.email?.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
    await syncUserProfile(result.user, isOwner ? 'admin' : 'shopper');
  };

  const signInWithEmail = async (email: string, pass: string) => {
    const result = await signInWithEmailAndPassword(auth, email.trim(), pass);
    const isOwner = result.user.email?.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
    await syncUserProfile(result.user, isOwner ? 'admin' : 'shopper');
  };

  const signUpWithEmail = async (email: string, pass: string, displayName?: string) => {
    const result = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    if (displayName && result.user) {
      await updateProfile(result.user, { displayName });
    }
    const isOwner = result.user.email?.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
    await syncUserProfile(result.user, isOwner ? 'admin' : 'shopper');
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        adminEmail: ADMIN_EMAIL,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
        authModalOpen,
        setAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
