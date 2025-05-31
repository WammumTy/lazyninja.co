import React, { useState } from 'react';
import { SignupForm } from '@/components/accounts/SignupForm';
import { VerificationForm } from '@/components/accounts/VerificationForm';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [emailForVerify, setEmailForVerify] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {!emailForVerify ? (
        <SignupForm onSwitchToVerify={(email) => setEmailForVerify(email)} />
      ) : (
        <VerificationForm
          email={emailForVerify}
          onVerified={() => {
            navigate('/login'); // redirect to login page
          }}
        />
      )}
    </div>
  );
};

export default SignupPage;
