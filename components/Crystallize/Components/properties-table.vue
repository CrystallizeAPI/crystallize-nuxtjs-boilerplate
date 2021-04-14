<template>
  <div v-if="data.sections" class="properties-table">
    <div
      v-for="section in data.sections"
      :key="section.title"
      class="properties-table__section"
    >
      <h3 class="properties-table__title">{{ section.title }}</h3>
      <table class="properties-table__table">
        <tbody>
          <tr
            v-for="(prop, index) in section.properties"
            :key="index"
            class="properties-table__row"
          >
            <td class="properties-table__cell properties-table__cell--bold">
              {{ prop.key }}
            </td>
            <td class="properties-table__cell">{{ prop.value }}</td>
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
      default: [],
    },
  },
};
</script>

<style scoped src='./properties-table.css'></style>
