'use client';

import Link from 'next/link';

export default function BrowseScriptsPage() {
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Kart 1 - Kırık Saat */}
        <div className="card space-y-2">
          <h2 className="text-lg font-semibold">Kırık Saat</h2>
          <p className="text-sm text-[#7a5c36]">Tür: Dram / Gizem</p>
          <p className="text-sm text-[#7a5c36]">
            Senarist: <strong>elif_arslan</strong>
          </p>
          <p className="text-sm text-[#4a3d2f]">
            Zamanda sıkışmış bir kadının geçmişle hesaplaşmasını konu alan
            etkileyici bir kısa film.
          </p>
          <div className="flex gap-2 mt-2">
            <button className="btn btn-primary">İlgilen</button>
            <Link
              href="/dashboard/producer/browse/kirik-saat"
              className="btn btn-secondary"
            >
              Detaylar
            </Link>
          </div>
        </div>

        {/* Kart 2 - Gölge Oyunu */}
        <div className="card space-y-2">
          <h2 className="text-lg font-semibold">Gölge Oyunu</h2>
          <p className="text-sm text-[#7a5c36]">Tür: Aksiyon / Gerilim</p>
          <p className="text-sm text-[#7a5c36]">
            Senarist: <strong>senaryo55</strong>
          </p>
          <p className="text-sm text-[#4a3d2f]">
            Eski bir ajan, İstanbul’un yeraltı dünyasında kaybolan kardeşini
            bulmak zorunda.
          </p>
          <div className="flex gap-2 mt-2">
            <button className="btn btn-primary">İlgilen</button>
            <Link
              href="/dashboard/producer/browse/golge-oyunu"
              className="btn btn-secondary"
            >
              Detaylar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
