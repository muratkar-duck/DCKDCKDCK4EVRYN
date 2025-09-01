'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import AuthGuard from '@/components/AuthGuard';

type Request = {
  id: string;
  title: string;
  description: string;
  genre: string;
  length: string; // ✅ duration yerine length
  budget: string | null;
  created_at: string;
  user_id: string; // ilanı açan yapımcı
};

type Script = {
  id: string;
  title: string;
  genre: string;
  length: string; // ✅ duration yerine length
};

export default function WriterRequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [request, setRequest] = useState<Request | null>(null);
  const [scripts, setScripts] = useState<Script[]>([]);
  const [selectedScript, setSelectedScript] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRequest(id);
      fetchScripts();
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

  const fetchScripts = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('scripts')
      .select('id, title, genre, length')
      .eq('user_id', user.id);

    if (!error && data) {
      setScripts(data);
    }
  };

  const handleApply = async () => {
    if (!selectedScript || !request) {
      alert('Lütfen bir senaryo seçin.');
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('applications').insert([
      {
        request_id: request.id,
        script_id: selectedScript,
        user_id: user.id, // ✅ writer_id yerine user_id
        producer_id: request.user_id,
        status: 'pending',
      },
    ]);

    if (error) {
      alert('❌ Başvuru başarısız: ' + error.message);
    } else {
      alert('✅ Başvurunuz başarıyla gönderildi!');
      router.push('/dashboard/writer/suggestions');
    }
  };

  if (loading) {
    return (
      <AuthGuard allowedRoles={['writer']}>
        <p>Yükleniyor...</p>
      </AuthGuard>
    );
  }

  if (!request) {
    return (
      <AuthGuard allowedRoles={['writer']}>
        <p>İlan bulunamadı.</p>
      </AuthGuard>
    );
  }

  // ✅ İlanın türüyle eşleşen senaryolar
  const eligibleScripts = scripts.filter(
    (s) => s.genre.trim().toLowerCase() === request.genre.trim().toLowerCase()
  );

  return (
    <AuthGuard allowedRoles={['writer']}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{request.title}</h1>
        <p className="text-[#7a5c36]">{request.description}</p>
        <p className="text-sm text-gray-600">
          Tür: {request.genre} · Süre: {request.length}{' '}
          {request.budget && <>· Bütçe: {request.budget}</>}
        </p>
        <p className="text-xs text-gray-400">
          Yayınlanma: {new Date(request.created_at).toLocaleDateString()}
        </p>

        {/* Senaryo seçimi */}
        {eligibleScripts.length === 0 ? (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700 mb-2">
              Bu türe uygun bir senaryonuz yok. Başvuru yapmak için senaryo
              eklemelisiniz.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => router.push('/dashboard/writer/scripts/new')}
            >
              ✍️ Senaryo Ekle
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Başvurmak istediğiniz senaryoyu seçin:
            </label>
            <select
              className="p-2 border rounded-lg w-full"
              value={selectedScript}
              onChange={(e) => setSelectedScript(e.target.value)}
            >
              <option value="">-- Senaryo Seçin --</option>
              {eligibleScripts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.genre}, {s.length})
                </option>
              ))}
            </select>
            <button onClick={handleApply} className="btn btn-primary">
              📤 Başvur
            </button>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
