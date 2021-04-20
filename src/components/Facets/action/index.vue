<template>
  <button class="facets__action" @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped src="./index.css"></style>