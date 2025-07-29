export default function WriterScriptsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Senaryolarım</h1>
        <a href="/dashboard/writer/scripts/new" className="btn btn-primary">
          + Yeni Senaryo Ekle
        </a>
      </div>

      {/* Senaryo Listesi */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Örnek Kart 1 */}
        <div className="card space-y-2">
          <h2 className="text-lg font-semibold">Karanlık Geçmiş</h2>
          <p className="text-sm text-[#7a5c36]">Tür: Suç / Dram</p>
          <p className="text-sm text-[#7a5c36]">
            Durum: <span className="font-semibold text-green-600">Yayında</span>
          </p>
          <p className="text-xs text-[#a38d6d]">Yayın tarihi: 12 Temmuz 2025</p>
        </div>

        {/* Örnek Kart 2 */}
        <div className="card space-y-2">
          <h2 className="text-lg font-semibold">Kayıp Günlükler</h2>
          <p className="text-sm text-[#7a5c36]">Tür: Gizem</p>
          <p className="text-sm text-[#7a5c36]">
            Durum:{' '}
            <span className="font-semibold text-yellow-600">İncelemede</span>
          </p>
          <p className="text-xs text-[#a38d6d]">Yükleme: 8 Temmuz 2025</p>
        </div>

        {/* Örnek Kart 3 */}
        <div className="card space-y-2">
          <h2 className="text-lg font-semibold">Zamansız</h2>
          <p className="text-sm text-[#7a5c36]">Tür: Bilim Kurgu</p>
          <p className="text-sm text-[#7a5c36]">
            Durum:{' '}
            <span className="font-semibold text-red-600">Reddedildi</span>
          </p>
          <p className="text-xs text-[#a38d6d]">Yükleme: 1 Temmuz 2025</p>
        </div>
      </div>
    </div>
  );
}
