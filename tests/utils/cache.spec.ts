import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getCache, setCache, clearCache } from '../../src/utils/cache'

describe('cache', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('setCache', () => {
    it('stores data in localStorage with timestamp and lastPage', () => {
      const data = [{ id: 1, name: 'Show 1' }]
      vi.setSystemTime(new Date('2024-01-15T10:00:00Z'))

      setCache('test_key', data, 5)

      const stored = JSON.parse(localStorage.getItem('test_key')!)
      expect(stored.data).toEqual(data)
      expect(stored.lastPage).toBe(5)
      expect(stored.timestamp).toBe(new Date('2024-01-15T10:00:00Z').getTime())
    })
  })

  describe('getCache', () => {
    it('returns null when key does not exist', () => {
      const result = getCache('nonexistent')

      expect(result).toBeNull()
    })

    it('returns cached data when not expired', () => {
      const data = [{ id: 1, name: 'Show 1' }]
      vi.setSystemTime(new Date('2024-01-15T10:00:00Z'))
      setCache('test_key', data, 3)

      // Move forward 12 hours (within 24h TTL)
      vi.setSystemTime(new Date('2024-01-15T22:00:00Z'))
      const result = getCache('test_key')

      expect(result).not.toBeNull()
      expect(result!.data).toEqual(data)
      expect(result!.lastPage).toBe(3)
    })

    it('returns null when cache is expired (after 24 hours)', () => {
      const data = [{ id: 1, name: 'Show 1' }]
      vi.setSystemTime(new Date('2024-01-15T10:00:00Z'))
      setCache('test_key', data, 0)

      // Move forward 25 hours (past 24h TTL)
      vi.setSystemTime(new Date('2024-01-16T11:00:00Z'))
      const result = getCache('test_key')

      expect(result).toBeNull()
    })
  })

  describe('clearCache', () => {
    it('removes item from localStorage', () => {
      setCache('test_key', [1, 2, 3], 0)
      expect(localStorage.getItem('test_key')).not.toBeNull()

      clearCache('test_key')

      expect(localStorage.getItem('test_key')).toBeNull()
    })
  })
})
