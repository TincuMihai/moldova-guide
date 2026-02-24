import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { tripService } from '../../services';
import { attractions } from '../../data';
import type { TripItem, TripDay } from '../../types';

export default function TripPlannerPage() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState<TripDay[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [addDay, setAddDay] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const generateDays = useCallback(() => {
    if (!startDate || !endDate) return;
    const s = new Date(startDate), e = new Date(endDate), d: TripDay[] = [], c = new Date(s);
    while (c <= e) { d.push({ date: c.toISOString().split('T')[0], items: [] }); c.setDate(c.getDate() + 1); }
    setDays(d);
  }, [startDate, endDate]);

  const addItem = useCallback((di: number, aid: string) => {
    const a = attractions.find((x) => x.id === aid); if (!a) return;
    const item: TripItem = { id: 'ti' + Date.now(), attractionId: a.id, name: a.name, image: a.images[0], time: '10:00', duration: '1.5h' };
    setDays((p) => p.map((d, i) => i === di ? { ...d, items: [...d.items, item] } : d));
    setAddDay(null); setSearch('');
  }, []);

  const removeItem = useCallback((di: number, iid: string) => { setDays((p) => p.map((d, i) => i === di ? { ...d, items: d.items.filter((x) => x.id !== iid) } : d)); }, []);

  const moveItem = useCallback((di: number, ii: number, dir: 'up' | 'down') => {
    setDays((p) => p.map((d, i) => { if (i !== di) return d; const items = [...d.items]; const ni = dir === 'up' ? ii - 1 : ii + 1; if (ni < 0 || ni >= items.length) return d; [items[ii], items[ni]] = [items[ni], items[ii]]; return { ...d, items }; }));
  }, []);

  const handleSave = useCallback(async () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = 'Titlul este obligatoriu';
    if (!startDate) e.startDate = 'Selecteaza data';
    if (!endDate) e.endDate = 'Selecteaza data';
    setErrors(e); if (Object.keys(e).length > 0 || !user) return;
    setSaving(true);
    try { await tripService.create({ title, userId: user.id, startDate, endDate, days, isPublic }); nav('/dashboard/trips'); }
    catch { setErrors({ general: 'Eroare la salvare' }); } finally { setSaving(false); }
  }, [title, startDate, endDate, days, isPublic, user, nav]);

  const filtered = search.trim() ? attractions.filter((a) => a.name.toLowerCase().includes(search.toLowerCase())) : attractions;

  return (
    <div className="pb-16 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-2xl font-bold text-slate-900 mb-6">Planifica o calatorie</h1>
        <div className="card p-6 mb-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="sm:col-span-2"><label className="block text-xs font-semibold text-slate-600 mb-1.5">Titlu</label><input value={title} onChange={(e) => setTitle(e.target.value)} className={`input-field ${errors.title ? 'border-red-300' : ''}`} placeholder="Ex: Weekend la Chisinau" />{errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}</div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Data inceput</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input-field" /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Data sfarsit</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input-field" /></div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer"><input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-brand-500" />Calatorie publica</label>
            <button onClick={generateDays} disabled={!startDate || !endDate} className="btn-secondary text-sm disabled:opacity-50">Genereaza zilele</button>
          </div>
        </div>

        {days.length > 0 ? <div className="space-y-6">
          {days.map((day, di) => (
            <div key={day.date} className="card p-6">
              <div className="flex items-center justify-between mb-4"><h3 className="font-display font-bold text-slate-800">Ziua {di + 1} <span className="text-sm font-normal text-slate-400 ml-2">{day.date}</span></h3><button onClick={() => setAddDay(addDay === di ? null : di)} className="btn-secondary text-xs">+ Adauga loc</button></div>
              {addDay === di && <div className="mb-4 p-4 rounded-xl bg-slate-50 border border-slate-200"><input value={search} onChange={(e) => setSearch(e.target.value)} className="input-field mb-3 text-sm" placeholder="Cauta atractii..." /><div className="max-h-48 overflow-y-auto space-y-1">{filtered.map((a) => (<button key={a.id} onClick={() => addItem(di, a.id)} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors text-left"><img src={a.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" /><div><p className="text-sm font-medium text-slate-700">{a.name}</p><p className="text-xs text-slate-400">{a.city}</p></div></button>))}</div></div>}
              {day.items.length > 0 ? <div className="space-y-2">{day.items.map((item, ii) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group">
                  <div className="flex flex-col gap-0.5"><button onClick={() => moveItem(di, ii, 'up')} disabled={ii === 0} className="p-0.5 rounded hover:bg-slate-200 text-slate-400 disabled:opacity-30"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /></svg></button><button onClick={() => moveItem(di, ii, 'down')} disabled={ii === day.items.length - 1} className="p-0.5 rounded hover:bg-slate-200 text-slate-400 disabled:opacity-30"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg></button></div>
                  <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover" /><div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-700 truncate">{item.name}</p><p className="text-xs text-slate-400">Durata: {item.duration}</p></div>
                  <button onClick={() => removeItem(di, item.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              ))}</div> : <p className="text-center text-sm text-slate-400 py-6">Niciun loc adaugat. Apasa „+ Adauga loc".</p>}
            </div>
          ))}
          <div className="flex items-center justify-end gap-3"><button onClick={() => nav('/dashboard/trips')} className="btn-secondary">Anuleaza</button><button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-50">{saving ? 'Se salveaza...' : 'Salveaza calatoria'}</button></div>
        </div> : <div className="card p-12 text-center"><p className="text-slate-500 mb-2">Completeaza datele de mai sus si apasa „Genereaza zilele"</p></div>}
      </div>
    </div>
  );
}