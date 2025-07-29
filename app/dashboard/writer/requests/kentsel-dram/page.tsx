'use client';

import { useRouter } from 'next/navigation';
import ScriptSuggestModal from '@/components/ScriptSuggestModal';

export default function KentselDramTalepPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🎥 Studio X – Kentsel Dram Projesi</h1>
      <p className="text-sm text-[#7a5c36] mb-2">
        Tür: Dram &middot; Süre: Uzun Metraj &middot; Teslim Tarihi: 15 Eylül
        2025
      </p>

      <div className="bg-white rounded-xl shadow p-6 border-l-4 border-[#f9c74f] space-y-4">
        <h2 className="text-lg font-semibold">Proje Açıklaması</h2>
        <p className="text-[#4a3d2f]">
          İstanbul’un güncel sorunlarını işleyen, karakter gelişimi güçlü, duygu
          yoğunluğu yüksek bir hikâye arıyoruz. Gerçekçi diyaloglar çok önemli.
        </p>

        <h2 className="text-lg font-semibold pt-4">Tercih Edilen Öğeler</h2>
        <ul className="list-disc pl-5 text-[#4a3d2f]">
          <li>Gerçek mekanlar (apartman, sokak, kahvehane)</li>
          <li>Toplumsal eleştiri</li>
          <li>18-30 yaş arası ana karakter</li>
        </ul>

        <h2 className="text-lg font-semibold pt-4">Bütçe Bilgisi</h2>
        <p className="text-[#4a3d2f]">
          Tahmini 150.000₺ civarında. Yapım sonrası desteği mevcut.
        </p>

        <div className="pt-6 flex gap-4">
          <ScriptSuggestModal genre="Dram" duration="Uzun Metraj" />
          <button className="btn btn-secondary" onClick={() => router.back()}>
            Geri Dön
          </button>
        </div>
      </div>
    </div>
  );
}
