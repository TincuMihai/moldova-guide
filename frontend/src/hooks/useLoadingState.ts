import { useState, useCallback } from 'react';

export function useLoadingState<T>(asyncFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await asyncFn();
      setData(result);
      return result;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [asyncFn]);

  return { data, setData, isLoading, error, execute };
}
