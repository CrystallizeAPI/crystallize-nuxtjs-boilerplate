<template>
  <div>
    <SubHeader centerContent="true">
      <H1>{{ folder.name }}</H1>
      <Shape :components="rest" />
    </SubHeader>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      folder: this.data.folder,
      children: this.data.folder.children,
      rest: ''
    }
  },
  mounted() {
     const gridRelations = this.folder.components
    ?.filter((c) => c.type === 'gridRelations')
    ?.reduce((acc, g) => [...acc, ...(g?.content?.grids || [])], []);

    const rest = this.folder.components?.filter((c) => c.type !== 'gridRelations');

    this.rest = rest;
  }
}
</script>

<style scoped>
.list {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;
}
</style>