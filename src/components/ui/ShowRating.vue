<template>
  <div class="show-rating">
    <span>★</span>
    <span>{{ rating ?? '—' }}/10</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rating: number | null | undefined
}>()
</script>

<style scoped>
.show-rating {
  font-size: 0.875rem;

  span:first-child {
    color: var(--star);
    font-size: 1rem;
    margin-right: 0.3125rem;
  }
}
</style>
