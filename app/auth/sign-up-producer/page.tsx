export default function SignUpProducerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Yapımcı Olarak Kayıt Ol</h1>
      <form className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Şirket Adı</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            placeholder="Örn: FilmX Yapım Ltd. Şti."
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Vergi Numarası</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            placeholder="1234567890"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Yetkili Kişi Adı</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            placeholder="Ad Soyad"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">E-posta</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg"
            placeholder="ornek@firma.com"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Şifre</label>
          <input
            type="password"
            className="w-full p-3 border rounded-lg"
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Vergi Levhası (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            className="w-full p-3 border rounded-lg bg-white"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            İmza Sirküleri (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            className="w-full p-3 border rounded-lg bg-white"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
