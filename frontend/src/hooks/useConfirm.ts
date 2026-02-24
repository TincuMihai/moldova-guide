import { useState, useCallback } from 'react';

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const requestConfirm = useCallback((id: string) => { setPendingId(id); setIsOpen(true); }, []);
  const cancel = useCallback(() => { setIsOpen(false); setPendingId(null); }, []);
  const confirm = useCallback((onConfirm: (id: string) => void) => {
    if (pendingId) onConfirm(pendingId);
    setIsOpen(false); setPendingId(null);
  }, [pendingId]);

  return { isOpen, pendingId, requestConfirm, cancel, confirm };
}
