<template>
  <aside
    class="document__aside"
    :class="`${isSticky ? 'document__aside--sticky' : ''}`"
  >
    <h3 class="document__aside-title">Featured</h3>
    <ul class="document__aside-list">
      <li
        v-for="item in items"
        :v-key="item.id"
        class="document__aside-list-element"
      >
        <MicroFormatProduct :data="item" />
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    isSticky: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped src='./index.css'></style>