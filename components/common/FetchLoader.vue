<template>
  <div>
    <div v-if="state.pending" class="fetch-loader">
      <Spinner />
      Please wait...
    </div>
    <div v-else-if="state.error" class="fetch-loader">
      An error occured when getting data for the frontpage
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

<style scoped>
.fetch-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding: 50px;
}

.fetch-loader > svg {
  margin-right: 25px;
}
</style>
