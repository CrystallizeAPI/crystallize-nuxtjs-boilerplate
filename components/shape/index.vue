<template>
  <div v-if="!components || !Array.isArray(components)"></div>
  <div v-else>
    <div v-for="(component, index) in filteredComponents" :key="index">
      <div v-if="component.type === 'paragraphCollection'">
        <div v-if="!component.content.paragraphs"></div>
        <div v-else >
          <ParagraphCollection :paragraphs="component.content.paragraphs" />
        </div>
      </div>
      <!-- {{ component.type }} -->
    </div>
  </div>
</template>

<script>
export default {
  props: ['components', 'overrides'],
  data() {
    return {
      filteredComponents: this.components?.filter((component) => component.content != null)
    }
  },
  mounted() {
    // const demo = this.components?.filter((component) => component.content != null)

    // console.log('COMPONENT DATA ', demo);
  }
}
</script>

<style scoped>
.content-outer {
  margin: 1em var(--content-padding);
}

@media (max-width: 768px) {
  .content-outer {
    margin: 0;
  }
}
</style>