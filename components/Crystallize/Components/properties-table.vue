<template>
  <div v-if="data.sections" class="properties-table">
    <div v-for="section in data.sections" :key="section.title" class="section">
      <h3>{{ section.title }}</h3>
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
};
</script>

<style scoped src='./properties-table.css'></style>
