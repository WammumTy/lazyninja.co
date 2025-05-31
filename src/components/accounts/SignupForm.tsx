import React, { useState } from 'react';
import axios from 'axios';

export const SignupForm: React.FC<{ onSwitchToVerify: (email: string) => void }> = ({ onSwitchToVerify }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post('https://api.lazyninja.co/auth/pre-signup', { email, password });
      onSwitchToVerify(email);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Error during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Sign Up'}
      </button>
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
};
