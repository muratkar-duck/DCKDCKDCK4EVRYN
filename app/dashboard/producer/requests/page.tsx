'use client';
import AuthGuard from '@/components/AuthGuard';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { suggestions } from '@/lib/mock/suggestions';

export default function ProducerRequestDetailPage() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [responseType, setResponseType] = useState<
    'accepted' | 'rejected' | null
  >(null);
  const [message, setMessage] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  const handleSend = () => {
    if (!responseType) {
      alert('Lütfen bir yanıt seçin.');
      return;
    }

    alert(
      `“${selectedTitle}” adlı senaryo ${
        responseType === 'accepted' ? 'KABUL EDİLDİ' : 'REDDEDİLDİ'
      }.\nMesaj: ${message}`
    );

    setShowModal(false);
    setResponseType(null);
    setMessage('');
    setSelectedTitle('');
  };

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
    <AuthGuard allowedRoles={['producer']}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          📥 Gelen Öneriler – Psikolojik Gerilim Dizisi
        </h1>
        <p className="text-[#7a5c36]">
          Bu ilana yapılan senaryo önerilerini aşağıda görebilirsin.
        </p>

        {suggestions.map((s) => (
          <div className="card" key={s.id}>
            <div className="flex justify-between mb-2">
              <div>
                <h2 className="text-lg font-semibold">{s.title}</h2>
                <p className="text-sm text-[#7a5c36]">
                  Gönderen: <strong>{s.writer}</strong>
                </p>
              </div>
              <div className="text-right space-y-1">
                <span className="block text-xs text-[#a38d6d]">{s.date}</span>
                {getBadge(s.status)}
              </div>
            </div>
            <p className="text-sm text-[#4a3d2f]">{s.summary}</p>
            <div className="mt-3 flex gap-2">
              <button className="btn btn-primary" disabled>
                İncele
              </button>
              {s.status === 'pending' && (
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSelectedTitle(s.title);
                    setShowModal(true);
                  }}
                >
                  Cevapla
                </button>
              )}
            </div>
          </div>
        ))}

        <button className="btn btn-secondary" onClick={() => router.back()}>
          Geri Dön
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md space-y-4">
              <h2 className="text-xl font-bold">
                ✉️ “{selectedTitle}” için yanıtla
              </h2>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="response"
                    value="accepted"
                    checked={responseType === 'accepted'}
                    onChange={() => setResponseType('accepted')}
                  />
                  Kabul Et
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="response"
                    value="rejected"
                    checked={responseType === 'rejected'}
                    onChange={() => setResponseType('rejected')}
                  />
                  Reddet
                </label>
              </div>

              <textarea
                placeholder="İsteğe bağlı mesaj (örneğin neden reddettiğini yazabilirsin)"
                className="w-full border rounded-lg p-2 text-sm"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="flex gap-2 justify-end">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Vazgeç
                </button>
                <button className="btn btn-primary" onClick={handleSend}>
                  Gönder
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
