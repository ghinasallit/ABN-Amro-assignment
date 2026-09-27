import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchShows, searchShows, fetchShowDetails } from '../../src/api/tvmaze'

const mockFetch = vi.fn<typeof fetch>()
global.fetch = mockFetch

const jsonResponse = (body: unknown) => new Response(JSON.stringify(body))
const errorResponse = (status: number) => new Response(null, { status })

describe('tvmaze API', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  describe('fetchShows', () => {
    it('fetches shows for given page', async () => {
      const mockShows = [{ id: 1, name: 'Show 1' }]
      mockFetch.mockResolvedValue(jsonResponse(mockShows))

      const result = await fetchShows(2)

      expect(mockFetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows?page=2')
      expect(result).toEqual(mockShows)
    })

    it('uses page 0 by default', async () => {
      mockFetch.mockResolvedValue(jsonResponse([]))

      await fetchShows()

      expect(mockFetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows?page=0')
    })

    it('throws error on failed response', async () => {
      mockFetch.mockResolvedValue(errorResponse(500))

      await expect(fetchShows()).rejects.toThrow('Server error. Try again later.')
    })
  })

  describe('searchShows', () => {
    it('searches shows with query', async () => {
      const mockResults = [{ show: { id: 1, name: 'Breaking Bad' } }]
      mockFetch.mockResolvedValue(jsonResponse(mockResults))

      const result = await searchShows('breaking')

      expect(mockFetch).toHaveBeenCalledWith('https://api.tvmaze.com/search/shows?q=breaking')
      expect(result).toEqual(mockResults)
    })

    it('encodes special characters in query', async () => {
      mockFetch.mockResolvedValue(jsonResponse([]))

      await searchShows('breaking bad & friends')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.tvmaze.com/search/shows?q=breaking%20bad%20%26%20friends'
      )
    })

    it('throws error on failed response', async () => {
      mockFetch.mockResolvedValue(errorResponse(404))

      await expect(searchShows('test')).rejects.toThrow('Not found')
    })
  })

  describe('fetchShowDetails', () => {
    it('fetches show details with cast', async () => {
      const mockDetails = { id: 1, name: 'Show', _embedded: { cast: [] } }
      mockFetch.mockResolvedValue(jsonResponse(mockDetails))

      const result = await fetchShowDetails(1)

      expect(mockFetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1?embed=cast')
      expect(result).toEqual(mockDetails)
    })

    it('throws error on failed response', async () => {
      mockFetch.mockResolvedValue(errorResponse(404))

      await expect(fetchShowDetails(999)).rejects.toThrow('Not found')
    })
  })
})
