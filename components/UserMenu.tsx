'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  // Buton boyutu: yükseklik = 40px (x), genişlik = 120px (2x)
  // Burada Tailwind arbitrary width/height kullanıldı; istersen sabit sınıf isimlerini değiştiririz.
  const fixedBtnBase =
    'h-[40px] rounded-lg text-sm font-bold flex items-center justify-center overflow-hidden';
  const loginBtnClass = `${fixedBtnBase} w-[120px] px-4 bg-[#ffaa06] text-[#0e5b4a] hover:bg-[#ffb733]`;
  const registerBtnClass = `${fixedBtnBase} w-[120px] px-4 bg-white text-[#0e5b4a] border border-[#ffaa06] hover:bg-[#fff3d6]`;
  // userBtnClass güncellenmiş hali
  const userBtnClass = `${fixedBtnBase} w-[120px] px-3 bg-[#ffaa06] text-[#0e5b4a] hover:bg-[#ffb733]`;

  // helper: e-posta kısmını kısalt (local part), full e-postayı tooltip'te göster
  const shortLabel = (email: string | null) => {
    if (!email) return '';
    const local = email.split('@')[0] || email;
    if (local.length <= 12) return local;
    return local.slice(0, 10) + '…';
  };

  // Eğer oturum yoksa => Giriş / Kayıt (sabit genişlikte alan, nav kaymaz)
  if (!user) {
    return (
      <div className="flex items-center space-x-2 w-[260px] justify-end">
        <Link href="/auth/sign-in" className={loginBtnClass}>
          Giriş Yap
        </Link>

        {/* Kayıt Açılır Menüsü */}
        <div className="relative">
          <button
            onClick={() => setRegisterOpen((s) => !s)}
            className={registerBtnClass}
            aria-expanded={registerOpen}
            aria-haspopup="menu"
          >
            Kayıt Ol ⌄
          </button>

          {registerOpen && (
            <div
              className="absolute right-0 mt-2 w-[200px] bg-white shadow-lg rounded-lg border z-50"
              role="menu"
            >
              <Link
                href="/auth/sign-up-writer"
                className="block px-4 py-2 hover:bg-gray-100"
                role="menuitem"
                onClick={() => setRegisterOpen(false)}
              >
                ✍️ Senarist olarak kayıt ol
              </Link>
              <Link
                href="/auth/sign-up-producer"
                className="block px-4 py-2 hover:bg-gray-100"
                role="menuitem"
                onClick={() => setRegisterOpen(false)}
              >
                🎬 Yapımcı olarak kayıt ol
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Oturum varsa => kullanıcı açılır menüsü (buton fixed size, içindeki e-posta truncate)
  const displayLabel = shortLabel(user.email || '');

  return (
    <div className="relative inline-block text-right w-[260px]">
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className={userBtnClass}
        title={user.email} // hover'da tam email görünür
        aria-expanded={menuOpen}
        aria-haspopup="menu"
      >
        {/* icon veya initials istersen buraya ekleyebilirsin */}
        <span className="truncate max-w-[88px] block">{displayLabel}</span>
      </button>

      {menuOpen && (
        <div
          className="absolute right-0 mt-2 w-[220px] bg-white shadow-lg rounded-lg border z-50"
          role="menu"
        >
          <div className="px-4 py-2 border-b text-sm text-gray-600">
            {user.email}
          </div>

          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              const role = user.user_metadata?.role;
              if (role === 'writer') router.push('/dashboard/writer');
              else if (role === 'producer') router.push('/dashboard/producer');
              else router.push('/');
              setMenuOpen(false);
            }}
            role="menuitem"
          >
            📂 Dashboard
          </button>

          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              setMenuOpen(false);
              handleSignOut();
            }}
            role="menuitem"
          >
            🚪 Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}
