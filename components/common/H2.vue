<template>
  <h2 class="h2">
    <slot></slot>
  </h2>
</template>

<style scoped>
.h2 {
  color: var(--color-text-main);
  font-size: 2rem;
  margin: 1rem 0;
}

@media (max-width: 1024px) {
  .h2 {
    font-size: 1.5rem;
  }
}
</style>
