import PageLayout from '@/components/layout/PageLayout';
import { NavLink } from 'react-router-dom';
import { PACKAGES, ADDONS } from '@/data/services';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const Inquiry = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    business_tag: '',
    description: '',
    features: '',
    extra: '',
    images: null as FileList | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  const handleFeatureSelect = (feature: string, isPackage = false) => {
    setFormData((prev) => {
      const featuresArr = prev.features ? prev.features.split(', ').filter(Boolean) : [];

      let updated;
      if (isPackage) {
        const nonPackages = featuresArr.filter((f) => !PACKAGES.some((p) => p.title === f));
        updated = [...nonPackages, feature];
      } else {
        const exists = featuresArr.includes(feature);
        updated = exists
          ? featuresArr.filter((f) => f !== feature)
          : [...featuresArr, feature];
      }

      return { ...prev, features: updated.join(', ') };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.description) {
      toast({
        title: 'Missing Fields',
        description: 'Name, Email, and Project Description are required.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images' && value instanceof FileList) {
          Array.from(value).forEach((file) => form.append('files', file));
        } else {
          form.append(key, value as string);
        }
      });

      const res = await fetch('https://api.lazyninja.co/email/inqury', {
        method: 'POST',
        body: form,
      });

      const result = await res.json();
      toast({
        title: 'Inquiry Sent!',
        description: "Thanks! I'll be in touch shortly.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        business: '',
        business_tag: '',
        description: '',
        features: '',
        extra: '',
        images: null,
      });
    } catch (err: any) {
      console.error('Form submission error:', err);
      toast({
        title: 'Submission Failed',
        description: err.message || 'An error occurred while sending your message. Try again later.',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };

  return (
    <PageLayout>
      <section className="py-24 md:py-32 bg-brown-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Title & Description */}
            <div>
              <h1 className="text-4xl font-bold mb-4 text-brown-800">Request a Website</h1>
              <p className="text-gray-700 text-lg">
                Want a custom website? Fill out the form with as much detail as you can, and I’ll reach out to get started.
              </p>
            </div>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 space-y-6">

            {/* Package Options */}
            <div>
              <h3 className="text-xl font-semibold text-brown-700 mb-3">Choose a Package</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {PACKAGES.map((pkg) => {
                  const isSelected = formData.features.includes(pkg.title);
                  return (
                    <Card
                      key={pkg.id}
                      className={`cursor-pointer transition-all border-2 ${
                        isSelected ? 'border-brown-700 bg-brown-50 shadow-md' : 'border-gray-200'
                      }`}
                      onClick={() => handleFeatureSelect(pkg.title, true)}
                    >
                      <CardContent className="p-4 space-y-2">
                        <h4 className="font-bold text-lg">{pkg.title}</h4>
                        <p className="text-sm text-gray-700">{pkg.description}</p>
                        <ul className="text-sm text-gray-600 list-disc list-inside pl-1 pt-1 space-y-1">
                          {pkg.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            {/*formData.features && (
              <div className="mt-4 text-sm text-gray-600">
                Selected Package: <strong>
                  {PACKAGES.find(pkg => formData.features.includes(pkg.name))?.name || 'None'}
                </strong>
              </div>
            )*/}
            {/* Add-on Services */}
            <div>
              <h3 className="text-xl font-semibold text-brown-700 mb-3">Add-on Services</h3>
              <div className="flex flex-wrap gap-3">
                {ADDONS.map((addon) => (
                  <button
                    key={addon}
                    type="button"
                    className={`px-4 py-2 rounded-full border text-sm transition-all ${
                      formData.features.includes(addon)
                        ? 'bg-brown-700 text-white border-brown-700'
                        : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                    }`}
                    onClick={() => handleFeatureSelect(addon)}
                  >
                    {addon}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiry Form */}
  
                <h3 className="text-xl font-semibold text-brown-700">Details</h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-1 gap-4">
                    <Input name="business" placeholder="Business Name" value={formData.business} onChange={handleChange} required />
                    <Input name="business_tag" placeholder="Business Tagline" value={formData.business_tag} onChange={handleChange} />
                    <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                    <Input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                    <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                  </div>

                  <Textarea
                    name="description"
                    rows={4}
                    placeholder="Describe what you want your website to do..."
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload any related images or videos</label>
                    <Input name="images" type="file" multiple accept="image/*,video/*" onChange={handleFileChange} />
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
                    <NavLink to="/contact" className="text-brown-700 hover:text-gray-700 transition-colors">
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
};

export default Inquiry;
