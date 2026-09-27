import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRecentlyViewedStore } from '../../src/stores/recentlyViewed'
import type { Show } from '../../src/types/show'

const mockShow = (id: number, name: string): Show => ({
  id,
  name,
  genres: ['Drama'],
  rating: { average: 8.5 },
  image: { medium: 'img.jpg', original: 'img.jpg' },
  summary: 'Test summary'
})

describe('useRecentlyViewedStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('starts with empty shows when no localStorage data', () => {
      const store = useRecentlyViewedStore()
      expect(store.shows).toEqual([])
    })

    it('loads shows from localStorage on init', () => {
      const savedShows = [mockShow(1, 'Show 1')]
      localStorage.setItem('recently_viewed', JSON.stringify(savedShows))

      setActivePinia(createPinia())
      const store = useRecentlyViewedStore()

      expect(store.shows).toEqual(savedShows)
    })
  })

  describe('add', () => {
    it('adds a show to the list', () => {
      const store = useRecentlyViewedStore()
      const show = mockShow(1, 'Breaking Bad')

      store.add(show)

      expect(store.shows).toHaveLength(1)
      expect(store.shows[0]).toEqual(show)
    })

    it('adds new show to the front of the list', () => {
      const store = useRecentlyViewedStore()
      const show1 = mockShow(1, 'Show 1')
      const show2 = mockShow(2, 'Show 2')

      store.add(show1)
      store.add(show2)

      expect(store.shows[0]!.id).toBe(2)
      expect(store.shows[1]!.id).toBe(1)
    })

    it('moves existing show to front when re-added', () => {
      const store = useRecentlyViewedStore()
      const show1 = mockShow(1, 'Show 1')
      const show2 = mockShow(2, 'Show 2')
      const show3 = mockShow(3, 'Show 3')

      store.add(show1)
      store.add(show2)
      store.add(show3)
      store.add(show1) // Re-add show1

      expect(store.shows).toHaveLength(3)
      expect(store.shows[0]!.id).toBe(1) // show1 is now first
      expect(store.shows[1]!.id).toBe(3)
      expect(store.shows[2]!.id).toBe(2)
    })

    it('limits to 10 shows maximum', () => {
      const store = useRecentlyViewedStore()

      for (let i = 1; i <= 12; i++) {
        store.add(mockShow(i, `Show ${i}`))
      }

      expect(store.shows).toHaveLength(10)
      expect(store.shows[0]!.id).toBe(12) // Most recent
      expect(store.shows[9]!.id).toBe(3) // Oldest kept (1 and 2 dropped)
    })

    it('persists to localStorage', () => {
      const store = useRecentlyViewedStore()
      const show = mockShow(1, 'Breaking Bad')

      store.add(show)

      const stored = JSON.parse(localStorage.getItem('recently_viewed') || '[]')
      expect(stored).toHaveLength(1)
      expect(stored[0].id).toBe(1)
    })
  })

  describe('hasShows getter', () => {
    it('returns false when empty', () => {
      const store = useRecentlyViewedStore()
      expect(store.hasShows).toBe(false)
    })

    it('returns true when shows exist', () => {
      const store = useRecentlyViewedStore()
      store.add(mockShow(1, 'Show 1'))

      expect(store.hasShows).toBe(true)
    })
  })
})
