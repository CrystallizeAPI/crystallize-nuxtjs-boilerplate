<template>
  <div
    class="header"
    :class="
      centerContent ? 'text-center auto-margin' : 'text-left bottom-margin'
    "
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    centerContent: Boolean,
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.auto-margin {
  margin: 0 auto;
}

.bottom-margin {
  margin: 0 0 50px 0;
}

.header {
  display: flex;
  flex-direction: column;
  padding: 100px 50px 50px;
  /* text-align: ${(p) => (p.centerContent ? 'center' : 'left')};
  margin: ${(p) => (p.centerContent ? '0 auto' : '0 0 50px 0')}; */
  max-width: 800px;
}

.header h1 {
  font-size: 2.4rem;
  margin-bottom: 10px;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
}

.header p {
  /* text-align: ${(p) => (p.centerContent ? 'center !important' : 'left')}; */
  font-size: 18px;
  line-height: 1.8rem;
  color: var(--color-text-sub);
  margin: 0;
}

@media (max-width: 768px) {
  .header {
    padding: 100px 0 50px;
  }
}
</style>
