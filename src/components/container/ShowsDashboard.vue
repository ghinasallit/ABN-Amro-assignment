<template>
    <div class="dashboard">
      <h2>Popular Shows</h2>
      <AlertMessage
        v-if="error"
        message="We couldn't load the shows."
        :showRetry="true"
        @retry="initialLoad"
      />
      <template v-else>
        <section v-for="(shows, genre) in showsByGenre" :key="genre">
          <h2 class="genre">{{ genre }}</h2>
          <ShowsRow :shows="shows"/>
        </section>
        <LoadMore
          v-if="hasMore"
          @click="loadMore"
          :loading="loadingMore"
        />
      </template>
      <BackToTop />
    </div>
</template>

<script setup lang="ts">
import { useShows} from '@/composables/useShows'
import ShowsRow from "@/components/ui/ShowsRow.vue"
import LoadMore from "@/components/ui/LoadMore.vue";
import AlertMessage from "@/components/ui/AlertMessage.vue";
import BackToTop from "@/components/ui/BackToTop.vue";

const { showsByGenre, hasMore, loadMore, initialLoad, loadingMore, showsList, error } = useShows()

if(!showsList.value.length) {
  await initialLoad()
}
</script>

<style scoped>
.dashboard {
  padding: 1rem;

  .genre {
    margin: 1.875rem 0 0.9375rem 0;
  }
}
</style>
