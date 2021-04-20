<template>
  <div class="checkout-page">
    <Container class="checkout-page__inner">
      <Box>
        <Payment />
      </Box>
      <Box>
        <!-- The height: 100% is required in order to place to total at the bottom -->
        <Section :title="$t('basket.title')" :style="{ height: '100%' }">
          <div class="checkout-page__basket">
            <Cart />
            <Totals />
          </div>
        </Section>
      </Box>
    </Container>
  </div>
</template>

<script>
import Section from "./Section";
import Box from "./Box";
import Payment from "./Payment";
import Cart from "./Cart";
import Totals from "../../components/Totals";
import { BASKET_STATUS } from "../../store/basket/state";

export default {
  components: { Section, Box, Payment, Cart, Totals },
  computed: {
    isLoading() {
      return this.$store.state.basket.status === BASKET_STATUS.NOT_HYDRATED;
    },
  },
};
</script>

<style scoped src='./index.css'></style>