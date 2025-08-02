'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

type Script = {
  id: string;
  title: string;
  genre: string;
  duration: string;
  description: string;
};

export default function BrowseScriptsPage() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    const { data, error } = await supabase.from('scripts').select('*');
    if (error) {
      console.error('Veri alınamadı:', error.message);
    } else {
      setScripts(data);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🔍 Senaryo Ara</h1>
      <p className="text-[#7a5c36]">
        İlgilendiğiniz türde senaryoları keşfedin. Dilerseniz filtreleme
        seçeneklerini genişletebilirsiniz.
      </p>

      {/* Filtreler (şimdilik statik) */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select className="p-2 border rounded-lg">
          <option>Tüm Türler</option>
          <option>Dram</option>
          <option>Komedi</option>
          <option>Gerilim</option>
          <option>Bilim Kurgu</option>
        </select>
        <select className="p-2 border rounded-lg">
          <option>Süre</option>
          <option>Kısa Film</option>
          <option>Uzun Metraj</option>
          <option>Dizi</option>
        </select>
        <select className="p-2 border rounded-lg">
          <option>Sıralama</option>
          <option>En Yeni</option>
          <option>En Çok Görüntülenen</option>
        </select>
      </div>

      {/* Senaryo Kartları */}
      {loading ? (
        <p className="text-sm text-gray-500">Yükleniyor...</p>
      ) : scripts.length === 0 ? (
        <p className="text-sm text-gray-500">Henüz senaryo bulunamadı.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripts.map((s) => (
            <div className="card space-y-2" key={s.id}>
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <p className="text-sm text-[#7a5c36]">
                Tür: {s.genre} &middot; Süre: {s.duration}
              </p>
              <p className="text-sm text-[#4a3d2f]">{s.description}</p>
              <div className="flex gap-2 mt-2">
                <button className="btn btn-primary">İlgilen</button>
                <Link
                  href={`/dashboard/producer/browse/${s.id}`}
                  className="btn btn-secondary"
                >
                  Detaylar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
