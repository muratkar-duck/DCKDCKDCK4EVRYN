'use client';

import Link from 'next/link';

export default function WriterRequestsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📢 Açık Yapımcı Talepleri</h1>
      <p className="text-[#7a5c36]">
        Yapımcıların ihtiyaç duyduğu senaryoları aşağıda bulabilirsin. Uygun
        olduğunu düşündüğün projelere senaryonu önerebilirsin.
      </p>

      {/* Talepler Listesi */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Talep 1 */}
        <div className="card space-y-2">
          <h2 className="text-lg font-semibold">Psikolojik Gerilim Dizisi</h2>
          <p className="text-sm text-[#7a5c36]">Yapımcı: FilmHouse</p>
          <p className="text-sm text-[#7a5c36]">Tür: Gerilim / Psikolojik</p>
          <p className="text-sm text-[#7a5c36]">Süre: Mini Dizi (8 bölüm)</p>
          <p className="text-sm text-[#7a5c36]">
            Teslim Tarihi: 30 Ağustos 2025
          </p>
          <p className="text-sm text-[#4a3d2f]">
            Katmanlı karakterlerle ilerleyen, düşük diyaloglu bir hikâye
            isteniyor.
          </p>
          <div className="flex gap-2 mt-2">
            <Link
              href="/dashboard/writer/requests/psikolojik-gerilim"
              className="btn btn-secondary"
            >
              Detaylar
            </Link>
          </div>
        </div>

        {/* Talep 2 */}
        <div className="card space-y-2">
          <h2 className="text-lg font-semibold">Kentsel Dram Film Projesi</h2>
          <p className="text-sm text-[#7a5c36]">Yapımcı: Studio X</p>
          <p className="text-sm text-[#7a5c36]">Tür: Dram</p>
          <p className="text-sm text-[#7a5c36]">Süre: Uzun Metraj</p>
          <p className="text-sm text-[#7a5c36]">Teslim Tarihi: 15 Eylül 2025</p>
          <p className="text-sm text-[#4a3d2f]">
            İstanbul'da geçen sosyal temalı güçlü diyaloglara sahip bir senaryo
            isteniyor.
          </p>
          <div className="flex gap-2 mt-2">
            <Link
              href="/dashboard/writer/requests/kentsel-dram"
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
