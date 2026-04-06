import { Link } from 'react-router-dom';

export default function TermsPage() {
  const sections = [
    { title: '1. Acceptarea termenilor', content: 'Prin accesarea și utilizarea platformei MoldovaGuide, acceptați acești termeni și condiții. Dacă nu sunteți de acord cu oricare dintre acești termeni, vă rugăm să nu utilizați platforma.' },
    { title: '2. Descrierea serviciului', content: 'MoldovaGuide este o platformă online care conectează turiștii cu ghizi locali și atracții turistice din Republica Moldova. Oferim informații despre locuri, tururi ghidate, posibilitatea de a face rezervări și de a planifica călătorii.' },
    { title: '3. Contul de utilizator', content: 'Pentru a accesa anumite funcționalități, trebuie să creați un cont. Sunteți responsabil pentru menținerea confidențialității datelor de autentificare și pentru toate activitățile care au loc în contul dumneavoastră.' },
    { title: '4. Rezervări și plăți', content: 'Rezervările sunt supuse disponibilității și confirmării ghidului turistic. Anularea gratuită este posibilă cu minimum 48 de ore înainte de data turului. Plățile sunt procesate securizat prin partenerii noștri de plată.' },
    { title: '5. Conținut generat de utilizatori', content: 'Recenziile, fotografiile și alte materiale publicate de utilizatori rămân proprietatea autorilor, dar ne acordați dreptul de a le afișa pe platformă. Ne rezervăm dreptul de a modera conținutul.' },
    { title: '6. Responsabilitate', content: 'MoldovaGuide acționează ca intermediar între turiști și ghizi. Nu suntem responsabili pentru calitatea tururilor individuale, dar lucrăm activ pentru a menține standarde ridicate prin sistemul de recenzii și verificare.' },
    { title: '7. Protecția datelor', content: 'Colectăm și procesăm datele personale în conformitate cu GDPR. Datele sunt utilizate exclusiv pentru funcționarea platformei și nu sunt partajate cu terți fără consimțământ.' },
    { title: '8. Modificări', content: 'Ne rezervăm dreptul de a modifica acești termeni. Utilizatorii vor fi notificați prin email sau notificare în platformă cu cel puțin 30 de zile înainte de intrarea în vigoare a modificărilor.' },
  ];

  return (
    <div className="pb-16 page-shell">
      <section className="py-16 bg-gradient-to-br from-slate-700 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-white mb-3">Termeni și condiții</h1>
          <p className="text-slate-300">Ultima actualizare: 1 ianuarie 2026</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {sections.map(s => (
            <div key={s.title}>
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-3">{s.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Ai întrebări despre acești termeni?</p>
          <Link to="/contact" className="btn-secondary text-sm">Contactează-ne</Link>
        </div>
      </div>
    </div>
  );
}
