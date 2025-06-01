import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Modal from '@/components/ui/modal';

const InquiriesManager: React.FC = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
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

  const handleAccept = async (inquiryId: number) => {
    if (!window.confirm('Are you sure you want to accept this inquiry?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `https://api.lazyninja.co/admin/inquiries/${inquiryId}/accept`,
        {}, // no body needed
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        title: 'Inquiry accepted',
        description: `Account created. Temporary password: ${res.data.tempPassword}`,
      });

      // Remove inquiry from the list
      setInquiries((prev) => prev.filter((inq) => inq.id !== inquiryId));
      setSelectedInquiry(null);
    } catch (err: any) {
      console.error(err);
      toast({
        title: 'Error',
        description: err.response?.data?.error || 'Failed to accept inquiry.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (inquiryId: number) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://api.lazyninja.co/admin/inquiries/${inquiryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries((prev) => prev.filter((inq) => inq.id !== inquiryId));
      setSelectedInquiry(null);
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

  if (loading) return <p>Loading inquiries...</p>;

  return (
    <div>
      {inquiries.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <Card key={inq.id} className="border shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold">{inq.name}</h3>
                <p className="text-gray-600 text-sm">{inq.email} | {inq.phone || 'No phone'}</p>
                <p className="mt-2 line-clamp-2">{inq.description}</p>
                <div className="mt-2 flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedInquiry(inq)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(inq.id)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedInquiry && (
        <Modal
          isOpen={!!selectedInquiry}  // ✅ Pass isOpen as true if selectedInquiry is not null
          onClose={() => setSelectedInquiry(null)}
          title="Inquiry Details"
        >
          <div className="space-y-2">
            <p><strong>Name:</strong> {selectedInquiry.name}</p>
            <p><strong>Email:</strong> {selectedInquiry.email}</p>
            <p><strong>Phone:</strong> {selectedInquiry.phone || 'N/A'}</p>
            <p><strong>Business:</strong> {selectedInquiry.business || 'N/A'}</p>
            <p><strong>Business Tagline:</strong> {selectedInquiry.business_tag || 'N/A'}</p>
            <p><strong>Description:</strong> {selectedInquiry.description}</p>
            <p><strong>Features:</strong> {selectedInquiry.features || 'N/A'}</p>
            <p><strong>Extra:</strong> {selectedInquiry.extra || 'N/A'}</p>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => handleAccept(selectedInquiry.id)}
              className="bg-green-600 hover:bg-green-700 text-white flex-1"
            >
              Accept Inquiry
            </Button>
            <Button
              onClick={() => setSelectedInquiry(null)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 flex-1"
            >
              Cancel
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InquiriesManager;
