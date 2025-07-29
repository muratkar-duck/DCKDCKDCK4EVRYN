'use client';

import { useState } from 'react';
import { myScripts } from '@/lib/mock/myScripts';

interface Props {
  genre: string;
  duration: string;
}

export default function ScriptSuggestModal({ genre, duration }: Props) {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  // Sadece eşleşen tür + metrajdaki senaryoları listele
  const matches = myScripts.filter(
    (script) => script.genre === genre && script.duration === duration
  );

  const handleSubmit = () => {
    if (selectedId) {
      const selected = matches.find((s) => s.id === selectedId);
      alert(`"${selected?.title}" başarıyla önerildi!`);
      setShow(false);
      setSelectedId('');
    } else {
      alert('Lütfen bir senaryo seçin.');
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => setShow(true)}>
        Senaryomu Öner
      </button>

      {show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl space-y-4">
            <h2 className="text-xl font-bold">📤 Uygun Senaryonu Seç</h2>

            {matches.length === 0 ? (
              <div className="space-y-3">
                <p className="text-[#7a5c36]">
                  Bu ilana uygun bir senaryon bulunmuyor.
                </p>
                <a
                  href="/dashboard/writer/scripts/new"
                  className="btn btn-warning"
                >
                  Yeni Senaryo Ekle
                </a>
              </div>
            ) : (
              <>
                {/* Radyo butonlu liste */}
                <ul className="space-y-3">
                  {matches.map((s) => (
                    <li key={s.id}>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="script"
                          value={s.id}
                          checked={selectedId === s.id}
                          onChange={() => setSelectedId(s.id)}
                        />
                        {s.title}
                      </label>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2 justify-end pt-4">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShow(false)}
                  >
                    Vazgeç
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={!selectedId}
                  >
                    Gönder
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
