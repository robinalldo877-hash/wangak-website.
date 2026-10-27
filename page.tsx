import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <header className="wrap topbar">
        <div className="brand">WAN<span>GAK</span></div>
        <Link className="pill" href="/login">Login anggota</Link>
      </header>
      <main className="wrap">
        <section className="hero">
          <div className="eyebrow">Website resmi band</div>
          <h1>WANGAK<span style={{ color: "#ef4444" }}>.</span></h1>
          <p className="lead">
            Satu tempat untuk mengenal WANGAK dan mengatur perjalanan musik bersama.
            Jadwal latihan dan progres internal hanya tersedia bagi anggota yang masuk.
          </p>
          <div className="actions">
            <Link className="button" href="/login">Masuk sebagai anggota</Link>
            <a className="button secondary" href="#tentang">Tentang WANGAK</a>
          </div>
        </section>
        <section id="tentang" className="cards">
          <article className="card">
            <h3>🎸 Tentang WANGAK</h3>
            <p className="muted">Profil band akan dilengkapi dengan deskripsi, foto, genre, dan tautan media sosial.</p>
          </article>
          <article className="card">
            <h3>📅 Latihan terorganisir</h3>
            <p className="muted">Jadwal, lokasi, dan pengingat latihan tersedia di area anggota yang terlindungi.</p>
          </article>
          <article className="card">
            <h3>🔒 Area anggota</h3>
            <p className="muted">Jadwal dan progres lagu tidak ditampilkan di halaman publik.</p>
          </article>
        </section>
      </main>
      <footer><div className="wrap">© {new Date().getFullYear()} WANGAK. Profil publik · Area anggota privat.</div></footer>
    </>
  );
}
