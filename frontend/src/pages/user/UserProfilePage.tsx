import { useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS } from '../../constants';
import type { User } from '../../types';

export default function UserProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = useCallback(async () => {
    const e: Record<string, string> = {}; if (!name.trim()) e.name = 'Numele este obligatoriu';
    setErrors(e); if (Object.keys(e).length > 0) return;
    setSaving(true);
    try { await updateProfile({ name, phone, bio } as Partial<User>); setSaved(true); setEditing(false); setTimeout(() => setSaved(false), 3000); }
    catch { setErrors({ general: 'Eroare la salvare' }); } finally { setSaving(false); }
  }, [name, phone, bio, updateProfile]);

  const badges = [
    { icon: '🏆', name: 'Explorator', desc: '5+ atractii', earned: true },
    { icon: '✍️', name: 'Recenzent', desc: '3+ recenzii', earned: true },
    { icon: '🗺️', name: 'Planificator', desc: 'O calatorie', earned: true },
    { icon: '🍷', name: 'Degustator', desc: 'O crama', earned: false },
    { icon: '📸', name: 'Fotograf', desc: '10+ poze', earned: false },
  ];
  const stats = [{ label: 'Atractii vizitate', value: 12 }, { label: 'Tururi parcurse', value: 4 }, { label: 'Recenzii scrise', value: 7 }, { label: 'Locuri salvate', value: 15 }];

  if (!user) return null;

  return (
    <div className="pb-16 bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {saved && <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700">Profilul a fost salvat cu succes!</div>}
        <div className="card p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <img src={user.avatar} alt="" className="w-20 h-20 rounded-2xl object-cover ring-2 ring-brand-100" />
            <div className="flex-1"><h1 className="font-display text-xl font-bold text-slate-900">{user.name}</h1><p className="text-sm text-slate-500">{user.email}</p><span className="badge bg-brand-50 text-brand-600 border border-brand-200 mt-2">{ROLE_LABELS[user.role]}</span></div>
            <button onClick={() => setEditing(!editing)} className="btn-secondary text-sm">{editing ? 'Anuleaza' : 'Editeaza'}</button>
          </div>
          {editing ? (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Nume</label><input value={name} onChange={(e) => setName(e.target.value)} className={`input-field ${errors.name ? 'border-red-300' : ''}`} />{errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}</div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Telefon</label><input value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" placeholder="+373 ..." /></div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Despre mine</label><textarea value={bio} onChange={(e) => setBio(e.target.value)} className="input-field min-h-[80px] resize-none" /></div>
              <div className="flex justify-end gap-3"><button onClick={() => setEditing(false)} className="btn-secondary text-sm">Anuleaza</button><button onClick={handleSave} disabled={saving} className="btn-primary text-sm disabled:opacity-50">{saving ? 'Se salveaza...' : 'Salveaza'}</button></div>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-100 space-y-3 text-sm text-slate-600">
              {user.phone && <p><span className="text-slate-400">Telefon:</span> {user.phone}</p>}
              {user.bio && <p><span className="text-slate-400">Bio:</span> {user.bio}</p>}
              {user.languages && <p><span className="text-slate-400">Limbi:</span> {user.languages.join(', ')}</p>}
              <p><span className="text-slate-400">Membru din:</span> {user.joinedDate}</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">{stats.map((s) => (<div key={s.label} className="card p-4 text-center"><p className="font-display text-2xl font-bold text-slate-800">{s.value}</p><p className="text-xs text-slate-400 mt-0.5">{s.label}</p></div>))}</div>
        <div className="card p-6 mb-6"><h2 className="font-display font-bold text-base text-slate-900 mb-4">Insigne</h2><div className="grid grid-cols-3 sm:grid-cols-5 gap-4">{badges.map((b) => (<div key={b.name} className={`text-center p-3 rounded-xl ${b.earned ? 'bg-brand-50 border border-brand-100' : 'bg-slate-50 border border-slate-100 opacity-40'}`}><span className="text-2xl block mb-1">{b.icon}</span><p className="text-[10px] font-semibold text-slate-700">{b.name}</p></div>))}</div></div>
        <div className="card p-6 border-red-100"><h2 className="font-display font-bold text-base text-red-700 mb-3">Zona periculoasa</h2><button onClick={logout} className="btn-danger text-sm">Deconecteaza-te</button></div>
      </div>
    </div>
  );
}