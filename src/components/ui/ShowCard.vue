<template>
  <div class="show-card">
    <RouterLink :to="{ name: 'show', params: { id: show.id } }">
      <img :src="show?.image?.medium ?? placeholderImage" :alt="show?.name" />
    </RouterLink>
    <div class="show-info">
      <h3 class="show-name" aria-label="Show name">{{ show?.name }}</h3>
      <show-rating :rating="show?.rating?.average"></show-rating>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Show } from '@/types/show'
import placeholderImage from '@/assets/img/placeholder-show.jpeg'
import ShowRating from "@/components/ui/ShowRating.vue";

defineProps<{ show: Show }>()
</script>

<style scoped>
.show-card {
  border-radius: var(--radius-md);
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 13.75rem;
  background-color: var(--bg-raised);

  img {
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    object-fit: cover;
    width: 13.75rem;
    height: 18.75rem;
  }

  .show-info{
    padding: 0.625rem;
  }

  .show-name{
    font-weight: 600;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}

.show-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
}
</style>
