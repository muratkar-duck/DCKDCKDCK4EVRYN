export default function ProducerApplicationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📩 Gönderdiğim Başvurular</h1>
      <p className="text-[#7a5c36]">
        Daha önce ilgilendiğiniz senaryolara yaptığınız başvurular burada
        listelenir.
      </p>

      {/* Başvuru Listesi */}
      <div className="space-y-4">
        {/* Başvuru 1 */}
        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg font-semibold">
                🎬 Senaryo: <span className="text-[#0e5b4a]">Kırık Saat</span>
              </h2>
              <p className="text-sm text-[#7a5c36]">Senarist: elif_arslan</p>
            </div>
            <span className="text-xs text-yellow-600">Statü: Beklemede</span>
          </div>
          <p className="text-sm text-[#4a3d2f]">
            Merhaba, projenize ilgi duyduk. Görüşmek isteriz.
          </p>
          <div className="mt-3">
            <button className="btn btn-secondary">Mesajı Gör</button>
          </div>
        </div>

        {/* Başvuru 2 */}
        <div className="card opacity-80">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg font-semibold">
                🎬 Senaryo: <span className="text-[#0e5b4a]">Gölge Oyunu</span>
              </h2>
              <p className="text-sm text-[#7a5c36]">Senarist: senaryo55</p>
            </div>
            <span className="text-xs text-green-600">Statü: Yanıtlandı</span>
          </div>
          <p className="text-sm text-[#4a3d2f]">
            Projeye dair detaylı bilgi talep ettik. Yanıtlandı.
          </p>
          <div className="mt-3">
            <button className="btn btn-secondary">Mesajı Gör</button>
          </div>
        </div>
      </div>
    </div>
  );
}
