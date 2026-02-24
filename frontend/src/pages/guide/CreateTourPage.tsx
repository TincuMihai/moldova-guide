import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { tourService } from '../../services';
import { guides } from '../../data';
import type { TourTheme, TourStop } from '../../types';
import { THEME_OPTIONS, DIFFICULTY_LABELS } from '../../constants';
import { SvgIcon } from '../../components/common/UIComponents';

type Step = 1 | 2 | 3 | 4;

export default function CreateTourPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [theme, setTheme] = useState<TourTheme>('cultural');
  const [difficulty, setDifficulty] = useState<'easy' | 'moderate' | 'challenging'>('easy');
  const [languages, setLanguages] = useState<string[]>(['Română']);

  const [stops, setStops] = useState<TourStop[]>([]);
  const [newStopName, setNewStopName] = useState('');
  const [newStopDesc, setNewStopDesc] = useState('');
  const [newStopDur, setNewStopDur] = useState('30 min');

  const [price, setPrice] = useState(25);
  const [maxPart, setMaxPart] = useState(10);
  const [duration, setDuration] = useState('3 ore');
  const [meetingPoint, setMeetingPoint] = useState('');
  const [included, setIncluded] = useState('Ghid profesionist\nApă');
  const [excluded, setExcluded] = useState('Transport\nMasă');
  const [dates, setDates] = useState('');

  const images = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop',
  ];

  const validateStep = useCallback((s: Step): boolean => {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!title.trim()) errs.title = 'Obligatoriu';
      if (!description.trim()) errs.description = 'Obligatoriu';
      if (!shortDesc.trim()) errs.shortDesc = 'Obligatoriu';
    } else if (s === 2 && stops.length === 0) {
      errs.stops = 'Adaugă cel puțin o oprire';
    } else if (s === 3) {
      if (price <= 0) errs.price = 'Prețul trebuie pozitiv';
      if (!meetingPoint.trim()) errs.meetingPoint = 'Obligatoriu';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [title, description, shortDesc, stops, price, meetingPoint]);

  const nextStep = () => { if (validateStep(step)) setStep(Math.min(step + 1, 4) as Step); };
  const prevStep = () => setStep(Math.max(step - 1, 1) as Step);

  const addStop = () => {
    if (!newStopName.trim()) return;
    setStops([...stops, {
      id: `s${Date.now()}`, name: newStopName, description: newStopDesc,
      duration: newStopDur, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
    }]);
    setNewStopName(''); setNewStopDesc(''); setNewStopDur('30 min');
  };

  const toggleLang = (l: string) => setLanguages((p) => p.includes(l) ? p.filter((x) => x !== l) : [...p, l]);

  const handleSubmit = useCallback(async () => {
    if (!user) return;
    setIsSaving(true);
    const guide = guides.find((g) => g.name === user.name) || guides[0];
    try {
      await tourService.create({
        title, description, shortDescription: shortDesc, images, guide,
        duration, price, currency: 'EUR', maxParticipants: maxPart, currentParticipants: 0,
        language: languages, theme, difficulty, meetingPoint,
        included: included.split('\n').filter(Boolean),
        excluded: excluded.split('\n').filter(Boolean),
        stops, availableDates: dates.split(',').map((d) => d.trim()).filter(Boolean),
        isFeatured: true, isActive: true,
      });
      navigate('/guide/my-tours');
    } catch { setErrors({ general: 'Eroare la salvare' }); }
    finally { setIsSaving(false); }
  }, [title, description, shortDesc, images, duration, price, maxPart, languages, theme, difficulty, meetingPoint, included, excluded, stops, dates, user, navigate]);

  const stepLabels = ['Informații', 'Traseu', 'Preț & detalii', 'Publicare'];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-slate-900">Creează un tur nou</h1>

      {/* Progress stepper */}
      <div className="flex items-center gap-2">
        {stepLabels.map((label, i) => (
          <div key={i} className="flex-1">
            <div className={`h-2 rounded-full mb-2 transition-all duration-500 ${i + 1 <= step ? 'bg-brand-500' : 'bg-slate-200'}`} />
            <p className={`text-xs font-medium ${i + 1 <= step ? 'text-brand-600' : 'text-slate-400'}`}>{label}</p>
          </div>
        ))}
      </div>

      {errors.general && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">{errors.general}</div>
      )}

      <div className="card p-6">
        {/* Step 1: Basic info */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Titlu tur</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)}
                className={`input-field ${errors.title ? 'border-red-300' : ''}`} placeholder="Ex: Chișinău: Istoria Ascunsă" />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Descriere scurtă</label>
              <input value={shortDesc} onChange={(e) => setShortDesc(e.target.value)}
                className={`input-field ${errors.shortDesc ? 'border-red-300' : ''}`} placeholder="O propoziție despre tur" />
              {errors.shortDesc && <p className="text-xs text-red-500 mt-1">{errors.shortDesc}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Descriere completă</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                className={`input-field min-h-[100px] resize-none ${errors.description ? 'border-red-300' : ''}`} />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Temă</label>
              <div className="flex flex-wrap gap-2">
                {THEME_OPTIONS.filter((t) => t.value !== 'all').map((t) => (
                  <button key={t.value} type="button" onClick={() => setTheme(t.value as TourTheme)}
                    className={`px-3 py-2 rounded-xl text-sm transition-all ${theme === t.value ? 'bg-brand-500 text-white shadow-md' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'}`}>
                    {t.emoji} {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Dificultate</label>
              <div className="flex gap-2">
                {(Object.entries(DIFFICULTY_LABELS) as [string, string][]).map(([v, l]) => (
                  <button key={v} type="button" onClick={() => setDifficulty(v as 'easy')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${difficulty === v ? 'bg-brand-500 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Limbi</label>
              <div className="flex flex-wrap gap-2">
                {['Română', 'English', 'Français', 'Русский'].map((lang) => (
                  <button key={lang} type="button" onClick={() => toggleLang(lang)}
                    className={`px-3 py-2 rounded-xl text-sm transition-all ${languages.includes(lang) ? 'bg-brand-500 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Stops */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-display font-bold text-slate-800">Opriri pe traseu</h3>
            {errors.stops && <p className="text-sm text-red-500">{errors.stops}</p>}
            {stops.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-7 h-7 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.duration} — {s.description || 'Fără descriere'}</p>
                </div>
                <button onClick={() => setStops(stops.filter((_, j) => j !== i))} className="text-slate-400 hover:text-red-500 transition-colors">
                  <SvgIcon d="M6 18 18 6M6 6l12 12" className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="p-4 rounded-xl border-2 border-dashed border-slate-200">
              <div className="grid sm:grid-cols-3 gap-3 mb-3">
                <input value={newStopName} onChange={(e) => setNewStopName(e.target.value)} className="input-field text-sm" placeholder="Nume oprire" />
                <input value={newStopDesc} onChange={(e) => setNewStopDesc(e.target.value)} className="input-field text-sm" placeholder="Descriere scurtă" />
                <input value={newStopDur} onChange={(e) => setNewStopDur(e.target.value)} className="input-field text-sm" placeholder="Durată (ex: 30 min)" />
              </div>
              <button onClick={addStop} disabled={!newStopName.trim()} className="btn-secondary text-sm disabled:opacity-50">
                <SvgIcon d="M12 4.5v15m7.5-7.5h-15" className="w-4 h-4" /> Adaugă oprire
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Pricing */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Preț (EUR)</label>
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))}
                  className={`input-field ${errors.price ? 'border-red-300' : ''}`} />
                {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Max participanți</label>
                <input type="number" value={maxPart} onChange={(e) => setMaxPart(Number(e.target.value))} className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Durată totală</label>
                <input value={duration} onChange={(e) => setDuration(e.target.value)} className="input-field" placeholder="Ex: 4 ore" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Punct de întâlnire</label>
              <input value={meetingPoint} onChange={(e) => setMeetingPoint(e.target.value)}
                className={`input-field ${errors.meetingPoint ? 'border-red-300' : ''}`} placeholder="Ex: Arcul de Triumf" />
              {errors.meetingPoint && <p className="text-xs text-red-500 mt-1">{errors.meetingPoint}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Inclus (câte unul pe linie)</label>
                <textarea value={included} onChange={(e) => setIncluded(e.target.value)} className="input-field min-h-[80px] resize-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nu este inclus</label>
                <textarea value={excluded} onChange={(e) => setExcluded(e.target.value)} className="input-field min-h-[80px] resize-none text-sm" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Publish */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Date disponibile (separate prin virgulă)</label>
              <input value={dates} onChange={(e) => setDates(e.target.value)} className="input-field"
                placeholder="2026-03-15, 2026-03-22, 2026-03-29" />
              <p className="text-xs text-slate-400 mt-1">Format: AAAA-LL-ZZ</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Fotografii (demo)</label>
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <img key={i} src={img} alt="" className="w-28 h-20 rounded-xl object-cover ring-2 ring-brand-200" />
                ))}
                <div className="w-28 h-20 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400">
                  <SvgIcon d="M12 4.5v15m7.5-7.5h-15" className="w-5 h-5" />
                </div>
              </div>
            </div>
            {/* Summary */}
            <div className="p-5 rounded-xl bg-brand-50 border border-brand-100">
              <h4 className="font-semibold text-sm text-brand-700 mb-3">Rezumat</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-brand-600/80">
                <p><span className="text-brand-700 font-medium">Titlu:</span> {title}</p>
                <p><span className="text-brand-700 font-medium">Preț:</span> {price} EUR</p>
                <p><span className="text-brand-700 font-medium">Durată:</span> {duration}</p>
                <p><span className="text-brand-700 font-medium">Opriri:</span> {stops.length}</p>
                <p><span className="text-brand-700 font-medium">Max:</span> {maxPart} pers.</p>
                <p><span className="text-brand-700 font-medium">Limbi:</span> {languages.join(', ')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-100">
          {step > 1 ? (
            <button onClick={prevStep} className="btn-secondary text-sm">← Înapoi</button>
          ) : <div />}
          {step < 4 ? (
            <button onClick={nextStep} className="btn-primary text-sm">Continuă →</button>
          ) : (
            <button onClick={handleSubmit} disabled={isSaving} className="btn-primary text-sm disabled:opacity-50">
              {isSaving ? 'Se publică...' : '🚀 Publică turul'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
