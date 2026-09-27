import { defineStore } from 'pinia'
import type { Show } from '@/types/show'

const STORAGE_KEY = 'recently_viewed'
const MAX_ITEMS = 10

export const useRecentlyViewedStore = defineStore('recentlyViewed', {
  state: () => ({
    shows: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Show[]
  }),

  getters: {
    hasShows: (state) => state.shows.length > 0
  },

  actions: {
    add(show: Show) {
      this.shows = this.shows.filter(s => s.id !== show.id)
      this.shows.unshift(show)

      if (this.shows.length > MAX_ITEMS) {
        this.shows = this.shows.slice(0, MAX_ITEMS)
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.shows))
    }
  }
})
