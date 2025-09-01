'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import AuthGuard from '@/components/AuthGuard';

type Request = {
  id: string;
  title: string;
  description: string;
  genre: string;
  length: string;
  budget: string | null;
  created_at: string;
  user_id: string; // ilanı açan yapımcı
};

type Application = {
  id: string;
  status: string;
  script: {
    id: string;
    title: string;
    genre: string;
    length: string;
  };
  writer: {
    id: string;
    username: string;
  };
};

export default function ProducerRequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<Request | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRequest(id);
      fetchApplications(id);
    }
  }, [id]);

  const fetchRequest = async (requestId: string) => {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (!error && data) {
      setRequest(data);
    }
    setLoading(false);
  };

  const fetchApplications = async (requestId: string) => {
    const { data, error } = await supabase
      .from('applications')
      .select(
        `
        id,
        status,
        script:scripts ( id, title, genre, length ),
        writer:users ( id, username )
      `
      )
      .eq('request_id', requestId);

    if (!error && data) {
      setApplications(data);
    }
  };

  const handleDecision = async (
    applicationId: string,
    decision: 'accepted' | 'rejected'
  ) => {
    const { error } = await supabase
      .from('applications')
      .update({ status: decision })
      .eq('id', applicationId);

    if (error) {
      alert('❌ Güncelleme hatası: ' + error.message);
    } else {
      // Güncellenen başvuruyu state içinde yenile
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: decision } : app
        )
      );
    }
  };

  if (loading) {
    return (
      <AuthGuard allowedRoles={['producer']}>
        <p>Yükleniyor...</p>
      </AuthGuard>
    );
  }

  if (!request) {
    return (
      <AuthGuard allowedRoles={['producer']}>
        <p>İlan bulunamadı.</p>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard allowedRoles={['producer']}>
      <div className="space-y-6">
        {/* İlan detayları */}
        <h1 className="text-2xl font-bold">{request.title}</h1>
        <p className="text-[#7a5c36]">{request.description}</p>
        <p className="text-sm text-gray-600">
          Tür: {request.genre} · Süre: {request.length}{' '}
          {request.budget && <>· Bütçe: {request.budget}</>}
        </p>
        <p className="text-xs text-gray-400">
          Yayınlanma: {new Date(request.created_at).toLocaleDateString()}
        </p>

        {/* Başvurular listesi */}
        <h2 className="text-xl font-semibold mt-6">📩 Gelen Başvurular</h2>
        {applications.length === 0 ? (
          <p className="text-gray-600">Henüz başvuru yapılmamış.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{app.script.title}</p>
                  <p className="text-sm text-gray-600">
                    Yazar: {app.writer?.username || 'Bilinmiyor'} · Tür:{' '}
                    {app.script.genre} · Süre: {app.script.length}
                  </p>
                  <p className="text-xs text-gray-400">Durum: {app.status}</p>
                </div>
                {app.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDecision(app.id, 'accepted')}
                      className="btn btn-success"
                    >
                      ✅ Kabul Et
                    </button>
                    <button
                      onClick={() => handleDecision(app.id, 'rejected')}
                      className="btn btn-danger"
                    >
                      ❌ Reddet
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
