<template>
  <div class="load-more">
    <button
      class="load-more-btn"
      :disabled="loading"
      @click="$emit('click')"
      :aria-busy="loading">
      {{ loading ? "Loading..." : "Load More" }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.load-more {
  margin: 1.5625rem 0;
  text-align: center;
}

.load-more-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: var(--radius-pill);
  background: var(--bg-raised);
  color: var(--white);
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: var(--bg-hover);
    transform: scale(1.03);
  }
}
</style>
