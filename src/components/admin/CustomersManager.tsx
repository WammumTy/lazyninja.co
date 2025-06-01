import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const CustomersManager: React.FC = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://api.lazyninja.co/admin/customers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(res.data);
      } catch (err) {
        console.error(err);
        toast({
          title: 'Error',
          description: 'Failed to fetch customers.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [toast]);

  if (loading) return <p>Loading customers...</p>;
  if (customers.length === 0) return <p>No customers found.</p>;

  return (
    <div className="space-y-4">
      {customers.map((customer) => (
        <Card key={customer.id} className="border shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold">{customer.business_name || 'No business name'}</h3>
            <p className="text-gray-600 text-sm">{customer.email}</p>

            <div className="mt-2 text-sm text-gray-500">
              <p><strong>Verified:</strong> {customer.verified ? 'Yes' : 'No'}</p>
              <p><strong>Hosting Fee:</strong> ${customer.hosting_fee || 0}/mo</p>
              <p><strong>Address:</strong> {customer.address || 'Not provided'}</p>
            </div>

            {/* Example action buttons */}
            <div className="mt-2 flex gap-2">
              <Button
                onClick={() => console.log('Adjust hosting fee for:', customer.id)}
                className="bg-brown-700 text-white hover:bg-brown-800"
              >
                Adjust Hosting Fee
              </Button>
              <Button
                onClick={() => console.log('View full profile for:', customer.id)}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                View Full Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomersManager;
