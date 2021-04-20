<template>
  <section class="collection">
    <h4 class="collection__title">{{ title }}</h4>
    <div v-if="description" class="collection__description">
      <CrystallizeContentTransformer :data="description" />
    </div>
    <div class="collection__content">
      <slot />
    </div>
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
     */
    description: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style scoped src='./index.css'></style>