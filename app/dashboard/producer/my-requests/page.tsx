'use client';

import { myRequests } from '@/lib/mock/myRequests';
import Link from 'next/link';

export default function ProducerMyRequestsPage() {
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ş/g, 's')
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ö/g, 'o')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📋 Yayındaki İlanlarım</h1>
      <p className="text-[#7a5c36]">
        Daha önce yayınladığınız ilanları buradan takip edebilirsiniz.
      </p>

      {myRequests.length === 0 ? (
        <p className="text-sm text-[#a38d6d]">
          Henüz yayınladığınız bir ilan yok.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {myRequests.map((req) => (
            <div key={req.id} className="card space-y-2">
              <h2 className="text-lg font-semibold">{req.title}</h2>
              <p className="text-sm text-[#7a5c36]">
                Tür: {req.genre} <br />
                Süre: {req.duration} <br />
                Tarih: {req.date}
              </p>
              <p className="text-sm text-[#4a3d2f]">
                Gelen Öneri Sayısı: <strong>{req.suggestionCount}</strong>
              </p>
              <div className="pt-2">
                <Link
                  href={`/dashboard/producer/requests/${slugify(req.title)}`}
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
