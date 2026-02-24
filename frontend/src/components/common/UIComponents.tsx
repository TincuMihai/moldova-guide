import { useEffect, useCallback, type ReactNode } from 'react';
import { STATUS_STYLES, STATUS_LABELS } from '../../constants';

export function LoadingSpinner({ text = 'Se încarcă...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-10 h-10 border-[3px] border-brand-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );
}

export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
        {icon || <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>}
      </div>
      <h3 className="font-display font-semibold text-lg text-slate-700 mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-400 max-w-sm mx-auto mb-4">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center">
        <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
      </div>
      <h3 className="font-display font-semibold text-lg text-slate-700 mb-1">Eroare</h3>
      <p className="text-sm text-slate-400 max-w-sm mx-auto mb-4">{message}</p>
      {onRetry && <button onClick={onRetry} className="btn-primary text-sm">Încearcă din nou</button>}
    </div>
  );
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: { isOpen: boolean; onClose: () => void; title: string; children: ReactNode; size?: 'sm' | 'md' | 'lg' }) {
  const handleEsc = useCallback((e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); }, [onClose]);
  useEffect(() => { if (isOpen) { document.addEventListener('keydown', handleEsc); document.body.style.overflow = 'hidden'; } return () => { document.removeEventListener('keydown', handleEsc); document.body.style.overflow = ''; }; }, [isOpen, handleEsc]);
  if (!isOpen) return null;
  const w = size === 'sm' ? 'max-w-md' : size === 'lg' ? 'max-w-2xl' : 'max-w-lg';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative ${w} w-full bg-white rounded-2xl shadow-2xl max-h-[85vh] flex flex-col animate-[scale-in_0.2s_ease-out]`}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="font-display font-bold text-lg text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirmă', variant = 'danger' }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string; confirmText?: string; variant?: 'danger' | 'warning' }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-sm text-slate-500 mb-6">{message}</p>
      <div className="flex items-center gap-3 justify-end">
        <button onClick={onClose} className="btn-secondary text-sm">Anulează</button>
        <button onClick={() => { onConfirm(); onClose(); }} className={`inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all ${variant === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-amber-600'}`}>
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return <span className={`badge border ${STATUS_STYLES[status] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>{STATUS_LABELS[status] || status}</span>;
}

export function SvgIcon({ d, className = 'w-5 h-5' }: { d: string; className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>;
}
