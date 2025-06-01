import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const HostingManager: React.FC = () => {
  const { toast } = useToast();
  const [hostingData, setHostingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newFee, setNewFee] = useState('');

  useEffect(() => {
    const fetchHostingData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://api.lazyninja.co/admin/hosting', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHostingData(res.data);
      } catch (err) {
        console.error(err);
        toast({
          title: 'Error',
          description: 'Failed to fetch hosting data.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHostingData();
  }, [toast]);

  const handleSave = async (userId: number) => {
    if (!newFee) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://api.lazyninja.co/admin/hosting/${userId}`,
        { hosting_fee: newFee },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHostingData((prev) =>
        prev.map((h) =>
          h.id === userId ? { ...h, hosting_fee: newFee } : h
        )
      );
      setEditingId(null);
      setNewFee('');
      toast({
        title: 'Updated!',
        description: 'Hosting fee updated successfully.',
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Failed to update hosting fee.',
        variant: 'destructive',
      });
    }
  };

  if (loading) return <p>Loading hosting data...</p>;
  if (hostingData.length === 0) return <p>No hosting data found.</p>;

  return (
    <div className="space-y-4">
      {hostingData.map((user) => (
        <Card key={user.id} className="border shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold">{user.business_name || 'No business name'}</h3>
            <p className="text-gray-600 text-sm">{user.email}</p>
            <p className="text-sm text-gray-500">
              Current Hosting Fee: <strong>${user.hosting_fee || 0}/mo</strong>
            </p>

            {editingId === user.id ? (
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="New fee ($)"
                  value={newFee}
                  onChange={(e) => setNewFee(e.target.value)}
                  className="w-32"
                />
                <Button
                  onClick={() => handleSave(user.id)}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setEditingId(null);
                    setNewFee('');
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setEditingId(user.id)}
                className="mt-2 bg-brown-700 text-white hover:bg-brown-800"
              >
                Edit Hosting Fee
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HostingManager;
