
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage = ({ onNavigate }: LoginPageProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const success = await login(formData.email, formData.password);
    
    if (success) {
      onNavigate('home');
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <div className="space-y-8">
        <section aria-labelledby="login-heading">
          <h1 id="login-heading" className="text-4xl font-bold mb-6 text-center">
            Sign In
          </h1>
          
          <p className="text-xl mb-8 leading-relaxed text-center">
            Welcome back! Please sign in to access your account.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <Label 
              htmlFor="email" 
              className="text-lg font-medium mb-2 block"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="text-lg p-3"
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
              required
            />
            {errors.email && (
              <div 
                id="email-error" 
                className="text-destructive text-sm mt-1"
                role="alert"
                aria-live="polite"
              >
                {errors.email}
              </div>
            )}
          </div>
          
          <div>
            <Label 
              htmlFor="password" 
              className="text-lg font-medium mb-2 block"
            >
              Password *
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="text-lg p-3"
              aria-describedby={errors.password ? "password-error" : undefined}
              aria-invalid={!!errors.password}
              required
            />
            {errors.password && (
              <div 
                id="password-error" 
                className="text-destructive text-sm mt-1"
                role="alert"
                aria-live="polite"
              >
                {errors.password}
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 text-lg"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-lg">
            Don't have an account?{' '}
            <Button
              variant="link"
              onClick={() => onNavigate('register')}
              className="text-lg p-0 h-auto"
            >
              Sign up here
            </Button>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
