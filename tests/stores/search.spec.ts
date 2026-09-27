import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSearchStore } from '../../src/stores/search'
import * as api from '../../src/api/tvmaze'

vi.mock('../../src/api/tvmaze')

// Mock router
vi.mock('../../src/router', () => ({
  default: {
    push: vi.fn<typeof import('../../src/router').default.push>()
  }
}))

import router from '../../src/router'

const mockResults = [
  { score: 0.9, show: { id: 1, name: 'Breaking Bad' } },
  { score: 0.8, show: { id: 2, name: 'Better Call Saul' } }
]

describe('useSearchStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('search', () => {
    it('searches and stores results', async () => {
      vi.mocked(api.searchShows).mockResolvedValue(mockResults)

      const store = useSearchStore()
      await store.search('breaking')

      expect(store.query).toBe('breaking')
      expect(store.results).toEqual(mockResults)
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('updates URL with query param', async () => {
      vi.mocked(api.searchShows).mockResolvedValue([])

      const store = useSearchStore()
      await store.search('test')

      expect(router.push).toHaveBeenCalledWith({ query: { q: 'test' } })
    })

    it('clears results and URL on empty query', async () => {
      const store = useSearchStore()
      store.results = mockResults
      store.query = 'old query'

      await store.search('')

      expect(store.results).toEqual([])
      expect(router.push).toHaveBeenCalledWith({ query: {} })
    })

    it('handles API error', async () => {
      vi.mocked(api.searchShows).mockRejectedValue(new Error('Network error'))

      const store = useSearchStore()
      await store.search('test')

      expect(store.error).toBe('Network error')
      expect(store.results).toEqual([])
    })
  })

  describe('clear', () => {
    it('resets all state', () => {
      const store = useSearchStore()
      store.query = 'test'
      store.results = mockResults
      store.error = 'some error'

      store.clear()

      expect(store.query).toBe('')
      expect(store.results).toEqual([])
      expect(store.error).toBeNull()
    })
  })

  describe('getters', () => {
    it('hasQuery returns true when query exists', () => {
      const store = useSearchStore()
      
      expect(store.hasQuery).toBe(false)
      
      store.query = 'test'
      expect(store.hasQuery).toBe(true)
    })

    it('hasQuery ignores whitespace', () => {
      const store = useSearchStore()
      store.query = '   '

      expect(store.hasQuery).toBe(false)
    })

    it('hasResults returns true when results exist', () => {
      const store = useSearchStore()
      
      expect(store.hasResults).toBe(false)
      
      store.results = mockResults
      expect(store.hasResults).toBe(true)
    })
  })
})
