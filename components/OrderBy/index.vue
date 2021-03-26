<template>
  <select
    class="order-by"
    v-on:change="handleChange"
    :aria-label="$t('search.orderTitle')"
    name="order_by"
  >
    <option
      v-for="(option, index) in orderByOptions"
      :selected="isSelectedOption(option, index)"
      :v-key="option.value"
      :value="option.value"
    >
      {{ $t(`search.order.${option.value}`) }}
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
    };
  },
  methods: {
    handleChange: function (e) {
      const valueSelected = e.target.value;
      const optionSelected = this.orderByOptions.find(
        ({ value }) => value === valueSelected
      );

      const valueDefaultOption = this.orderByOptions[0].value;
      const isDefaultOption = valueDefaultOption === optionSelected.value;

      if (optionSelected) {
        /*
         * We pass the value as an object so we can attach
         * more information to the event in case need.
         */
        const eventPayload = {
          optionSelected: { ...optionSelected, isDefault: isDefaultOption },
        };
        this.$emit("on-change", eventPayload);
      }
    },
    isSelectedOption: function (orderByOption, index) {
      const isOrderByNullish = !this.orderBy;
      const isFirstOption = index === 0;

      if (isOrderByNullish && isFirstOption) {
        return true;
      }

      if (isOrderByNullish && !isFirstOption) {
        return false;
      }

      /*
       * We look for an orderBy option that matches the field and direction
       * passed as prop, so we can compare its value to determine if an option
       * is selected or not.
       */
      const orderBy = orderByOptions.find(
        (opt) =>
          opt.field === this.orderBy.field &&
          opt.direction === this.orderBy.direction
      );

      return orderByOption.value === orderBy?.value;
    },
  },
};
</script>

<style scoped src='./index.css'></style>