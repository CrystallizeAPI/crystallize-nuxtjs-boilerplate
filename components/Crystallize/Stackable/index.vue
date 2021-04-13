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

      <Collection
        v-if="stack.shape.id === 'item-collection'"
        :title="getCollectionTitle(stack)"
        :description="getCollectionDescription(stack)"
      >
        <CrystallizeCatalogueSlider :items="getItemsFromStack(stack)" />
      </Collection>

      <Collection
        v-if="stack.shape.name === 'Collection'"
        :title="getCollectionTitle(stack)"
        :description="getCollectionDescription(stack)"
      >
        <template>
          <CrystallizeCatalogueSlider
            v-if="getChoiceComponentName(stack) === 'Items'"
            :items="getItemsFromStack(stack)"
          />

          <div
            v-else-if="getChoiceComponentName(stack) === 'Grid'"
            v-for="grid in getGridsFromStack(stack)"
            :key="grid.name"
          >
            <CrystallizeGrid :grid="grid" />
          </div>
        </template>
      </Collection>

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
    getChoiceComponentName: function (stack) {
      const choiceComponent = stack?.components?.find(
        (c) => c.name === "Content"
      );

      if (choiceComponent) {
        /**
         * choice.name can be either "Grid" or "Items"
         */
        return choiceComponent?.content?.selectedComponent;
      }
    },
  },
};
</script>

<style scoped>
.stackable > * {
  margin-bottom: 100px !important;
}
</style>