<template>
  <section class="page-header">
    <slot name="preHeader" />
    <h1 class="page-header__title">{{ title }}</h1>
    <div v-if="description" class="page-header__description">
      <CrystallizeContentTransformer :data="description" />
    </div>
    <slot name="postHeader" />
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    /*
     * The description prop is coupled to how the Crystallize GraphQLtreats text
     *
     */
    description: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style scoped src='./index.css'></style>