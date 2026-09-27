<template>
    <div class="cast-card">
      <div class="cast-photo">
        <a :href="cast.person?.url ?? undefined" target="_blank" rel="noopener noreferrer" :aria-label="`${cast.person?.name} - opens in new tab`">
          <img :src="castPersonImage" :alt="cast?.person?.name ?? undefined">
        </a>
      </div>
      <div class="cast-name">{{cast?.person?.name}}</div>
      <div class="cast-char">{{cast?.character?.name}}</div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import placeholderImage from '@/assets/img/placeholder-person-img.jpg'
import type { CastMember } from "@/types/showDetails";

const props =defineProps<{ cast: CastMember }>()
const castPersonImage = computed(() => props.cast?.person?.image?.medium ?? placeholderImage)
</script>

<style scoped>

.cast-card {
  flex-shrink: 0;
  width: 6rem;
  text-align: center;

  .cast-photo {
    width: 6rem;
    height: 6rem;
    border-radius: var(--radius-circle);
    overflow: hidden;
    background: var(--bg-raised);
    border: 1px solid rgba(255, 255, 255, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
  .cast-name {
    font-size: 0.82rem;
    font-weight: 500;
    margin-top: 0.6rem;
  }

  .cast-char {
    font-size: 0.75rem;
    color: var(--text-dim);
  }
}
</style>
