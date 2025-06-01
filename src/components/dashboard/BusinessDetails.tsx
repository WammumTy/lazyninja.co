import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FaGlobe, FaYelp, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

interface Props {
  profile: any;
  editing: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  renderSocialLink: (Icon: any, handleOrUrl: string, baseUrl: string, color: string) => JSX.Element;
  formatWebsite: (url: string) => string;
  ensureUrlProtocol: (url: string) => string;
}

const BusinessDetails: React.FC<Props> = ({ profile, editing, handleChange, renderSocialLink, formatWebsite, ensureUrlProtocol }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-brown-700">Business Details</h3>

    {editing ? (
      <>
        <Textarea name="description" placeholder="About your business" value={profile.description || ''} onChange={handleChange} className="w-full border p-2 rounded" />
        <Input name="street" placeholder="Street" value={profile.street || ''} onChange={handleChange} />
        <Input name="city" placeholder="City" value={profile.city || ''} onChange={handleChange} />
        <Input name="state" placeholder="State" value={profile.state || ''} onChange={handleChange} />
        <Input name="zip" placeholder="ZIP Code" value={profile.zip || ''} onChange={handleChange} />
        <Input name="website_url" placeholder="Website URL" value={profile.website_url || ''} onChange={handleChange} />
        <Input name="facebook_url" placeholder="Facebook handle" value={profile.facebook_url ? profile.facebook_url.split('/').pop() : ''} onChange={handleChange} />
        <Input name="instagram_url" placeholder="Instagram handle" value={profile.instagram_url ? profile.instagram_url.split('/').pop() : ''} onChange={handleChange} />
        <Input name="yelp_url" placeholder="Yelp handle" value={profile.yelp_url ? profile.yelp_url.split('/').pop() : ''} onChange={handleChange} />
        <Input name="linkedin_url" placeholder="LinkedIn handle" value={profile.linkedin_url ? profile.linkedin_url.split('/').pop() : ''} onChange={handleChange} />
        {/* Example for payment methods */}
        <Input name="payment_methods" placeholder="Payment Methods (e.g., Visa, PayPal)" value={profile.payment_methods || ''} onChange={handleChange} />
      </>
    ) : (
      <ul className="text-gray-700 space-y-1">
        <li><strong>About:</strong> {profile.description || <span className="italic text-gray-400">No description</span>}</li>
        <li><strong>Address:</strong> {profile.street || '-'}, {profile.city || '-'}, {profile.state || '-'}, {profile.zip || '-'}</li>
        <li><strong>Website:</strong> {profile.website_url ? (
          <a href={ensureUrlProtocol(profile.website_url)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
            <FaGlobe size={16} /> {formatWebsite(profile.website_url)}
          </a>
        ) : <span className="italic text-gray-400">Not provided</span>}</li>
        <li><strong>Payment Methods:</strong> {profile.payment_methods || <span className="italic text-gray-400">Not provided</span>}</li>
        <li>{renderSocialLink(FaFacebookF, profile.facebook_url, 'https://facebook.com/', 'text-blue-600')}</li>
        <li>{renderSocialLink(FaInstagram, profile.instagram_url, 'https://instagram.com/', 'text-pink-600')}</li>
        <li>{renderSocialLink(FaYelp, profile.yelp_url, 'https://yelp.com/biz/', 'text-red-600')}</li>
        <li>{renderSocialLink(FaLinkedinIn, profile.linkedin_url, 'https://linkedin.com/in/', 'text-blue-500')}</li>
      </ul>
    )}
  </div>
);

export default BusinessDetails;
