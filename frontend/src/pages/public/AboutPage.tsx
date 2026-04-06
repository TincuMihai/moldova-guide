import { Link } from 'react-router-dom';
import { STATS_PLATFORM } from '../../constants';

export default function AboutPage() {
  const team = [
    { name: 'Ion Ceban', role: 'Fondator & CEO', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', bio: 'Pasionat de turism și tehnologie, a creat MoldovaGuide pentru a promova frumusețile Moldovei.' },
    { name: 'Ana Rotaru', role: 'Director Marketing', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', bio: 'Cu 10 ani de experiență în marketing digital, Ana conectează turiștii cu experiențe autentice.' },
    { name: 'Mihai Lungu', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face', bio: 'Inginer software cu pasiune pentru aplicații care fac diferența în comunitate.' },
  ];

  const values = [
    { icon: '🌍', title: 'Autenticitate', desc: 'Promovăm experiențe reale, create de localnici care își cunosc și iubesc țara.' },
    { icon: '🤝', title: 'Comunitate', desc: 'Conectăm turiști, ghizi și antreprenori locali într-un ecosistem de colaborare.' },
    { icon: '💚', title: 'Sustenabilitate', desc: 'Încurajăm turismul responsabil care protejează patrimoniul cultural și natural.' },
    { icon: '🚀', title: 'Inovație', desc: 'Folosim tehnologie modernă pentru a face descoperirea Moldovei simplă și plăcută.' },
  ];

  return (
    <div className="pb-16 page-shell">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-700" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">Despre MoldovaGuide</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">Misiunea noastră: să facem din Moldova o destinație turistică de top, promovând cultura, natura și ospitalitatea unică a acestui loc.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 -mt-8 relative z-10 mb-16">
          {[
            { value: STATS_PLATFORM.totalAttractions + '+', label: 'Atracții listate' },
            { value: STATS_PLATFORM.totalTours + '+', label: 'Tururi disponibile' },
            { value: STATS_PLATFORM.totalGuides + '+', label: 'Ghizi verificați' },
            { value: (STATS_PLATFORM.happyTravelers / 1000).toFixed(1) + 'K', label: 'Călători fericiți' },
          ].map(s => (
            <div key={s.label} className="card-elevated p-6 text-center">
              <p className="font-display text-3xl font-bold text-brand-600">{s.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">Povestea noastră</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">MoldovaGuide s-a născut din dorința de a arăta lumii că Moldova este mult mai mult decât o țară mică pe hartă. Este un loc cu o istorie fascinantă, vinuri excepționale, natură spectaculoasă și oameni incredibil de ospitalieri.</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">Am început în 2024 ca o platformă simplă cu câteva atracții din Chișinău. Astăzi, acoperim {STATS_PLATFORM.citiesCovered} localități și colaborăm cu zeci de ghizi locali pasionați.</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Visul nostru? Ca fiecare turist care vizitează Moldova să plece cu amintiri de neuitat și dorința de a reveni.</p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop" alt="Moldova landscape" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">Valorile noastre</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="card p-6 text-center">
                <span className="text-3xl block mb-3">{v.icon}</span>
                <h3 className="font-display font-bold text-slate-800 dark:text-slate-200 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">Echipa</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(t => (
              <div key={t.name} className="card p-6 text-center">
                <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 ring-2 ring-brand-100" />
                <h3 className="font-display font-bold text-slate-800 dark:text-slate-200">{t.name}</h3>
                <p className="text-xs text-brand-500 font-semibold mt-0.5 mb-3">{t.role}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h2 className="page-title mb-3">Devino parte din comunitate</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-lg mx-auto">Fie că ești turist sau ghid local, MoldovaGuide are ceva pentru tine.</p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/login" className="btn-primary">Creează cont</Link>
            <Link to="/explore" className="btn-secondary">Explorează</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
