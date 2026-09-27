<template>
  <footer class="app-footer">
    <p>
      Data provided by
      <a href="https://www.tvmaze.com/api" target="_blank" rel="noopener noreferrer">
        TVMaze API
      </a>
    </p>
  </footer>
</template>

<style scoped>
.app-footer {
  padding: 1.5rem;
  text-align: center;
  color: var(--text-dim);
  font-size: 0.875rem;
  border-top: 1px solid var(--border-subtle);
}

.app-footer a {
  color:var(--white);
  text-decoration: none;
}

.app-footer a:hover {
  text-decoration: underline;
}
</style>

