'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@/hooks/useSession';

type Script = {
  id: string;
  title: string;
  genre: string;
  duration: string;
  description: string;
};

export default function MyScriptsPage() {
  const { session } = useSession();
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) {
      fetchScripts();
    }
  }, [session]);

  const fetchScripts = async () => {
    const { data, error } = await supabase
      .from('scripts')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Veri alınamadı:', error.message);
    } else {
      setScripts(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      'Bu senaryoyu silmek istediğinizden emin misiniz?'
    );
    if (!confirmed) return;

    const { error } = await supabase
      .from('scripts')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id); // güvenlik kontrolü

    if (error) {
      alert('Silme başarısız: ' + error.message);
    } else {
      setScripts((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📚 Senaryolarım</h1>
      <p className="text-[#7a5c36]">
        Daha önce eklediğiniz senaryolar aşağıda listelenmiştir.
      </p>

      {loading ? (
        <p className="text-sm text-gray-500">Yükleniyor...</p>
      ) : scripts.length === 0 ? (
        <p className="text-sm text-gray-500">Henüz senaryo eklenmemiş.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {scripts.map((s) => (
            <div key={s.id} className="card space-y-2">
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <p className="text-sm text-[#7a5c36]">
                Tür: {s.genre} &middot; Süre: {s.duration}
              </p>
              <p className="text-sm text-[#4a3d2f]">{s.description}</p>
              <div className="flex gap-2 mt-2">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    router.push(`/dashboard/writer/scripts/${s.id}`)
                  }
                >
                  Detay
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() =>
                    router.push(`/dashboard/writer/scripts/edit/${s.id}`)
                  }
                >
                  Düzenle
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(s.id)}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
