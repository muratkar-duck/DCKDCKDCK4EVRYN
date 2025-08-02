'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type Script = {
  id: string;
  title: string;
  genre: string;
  duration: string;
  description: string;
};

export default function ScriptDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [script, setScript] = useState<Script | null>(null);

  useEffect(() => {
    if (id) fetchScript();
  }, [id]);

  const fetchScript = async () => {
    const { data, error } = await supabase
      .from('scripts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Veri alınamadı:', error.message);
      return;
    }

    setScript(data);
  };

  if (!script) {
    return <p className="text-sm text-gray-500">Senaryo yükleniyor...</p>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">📄 {script.title}</h1>

      <div className="bg-white rounded-xl shadow p-6 border-l-4 border-[#f9c74f] space-y-4">
        <p>
          <strong>Tür:</strong> {script.genre}
        </p>
        <p>
          <strong>Süre / Metraj:</strong> {script.duration}
        </p>
        <p>
          <strong>Açıklama:</strong>
          <br />
          <span className="text-[#4a3d2f]">{script.description}</span>
        </p>
      </div>

      <div className="flex gap-3">
        <button
          className="btn btn-secondary"
          onClick={() => router.push('/dashboard/writer/scripts')}
        >
          Geri Dön
        </button>
        <button
          className="btn btn-primary"
          onClick={() =>
            router.push(`/dashboard/writer/scripts/edit/${script.id}`)
          }
        >
          ✏️ Düzenle
        </button>
      </div>
    </div>
  );
}
