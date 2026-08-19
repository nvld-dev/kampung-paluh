export default function AdminDashboardPage() {
  const stats = [
    {
      label: "UMKM",
      value: "0",
      description: "Data pelaku usaha",
    },
    {
      label: "Produk",
      value: "0",
      description: "Produk lokal",
    },
    {
      label: "Kegiatan",
      value: "0",
      description: "Event kampung",
    },
    {
      label: "Berita",
      value: "0",
      description: "Cerita & berita",
    },
  ];

  return (
    <div className="p-6 lg:p-8">

      {/* Heading */}
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2e8066]">
          Dashboard
        </div>

        <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#17201d]">
          Ringkasan Kampung Paluh
        </h1>

        <p className="mt-2 max-w-[600px] text-[13px] leading-[1.7] text-[#7a8580]">
          Kelola dan pantau konten Portal Promosi Kampung
          Paluh dari satu tempat.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="
              rounded-2xl
              border
              border-[#e4ebe7]
              bg-white
              p-5
              shadow-[0_4px_20px_rgba(20,50,40,0.03)]
            "
          >
            <div className="text-[11px] font-medium text-[#7e8984]">
              {stat.label}
            </div>

            <div className="mt-3 text-[28px] font-semibold tracking-[-0.04em] text-[#075b43]">
              {stat.value}
            </div>

            <div className="mt-1 text-[10px] text-[#9aa39f]">
              {stat.description}
            </div>
          </div>
        ))}
      </div>

      {/* Welcome */}
      <div className="mt-6 rounded-2xl border border-[#dce9e2] bg-[#e9f1ed] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[13px] font-semibold text-[#174f3d]">
              CMS siap digunakan
            </div>

            <p className="mt-1 max-w-[650px] text-[11px] leading-[1.7] text-[#668077]">
              Mulai kelola profil Kampung Paluh, UMKM,
              produk lokal, kegiatan, fasilitas, dan berita.
            </p>
          </div>

          <a
            href="/admin/profil"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#003c2b]
              px-5
              py-3
              text-[11px]
              font-semibold
              text-white
              transition-colors
              hover:bg-[#075b43]
            "
          >
            Kelola Profil
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}