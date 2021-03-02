<template>
  <div class="stackable">
    <div v-for="stack in stacks" :key="stack.id">
      <Collection
        v-if="stack.shape.id === 'grid-collection'"
        :title="getCollectionTitle(stack)"
        :description="getCollectionDescription(stack)"
      >
        <div v-for="grid in getGridsFromStack(stack)" :key="grid.name">
          <CrystallizeGrid :grid="grid" />
        </div>
      </Collection>

      <!-- @TODO: Item Collection -->
      <Collection
        v-if="stack.shape.id === 'item-collection'"
        :title="getCollectionTitle(stack)"
        :description="getCollectionDescription(stack)"
      >
        <CrystallizeCatalogueItems :items="getItemsFromStack(stack)" />
      </Collection>

      <!-- @TODO: Collection This can be a grid collection or item collection -->

      <CrystallizeBanner v-if="stack.shape.id === 'banner'" :data="stack" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stacks: {
      type: Array,
      required: true,
      default: [],
    },
  },
  methods: {
    getCollectionTitle: function (stack) {
      return stack.components?.find((c) => c.name === "Title")?.content?.text;
    },
    getCollectionDescription: function (stack) {
      return stack.components?.find((c) => c.name === "Description")?.content
        ?.json;
    },
    getGridsFromStack: function (stack) {
      return stack.components?.find((c) => c.name === "Grid")?.content?.grids;
    },
    getItemsFromStack: function (stack) {
      return stack.components?.find((c) => c.name === "Items")?.content?.items;
    },
  },
};
</script>

<style scoped>
.stackable > * {
  margin-bottom: 100px !important;
}
</style>