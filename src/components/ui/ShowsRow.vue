<template>
  <div class="show-row" tabindex="0" role="region" aria-label="TV shows">
    <ShowCard
      v-for="show in shows" :key="show.id"
      :show="show"
    />
  </div>
</template>
<script setup lang="ts">
import type { Show } from "@/types/show";
import ShowCard from "@/components/ui/ShowCard.vue";

defineProps<{shows: Show[]}>()
</script>

<style scoped>
.show-row {
  display: flex;
  overflow-x: auto;
  gap: 0.9375rem;
  scrollbar-width: none;
}

</style>
