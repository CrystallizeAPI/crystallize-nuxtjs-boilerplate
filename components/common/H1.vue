<template>
  <h1 class="h1">
    <slot></slot>
  </h1>
</template>

<style scoped>
.h1 {
  margin: 0 0 15px;
  font-size: 3rem;
  font-family: "Roboto Slab", sans-serif;
  color: var(--color-text-main);
}

@media (max-width: 1024px) {
  .h1 {
    font-size: 2.5rem;
  }
}
</style>
