<template>
  <div>
    <Suspense>
      <div>
        <SearchResult v-if="searchStore.hasQuery || queryParam" />
        <ShowsDashboard v-else />
      </div>
      <template #fallback>
        <DashboardSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import ShowsDashboard from '@/components/container/ShowsDashboard.vue'
import SearchResult from '@/components/container/SearchResult.vue'
import DashboardSkeleton from '@/components/ui/skeleton/DashboardSkeleton.vue'
import { useSearchStore } from '@/stores/search'
import { useRoute } from 'vue-router'
import { computed } from "vue";

const searchStore = useSearchStore()
const route = useRoute()
const queryParam = computed(() => route.query.q || '')
</script>
