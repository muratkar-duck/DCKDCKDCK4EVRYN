'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function EditScriptPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

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
      alert('Veri alınamadı: ' + error.message);
    } else if (data) {
      setTitle(data.title);
      setGenre(data.genre);
      setDuration(data.duration);
      setDescription(data.description);
    }

    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('scripts')
      .update({
        title,
        genre,
        duration,
        description,
      })
      .eq('id', id);

    if (error) {
      alert('Güncelleme başarısız: ' + error.message);
    } else {
      router.push('/dashboard/writer/scripts');
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Yükleniyor...</p>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">✏️ Senaryo Düzenle</h1>

      <form className="space-y-4" onSubmit={handleUpdate}>
        <div>
          <label className="block text-sm font-medium mb-1">Başlık</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tür</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            <option value="">Seçiniz</option>
            <option>Dram</option>
            <option>Gerilim</option>
            <option>Komedi</option>
            <option>Bilim Kurgu</option>
            <option>Belgesel</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Süre / Metraj
          </label>
          <select
            className="w-full p-2 border rounded-lg"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          >
            <option value="">Seçiniz</option>
            <option>Kısa Film</option>
            <option>Uzun Metraj</option>
            <option>Dizi (Bölüm)</option>
            <option>Mini Dizi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Açıklama</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="btn btn-primary">
            Kaydet
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => router.back()}
          >
            Vazgeç
          </button>
        </div>
      </form>
    </div>
  );
}
