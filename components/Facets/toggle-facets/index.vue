<template>
  <!--
    We pass custom variable values to the Button components
    so we don't have to deal with specificity issues
    that can only be solved with !important.
    -->
  <Button
    @click="$emit('click')"
    class="facets__button"
    :style="{
      '--color-background': 'white',
      '--color-text': 'var(--color-primary-action-content)',
      '--color-background-hover': '#f7f7f7',
      '--color-text-hover': 'var(--color-primary-action-content)',
    }"
  >
    <!-- we use a slot to pass the text of the button -->
    <slot />
    <img src="/icons/filters.svg" alt="" aria-hidden="true" />
  </Button>
</template>


<style src='./index.css'></style>
