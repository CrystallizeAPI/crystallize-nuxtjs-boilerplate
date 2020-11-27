<template>
  <CrystallizeContentTransformer :data="data.json" />
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
};
</script>
