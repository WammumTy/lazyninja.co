import React from 'react';
import { Input } from '@/components/ui/input';

const PaymentMethodsSection: React.FC<{ profile: any; editing: boolean; setProfile: (data: any) => void }> = ({
  profile,
  editing,
  setProfile,
}) => {
  const handleChange = (i: number, key: string, value: string) => {
    const updated = [...(profile.payment_methods || [])];
    updated[i] = { ...updated[i], [key]: value };
    setProfile((prev: any) => ({ ...prev, payment_methods: updated }));
  };

  const addMethod = () => {
    setProfile((prev: any) => ({
      ...prev,
      payment_methods: [...(prev.payment_methods || []), { card_last4: '', type: '', csv: '' }],
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Payment Methods</h3>
      {profile.payment_methods?.length ? (
        profile.payment_methods.map((m: any, i: number) => (
          <div key={i} className="grid grid-cols-3 gap-2 items-center">
            {editing ? (
              <>
                <Input
                  placeholder="Last 4 digits"
                  value={m.card_last4 || ''}
                  onChange={(e) => handleChange(i, 'card_last4', e.target.value)}
                />
                <Input
                  placeholder="Card Type"
                  value={m.type || ''}
                  onChange={(e) => handleChange(i, 'type', e.target.value)}
                />
                <Input
                  placeholder="CSV"
                  value={m.csv || ''}
                  onChange={(e) => handleChange(i, 'csv', e.target.value)}
                />
              </>
            ) : (
              <div className="flex justify-between w-full">
                <span>{m.type || 'Card'} ending in {m.card_last4 || '****'}</span>
                <span>CSV: {m.csv || '***'}</span>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No payment methods yet.</p>
      )}

      {editing && (
        <button onClick={addMethod} className="bg-brown-700 text-white py-1 px-4 rounded">
          + Add Payment Method
        </button>
      )}
    </div>
  );
};

export default PaymentMethodsSection;
