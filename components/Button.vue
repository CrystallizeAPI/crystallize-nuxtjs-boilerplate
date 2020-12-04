<template>
  <button class="button outer" @click="$emit('click')">
    <span class="inner">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.inner {
  flex: 1 1 auto;
  border: 2px solid var(--color-text-main);
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  padding: 16px 25px;
  position: relative;
  border-radius: 0.2rem;
}

.outer {
  display: inline-flex;
  border-radius: 0;
  border: none;
  padding: 0;
  appearance: none;
  cursor: pointer;
  text-decoration: none;
}

.outer:not(:disabled):hover > .inner {
  background: var(--color-text-main);
  color: var(--color-main-background);
}

.outer.secondary > .inner {
  background: var(--color-text-main);
  color: var(--color-main-background);
}

.outer.secondary:not(:disabled):hover > .inner {
  background: transparent;
  border-color: transparent;
  color: inherit;
}

.outer:disabled {
  cursor: default;
}

.outer:disabled .inner {
  background: #aaa;
  color: #333;
}
</style>
