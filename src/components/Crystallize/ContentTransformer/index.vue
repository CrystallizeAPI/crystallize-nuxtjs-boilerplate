<template>
  <div>
    <CrystallizeContentTransformerNode
      v-for="node in nodes"
      :key="node.id"
      :node="node"
    />
  </div>
</template>

<script>
function setIdForNodes(nodes) {
  let i = 0;
  function handleNode(node) {
    node.id = i++;

    if (node.children) {
      node.children.forEach(handleNode);
    }
  }

  nodes.forEach(handleNode);

  return nodes;
}

export default {
  props: {
    data: {
      type: [Object, Array],
      required: false,
      default: null,
    },
  },
  data() {
    const d = this.data;
    let nodes = [];

    if (Array.isArray(d)) {
      nodes = d;
    } else if (d) {
      nodes = [d];
    }

    return {
      nodes: setIdForNodes(nodes),
    };
  },
};
</script>
