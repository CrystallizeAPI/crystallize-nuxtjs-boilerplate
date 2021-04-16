<template>
  <div>
    <div v-if="state.pending" class="fetch-loader">
      <Spinner />
      {{ $t("waiting") }}
    </div>
    <div v-else-if="state.error" class="fetch-loader">
      {{ $t("errorWhenFetching") }}
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped src="./index.css"></style>
