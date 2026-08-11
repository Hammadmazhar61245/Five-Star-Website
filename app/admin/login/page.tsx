'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError(data.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-card border border-border p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">Admin Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-border text-white px-4 py-2 rounded focus:outline-none focus:border-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-border text-white px-4 py-2 rounded focus:outline-none focus:border-primary"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary-bright transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
