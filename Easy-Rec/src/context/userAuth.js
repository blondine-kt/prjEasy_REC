// hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from './auth';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};