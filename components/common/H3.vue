<template>
  <h3 class="h3">
    <slot></slot>
  </h3>
</template>

<style scoped>
.h3 {
  color: var(--color-text-main);
  font-size: 1.4rem;
  margin: 1rem 0;
}

@media (max-width: 1024px) {
  .h3 {
    font-size: 1.2rem;
  }
}
</style>
