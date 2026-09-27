const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedData<T> {
  data: T;
  timestamp: number;
  lastPage: number;
}

export function getCache<T>(key: string): CachedData<T> | null {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const parsed: CachedData<T> = JSON.parse(cached);
    const isExpired = Date.now() - parsed.timestamp > CACHE_DURATION;

    return isExpired ? null : parsed;
}

export function setCache<T>(key: string, data: T, lastPage: number): void {
  const cacheData: CachedData<T> = {
    data,
    timestamp: Date.now(),
    lastPage
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
}

export function clearCache(key: string): void {
  localStorage.removeItem(key);
}
