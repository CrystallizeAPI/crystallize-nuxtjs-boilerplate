<template>
  <div class="outer">
    <slot></slot>
  </div>
</template>

<style scoped>
.outer {
  margin-bottom: 30px;
  max-width: var(--max-width);
  padding: 0 0;
  margin: 0 auto;
  display: block;
  min-height: 75vh;
}

@media (max-width: 1024px) {
  .outer {
    padding: 0 1rem;
  }
}
</style>
