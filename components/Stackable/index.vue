<template>
  <div>
    <div v-for="stack in stacks" :key="stack.id">
      <!-- @TODO: Grid Collection -->
      <Collection :title="getTitle(stack)" :description="getDescription(stack)">
        <div v-for="grid in getGridsFromStack(stack)" :key="grid.name">
          <CrystallizeGrid :grid="grid" />
        </div>
      </Collection>

      <!-- @TODO: Item Collection -->
      <!-- @TODO: Collection This can be a grid collection or item collection -->
      <!-- @TODO: Banner -->
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
    getTitle: function (stack) {
      return stack.components?.find((c) => c.name === "Title")?.content?.text;
    },
    getDescription: function (stack) {
      return stack.components?.find((c) => c.name === "Description")?.content
        ?.json;
    },
    getGridsFromStack: function (stack) {
      return stack.components?.find((c) => c.name === "Grid")?.content?.grids;
    },
  },
};
</script>