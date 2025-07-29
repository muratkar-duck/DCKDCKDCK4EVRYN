export default function GölgeOyunuPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#0e5b4a]">🎬 Gölge Oyunu</h1>
      <p className="text-sm text-[#7a5c36]">
        Tür: Gerilim / Psikolojik &middot; Süre: Uzun Metraj &middot; Yazar:{' '}
        <strong>mehmet_kaya</strong>
      </p>

      <div className="bg-white rounded-xl shadow p-6 space-y-4 border-l-4 border-[#f9c74f]">
        <h2 className="text-lg font-semibold">Özet</h2>
        <p className="text-[#4a3d2f]">
          Karanlık bir apartman bloğunda geçen psikolojik gerilim. Gerçeklik ile
          hayal arasında sıkışan bir güvenlik görevlisinin hikayesi.
        </p>

        <h2 className="text-lg font-semibold pt-4">Senaryo Hakkında</h2>
        <p className="text-[#4a3d2f]">
          Gece vardiyasında çalışan bir güvenlik görevlisi, bina sakinlerinden
          birinin artık yaşamadığını fark eder ama herkes aksini iddia
          etmektedir. Görsel olarak ışık-gölge oyunları, yalnızlık teması ve
          artan paranoya işlenir.
        </p>

        <h2 className="text-lg font-semibold pt-4">Senarist Notu</h2>
        <p className="text-[#4a3d2f]">
          Bu hikayede seyirciyi baş karakterin zihnine hapsetmek istedim. Kamera
          kullanımı dar alanlarla sınırlı, ses tasarımı hikayeyi
          derinleştiriyor.
        </p>

        <div className="pt-6 flex gap-4">
          <button className="btn btn-primary">İlgilen</button>
          <button className="btn btn-secondary">Mesaj Gönder</button>
        </div>
      </div>
    </div>
  );
}
