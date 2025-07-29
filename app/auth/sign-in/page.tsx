export default function SignInPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Giriş Yap</h1>
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

        <button type="submit" className="btn btn-primary w-full">
          Giriş Yap
        </button>
      </form>

      <div className="text-right text-sm">
        <a
          href="/auth/reset-password"
          className="text-[#0e5b4a] hover:underline"
        >
          Şifremi unuttum
        </a>
      </div>
    </div>
  );
}
