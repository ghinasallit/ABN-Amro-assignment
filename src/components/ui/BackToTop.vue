<template>
  <Transition name="fade">
    <button
      v-if="isVisible"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="Back to top"
    >
      ↑
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const scrollThreshold = 300

function handleScroll() {
  isVisible.value = window.scrollY > scrollThreshold
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: var(--radius-circle);
  background: var(--bg-raised);
  color: var(--white);
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.3);
  transition: background 0.2s ease, transform 0.2s ease;
  z-index: 100;

  &:hover {
    background: var(--bg-hover);
    transform: translateY(-0.125rem);
  }
}
</style>
