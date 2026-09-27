<template>
  <div class="details-skeleton">
    <div class="skeleton-header">
      <div class="skeleton-image skeleton-shimmer"></div>
      <div class="skeleton-info">
        <div class="skeleton-title skeleton-shimmer"></div>
        <div class="skeleton-meta">
          <div class="skeleton-tag skeleton-shimmer"></div>
          <div class="skeleton-tag skeleton-shimmer"></div>
          <div class="skeleton-tag skeleton-shimmer"></div>
        </div>
        <div class="skeleton-line skeleton-shimmer"></div>
        <div class="skeleton-line skeleton-shimmer"></div>
        <div class="skeleton-line short skeleton-shimmer"></div>
      </div>
    </div>
    <div class="skeleton-overview">
      <div class="skeleton-summary skeleton-shimmer"></div>
      <div class="skeleton-summary skeleton-shimmer"></div>
      <div class="skeleton-summary short skeleton-shimmer"></div>
    </div>
    <div class="skeleton-divider"></div>
    <div class="skeleton-cast-section">
      <div class="skeleton-section-title skeleton-shimmer"></div>
      <div class="skeleton-cast-row">
        <div class="skeleton-cast-item" v-for="n in 6" :key="n">
          <div class="skeleton-cast-photo skeleton-shimmer"></div>
          <div class="skeleton-cast-name skeleton-shimmer"></div>
          <div class="skeleton-cast-char skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details-skeleton {
  margin-top: 1rem;
  padding: 0 1rem;
}

.skeleton-header {
  display: flex;
  gap: 1.5625rem;
}

.skeleton-image {
  width: 15.625rem;
  height: 23.4375rem;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.skeleton-info {
  flex: 1;
}

.skeleton-title {
  height: 2.625rem;
  width: 60%;
  margin-bottom: 0.9375rem;
  border-radius: var(--radius-sm);
}

.skeleton-meta {
  display: flex;
  gap: 0.9375rem;
  margin-bottom: 0.9375rem;
}

.skeleton-tag {
  height: 1.5rem;
  width: 3.75rem;
  border-radius: var(--radius-sm);
}

.skeleton-line {
  height: 1.125rem;
  width: 80%;
  margin-bottom: 0.625rem;
  border-radius: var(--radius-sm);
}

.skeleton-line.short {
  width: 50%;
}

.skeleton-overview {
  margin-top: 1.25rem;
}

.skeleton-summary {
  height: 1.125rem;
  width: 100%;
  margin-bottom: 0.625rem;
  border-radius: var(--radius-sm);
}

.skeleton-summary.short {
  width: 70%;
}

.skeleton-divider {
  height: 1px;
  background: var(--border-subtle);
  margin: 2rem 0;
}

.skeleton-cast-section {
  margin-top: 1.25rem;
}

.skeleton-section-title {
  height: 1.5rem;
  width: 7.5rem;
  margin-bottom: 1.25rem;
  border-radius: var(--radius-sm);
}

.skeleton-cast-row {
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;
}

.skeleton-cast-item {
  width: 6rem;
  text-align: center;
}

.skeleton-cast-photo {
  width: 6rem;
  height: 6rem;
  border-radius: var(--radius-circle);
}

.skeleton-cast-name {
  height: 0.875rem;
  width: 80%;
  margin: 0.625rem auto 0.3125rem;
  border-radius: var(--radius-sm);
}

.skeleton-cast-char {
  height: 0.75rem;
  width: 60%;
  margin: 0 auto;
  border-radius: var(--radius-sm);
}
</style>
