<template>
  <section class="page-header">
    <slot name='before-content' />
    <h1>{{title}}</h1>
    <div v-if="description" class="page-header__description">
      <CrystallizeContentTransformer :data="description" />
    </div>
    <slot name='after-content' />
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: Object,
      required: false,
    }
  }
}
</script>

<style scoped src='./index.css'></style>