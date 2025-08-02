export default function SignUpWriterPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Senarist Olarak Kayıt Ol</h1>
      <form className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">E-posta</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg"
            placeholder="ornek@eposta.com"
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
          <label className="block font-semibold mb-1">Ad Soyad</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            placeholder="Adınız Soyadınız"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Biyografi</label>
          <textarea
            className="w-full p-3 border rounded-lg"
            rows={3}
            placeholder="Kendinizden bahsedin"
          ></textarea>
        </div>
        <div>
          <label className="block font-semibold mb-1">
            Portfolyo (isteğe bağlı)
          </label>
          <input
            type="url"
            className="w-full p-3 border rounded-lg"
            placeholder="https://..."
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
