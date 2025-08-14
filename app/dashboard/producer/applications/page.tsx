'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import { supabase } from '@/lib/supabaseClient';

type Application = {
  id: string;
  status: string;
  created_at: string;
  script: {
    title: string;
    duration: string;
    genre: string;
    user: {
      username: string;
    } | null;
  } | null;
  request: {
    title: string;
  } | null;
};

export default function ProducerApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [producerId, setProducerId] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.error('Kullanıcı bulunamadı');
      setLoading(false);
      return;
    }

    setProducerId(user.id);

    const { data, error } = await supabase
      .from('applications')
      .select(
        `
        id,
        status,
        created_at,
        script:scripts (
          title,
          duration,
          genre,
          user:users ( username )
        ),
        request:requests ( title ),
        producer_id
      `
      )
      .eq('producer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Başvurular alınamadı:', error.message);
      setApplications([]);
    } else {
      console.log('Çekilen başvurular:', data);
      setApplications(data || []);
    }

    setLoading(false);
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
        <h1 className="text-2xl font-bold">📩 İlanlarınıza Gelen Başvurular</h1>
        <p className="text-[#7a5c36]">
          İlanlarınıza gönderilen senaryo başvuruları burada listelenir.
        </p>

        {loading ? (
          <p className="text-sm text-[#a38d6d]">Yükleniyor...</p>
        ) : applications.length === 0 ? (
          <p className="text-sm text-[#a38d6d]">
            Henüz ilanınıza gelen başvuru yok.
          </p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="card">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-lg font-semibold">
                      🎬 Senaryo:{' '}
                      <span className="text-[#0e5b4a]">
                        {app.script?.title || 'Senaryo bilgisi bulunamadı'}
                      </span>
                    </h2>
                    <p className="text-sm text-[#7a5c36]">
                      Tür: {app.script?.genre || 'Bilinmiyor'} · Süre:{' '}
                      {app.script?.duration || 'Bilinmiyor'}
                    </p>
                    <p className="text-sm text-[#7a5c36]">
                      Senarist:{' '}
                      {app.script?.user?.username || 'Bilinmeyen Senarist'}
                    </p>
                    <p className="text-sm text-[#7a5c36]">
                      İlan: {app.request?.title || 'Bilinmiyor'}
                    </p>
                  </div>
                  {getBadge(app.status)}
                </div>

                <div className="mt-3 flex gap-2">
                  <button className="btn btn-secondary">Mesaj Gönder</button>
                  <button className="btn btn-primary">Detayları Gör</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
