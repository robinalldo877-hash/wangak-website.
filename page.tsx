import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function MemberPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: sessions }, { data: songs }] = await Promise.all([
    supabase.from("profiles").select("display_name, role").eq("id", user.id).maybeSingle(),
    supabase.from("practice_sessions").select("id, title, starts_at, location, notes").order("starts_at", { ascending: true }).limit(10),
    supabase.from("songs").select("id, title, status, progress_percent, notes").order("title")
  ]);

  return (
    <>
      <header className="wrap topbar">
        <a className="brand" href="/">WAN<span>GAK</span></a>
        <form action="/auth/signout" method="post"><button className="pill" type="submit">Keluar</button></form>
      </header>
      <main className="wrap" style={{ paddingTop: 36 }}>
        <div className="eyebrow">Dashboard privat</div>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>Halo, {profile?.display_name ?? "anggota WANGAK"}</h1>
        <p className="muted">Area ini hanya dapat diakses setelah login. Zona waktu tampilan mengikuti pengaturan browser.</p>
        {profile?.role === "admin" && <p><Link className="button" href="/admin">Buka panel admin</Link></p>}
        <section className="cards">
          <article className="card">
            <h2>Jadwal latihan</h2>
            {!sessions?.length && <p className="muted">Belum ada jadwal yang dimasukkan admin.</p>}
            {sessions?.map(session => <div key={session.id} style={{ borderTop: "1px solid #303036", padding: "12px 0" }}>
              <strong>{session.title}</strong>
              <p className="muted">{new Date(session.starts_at).toLocaleString("id-ID")}<br />{session.location || "Lokasi belum ditentukan"}</p>
              {session.notes && <p className="muted">{session.notes}</p>}
            </div>)}
          </article>
          <article className="card">
            <h2>Progres lagu</h2>
            {!songs?.length && <p className="muted">Belum ada lagu yang dimasukkan admin.</p>}
            {songs?.map(song => <div key={song.id} style={{ borderTop: "1px solid #303036", padding: "12px 0" }}>
              <strong>{song.title}</strong>
              <p className="muted">{song.status} · {song.progress_percent}%</p>
              {song.notes && <p className="muted">{song.notes}</p>}
              <div style={{ height: 6, background: "#303036", borderRadius: 99 }}>
                <div style={{ height: 6, width: `${song.progress_percent}%`, background: "#ef4444", borderRadius: 99 }} />
              </div>
            </div>)}
          </article>
        </section>
      </main>
    </>
  );
}
