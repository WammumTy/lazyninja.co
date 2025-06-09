import React, { useState, ChangeEvent, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/layout/PageLayout';
import { PACKAGES, ADDONS } from '@/data/services';

interface InquiryFormData {
  business: string;
  business_tag: string; // will map to “tags” on the backend
  name: string;
  email: string;
  phone: string;
  description: string;
  extra: string;
  // “features” holds all selected package titles or add‐on labels
  features: string[];
}

export default function InquiryPage() {
  const [formData, setFormData] = useState<InquiryFormData>({
    business: '',
    business_tag: '',
    name: '',
    email: '',
    phone: '',
    description: '',
    extra: '',
    features: [],
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Update text inputs / textarea
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle a feature (either package title or add‐on) on/off
  const handleFeatureSelect = (feature: string) => {
    setFormData((prev) => {
      const already = prev.features.includes(feature);
      if (already) {
        return { ...prev, features: prev.features.filter((f) => f !== feature) };
      } else {
        return { ...prev, features: [...prev.features, feature] };
      }
    });
  };

  // Handle file input – store up to however many the user picks
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setImages(filesArray);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !formData.business.trim() ||
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.description.trim()
    ) {
      toast({
            title: 'Missing Required Fields',
            description: 'Please fill out the required fields before submitting.',
            variant: 'destructive',
          });
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append('business', formData.business.trim());
      payload.append('tags', formData.business_tag.trim());
      payload.append('name', formData.name.trim());
      payload.append('email', formData.email.trim());
      payload.append('phone', formData.phone.trim());
      payload.append('description', formData.description.trim());
      payload.append('extra', formData.extra.trim());

      if (formData.features.length > 0) {
        payload.append('features', formData.features.join(','));
      } else {
        payload.append('features', '');
      }

      if (images.length > 0) {
        images.forEach((file) => {
          payload.append('images', file);
        });
        payload.append('hasImages', 'true');
      } else {
        payload.append('hasImages', 'false');
      }

      // ← Use a relative URL
      const response = await fetch('https://api.lazyninja.co/public/inquiries', {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        console.error('Error body:', errData || (await response.text()));
        toast({
          title: 'Submission Failed',
          description: errData?.message || response.statusText,
          variant: 'destructive',
        });
        return;
      }

      // On success, attempt to parse the JSON
      const data = await response.json();
      toast({
        title: 'Submission Successful',
        description: `Inquiry submitted successfully! Reference ID: ${data.id}`,
        variant: 'default',
      });

      // Reset form state
      setFormData({
        business: '',
        business_tag: '',
        name: '',
        email: '',
        phone: '',
        description: '',
        extra: '',
        features: [],
      });
      setImages([]);
    } catch (networkErr) {
      toast({
        title: 'Network Error',
        description: 'A network error occurred while submitting. Please check your connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <PageLayout>
      <section className="py-24 md:py-32 bg-brown-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Title & Description */}
            <div>
              <h1 className="section-title">Request a Website</h1>
              <p className="text-gray-700 text-lg">
                Want a custom website? Fill out the form with as much detail as you
                can, and I’ll reach out to get started.
              </p>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 space-y-6">
                {/* Package Options */}
                <div>
                  <h3 className="text-xl font-semibold text-brown-700 mb-3">
                    Choose a Package
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {PACKAGES.map((pkg) => {
                      const isSelected = formData.features.includes(pkg.title);
                      return (
                        <Card
                          key={pkg.id}
                          className={`cursor-pointer transition-all border-2 ${
                            isSelected
                              ? 'border-brown-700 bg-brown-50 shadow-md'
                              : 'border-gray-200'
                          }`}
                          onClick={() => handleFeatureSelect(pkg.title)}
                        >
                          <CardContent className="p-4 space-y-2">
                            <h4 className="font-bold text-lg">{pkg.title}</h4>
                            <p className="text-sm text-gray-700">
                              {pkg.description}
                            </p>
                            <ul className="text-sm text-gray-600 list-disc list-inside pl-1 pt-1 space-y-1">
                              {pkg.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Add-on Services */}
                <div>
                  <h3 className="text-xl font-semibold text-brown-700 mb-3">
                    Add-on Services
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {ADDONS.map((addon) => {
                      const isSelected = formData.features.includes(addon);
                      return (
                        <button
                          key={addon}
                          type="button"
                          className={`px-4 py-2 rounded-full border text-sm transition-all ${
                            isSelected
                              ? 'bg-brown-700 text-white border-brown-700'
                              : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                          }`}
                          onClick={() => handleFeatureSelect(addon)}
                        >
                          {addon}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Inquiry Form */}
                <h3 className="text-xl font-semibold text-brown-700">Details</h3>
                <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
                  <div className="grid md:grid-cols-1 gap-4">
                    <Input
                      name="business"
                      placeholder="Business Name (Required)"
                      value={formData.business}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      name="business_tag"
                      placeholder="Business Tagline"
                      value={formData.business_tag}
                      onChange={handleChange}
                    />
                    <Input
                      name="name"
                      placeholder="Your Name (Required)"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email (Required)"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <Textarea
                    name="description"
                    rows={4}
                    placeholder="Describe what you want your website to do... (Required)"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />

                  <Textarea
                    name="extra"
                    rows={3}
                    placeholder="Anything else you want to add?"
                    value={formData.extra}
                    onChange={handleChange}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload any related images (max 5)
                    </label>
                    <Input
                      name="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-brown-700 hover:bg-brown-800 text-white font-semibold py-2"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Inquiry'}
                  </Button>
                </form>

                <p className="text-center text-lg text-brown-800 mb-3">
                  Not sure if you want to create a website?{' '}
                  <NavLink
                    to="/contact"
                    className="text-brown-700 hover:text-gray-700 transition-colors"
                  >
                    Contact me!
                  </NavLink>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
