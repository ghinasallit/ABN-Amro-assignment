import { fetchShowDetails } from "@/api/tvmaze";
import type { ShowDetails } from "@/types/showDetails";
import { ref } from "vue";
import { useRecentlyViewedStore } from "@/stores/recentlyViewed";

export function useShowDetails() {
  const showDetails = ref<ShowDetails | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const recentlyViewedStore = useRecentlyViewedStore()

  async function getShowDetails(id: number) {
    loading.value = true
    error.value = null
    try {
      showDetails.value = await fetchShowDetails(id)

      if (showDetails.value) {
        recentlyViewedStore.add(showDetails.value)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'No details Found'
    } finally {
      loading.value = false
    }
  }

  return {
    getShowDetails,
    showDetails,
    error,
    loading
  }
}
