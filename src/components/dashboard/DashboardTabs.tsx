import PublicProfileSection from '@/components/dashboard/tabs/PublicProfileSection';
import AddressSection from '@/components/dashboard/tabs/AddressSection';
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const DashboardTabs: React.FC<{ profile: any; handleProfileChange: (e: any) => void }> = ({
  profile,
  handleProfileChange,
}) => {
  return (
    <Tabs defaultValue="public">
      <TabsList className="mb-4">
        <TabsTrigger value="public">Public Profile</TabsTrigger>
        <TabsTrigger value="address">Address</TabsTrigger>
      </TabsList>

      <TabsContent value="public">
        <PublicProfileSection profile={profile} />
      </TabsContent>
      <TabsContent value="address">
        <AddressSection profile={profile} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
