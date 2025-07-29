export default function KirikSaatPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#0e5b4a]">🎬 Kırık Saat</h1>
      <p className="text-sm text-[#7a5c36]">
        Tür: Dram / Gizem &middot; Süre: Kısa Film &middot; Yazar:{' '}
        <strong>elif_arslan</strong>
      </p>

      <div className="bg-white rounded-xl shadow p-6 space-y-4 border-l-4 border-[#f9c74f]">
        <h2 className="text-lg font-semibold">Özet</h2>
        <p className="text-[#4a3d2f]">
          Zamanda sıkışmış bir kadının geçmişle hesaplaşmasını konu alan
          etkileyici bir kısa film.
        </p>

        <h2 className="text-lg font-semibold pt-4">Senaryo Hakkında</h2>
        <p className="text-[#4a3d2f]">
          Ana karakter, eski bir saatçi dükkânında zamanda kırılmalar yaşamaya
          başlar. Her sahne, geçmişten bir kesitle bugünü çarpıştırır. Film,
          karakterin hem içsel yolculuğunu hem de dramatik finale giden
          adımlarını işler.
        </p>

        <h2 className="text-lg font-semibold pt-4">Senarist Notu</h2>
        <p className="text-[#4a3d2f]">
          Bu proje için görsel yönetmenlikte sade ve kontrast ışık kullanımını
          öneriyorum. Az diyaloglu, görsel anlatıma dayalı bir yapı planladım.
        </p>

        <div className="pt-6 flex gap-4">
          <button className="btn btn-primary">İlgilen</button>
          <button className="btn btn-secondary">Mesaj Gönder</button>
        </div>
      </div>
    </div>
  );
}
