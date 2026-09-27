<template>
  <div class="error-message" role="alert">
    <span class="error-icon">!</span>

    <div class="error-content">
      <h3>{{title}}</h3>
      <p>{{message}}</p>
    </div>

    <button v-if="showRetry" class="retry-button" @click="$emit('retry')">
      Try again
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  message?: string
  showRetry?: boolean
}>(), {
  title: 'Something went wrong',
  message: "We couldn't load the data. Please try again.",
  showRetry: false
})

defineEmits<{retry: []}>()
</script>

<style scoped>
.error-message {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1rem 1.125rem;
  border: 1px solid var(--error);
  border-radius: var(--radius-lg);
  background: var(--bg-raised);
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.3);
  max-width: 37.5rem;
  margin: 2rem auto;
}

.error-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-circle);
  background: var(--error);
  color: var(--white);
  font-weight: 700;
  flex-shrink: 0;
}

.error-content {
  flex: 1;
}

.error-content h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
}

.error-content p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-dim);
}

.retry-button {
  padding: 0.5rem 0.875rem;
  border: none;
  border-radius: var(--radius-md);
  background: var(--error);
  color: var(--white);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.retry-button:hover {
  background: var(--error-hover);
}
</style>


