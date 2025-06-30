
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const ProfilePage = ({ onNavigate }: ProfilePageProps) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onNavigate('home');
  };

  if (!user) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Profile</h1>
          <p className="text-xl mb-8">Please sign in to view your profile.</p>
          <Button onClick={() => onNavigate('login')} className="text-lg px-8 py-4">
            Sign In
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        <section aria-labelledby="profile-heading">
          <h1 id="profile-heading" className="text-4xl font-bold mb-6">
            Your Profile
          </h1>
        </section>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  First Name
                </label>
                <p className="text-lg">{user.first_name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Last Name
                </label>
                <p className="text-lg">{user.last_name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <p className="text-lg">{user.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Phone Number
                </label>
                <p className="text-lg">{user.phone_number}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="px-8 py-4 text-lg"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
