import PageLayout from '@/components/layout/PageLayout';

const Privacy = () => {
  return (
    <PageLayout>
      <section className="py-24 md:py-32 bg-brown-50">
        <div className="max-w-4xl mx-auto px-6 md:px-0">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown-800 mb-6">
                    Privacy Policy
                </h1>
                <p className="text-sm text-gray-500 mb-10">Last updated: 05-29-2025</p>
                <div className="h-1 w-20 bg-brown-500 mx-auto mb-6"></div>
            </div>

            <div className="space-y-10 text-gray-700 text-base leading-relaxed">
                    <div>
                        <p>
                            Welcome to Lazy Ninja! Your privacy is important to us. This Privacy Policy explains
                            what information we use or collect when you use our website.
                        </p>
                    </div>
                <div>
                    <h2 className="text-xl font-semibold text-brown-700 mb-2">Information We Collect</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                        Personal information you provide to us, such as your name, email address, and
                        contact details.
                        </li>
                        <li>
                        Business information you provide to us, such as your business name, email address, and
                        other given details.
                        </li>
                        <li>
                        We do not use non-personal information, such as browser type, IP address, and usage data.
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-brown-700 mb-2">
                        How We Use Your Information
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>To provide and improve our services.</li>
                        <li>To communicate with you regarding invoicing or intrest in LazyNinja LLC.</li>
                        <li>To ensure the security and functionality of our website.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-brown-700 mb-2">Sharing Your Information</h2>
                    <p>
                        We do not sell or share your personal information with third parties, except as
                        required by law or to provide our services (e.g., payment processors).
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-brown-700 mb-2">Your Rights</h2>
                    <p>
                        You have the right to access, update, or delete your personal information. Please
                        contact us if you wish to exercise these rights.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-brown-700 mb-2">Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at{' '}
                        <a
                        href="mailto:tyler@lazyninja.co"
                        className="text-brown-600 underline hover:text-brown-800"
                        >
                        tyler@lazyninja.co
                        </a>.
                    </p>
                </div>
            </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Privacy;
