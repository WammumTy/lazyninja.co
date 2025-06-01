// src/pages/admin/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://api.lazyninja.co/admin/inquiries', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInquiries(res.data);
      } catch (err) {
        console.error(err);
        toast({
          title: 'Error',
          description: 'Failed to fetch inquiries.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [toast]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://api.lazyninja.co/admin/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      toast({
        title: 'Inquiry deleted',
        description: 'The inquiry has been removed.',
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Failed to delete inquiry.',
        variant: 'destructive',
      });
    }
  };

  return (
    <PageLayout>
      <section className="py-24 md:py-32 bg-brown-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-6">Admin Dashboard</h1>
          <p className="mb-6 text-gray-700">Manage inquiries and other admin tasks.</p>

          {loading ? (
            <p>Loading inquiries...</p>
          ) : inquiries.length === 0 ? (
            <p>No inquiries found.</p>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <Card key={inq.id} className="border shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{inq.name}</h3>
                    <p className="text-gray-600 text-sm">{inq.email} | {inq.phone || 'No phone'}</p>
                    <p className="mt-2">{inq.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {inq.features && <p><strong>Features:</strong> {inq.features}</p>}
                      {inq.extra && <p><strong>Extra:</strong> {inq.extra}</p>}
                    </div>
                    <Button
                      onClick={() => handleDelete(inq.id)}
                      className="mt-2 bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete Inquiry
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default AdminDashboard;
