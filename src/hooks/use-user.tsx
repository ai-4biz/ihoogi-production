
import React, { createContext, useContext, useState } from 'react';

type Subscription = {
  type: 'free' | 'starter' | 'professional' | 'enterprise';
  hasAffiliateAccess: boolean;
  isOrganization: boolean; // Added isOrganization property
  credits: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription: Subscription;
};

const defaultUser: User = {
  id: '1',
  name: 'משתמש לדוגמה',
  email: 'example@example.com',
  avatar: '/placeholder.svg',
  subscription: {
    type: 'starter',
    hasAffiliateAccess: true,
    isOrganization: true, // Set to true to see the organizations menu item
    credits: 7,
  }
};

type UserContextType = {
  user: User;
  updateUser: (user: Partial<User>) => void;
  toggleAffiliateAccess: () => void;
  toggleOrganizationAccess: () => void; // Added new toggle function
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);

  const updateUser = (newUserData: Partial<User>) => {
    setUser(prev => ({ ...prev, ...newUserData }));
  };

  const toggleAffiliateAccess = () => {
    setUser(prev => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        hasAffiliateAccess: !prev.subscription.hasAffiliateAccess
      }
    }));
  };

  const toggleOrganizationAccess = () => {
    setUser(prev => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        isOrganization: !prev.subscription.isOrganization
      }
    }));
  };

  const logout = () => {
    console.log('User logged out');
    window.location.href = '/';
  };

  return (
    <UserContext.Provider value={{ user, updateUser, toggleAffiliateAccess, toggleOrganizationAccess, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
