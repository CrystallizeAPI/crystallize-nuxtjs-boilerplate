<template>
  <div class="styled-grid">
    <slot></slot>
  </div>
</template>

<style scoped>
.styled-grid {
  grid-gap: 20px;
  grid-template-rows: 700px;
}

@media (max-width: 768px) {
  .styled-grid {
    display: block !important;
    grid-template-columns: 100% !important;
  }
}
</style>