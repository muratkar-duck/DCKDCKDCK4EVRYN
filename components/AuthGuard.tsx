'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        setIsAuthenticated(true);
      } else {
        router.replace('/auth/sign-in');
      }

      setLoading(false);
    };

    checkSession();
  }, [router]);

  if (loading)
    return <p className="text-center py-12">Oturum kontrol ediliyor...</p>;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
