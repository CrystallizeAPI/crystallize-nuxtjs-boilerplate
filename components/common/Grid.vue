<template>
  <div 
    class="styled-grid"
    :style="{ gridTemplateColumns: `repeat(${totalColSpan}, 1fr)`}"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['grid'],
    data() {
      return {
        totalColSpan: this.getTotalColSpan(this.grid) === 0 ? 3 : this.getTotalColSpan(this.grid),
      }
    },
    methods: {
      getTotalColSpan(grid) {
        const totalColSpan = grid?.rows?.[0]?.columns?.reduce(
          (acc, col) => acc + col.layout.colspan,
          0
        ) ?? 0;

        console.log('total colspan',totalColSpan);
        return totalColSpan;
      }
    }
  }
</script>

<style scoped>

.styled-grid {
  display: grid;
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