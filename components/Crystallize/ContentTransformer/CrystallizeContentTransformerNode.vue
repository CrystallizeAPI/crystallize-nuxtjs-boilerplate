<template>
  <p v-if="type === 'paragraph'">
    <template v-if="textContent">{{ textContent }}</template>
    <CrystallizeContentTransformerNode
      v-for="child in children"
      :key="child.id"
      :node="child"
    />
  </p>
  <blockquote v-else-if="type === 'quote'">
    <template v-if="textContent">{{ textContent }}</template>
    <CrystallizeContentTransformerNode
      v-for="child in children"
      :key="child.id"
      :node="child"
    />
  </blockquote>
  <a v-else-if="type === 'link'" :href="metadata.href">
    <span v-if="textContent">{{ textContent }}</span>
    <span v-else-if="children && children.length > 0">
      <CrystallizeContentTransformerNode
        v-for="child in children"
        :key="child.id"
        :node="child"
      />
    </span>
  </a>
  <ul v-else-if="type === 'unordered-list'">
    <CrystallizeContentTransformerNode
      v-for="child in children"
      :key="child.id"
      :node="child"
    />
  </ul>
  <ol v-else-if="type === 'ordered-list'">
    <CrystallizeContentTransformerNode
      v-for="child in children"
      :key="child.id"
      :node="child"
    />
  </ol>
  <li v-else-if="type === 'list-item'">
    <span v-if="textContent">{{ textContent }}</span>
    <span v-else-if="children && children.length > 0">
      <CrystallizeContentTransformerNode
        v-for="child in children"
        :key="child.id"
        :node="child"
      />
    </span>
  </li>
  <span v-else-if="textContent">{{ textContent }}</span>
  <span v-else-if="children && children.length > 0">
    <CrystallizeContentTransformerNode
      v-for="child in children"
      :key="child.id"
      :node="child"
    />
  </span>
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
    const { textContent, children, type, kind, metadata } = this.node || {};

    return {
      textContent,
      children,
      type,
      kind,
      metadata,
    };
  },
};
</script>
