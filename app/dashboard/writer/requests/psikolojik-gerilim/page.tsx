'use client';

import { useRouter } from 'next/navigation';
import ScriptSuggestModal from '@/components/ScriptSuggestModal';

export default function PsikolojikGerilimTalepPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        🎬 FilmHouse – Psikolojik Gerilim Dizisi
      </h1>
      <p className="text-sm text-[#7a5c36] mb-2">
        Tür: Gerilim / Psikolojik &middot; Süre: Mini Dizi &middot; Teslim
        Tarihi: 30 Ağustos 2025
      </p>

      <div className="bg-white rounded-xl shadow p-6 border-l-4 border-[#f9c74f] space-y-4">
        <h2 className="text-lg font-semibold">Proje Açıklaması</h2>
        <p className="text-[#4a3d2f]">
          Katmanlı karakterlere sahip, diyalogların az olduğu, atmosferle
          gerilim yaratan bir hikâye istiyoruz. Hikaye tercihen tek mekân ya da
          az mekânlı olmalı.
        </p>

        <h2 className="text-lg font-semibold pt-4">Tercih Edilen Öğeler</h2>
        <ul className="list-disc pl-5 text-[#4a3d2f]">
          <li>Psikolojik çözülme</li>
          <li>Yavaş tempolu anlatım</li>
          <li>Simgesel nesneler</li>
          <li>Tek veya çift karakter</li>
        </ul>

        <h2 className="text-lg font-semibold pt-4">Bütçe Bilgisi</h2>
        <p className="text-[#4a3d2f]">
          60.000₺ - 100.000₺ arası başlangıç bütçesi ayrılmıştır.
        </p>

        <div className="pt-6 flex gap-4">
          <ScriptSuggestModal genre="Gerilim" duration="Mini Dizi" />
          <button className="btn btn-secondary" onClick={() => router.back()}>
            Geri Dön
          </button>
        </div>
      </div>
    </div>
  );
}
