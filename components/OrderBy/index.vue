<template>
  <select
    class="order-by"
    v-on:change="handleChange"
    aria-label="Order by"
    name="order_by"
  >
    <option
      v-for="(option, index) in orderByOptions"
      :selected="isSelectedOption(option, index)"
      :v-key="option.value"
      :value="option.value"
    >
      <!--
      @TODO: add translations so we have have this:
        order: {
            ITEM_NAME_ASC: 'Name ascending',
            ITEM_NAME_DESC: 'Name descending',
            PRICE_ASC: 'Price ascending',
            PRICE_DESC: 'Price descending',
            STOCK_ASC: 'Stock ascending',
            STOCK_DESC: 'Stock descending'
          }
      -->
      {{ option.value }}
    </option>
  </select>
</template>

<script>
import { orderByOptions } from "/lib/search";

export default {
  props: {
    orderBy: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      orderByOptions,
      selectedValue: this.orderby?.value,
    };
  },
  methods: {
    handleChange: function (e) {
      const optionSelected = e.target.value;
      const eventPayload = { value: optionSelected };
      this.$emit("on-change", eventPayload);
    },
    isSelectedOption: function (orderByOption, index) {
      /*
       * If there is no orderBy value provided and it's the first element
       */
      if ((!this.orderBy || !this.orderBy.value) && index === 0) {
        return true;
      }

      return orderByOption.value === this.orderBy.value;
    },
  },
};
</script>

<style scoped src='./index.css'></style>