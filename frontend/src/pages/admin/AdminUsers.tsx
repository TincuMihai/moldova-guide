import { useState, useMemo, useCallback } from 'react';
import { mockUsers } from '../../data';
import { ROLE_LABELS } from '../../constants';
import { ConfirmDialog, SvgIcon } from '../../components/common/UIComponents';

type MockUser = typeof mockUsers[0] & { blocked?: boolean };

export default function AdminUsers() {
  const [users, setUsers] = useState<MockUser[]>(mockUsers.map(u => ({ ...u, blocked: false })));
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [blockId, setBlockId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...users];
    if (roleFilter !== 'all') result = result.filter(u => u.role === roleFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    return result;
  }, [users, search, roleFilter]);

  const handleBlock = useCallback(() => {
    if (!blockId) return;
    setUsers(prev => prev.map(u => u.id === blockId ? { ...u, blocked: !u.blocked } : u));
    setBlockId(null);
  }, [blockId]);

  const blockingUser = users.find(u => u.id === blockId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Gestionare utilizatori</h1>
        <p className="text-sm text-slate-500 mt-1">{users.length} utilizatori înregistrați</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <SvgIcon d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" placeholder="Caută utilizatori..." />
        </div>
        <div className="flex gap-2">
          {['all', 'tourist', 'guide', 'admin'].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${roleFilter === r ? 'bg-brand-500 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
              {r === 'all' ? 'Toți' : ROLE_LABELS[r] || r}
            </button>
          ))}
        </div>
      </div>

      {/* Users table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Utilizator</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Email</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Rol</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Înregistrat</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-slate-500 px-5 py-3">Acțiuni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt="" className="w-9 h-9 rounded-xl object-cover" />
                      <span className="text-sm font-medium text-slate-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`badge border text-[10px] ${
                      u.role === 'admin' ? 'bg-red-50 text-red-600 border-red-200' :
                      u.role === 'guide' ? 'bg-sky-50 text-sky-600 border-sky-200' :
                      'bg-emerald-50 text-emerald-600 border-emerald-200'
                    }`}>{ROLE_LABELS[u.role]}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{u.joinedDate}</td>
                  <td className="px-5 py-3.5">
                    <span className={`badge border text-[10px] ${u.blocked ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                      {u.blocked ? '🔒 Blocat' : '✓ Activ'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => setBlockId(u.id)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${u.blocked ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' : 'text-red-500 bg-red-50 hover:bg-red-100'}`}>
                      {u.blocked ? 'Deblochează' : 'Blochează'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-slate-400">Niciun utilizator găsit</p>
          </div>
        )}
      </div>

      <ConfirmDialog isOpen={!!blockId} onClose={() => setBlockId(null)} onConfirm={handleBlock}
        title={blockingUser?.blocked ? 'Deblochează utilizatorul' : 'Blochează utilizatorul'}
        message={blockingUser?.blocked
          ? `Ești sigur că vrei să deblochezi ${blockingUser?.name}?`
          : `Ești sigur că vrei să blochezi ${blockingUser?.name}? Nu va mai putea accesa platforma.`}
        confirmText={blockingUser?.blocked ? 'Deblochează' : 'Blochează'}
        variant={blockingUser?.blocked ? 'warning' : 'danger'} />
    </div>
  );
}
