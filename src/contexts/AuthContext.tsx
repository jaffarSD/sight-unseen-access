
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<boolean>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const isAuthenticated = !!user;

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        await refreshUserProfile();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const refreshUserProfile = async () => {
    try {
      const response = await apiService.getProfile();
      if (response.data) {
        setUser(response.data);
      } else if (response.status === 401) {
        // Token expired, try to refresh
        const refreshResponse = await apiService.refreshToken();
        if (refreshResponse.data) {
          localStorage.setItem('access_token', refreshResponse.data.access);
          // Retry getting profile
          const retryResponse = await apiService.getProfile();
          if (retryResponse.data) {
            setUser(retryResponse.data);
          } else {
            logout();
          }
        } else {
          logout();
        }
      }
    } catch (error) {
      console.error('Failed to refresh user profile:', error);
      logout();
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiService.login(email, password);
      
      if (response.data) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        await refreshUserProfile();
        
        toast({
          title: "Login successful",
          description: "Welcome back!"
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: response.error || "Invalid credentials",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const register = async (userData: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const response = await apiService.register(userData);
      
      if (response.status === 201 || response.status === 200) {
        toast({
          title: "Registration successful",
          description: "Please check your email for verification code"
        });
        return true;
      } else {
        toast({
          title: "Registration failed",
          description: response.error || "Registration failed",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Registration error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const verifyEmail = async (email: string, code: string): Promise<boolean> => {
    try {
      const response = await apiService.verifyEmail(email, code);
      
      if (response.status === 200) {
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified"
        });
        return true;
      } else {
        toast({
          title: "Verification failed",
          description: response.error || "Invalid verification code",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Verification error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out"
      });
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    verifyEmail,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
