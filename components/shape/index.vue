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
      <div v-if="component.type === 'images'">
        <div v-if="!component.content || !component.content.images"></div>
        <div v-else>
          <Images :images="component.content.images" />
        </div>
      </div>
      <!-- video component here -->
      <div v-if="component.type === 'richText'">
        <div v-if="!component.content.json"></div>
        <div v-else>
          <ContentTransformer v-for="(content, i) in component.content.json" :key="i" >
            <div v-for="(child, childindex) in content.children" :key="childindex">
             <p>{{ child.textContent }}</p> 
            </div>
          </ContentTransformer>
        </div>
      </div>
      <div v-if="component.type === 'singleLine'">
        <div class="content-outer">
          <div>{{ component.content.text }}</div>
        </div>
      </div>
       <div v-if="component.type === 'propertiesTable'">
         <div class="content-outer">
          <PropertiesTable :seactions="component.content" />
        </div>
      </div>
      <!-- items relation here -->
      <div v-if="component.type === 'gridRelations'">
        <GridRelations :grids="component.content.grids"  />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['components', 'overrides'],
  data() {
    return {
      filteredComponents:''
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.filteredComponents = this.components?.filter((component) => component.content != null)
    })
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