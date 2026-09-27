<template>
  <div class="search-results">
    <div v-if="searchStore.loading" class="loading">
      Searching...
    </div>
    <AlertMessage
      v-else-if="searchStore.error"
      :message="searchStore.error"
      :showRetry="true"
      @retry="retrySearch"
    />
    <template v-else-if="searchStore.hasResults">
      <h1>Results for "{{ searchStore.query }}"</h1>
      <div class="show-cards-list">
        <ShowCard
          v-for="result in searchStore.results"
          :key="result.show.id"
          :show="result.show"
        />
      </div>
    </template>
    <div v-else-if="searchStore.hasQuery" class="no-results">
      <h1>No results found for "{{ searchStore.query }}"</h1>
      <div v-if="recentlyViewedStore.hasShows" class="recently-viewed">
        <h3 class="recently-viewed-title">Recently Viewed</h3>
        <div class="show-cards-list">
          <ShowCard
            v-for="show in recentlyViewedStore.shows"
            :key="show.id"
            :show="show"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import ShowCard from '@/components/ui/ShowCard.vue'
import AlertMessage from "@/components/ui/AlertMessage.vue";
import { useRecentlyViewedStore } from "@/stores/recentlyViewed";

const searchStore = useSearchStore()
const recentlyViewedStore = useRecentlyViewedStore()
function retrySearch() {
  if (searchStore.query) {
    searchStore.search(searchStore.query)
  }
}
</script>

<style scoped>
.search-results {
  padding: 1rem;
}

.show-cards-list {
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  margin-top: 1rem;
  flex-wrap: wrap;;
}

.loading,
.no-results {
  text-align: center;
  padding: 2rem;
}

.recently-viewed {
  margin-top: 3rem;
}
.recently-viewed-title{
  margin-bottom: 2rem;
  text-align: left;
}

</style>
