<template>
  <div :class="moduleStyles">
    <!-- The <div> is used to capture the clicks outside the view toggled -->
    <div
      v-if="isAsideShow"
      class="layout-with-aside-view__overlay"
      @click="handleOverlayClick"
      aria-hidden="true"
    />
    <div class="layout-with-aside-view__aside">
      <slot name="view-to-toggle" />
    </div>
    <div class="layout-with-aside-view__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isAsideShow() {
      return this.$store.state.layout.isAsideShown;
    },
    moduleStyles() {
      const baseClass = "layout-with-aside-view";
      let classes = [baseClass];

      const { isAsideShown } = this.$store.state.layout;
      isAsideShown && classes.push(`${baseClass}--is-expanded`);

      return classes.join(" ");
    },
  },
  methods: {
    handleOverlayClick() {
      this.$store.dispatch("layout/hideAside");
    },
  },
};
</script>

<style scoped src='./index.css'></style>