import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShowDetails } from '../../src/composables/useShowDetails'
import * as api from '../../src/api/tvmaze'

vi.mock('../../src/api/tvmaze')

const mockFetchShowDetails = api.fetchShowDetails as Mock

const mockShowDetails = {
  id: 1,
  name: 'Breaking Bad',
  summary: '<p>A chemistry teacher turns to crime.</p>',
  genres: ['Drama', 'Crime'],
  rating: { average: 9.5 },
  image: { medium: 'img.jpg', original: 'img.jpg' },
  premiered: '2008-01-20',
  status: 'Ended',
  _embedded: {
    cast: [
      { person: { id: 1, name: 'Bryan Cranston', image: null }, character: { name: 'Walter White' } }
    ]
  }
}

describe('useShowDetails', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('fetches show details successfully', async () => {
    mockFetchShowDetails.mockResolvedValue(mockShowDetails)

    const { getShowDetails, showDetails, loading, error } = useShowDetails()

    const promise = getShowDetails(1)
    expect(loading.value).toBe(true)

    await promise

    expect(loading.value).toBe(false)
    expect(showDetails.value).toEqual(mockShowDetails)
    expect(error.value).toBeNull()
    expect(mockFetchShowDetails).toHaveBeenCalledWith(1)
  })

  it('handles error when fetch fails', async () => {
    mockFetchShowDetails.mockRejectedValue(new Error('Not found'))

    const { getShowDetails, showDetails, error } = useShowDetails()
    await getShowDetails(999)

    expect(showDetails.value).toBeNull()
    expect(error.value).toBe('Not found')
  })

  it('clears previous error on new request', async () => {
    mockFetchShowDetails
      .mockRejectedValueOnce(new Error('First error'))
      .mockResolvedValueOnce(mockShowDetails)

    const { getShowDetails, error } = useShowDetails()

    await getShowDetails(999)
    expect(error.value).toBe('First error')

    await getShowDetails(1)
    expect(error.value).toBeNull()
  })
})
