
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please correct the errors and try again.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await apiService.submitContactForm(formData);
      
      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible."
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast({
          title: "Failed to send message",
          description: response.error || "Please try again later.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
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
    <main className="max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        <section aria-labelledby="contact-heading">
          <h1 id="contact-heading" className="text-4xl font-bold mb-6">
            Contact Us
          </h1>
          
          <p className="text-xl mb-8 leading-relaxed">
            Have questions or feedback about our accessibility features? 
            We'd love to hear from you. Fill out the form below and we'll respond as soon as possible.
          </p>
        </section>

        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="text-3xl font-bold mb-6">
            Send us a Message
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label 
                  htmlFor="name" 
                  className="text-lg font-medium mb-2 block"
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="text-lg p-3"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                  required
                />
                {errors.name && (
                  <div 
                    id="name-error" 
                    className="text-destructive text-sm mt-1"
                    role="alert"
                    aria-live="polite"
                  >
                    {errors.name}
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
            </div>
            
            <div>
              <Label 
                htmlFor="subject" 
                className="text-lg font-medium mb-2 block"
              >
                Subject *
              </Label>
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                className="text-lg p-3"
                aria-describedby={errors.subject ? "subject-error" : undefined}
                aria-invalid={!!errors.subject}
                required
              />
              {errors.subject && (
                <div 
                  id="subject-error" 
                  className="text-destructive text-sm mt-1"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.subject}
                </div>
              )}
            </div>
            
            <div>
              <Label 
                htmlFor="message" 
                className="text-lg font-medium mb-2 block"
              >
                Message *
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="text-lg p-3 min-h-32"
                aria-describedby={errors.message ? "message-error" : undefined}
                aria-invalid={!!errors.message}
                required
              />
              {errors.message && (
                <div 
                  id="message-error" 
                  className="text-destructive text-sm mt-1"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.message}
                </div>
              )}
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 text-lg"
              aria-describedby="submit-help"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
            
            <p id="submit-help" className="text-sm text-muted-foreground">
              * Required fields. All information will be kept confidential.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
