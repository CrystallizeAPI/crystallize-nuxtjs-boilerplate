<template>
  <PaymentProviderSelector
    name="stripe"
    src="/stripe-logo.png"
    hexColor="#6773E6"
    :isSelected="isSelected"
    @click="$emit('click')"
  />
</template>

<script>
import PaymentProviderSelector from "../../SelectorButton";
export default {
  components: { PaymentProviderSelector },
  props: {
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
};
</script>