<template>
  <div>
    <div v-for="(section, index) in seactions" :key="index" >
      <H3>{{ section.title }}</H3>
      <div class="properties-outer">
        <table class="properties">
          <tbody v-for="(property, index) in section.properties" :key="index"> 
            <tr>{{ property.key }}</tr>
            <tr>{{ property.value }}</tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['seactions']
}
</script>

<style scoped>
.section {
  margin: 3em 0;
}

.section h3 {
  margin: 0 0 0.5em 0;
  font-size: 1.2rem;
}

.properties-outer {
  overflow: hidden;
  border-bottom: 1px solid var(--color-main-background);
}

.properties {
  width: 100%;
  border-collapse: collapse;
}

.properties td {
  width: 50%;
  padding: 1em 0;
  border: 0px solid var(--color-main-background);
}

.properties  tr:not(:first-child) td {
   border-top-width: 1px;
}

</style>