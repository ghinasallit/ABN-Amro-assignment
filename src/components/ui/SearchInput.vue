<template>
  <div class="search">
    <span class="search-icon">⌕</span>
    <input
      type="text"
      placeholder="Search TV shows"
      class="search-input"
      v-model="query"
      id="search"
    />
    <button
      class="clear-btn"
      v-if="query"
      @click="query = ''"
      aria-label="Clear search">
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const emit = defineEmits<{ search: [query: string]}>()
let searchTimer: ReturnType<typeof setTimeout>
const query = ref( '')
const route = useRoute()

watch(query, (value) => {
  if (value === (route.query.q ?? '')) return
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    emit('search', value)
  }, 300)
})

watch(
  () => route.query.q,
  (q) => {
    const next = typeof q === 'string' ? q : ''
    if (next !== query.value) query.value = next
  },
)

onMounted(() => {
  const searchQueryParam = route.query.q
  if (searchQueryParam) {
    query.value = (Array.isArray(searchQueryParam) ? searchQueryParam[0] : searchQueryParam) ?? ''
    emit('search', query.value)
  }
})

onUnmounted(() => {
  clearTimeout(searchTimer)
})

</script>

<style scoped>
.search {
  display: flex;
  align-items: center;
  gap: 0.625rem;

  width: 22.5rem;
  height: 2.625rem;
  padding: 0 1rem;

  background: var(--white);
  border: 1px solid var(--border);

  border-radius: var(--radius-pill);

  transition: 0.2s;

  &:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 0.1875rem var(--accent-soft);
  }

  input {
    flex: 1;

    border: none;
    outline: none;
    background: transparent;

    color: var(--text-raised);
    font-size: 0.938rem;

    &::placeholder {
      color: var(--text-muted);
    }
  }

  .clear-btn {
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 1.25rem;
    cursor: pointer;

    &:hover {
      color: var(--bg-hover);
    }
  }

  .search-icon {
    font-size: 1.375rem;
    color: var(--text-dim);
  }

}

@media (max-width: 30rem) {
  .search {
    width: 100%;
    gap: 0.3125rem;
  }
}
</style>
