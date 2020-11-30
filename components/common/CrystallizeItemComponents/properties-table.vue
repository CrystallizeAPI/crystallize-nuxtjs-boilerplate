<template>
  <div v-if="data.sections" class="properties-table">
    <div v-for="section in data.sections" :key="section.title" class="section">
      <H3>{{ section.title }}</H3>
      <table class="table">
        <tbody>
          <tr v-for="(prop, index) in section.properties" :key="index">
            <td class="cell">{{ prop.key }}</td>
            <td class="cell">{{ prop.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    console.log(this.data);
    return {
      test: 1,
    };
  },
};
</script>

<style scoped>
.section {
  margin-bottom: var(--content-padding);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.cell {
  width: 50%;
  padding: 1em 0px;
  border-bottom: 1px solid var(--color-main-background);
}
</style>
