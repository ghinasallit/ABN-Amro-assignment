<template>
  <div class="skeleton-row">
    <SkeletonCard v-for="n in cardCount" :key="n" />
  </div>
</template>

<script setup lang="ts">
import SkeletonCard from './SkeletonCard.vue'

withDefaults(defineProps<{
  cardCount?: number
}>(), {
  cardCount: 6
})
</script>

<style scoped>
.skeleton-row {
  display: flex;
  gap: 1rem;
  overflow: hidden;
}
</style>
