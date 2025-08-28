import React from 'react';

export const metadata = {
  title: 'Privacy Policy | EmoBoard',
  description: 'Privacy Policy for EmoBoard.',
};

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none space-y-4">
        <p>Last updated: October 26, 2023</p>
        
        <h2 className="text-2xl font-semibold mt-6">Introduction</h2>
        <p>
          Welcome to EmoBoard. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Information We Collect</h2>
        <p>
          We collect personal information that you voluntarily provide to us when you register on the EmoBoard, such as your email address. If you choose to post anonymously, we do not link your user ID to the post in a publicly visible way. However, the data is still associated with your account in our database for administrative and moderation purposes.
        </p>

        <h2 className="text-2xl font-semibold mt-6">How We Use Your Information</h2>
        <p>
          We use personal information collected via our EmoBoard for a variety of business purposes described below.
        </p>
        <ul>
            <li>To facilitate account creation and logon process.</li>
            <li>To manage user accounts.</li>
            <li>To send administrative information to you.</li>
            <li>To protect our Services.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Will Your Information Be Shared With Anyone?</h2>
        <p>
          We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not sell your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-6">How Long Do We Keep Your Information?</h2>
        <p>
          We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law.
        </p>

        <h2 className="text-2xl font-semibold mt-6">How Do We Keep Your Information Safe?</h2>
        <p>
          We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6">Do We Collect Information From Minors?</h2>
        <p>
          We do not knowingly solicit data from or market to children under 13 years of age. By using the EmoBoard, you represent that you are at least 13.
        </p>

        <h2 className="text-2xl font-semibold mt-6">What Are Your Privacy Rights?</h2>
        <p>
          You may review, change, or terminate your account at any time. If you are a resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority.
        </p>

        <h2 className="text-2xl font-semibold mt-6">How Can You Contact Us About This Policy?</h2>
        <p>
          If you have questions or comments about this policy, you may email us at [your-contact-email@example.com].
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
