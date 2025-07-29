'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProducerRequestKentselDramPage() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [responseType, setResponseType] = useState<
    'accepted' | 'rejected' | null
  >(null);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!responseType) {
      alert('Lütfen bir yanıt seçin.');
      return;
    }

    alert(
      `Senaryo ${
        responseType === 'accepted' ? 'KABUL EDİLDİ' : 'REDDEDİLDİ'
      }.\nMesaj: ${message}`
    );

    setShowModal(false);
    setResponseType(null);
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        📥 Gelen Öneriler – Kentsel Dram Projesi
      </h1>
      <p className="text-[#7a5c36]">
        Bu ilana yapılan senaryo önerilerini aşağıda görebilirsin.
      </p>

      <div className="space-y-4">
        {/* Öneri Kartı */}
        <div className="card">
          <div className="flex justify-between mb-2">
            <div>
              <h2 className="text-lg font-semibold">Kırık Saat</h2>
              <p className="text-sm text-[#7a5c36]">
                Gönderen: <strong>senaryo55</strong>
              </p>
            </div>
            <span className="text-xs text-[#a38d6d]">15 Temmuz 2025</span>
          </div>
          <p className="text-sm text-[#4a3d2f]">
            Kadın merkezli, kentsel dönüşümün toplumsal etkilerini ele alan
            dramatik bir anlatı.
          </p>
          <div className="mt-3 flex gap-2">
            <button className="btn btn-primary" disabled>
              İncele
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowModal(true)}
            >
              Cevapla
            </button>
          </div>
        </div>
      </div>

      <button className="btn btn-secondary" onClick={() => router.back()}>
        Geri Dön
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">✉️ Senaryo Önerisini Yanıtla</h2>

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
  );
}
