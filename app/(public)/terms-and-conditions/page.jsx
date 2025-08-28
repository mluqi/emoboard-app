import React from 'react';

export const metadata = {
  title: 'Terms and Conditions | EmoBoard',
  description: 'Terms and Conditions for EmoBoard.',
};

const TermsAndConditionsPage = () => {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      <div className="prose dark:prose-invert max-w-none space-y-4">
        <p>Last updated: October 26, 2023</p>

        <h2 className="text-2xl font-semibold mt-6">1. Agreement to Terms</h2>
        <p>
          By using our services ("Service"), you agree to be bound by these Terms. If you do not agree to be bound by these Terms, do not use the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-6">2. User Accounts</h2>
        <p>
          When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>

        <h2 className="text-2xl font-semibold mt-6">3. Content</h2>
        <p>
          Our Service allows you to post, link, store, share and otherwise make available certain information, text, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness. We do not claim ownership of your content, but you grant us a license to use it to provide the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-6">4. Prohibited Uses</h2>
        <p>
          You agree not to use the Service to post any content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.
        </p>

        <h2 className="text-2xl font-semibold mt-6">5. Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6">6. Limitation of Liability</h2>
        <p>
          In no event shall EmoBoard, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-6">7. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
        </p>

        <h2 className="text-2xl font-semibold mt-6">8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at [your-contact-email@example.com].
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
