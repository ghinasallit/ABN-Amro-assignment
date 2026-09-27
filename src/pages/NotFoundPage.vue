<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page not found</p>
    <RouterLink to="/" class="home-link">← Back to Dashboard</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;

  h1 {
    font-size: 6rem;
    font-weight: 800;
    color: var(--text-dim);
    margin: 0;
  }

  p {
    font-size: 1.25rem;
    color: var(--text-dim);
    margin: 0.5rem 0 2rem;
  }

  .home-link {
    color: var(--white);
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    background: var(--bg-raised);
    border-radius: var(--radius-pill);
    transition: background 0.2s ease;

    &:hover {
      background: var(--bg-hover);
    }
  }
}
</style>
