<template>
  <p v-if="type === 'paragraph'">
    <template v-if="textContent">{{ textContent }}</template>
    <template v-for="child in children">
      <CrystallizeContentTransformerNode :key="child.id" :node="child" />
    </template>
  </p>
  <span v-else-if="kind === 'inline' && textContent">{{ textContent }}</span>
  <span v-else-if="kind === 'block' && textContent">{{ textContent }}</span>
</template>

<script>
export default {
  name: "CrystallizeContentTransformerNode",
  props: {
    node: {
      type: Object,
      default: null,
    },
  },
  data() {
    const { textContent, children, type, kind } = this.node || {};

    return {
      textContent,
      children,
      type,
      kind,
    };
  },
};
</script>
