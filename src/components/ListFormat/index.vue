<template>
  <ListFormatProduct v-if="data.type === 'product'" :data="data" />
  <ListFormatDocument v-else-if="data.type === 'document'" :data="data" />
  <ListFormatFolder v-else-if="data.type === 'folder'" :data="data" />
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>