<template>
  <DetailsSkeleton v-if="loading" />
  <AlertMessage
    v-else-if="error && error !== 'Not found'"
    :message="error"
    :showRetry="true"
    @retry="fetchShowDetails"
  />
  <NotFoundPage v-else-if="error === 'Not found'"></NotFoundPage>
 <div v-else class="show-details">
    <RouterLink :to="{ path: '/', query: {} }" class="back-button" @click="goToDashboard">← Back to Dashboard</RouterLink>
    <div class="show-details-section">
        <img :src="showDetails?.image?.medium ?? placeholderImage" :alt="showDetails?.name" class="show-image"/>
        <div>
          <h1 class="show-title">{{ showDetails?.name }}</h1>
          <div class="meta-row">
            <ShowRating :rating="showDetails?.rating?.average"></ShowRating>
            <span v-if="releasedYear">{{releasedYear}}</span>
            <span v-if="showDetails?.runtime" class="meta-tag">{{showDetails.runtime}}m</span>
            <span v-if="showDetails?.status" class="meta-tag">{{showDetails.status}}</span>
          </div>
          <section class="details">
            <div v-if="showDetails?.genres.length" class="detail-line"><span class="details-title">Genres: </span><span class="details-content genre" v-for="genre in showDetails?.genres" :key="genre">{{genre}}</span></div>
            <div v-if="showDetails?.network?.name" class="detail-line"><span class="details-title">Network: </span><span class="details-content">{{showDetails.network.name}}</span></div>
            <div v-if="showDetails?.language" class="detail-line"><span class="details-title">Language: </span><span class="details-content">{{showDetails.language}}</span></div>
          </section>
        </div>
      </div>
      <div  class="overview">
        <div class="summary" v-html="showDetails?.summary"></div>
        <div v-if="showDetails?.officialSite" class="official-website">
          <a
            :href="showDetails.officialSite"
            target="_blank"
            rel="noopener noreferrer"
            class="official-btn"
          >
            <span>Official Website</span>
            <span class="external-icon">↗</span>
          </a>
        </div>
      </div>
    <hr class="divider">
    <section class="cast-section">
      <h2>Cast &amp; crew</h2>
      <div class="cast-row">
        <CastMember v-for="cast in casts" :key="cast.person.id" :cast="cast"></CastMember>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useShowDetails } from "@/composables/useShowDetails";
import { useRoute } from 'vue-router'
import ShowRating from "@/components/ui/ShowRating.vue";
import CastMember from "@/components/ui/CastMember.vue";
import DetailsSkeleton from "@/components/ui/skeleton/DetailsSkeleton.vue";
import AlertMessage from "@/components/ui/AlertMessage.vue";
import placeholderImage from '@/assets/img/placeholder-show.jpeg'
import { useSearchStore } from "@/stores/search";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const { getShowDetails, showDetails, error, loading } = useShowDetails()
const route = useRoute()
const searchStore = useSearchStore()
const releasedYear = computed(() => {
  const premiered = showDetails.value?.premiered
  return premiered ? new Date(premiered).getFullYear() : null
})
const casts = computed(() =>
  showDetails.value?._embedded?.cast?.filter(cast => cast.person) ?? []
)

async function fetchShowDetails() {
  const showId = Number(route.params.id)
  if (!isNaN(showId)) {
    await getShowDetails(showId)
  }
}

function goToDashboard() {
  searchStore.clear()
}

onMounted(async () => {
  await fetchShowDetails()
})

</script>
<style scoped>

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--text-dim);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--white);
  }
}

.show-details {
  margin-top: 1rem;

  .show-details-section {
    display: flex;
    gap: 1.5625rem;
    flex-wrap: wrap;

    .show-image {
      width: 15.625rem;
      height: auto;
    }

    .show-title {
      margin-bottom: 0.9375rem;
      font-size: 2.625rem;
      font-weight: 800;
      line-height: 1.1;
    }

    .meta-row {
      display: flex;
      gap: 0.9375rem;
      margin-bottom: 0.9375rem;

      .meta-tag {
        border: 1px solid var(--border-meta);
        padding: 0 0.3125rem;
      }
    }

    .details {
      .detail-line {
        font-size: 0.92rem;
        margin: 0.6rem 0;

        .details-title {
          color: var(--text-dim);
        }

        .details-content {
          color: var(--text);
        }

        .genre{
          margin-right: 0.625rem;
        }

        a {
          color: var(--text);
          text-decoration: underline;
        }
      }
    }

    .show-rating {
      font-size: 1rem;
    }
  }

  .overview {
    margin-top: 1.25rem;

    .summary {
      font-size: 1.125rem;
      font-weight: 900;
      letter-spacing: 1.1px;
    }

    .official-website {
      text-align: center;
      margin-top: 1.875rem;
    }

  }

  .divider {
    border: none;
    height: 1px;
    background: var(--border-subtle);
    margin: 2rem 0;
  }


  .cast-section {
    h2 {
      font-size: 1.3rem;
      font-weight: 700;
      margin: 0 0 1.2rem;
    }

    .cast-row {
      display: flex;
      gap: 1.4rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      scrollbar-width: thin;
      flex-flow: wrap;
    }
  }

  .official-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--radius-lg);
    background: rgba(255, 255, 255, 0.08);
    color: var(--white);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      background: var(--white);
      color: var(--bg);
      transform: translateY(-0.125rem);
      box-shadow: 0 0.375rem 1.25rem rgba(0, 0, 0, 0.25);
    }

    .external-icon {
      font-size: 1.125rem;
      line-height: 1;
    }
  }
}

</style>
