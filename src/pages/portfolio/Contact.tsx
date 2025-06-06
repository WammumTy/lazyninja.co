import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Missing Information',
        description: 'Please fill out all fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const res = await fetch('https://api.lazyninja.co/public/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": formData.name,
          "email": formData.email,
          "message": formData.message,
        }),
      });

      toast({
        title: 'Message Sent!',
        description: "Thanks! We'll get back to you soon.",
      });

    } catch (err: any) {
      console.error('💥 Submission Error:', err);
      toast({
        title: 'Submission Failed',
        description: err.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
    setFormData({ name: '', email: '', message: '' });
    setLoading(false)
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "tyler@lazyninja.co",
      link: "mailto:tyler@lazyninja.co",
    },
    {
      icon: <Github size={20} />,
      label: "GitHub",
      value: "wammumty",
      link: "https://github.com/WammumTy",
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      value: "Tyler Mummaw",
      link: "linkedin.com/in/tymummaw",
    },
  ];

  return (
    <PageLayout>
      <section className="min-h-[90vh] py-24 md:py-32 bg-brown-50 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h1 className="section-title mb-8">Get In Touch</h1>
              <p className="text-gray-700 mb-8">
                Have questions on a project in mind or just want to say hello? We'd love to hear from you. 
                Fill out the form or use our contact information to get in touch with me.
              </p>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <a 
                        key={index} 
                        href={item.link} 
                        className="flex items-center gap-4 group"
                        target="_blank" 
                        rel="noreferrer"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brown-100 text-brown-700 group-hover:bg-brown-200 transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm text-brown-600">{item.label}</p>
                          <p className="font-medium text-brown-900 group-hover:text-brown-700 transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-semibold text-brown-800 mb-6">
                    Send Us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brown-700 mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="border-brown-200 focus-visible:ring-brown-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brown-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="johndoe@example.com"
                        required
                        className="border-brown-200 focus-visible:ring-brown-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-brown-700 mb-1">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project or inquiry..."
                        required
                        rows={5}
                        className="border-brown-200 focus-visible:ring-brown-500"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-brown-700 hover:bg-brown-800 text-white"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                    <p className="text-center text-lg text-brown-800 mb-3">
                        Already have a website in mind? {' '}
                        <NavLink to="/inqury" className="text-brown-700 hover:text-gray-700 transition-colors">
                          Fill out a inqury!
                        </NavLink>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
