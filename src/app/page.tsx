import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="bg-black text-white">

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <span className="text-orange-500 text-sm font-bold tracking-widest mb-4">
          ⚡ PROFESIONALNA AUTOMATIZACIJA
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Door & Gate <span className="text-orange-500">Sistem</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mb-10">
          Motori za kapije • Garažna vrata • Interfoni • Smart home
          <br />Montaža u roku od 48h širom Vojvodine
        </p>
        <div className="flex gap-4">
          <Link href="/shop"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg transition">
            🛒 Pogledaj shop
          </Link>
          <Link href="/kontakt"
            className="border border-white hover:bg-white hover:text-black text-white font-bold px-8 py-4 rounded-lg transition">
            📞 Kontakt
          </Link>
        </div>
      </section>

      {/* USLUGE */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Naše <span className="text-orange-500">usluge</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '🚪', title: 'Klizne kapije', desc: 'Automatizacija kliznih kapija za kuće i firme.' },
            { icon: '🏠', title: 'Garažna vrata', desc: 'Sekcijska i roletna garažna vrata sa motorom.' },
            { icon: '📱', title: 'Smart Home', desc: 'Upravljanje putem telefona, daljinskog ili koda.' },
          ].map((item) => (
            <div key={item.title} className="bg-gray-900 rounded-xl p-8 hover:border hover:border-orange-500 transition">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 py-16 text-center px-6">
        <h2 className="text-3xl font-bold text-black mb-4">Spreman za automatizaciju?</h2>
        <p className="text-black mb-8">Besplatna procena i montaža u roku od 48h.</p>
        <Link href="/kontakt"
          className="bg-black text-white font-bold px-10 py-4 rounded-lg hover:bg-gray-900 transition">
          Kontaktiraj nas
        </Link>
      </section>

    </main>
  );
}
