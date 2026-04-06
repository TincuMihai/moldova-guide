import { useState, useEffect, useMemo, useCallback } from 'react';
import { ROLE_LABELS } from '../../constants';
import type { User, UserRole } from '../../types';
import { ConfirmDialog } from '../../components/common/UIComponents';

const USERS_KEY = 'moldovaguide_users';
function getStoredUsers(): (User & { password: string })[] {
  try { const s = localStorage.getItem(USERS_KEY); return s ? JSON.parse(s) : []; }
  catch { return []; }
}

type UserWithMeta = User & { password: string; blocked?: boolean };

export default function AdminUsers() {
  const [users, setUsers] = useState<UserWithMeta[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [blockingUser, setBlockingUser] = useState<UserWithMeta | null>(null);

  useEffect(() => { setUsers(getStoredUsers() as UserWithMeta[]); }, []);

  const filtered = useMemo(() => {
    let result = users;
    if (roleFilter !== 'all') result = result.filter(u => u.role === roleFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    return result;
  }, [users, search, roleFilter]);

  const handleBlock = useCallback(() => {
    if (!blockingUser) return;
    setUsers(prev => {
      const updated = prev.map(u => u.id === blockingUser.id ? { ...u, blocked: !u.blocked } : u);
      localStorage.setItem(USERS_KEY, JSON.stringify(updated));
      return updated;
    });
    setBlockingUser(null);
  }, [blockingUser]);

  const handleDeleteUser = useCallback((userId: string) => {
    setUsers(prev => {
      const updated = prev.filter(u => u.id !== userId);
      localStorage.setItem(USERS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const roleBg: Record<string, string> = { admin: 'bg-red-50 text-red-600 border-red-200', guide: 'bg-sky-50 text-sky-600 border-sky-200', tourist: 'bg-emerald-50 text-emerald-600 border-emerald-200' };
  const roleCounts = useMemo(() => ({
    all: users.length,
    tourist: users.filter(u => u.role === 'tourist').length,
    guide: users.filter(u => u.role === 'guide').length,
    admin: users.filter(u => u.role === 'admin').length,
  }), [users]);

  return (
    <div className="page-shell py-8 px-4 sm:px-6 lg:px-8"><div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Utilizatori</h1>
          <p className="page-subtitle">{users.length} utilizatori înregistrați</p>
        </div>
      </div>

      {/* Search + filter */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" placeholder="Caută după nume sau email..." />
          </div>
          <div className="flex gap-2">
            {(['all', 'tourist', 'guide', 'admin'] as const).map(r => (
              <button key={r} onClick={() => setRoleFilter(r)} className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${roleFilter === r ? 'bg-brand-500 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}`}>
                {r === 'all' ? 'Toți' : ROLE_LABELS[r]} ({roleCounts[r]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50">
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-5 py-3">Utilizator</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-5 py-3">Rol</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-5 py-3 hidden sm:table-cell">Data înregistrării</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-5 py-3 hidden md:table-cell">Status</th>
                <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-5 py-3">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${u.blocked ? 'opacity-60' : ''}`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt="" className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{u.name} {u.blocked && <span className="text-xs text-red-500 ml-1">🔒</span>}</p>
                        <p className="text-xs text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3"><span className={`badge border ${roleBg[u.role]}`}>{ROLE_LABELS[u.role]}</span></td>
                  <td className="px-5 py-3 hidden sm:table-cell"><span className="text-xs text-slate-500 dark:text-slate-400">{u.joinedDate || '—'}</span></td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className={`badge border ${u.blocked ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                      {u.blocked ? 'Blocat' : 'Activ'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {u.role !== 'admin' && (
                        <>
                          <button onClick={() => setBlockingUser(u)} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${u.blocked ? 'text-emerald-600 hover:bg-emerald-50' : 'text-amber-600 hover:bg-amber-50'}`}>
                            {u.blocked ? 'Deblochează' : 'Blochează'}
                          </button>
                          <button onClick={() => handleDeleteUser(u.id)} className="text-xs px-3 py-1.5 rounded-lg font-medium text-red-500 hover:bg-red-50 transition-colors">Șterge</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12"><p className="text-sm text-slate-400">Niciun utilizator găsit</p></div>}
      </div>
      <ConfirmDialog isOpen={!!blockingUser} onClose={() => setBlockingUser(null)} onConfirm={handleBlock}
        title={blockingUser?.blocked ? 'Deblochează utilizatorul' : 'Blochează utilizatorul'}
        message={blockingUser?.blocked ? `Deblochezi ${blockingUser.name}?` : `Blochezi ${blockingUser?.name}? Nu va mai putea accesa platforma.`}
        confirmText={blockingUser?.blocked ? 'Deblochează' : 'Blochează'}
        variant={blockingUser?.blocked ? 'warning' : 'danger'} />
    </div></div>
  );
}
