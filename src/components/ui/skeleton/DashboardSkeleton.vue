<template>
  <div class="dashboard-skeleton">
    <section v-for="n in rowCount" :key="n" class="genre-section">
      <div class="skeleton-title skeleton-shimmer"></div>
      <SkeletonRow />
    </section>
  </div>
</template>

<script setup lang="ts">
import SkeletonRow from './SkeletonRow.vue'

withDefaults(defineProps<{
  rowCount?: number
}>(), {
  rowCount: 4
})
</script>

<style scoped>
.dashboard-skeleton {
  padding: 1rem;
}

.genre-section {
  margin-bottom: 2rem;
}

.skeleton-title {
  height: 1.5rem;
  width: 9.375rem;
  margin-bottom: 1rem;
  border-radius: var(--radius-sm);
}
</style>
