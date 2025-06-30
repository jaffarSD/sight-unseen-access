
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '@/contexts/AuthContext';

interface EmailVerificationPageProps {
  email: string;
  onNavigate: (page: string) => void;
}

const EmailVerificationPage = ({ email, onNavigate }: EmailVerificationPageProps) => {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { verifyEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      return;
    }
    
    setIsSubmitting(true);
    
    const success = await verifyEmail(email, code);
    
    if (success) {
      onNavigate('login');
    }
    
    setIsSubmitting(false);
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <div className="space-y-8">
        <section aria-labelledby="verification-heading">
          <h1 id="verification-heading" className="text-4xl font-bold mb-6 text-center">
            Verify Your Email
          </h1>
          
          <p className="text-xl mb-8 leading-relaxed text-center">
            We've sent a 6-digit verification code to <strong>{email}</strong>. 
            Please enter the code below to verify your account.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label 
              htmlFor="verification-code"
              className="text-lg font-medium block text-center"
            >
              Verification Code
            </label>
            
            <div className="flex justify-center">
              <InputOTP 
                maxLength={6} 
                value={code} 
                onChange={setCode}
                id="verification-code"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <p className="text-sm text-center text-muted-foreground">
              Enter the 6-digit code sent to your email
            </p>
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting || code.length !== 6}
            className="w-full px-8 py-4 text-lg"
          >
            {isSubmitting ? 'Verifying...' : 'Verify Email'}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-lg">
            Didn't receive the code? Check your spam folder or{' '}
            <Button
              variant="link"
              onClick={() => onNavigate('register')}
              className="text-lg p-0 h-auto"
            >
              try registering again
            </Button>
          </p>
          
          <Button
            variant="outline"
            onClick={() => onNavigate('login')}
            className="text-lg"
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    </main>
  );
};

export default EmailVerificationPage;
