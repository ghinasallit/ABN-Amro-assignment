import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { useShows } from '../../src/composables/useShows'
import * as api from '../../src/api/tvmaze'
import * as cache from '../../src/utils/cache'
import type { Show } from '../../src/types/show'

vi.mock('../../src/api/tvmaze')
vi.mock('../../src/utils/cache')

const mockFetchShows = api.fetchShows as Mock
const mockGetCache = cache.getCache as Mock
const mockSetCache = cache.setCache as Mock

const mockShows: Show[] = [
  {
    id: 1,
    name: 'Breaking Bad',
    genres: ['Drama', 'Crime'],
    rating: { average: 9.5 },
    image: { medium: 'img1.jpg', original: 'img1.jpg' },
    summary: 'A chemistry teacher turns to crime.'
  },
  {
    id: 2,
    name: 'The Office',
    genres: ['Comedy'],
    rating: { average: 8.5 },
    image: { medium: 'img2.jpg', original: 'img2.jpg' },
    summary: 'A mockumentary about office workers.'
  },
  {
    id: 3,
    name: 'Better Call Saul',
    genres: ['Drama', 'Crime'],
    rating: { average: 9.0 },
    image: { medium: 'img3.jpg', original: 'img3.jpg' },
    summary: 'The origin story of Saul Goodman.'
  }
]

describe('useShows', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetCache.mockReturnValue(null)
    mockSetCache.mockImplementation(() => {})
  })

  describe('initialLoad', () => {
    it('loads shows and increments page', async () => {
      mockFetchShows.mockResolvedValue(mockShows)

      const { initialLoad, showsList, error } = useShows()
      await initialLoad()

      expect(mockFetchShows).toHaveBeenCalledWith(0)
      expect(showsList.value).toEqual(mockShows)
      expect(error.value).toBeNull()
    })

    it('sets error on failure', async () => {
      mockFetchShows.mockRejectedValue(new Error('Network error'))

      const { initialLoad, showsList, error } = useShows()
      await initialLoad()

      expect(showsList.value).toEqual([])
      expect(error.value).toBe('Network error')
    })
  })

  describe('loadMore', () => {
    it('appends new shows to list', async () => {
      const moreShows: Show[] = [{ id: 4, name: 'New Show', genres: ['Drama'], rating: { average: 7.0 }, image: null, summary: 'A new show.' }]
      mockFetchShows
        .mockResolvedValueOnce(mockShows)
        .mockResolvedValueOnce(moreShows)

      const { initialLoad, loadMore, showsList } = useShows()
      await initialLoad()
      await loadMore()

      expect(showsList.value).toHaveLength(4)
      expect(mockFetchShows).toHaveBeenCalledTimes(2)
    })

    it('sets hasMore to false when no more shows', async () => {
      mockFetchShows
        .mockResolvedValueOnce(mockShows)
        .mockResolvedValueOnce([])

      const { initialLoad, loadMore, hasMore } = useShows()
      await initialLoad()
      await loadMore()

      expect(hasMore.value).toBe(false)
    })

    it('does not load if already loading', async () => {
      mockFetchShows.mockResolvedValue(mockShows)

      const { initialLoad, loadMore } = useShows()
      await initialLoad()

      // Simulate concurrent calls
      loadMore()
      loadMore()

      // Wait for completion
      await new Promise(resolve => setTimeout(resolve, 0))

      // Should only call once for loadMore (plus initial)
      expect(mockFetchShows).toHaveBeenCalledTimes(2)
    })
  })

  describe('showsByGenre', () => {
    it('groups shows by genre', async () => {
      mockFetchShows.mockResolvedValue(mockShows)

      const { initialLoad, showsByGenre } = useShows()
      await initialLoad()

      expect(Object.keys(showsByGenre.value)).toContain('Drama')
      expect(Object.keys(showsByGenre.value)).toContain('Crime')
      expect(Object.keys(showsByGenre.value)).toContain('Comedy')
    })

    it('sorts shows by rating within each genre', async () => {
      mockFetchShows.mockResolvedValue(mockShows)

      const { initialLoad, showsByGenre } = useShows()
      await initialLoad()

      const dramaShows = showsByGenre.value['Drama']
      expect(dramaShows![0]!.name).toBe('Breaking Bad') // 9.5
      expect(dramaShows![1]!.name).toBe('Better Call Saul') // 9.0
    })

    it('includes show in multiple genres', async () => {
      mockFetchShows.mockResolvedValue(mockShows)

      const { initialLoad, showsByGenre } = useShows()
      await initialLoad()

      // Breaking Bad should appear in both Drama and Crime
      const dramaIds = showsByGenre.value['Drama']!.map(s => s.id)
      const crimeIds = showsByGenre.value['Crime']!.map(s => s.id)

      expect(dramaIds).toContain(1)
      expect(crimeIds).toContain(1)
    })
  })
})
