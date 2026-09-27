<template>
  <header>
    <RouterLink :to="{ path: '/', query: {} }" class="logo" @click="goToDashboard"> ▶ BingeBox</RouterLink>
    <SearchInput v-if="showSearch" @search="search($event)" />
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from "vue";
import SearchInput from "@/components/ui/SearchInput.vue";
import { useSearchStore } from "@/stores/search";

const route = useRoute()
const showSearch = computed(() => route.name === 'home')
const searchStore = useSearchStore()

function goToDashboard() {
  searchStore.clear()
}
function search(event: string){
  searchStore.search(event)
}
</script>

<style scoped>
header {
  height: 5rem;
  padding: 0 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-raised);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;

  .logo {
    color: var(--white);
    text-decoration: unset;
    font-size: 1.125rem;
  }
}

@media (max-width: 30rem) {
  header {
    flex-direction: column;
    height: 6.25rem;
    justify-content: center;
    gap: 0.3125rem;
  }

}
</style>
