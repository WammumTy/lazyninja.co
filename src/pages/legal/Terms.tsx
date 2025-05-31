import PageLayout from '@/components/layout/PageLayout';

const Terms = () => {
  return (
    <PageLayout>
      <section className="py-24 md:py-32 bg-brown-50">
        <div className="max-w-4xl mx-auto px-6 md:px-0">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown-800 mb-6">
                    Terms of Service
                </h1>
                <p className="text-sm text-gray-500 mb-10">Last updated: [Insert Date]</p>
                <div className="h-1 w-20 bg-brown-500 mx-auto mb-6"></div>
            </div>

            <div className="space-y-10 text-gray-700 text-base leading-relaxed">
                <div>
                    <h2 className="text-xl font-semibold text-brown-700 mb-2">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using our website, you agree to be bound by these Terms of Service.
                        If you do not agree, please do not use our services.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-brown-700 mb-2">2. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. Changes will be effective
                        immediately upon posting. Your continued use of the website constitutes acceptance
                        of the updated terms.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-brown-700 mb-2">3. Use of the Website</h2>
                    <p>
                        You agree to use the website only for lawful purposes and in a way that does not
                        infringe the rights of others or restrict their use and enjoyment of the website.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-brown-700 mb-2">4. Intellectual Property</h2>
                    <p>
                        All content on this website, including text, graphics, logos, and images, is the
                        property of Lazy Ninja LLC or its content suppliers and is protected by copyright laws.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-brown-700 mb-2">5. Limitation of Liability</h2>
                    <p>
                        We are not liable for any damages arising from the use or inability to use our
                        website or services.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-brown-700 mb-2">6. Governing Law</h2>
                    <p>
                        These terms are governed by and construed in accordance with the laws of [Your
                        Jurisdiction].
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-brown-700 mb-2">7. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms of Service, please contact us at{' '}
                        <a
                        href="mailto:lazyninjausa@outlook.com"
                        className="text-brown-600 underline hover:text-brown-800"
                        >
                        LazyNinjaUSA@outlook.com
                        </a>.
                    </p>
                </div>
            </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Terms;
