import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

const AddressSection: React.FC<{ profile: any }> = ({ profile }) => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [localProfile, setLocalProfile] = useState({
    street: profile.address?.street || '',
    city: profile.address?.city || '',
    state: profile.address?.state || '',
    zip: profile.address?.zip || '',
  });

  const handleLocalChange = (e: any) => {
    const { name, value } = e.target;
    setLocalProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = async () => {
    if (editing) {
      setSaving(true);
      const token = localStorage.getItem('token');
      const updatedAddress = {
        address: {
          street: localProfile.street,
          city: localProfile.city,
          state: localProfile.state,
          zip: localProfile.zip,
        },
      };

      try {
        await axios.put('https://api.lazyninja.co/account/profile/address', updatedAddress, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({
          title: 'Address updated!',
          description: 'Your address details have been saved.',
        });
        setEditing(false);
      } catch (err: any) {
        console.error(err);
        toast({
          title: 'Update failed',
          description: err.response?.data?.error || 'An error occurred while updating your address.',
          variant: 'destructive',
        });
      } finally {
        setSaving(false);
      }
    } else {
      // Start editing
      setEditing(true);
    }
  };

  const handleCancel = () => {
    // Reset local data and exit editing mode
    setLocalProfile({
      street: profile.address?.street || '',
      city: profile.address?.city || '',
      state: profile.address?.state || '',
      zip: profile.address?.zip || '',
    });
    setEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Address</h3>
        <Button
          type="button"
          onClick={handleToggleEdit}
          className="bg-brown-700 text-white"
          disabled={saving}
        >
          {editing ? (saving ? 'Saving...' : 'Done') : 'Edit Section'}
        </Button>
      </div>

      <Input
        name="street"
        placeholder="Street Address"
        value={localProfile.street}
        onChange={handleLocalChange}
        disabled={!editing}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="city"
          placeholder="City"
          value={localProfile.city}
          onChange={handleLocalChange}
          disabled={!editing}
        />
        <Input
          name="state"
          placeholder="State"
          value={localProfile.state}
          onChange={handleLocalChange}
          disabled={!editing}
        />
      </div>
      <Input
        name="zip"
        placeholder="Zip Code"
        value={localProfile.zip}
        onChange={handleLocalChange}
        disabled={!editing}
      />

      {editing && (
        <div className="flex justify-center mt-2">
          <Button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-800"
            disabled={saving}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddressSection;
