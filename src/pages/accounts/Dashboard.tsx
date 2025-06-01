import ProfileHeader from '@/components/dashboard/ProfileHeader';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import BlogPosts from '@/components/dashboard/tabs/BlogPosts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';


const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('https://api.lazyninja.co/account/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        toast({
          title: 'Error fetching profile',
          description: 'Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [toast]);

  const handleProfileChange = (e: any) => {
    const { name, value } = e.target;
    setProfile((prev: any) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <PageLayout>
      <section className="py-24 md:py-32 bg-brown-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ProfileHeader
            profile={profile}
            handleProfilePhotoChange={() => {}}
          />
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <DashboardTabs profile={profile} handleProfileChange={handleProfileChange} />
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <BlogPosts profileId={profile.id} />
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
};

export default Dashboard;
