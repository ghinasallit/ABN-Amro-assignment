import { ref, computed } from "vue";
import type { Show } from "@/types/show";
import { fetchShows } from "@/api/tvmaze";
import { getCache, setCache } from "@/utils/cache";

export function useShows() {
  const showsList = ref<Show[]>([])
  const page = ref(0)
  const loadingMore = ref(false)
  const hasMore = ref(true)
  const error = ref<string | null>(null)
  const CACHE_KEY = 'shows';

  async function initialLoad() {
    error.value = null
    const cashedShows = getCache<Show[]>(CACHE_KEY)
    if(cashedShows) {
      showsList.value = cashedShows.data
      page.value = cashedShows.lastPage + 1
      return
    }

    try {
      showsList.value = await fetchShows(page.value)
      setCache(CACHE_KEY, showsList.value, page.value);
      page.value ++
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load shows'
    }
  }

  async function loadMore() {
    if(loadingMore.value || !hasMore.value)
      return

    try {
      loadingMore.value = true
      const newShowsList = await fetchShows(page.value)
      if(newShowsList.length === 0) {
        hasMore.value = false
      } else {
        showsList.value = [...showsList.value, ...newShowsList]
        setCache(CACHE_KEY, showsList.value, page.value);
        page.value ++
      }
    } catch (e) {
      if (e instanceof Error && e.status === 404) {
        hasMore.value = false
      }
      console.error(e)
    } finally {
      loadingMore.value = false
    }
  }

  const showsByGenre = computed(() => {
    const grouped: Record<string, Show[]> = {};

    for (const show of showsList.value) {
      for (const genre of show.genres) {
        if (!grouped[genre]) grouped[genre] = [];
        grouped[genre].push(show);
      }
    }

    // Sort each genre by rating (descending)
    for (const genre in grouped) {
      grouped[genre]!.sort((a, b) =>
        (b.rating?.average ?? 0) - (a.rating?.average ?? 0)
      );
    }

    return grouped;
  });

  return {
    showsByGenre,
    loadMore,
    initialLoad,
    loadingMore,
    hasMore,
    showsList,
    error
  }
}
