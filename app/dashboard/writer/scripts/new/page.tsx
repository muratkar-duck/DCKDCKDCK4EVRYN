'use client';

import { useState } from 'react';

export default function NewScriptPage() {
  const [title, setTitle] = useState('');

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">✍️ Yeni Senaryo Ekle</h1>

      <form className="space-y-6 max-w-2xl">
        {/* Başlık */}
        <div>
          <label className="block text-sm font-medium mb-1">Başlık</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn: Kırık Saat"
          />
        </div>

        {/* Tür */}
        <div>
          <label className="block text-sm font-medium mb-1">Tür</label>
          <select className="w-full p-2 border rounded-lg">
            <option>Dram</option>
            <option>Gerilim</option>
            <option>Komedi</option>
            <option>Bilim Kurgu</option>
            <option>Belgesel</option>
          </select>
        </div>

        {/* Süre */}
        <div>
          <label className="block text-sm font-medium mb-1">Süre</label>
          <select className="w-full p-2 border rounded-lg">
            <option>Kısa Film</option>
            <option>Uzun Metraj</option>
            <option>Dizi</option>
          </select>
        </div>

        {/* Özet */}
        <div>
          <label className="block text-sm font-medium mb-1">Özet</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows={3}
            placeholder="1-2 cümleyle senaryonuzun özeti..."
          ></textarea>
        </div>

        {/* Açıklama */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Senaryo Detayı
          </label>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows={6}
            placeholder="Detaylı açıklama, tema, karakterler, anlatım tercihi..."
          ></textarea>
        </div>

        {/* Fiyat */}
        <div>
          <label className="block text-sm font-medium mb-1">Fiyat (₺)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            placeholder="Örn: 5000"
          />
        </div>

        {/* Gönder Butonu */}
        <div>
          <button type="submit" className="btn btn-primary">
            Yayınla
          </button>
        </div>
      </form>
    </div>
  );
}
