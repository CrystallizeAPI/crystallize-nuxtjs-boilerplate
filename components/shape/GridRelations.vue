<template>
  <div v-if="!grids"></div>
  <div v-else>
    <Grid v-for="(grid, index) in grids" :key="index" >
      <GridItem :data="grid.item" :gridCell="grid" />
    </Grid>
  </div>
</template>

<script>
export default {
  props: ['grids']
}
</script>