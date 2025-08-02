'use client';
import AuthGuard from '@/components/AuthGuard';
import { sentSuggestions } from '@/lib/mock/sentSuggestions';
import Link from 'next/link';

export default function WriterSuggestionHistoryPage() {
  const getBadge = (status: string) => {
    if (status === 'accepted')
      return (
        <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded">
          Kabul Edildi
        </span>
      );
    if (status === 'rejected')
      return (
        <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded">
          Reddedildi
        </span>
      );
    return (
      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
        Beklemede
      </span>
    );
  };

  return (
    <AuthGuard>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">📤 Gönderdiğim Öneriler</h1>
        <p className="text-[#7a5c36]">
          Yapımcılara gönderdiğin önerileri ve durumlarını aşağıda görebilirsin.
        </p>

        {sentSuggestions.map((s) => (
          <div className="card" key={s.id}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-lg font-semibold">{s.scriptTitle}</h2>
                <p className="text-sm text-[#7a5c36]">
                  İlan: <strong>{s.targetProject}</strong> <br />
                  Yapımcı: {s.producer}
                </p>
              </div>
              <div className="text-right space-y-1">
                <span className="block text-xs text-[#a38d6d]">{s.date}</span>
                {getBadge(s.status)}
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <Link
                href={`/dashboard/writer/requests/${slugify(s.targetProject)}`}
              >
                <span className="btn btn-secondary">İlana Git</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AuthGuard>
  );
}

// Yardımcı: Türkçe karakterleri slug'a çevirir (URL için)
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
