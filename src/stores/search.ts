import { defineStore } from 'pinia'
import { searchShows } from '@/api/tvmaze'
import type { SearchResult } from '@/types/search'
import router from '@/router'
interface SearchState {
  query: string
  results: SearchResult[]
  loading: boolean
  error: string | null
}

export const useSearchStore = defineStore('search', {
  state: (): SearchState => ({
    query: '',
    results: [],
    loading: false,
    error: null
  }),

  getters: {
    hasQuery: (state) => state.query.trim().length > 0,
    hasResults: (state) => state.results.length > 0
  },

  actions: {
    async search(searchQuery: string) {
      this.query = searchQuery
      if (!searchQuery.trim()) {
        this.results = []
        this.error = null
        router.push({ query: {} })
        return
      }
      router.push({ query: { q: searchQuery } })
      this.loading = true
      this.error = null

      try {
        this.results = await searchShows(searchQuery)
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Search failed'
        this.results = []
      } finally {
        this.loading = false
      }
    },

    clear() {
      this.query = ''
      this.results = []
      this.error = null
    }
  }
})
