export const metadata = {
  title: 'ducktylo | Yapımcı Paneli',
  description: 'ducktylo yapımcı kontrol paneli',
};

export default function ProducerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex bg-[#faf3e0]">
      {/* Sol Menü */}
      <aside className="w-64 bg-[#0e5b4a] text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold lowercase tracking-wide">ducktylo</h2>
        <nav className="space-y-4 text-sm">
          <a href="/dashboard/producer" className="block hover:underline">
            🎛️ Panel
          </a>
          <a
            href="/dashboard/producer/browse"
            className="block hover:underline"
          >
            🔍 Senaryo Ara
          </a>
          <a
            href="/dashboard/producer/requests/new"
            className="block hover:underline"
          >
            ➕ Talep Oluştur
          </a>
          <a
            href="/dashboard/producer/applications"
            className="block hover:underline"
          >
            📩 Başvurularım
          </a>
          <a
            href="/dashboard/producer/billing"
            className="block hover:underline"
          >
            💳 Fatura / Plan
          </a>
        </nav>
      </aside>

      {/* İçerik */}
      <main className="flex-1 p-8">{children}</main>
    </section>
  );
}
