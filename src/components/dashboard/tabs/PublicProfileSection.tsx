import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYelp } from 'react-icons/fa';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

const PublicProfileSection: React.FC<{ profile: any }> = ({ profile }) => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [localProfile, setLocalProfile] = useState(profile);

  const handleLocalChange = (e: any) => {
    const { name, value } = e.target;
    setLocalProfile((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = async () => {
    if (editing) {
      setSaving(true);
      const token = localStorage.getItem('token');
      const updatedProfile = {
        business_name: localProfile.business_name,
        description: localProfile.description,
        socials: {
          facebook_url: localProfile.facebook_url ? `https://facebook.com/${localProfile.facebook_url.replace(/^@/, '')}` : '',
          instagram_url: localProfile.instagram_url ? `https://instagram.com/${localProfile.instagram_url.replace(/^@/, '')}` : '',
          linkedin_url: localProfile.linkedin_url ? `https://linkedin.com/in/${localProfile.linkedin_url.replace(/^@/, '')}` : '',
          yelp_url: localProfile.yelp_url ? `https://yelp.com/biz/${localProfile.yelp_url.replace(/^@/, '')}` : '',
        },
      };

      try {
        await axios.put('https://api.lazyninja.co/account/profile/public', updatedProfile, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({ title: 'Profile updated!' });
        setEditing(false);
      } catch (err: any) {
        console.error(err);
        toast({ title: 'Update failed', description: err.response?.data?.error, variant: 'destructive' });
      } finally {
        setSaving(false);
      }
    } else {
      setLocalProfile(profile);
      setEditing(true);
    }
  };

  const handleCancel = () => {
    setLocalProfile(profile);
    setEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Public Profile</h3>
        <Button
          type="button"
          onClick={handleToggleEdit}
          className="bg-brown-700 text-white"
          disabled={saving}
        >
          {editing ? (saving ? 'Saving...' : 'Done') : 'Edit Section'}
        </Button>
      </div>
      <Textarea
        name="description"
        placeholder="About your business..."
        value={localProfile.description || ''}
        onChange={handleLocalChange}
        disabled={!editing}
      />
      <h4 className="font-semibold">Social Links</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Input name="facebook_url" placeholder="Facebook handle" value={localProfile.facebook_url?.split('/').pop() || ''} onChange={handleLocalChange} disabled={!editing} />
        <Input name="instagram_url" placeholder="Instagram handle" value={localProfile.instagram_url?.split('/').pop() || ''} onChange={handleLocalChange} disabled={!editing} />
        <Input name="linkedin_url" placeholder="LinkedIn handle" value={localProfile.linkedin_url?.split('/').pop() || ''} onChange={handleLocalChange} disabled={!editing} />
        <Input name="yelp_url" placeholder="Yelp handle" value={localProfile.yelp_url?.split('/').pop() || ''} onChange={handleLocalChange} disabled={!editing} />
      </div>
      {editing && (
        <div className="flex justify-center mt-2">
          <Button type="button" onClick={handleCancel} className="bg-gray-300 text-gray-800" disabled={saving}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default PublicProfileSection;
