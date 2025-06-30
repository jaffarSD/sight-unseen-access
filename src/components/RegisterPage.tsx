
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
  onShowVerification: (email: string) => void;
}

const RegisterPage = ({ onNavigate, onShowVerification }: RegisterPageProps) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    
    const success = await register({
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone_number: formData.phone_number,
      email: formData.email,
      password: formData.password
    });
    
    if (success) {
      onShowVerification(formData.email);
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
        <section aria-labelledby="register-heading">
          <h1 id="register-heading" className="text-4xl font-bold mb-6 text-center">
            Create Account
          </h1>
          
          <p className="text-xl mb-8 leading-relaxed text-center">
            Join our accessible platform. Fill in your details to get started.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label 
                htmlFor="first_name" 
                className="text-lg font-medium mb-2 block"
              >
                First Name *
              </Label>
              <Input
                id="first_name"
                type="text"
                value={formData.first_name}
                onChange={(e) => handleChange('first_name', e.target.value)}
                className="text-lg p-3"
                aria-describedby={errors.first_name ? "first_name-error" : undefined}
                aria-invalid={!!errors.first_name}
                required
              />
              {errors.first_name && (
                <div 
                  id="first_name-error" 
                  className="text-destructive text-sm mt-1"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.first_name}
                </div>
              )}
            </div>
            
            <div>
              <Label 
                htmlFor="last_name" 
                className="text-lg font-medium mb-2 block"
              >
                Last Name *
              </Label>
              <Input
                id="last_name"
                type="text"
                value={formData.last_name}
                onChange={(e) => handleChange('last_name', e.target.value)}
                className="text-lg p-3"
                aria-describedby={errors.last_name ? "last_name-error" : undefined}
                aria-invalid={!!errors.last_name}
                required
              />
              {errors.last_name && (
                <div 
                  id="last_name-error" 
                  className="text-destructive text-sm mt-1"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.last_name}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <Label 
              htmlFor="phone_number" 
              className="text-lg font-medium mb-2 block"
            >
              Phone Number *
            </Label>
            <Input
              id="phone_number"
              type="tel"
              value={formData.phone_number}
              onChange={(e) => handleChange('phone_number', e.target.value)}
              className="text-lg p-3"
              aria-describedby={errors.phone_number ? "phone_number-error" : undefined}
              aria-invalid={!!errors.phone_number}
              placeholder="+22231291111"
              required
            />
            {errors.phone_number && (
              <div 
                id="phone_number-error" 
                className="text-destructive text-sm mt-1"
                role="alert"
                aria-live="polite"
              >
                {errors.phone_number}
              </div>
            )}
          </div>
          
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
          
          <div>
            <Label 
              htmlFor="confirmPassword" 
              className="text-lg font-medium mb-2 block"
            >
              Confirm Password *
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className="text-lg p-3"
              aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
              aria-invalid={!!errors.confirmPassword}
              required
            />
            {errors.confirmPassword && (
              <div 
                id="confirmPassword-error" 
                className="text-destructive text-sm mt-1"
                role="alert"
                aria-live="polite"
              >
                {errors.confirmPassword}
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 text-lg"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-lg">
            Already have an account?{' '}
            <Button
              variant="link"
              onClick={() => onNavigate('login')}
              className="text-lg p-0 h-auto"
            >
              Sign in here
            </Button>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
