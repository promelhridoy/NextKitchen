'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

   try {
  const { error } = await signIn.email({
    email,
    password,
  });

  if (error) {
    toast.error(error.message ?? "Login failed");
    return;
  }

  toast.success("Login successful 🎉");

  router.push("/");
  router.refresh();
} catch (err) {
  console.error(err);
  toast.error("Something went wrong");
} finally {
  setLoading(false);
}
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({ provider: 'google', callbackURL: '/' });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3E9] px-4 py-12 dark:bg-[#1C1A16]">
      <div className="w-full max-w-md">
        <div className="relative rounded-sm border border-[#C9C2AC] bg-[#FDFBF5] px-8 py-10 shadow-[0_1px_0_#C9C2AC,0_8px_24px_-12px_rgba(0,0,0,0.25)] dark:border-[#3A362C] dark:bg-[#25221C]">
          <div className="absolute -left-3 top-10 h-5 w-5 rounded-full border border-[#C9C2AC] bg-[#F7F3E9] dark:border-[#3A362C] dark:bg-[#1C1A16]" />

          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-[#7A8B6F]">NestKitchen</p>
          <h1 className="font-serif text-3xl text-[#2B2822] dark:text-[#EFE9D8]">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-[#6B6656] dark:text-[#A39D89]">
            Open your kitchen&apos;s recipe book again
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-[#4A4638] dark:text-[#C9C2AC]">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-sm border border-[#C9C2AC] bg-transparent px-3 py-2 text-[#2B2822] outline-none transition focus:border-[#7A8B6F] focus:ring-2 focus:ring-[#7A8B6F]/30 dark:border-[#3A362C] dark:text-[#EFE9D8]"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm text-[#4A4638] dark:text-[#C9C2AC]">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-sm border border-[#C9C2AC] bg-transparent px-3 py-2 text-[#2B2822] outline-none transition focus:border-[#7A8B6F] focus:ring-2 focus:ring-[#7A8B6F]/30 dark:border-[#3A362C] dark:text-[#EFE9D8]"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-[#B4453B]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-sm bg-[#5B7B5B] py-2.5 text-sm font-medium text-white transition hover:bg-[#4C694C] disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#C9C2AC] dark:bg-[#3A362C]" />
            <span className="text-xs text-[#8A8570]">or</span>
            <span className="h-px flex-1 bg-[#C9C2AC] dark:bg-[#3A362C]" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-[#C9C2AC] py-2.5 text-sm text-[#2B2822] transition hover:bg-[#F0EBDB] dark:border-[#3A362C] dark:text-[#EFE9D8] dark:hover:bg-[#2E2A22]"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-[#6B6656] dark:text-[#A39D89]">
            New here?{' '}
            <Link href="/register" className="font-medium text-[#5B7B5B] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.44H12v4.62h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.81z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.94-2.92l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.27a12 12 0 0 0 0 10.74l4-3.1z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.58 1.79l3.44-3.44C17.94 1.19 15.23 0 12 0A12 12 0 0 0 1.27 6.63l4 3.1C6.22 6.88 8.87 4.77 12 4.77z" />
    </svg>
  );
}