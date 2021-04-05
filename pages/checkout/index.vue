<template>
  <div class="checkout-page">
    <Container>
      <Box>
        <Section :title="$t('checkout.title')">
          <div class="checkout-page__form">content goes here</div>
        </Section>
        <Section :title="$t('checkout.choosePaymentMethod')">
          <div class="checkout-page__payment-providers">content goes here</div>
        </Section>
      </Box>
      <Box>
        <Section :title="$t('basket.title')">
          <div class="checkout-page__cart">content goes here</div>
        </Section>
      </Box>
    </Container>
  </div>
</template>
<script>
import Section from "./Section";
import Box from "./Box";
import { BASKET_STATUS } from "/store/basket/state";

export default {
  components: { Section, Box },
  computed: {
    isLoading() {
      return this.$store.state.basket.status === BASKET_STATUS.NOT_HYDRATED;
    },
  },
};
</script>

<style scoped src='./index.css'></style>