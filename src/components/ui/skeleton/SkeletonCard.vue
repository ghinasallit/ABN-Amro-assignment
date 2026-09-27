<template>
  <div class="skeleton-card">
    <div class="skeleton-image skeleton-shimmer"></div>
    <div class="skeleton-title skeleton-shimmer"></div>
    <div class="skeleton-rating skeleton-shimmer"></div>
  </div>
</template>

<style scoped>
.skeleton-card {
  width: 12.5rem;
  flex-shrink: 0;
}

.skeleton-image {
  width: 100%;
  height: 17.5rem;
  border-radius: var(--radius-md);
}

.skeleton-title {
  height: 1.2rem;
  width: 80%;
  margin-top: 0.5rem;
  border-radius: var(--radius-sm);
}

.skeleton-rating {
  height: 1rem;
  width: 40%;
  margin-top: 0.3rem;
  border-radius: var(--radius-sm);
}
</style>
