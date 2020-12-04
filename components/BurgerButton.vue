<template>
  <button class="outer" type="button" @click="$emit('click')">
    <div class="lines" :class="open ? 'open' : ''"></div>
  </button>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.outer {
  appearance: none;
  display: none;
  cursor: pointer;
  background: transparent;
  width: 40px;
  height: 40px;
  position: absolute;
  margin-right: 15px;
  margin-top: 5px;
  right: 15px;
  z-index: 100;
  padding: 0;
}

.lines {
  width: 100%;
  position: absolute;
  background: var(--color-text-main);
  height: 4px;
  top: 50%;
  margin-top: -2px;
  border-radius: 2px;
  transition: all 0.2s ease-out;
}

.lines.open {
  background: transparent;
}

.lines::before,
.lines::after {
  width: 100%;
  top: -14px;
  background: var(--color-text-main);
  height: 4px;
  content: "";
  position: absolute;
  left: 0;
  transition: all 0.2s ease-out;
  transform: rotate(0deg);
}

.lines::after {
  left: 8px;
  width: calc(100% - 8px);
  top: 14px;
}

.lines.open::after {
  transform: rotate(-45deg);
  left: 0px;
  width: 100%;
  top: 0;
}

.lines::before {
  top: -14px;
}

.lines.open::before {
  transform: rotate(45deg);
  top: 0;
}

@media (max-width: 1024px) {
  .outer {
    display: block;
  }
}
</style>
