import React, { useState } from 'react';
import axios from 'axios';

export const VerificationForm: React.FC<{ email: string; onVerified: () => void }> = ({ email, onVerified }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post('https://api.lazyninja.co/auth/verify-email', { email, code });
      onVerified();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendMessage(null);
    setResendLoading(true);

    try {
      await axios.post('https://api.lazyninja.co/auth/resend-verification', { email });
      setResendMessage('A new verification code has been sent to your email.');
    } catch (err: any) {
      console.error(err);
      setResendMessage('Failed to resend verification code. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      <p className="text-gray-600 mb-2">We sent a verification code to {email}</p>
      <input
        type="text"
        placeholder="Verification Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Verify'}
      </button>

      {/* 🔥 Resend verification code */}
      <p className="text-sm text-gray-600 mt-2">
        Didn’t get the code?{' '}
        <button
          type="button"
          onClick={handleResend}
          disabled={resendLoading}
          className="text-blue-500 hover:underline focus:outline-none"
        >
          {resendLoading ? 'Resending...' : 'Resend verification?'}
        </button>
      </p>

      {resendMessage && <div className="text-green-600 text-sm">{resendMessage}</div>}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
};
