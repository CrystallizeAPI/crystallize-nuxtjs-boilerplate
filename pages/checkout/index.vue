<template>
  <div class="checkout-page">
    <Container class="checkout-page__inner">
      <Box>
        <Section :title="$t('checkout.title')">
          <div class="checkout-page__form">
            <div class="checkout-page__form-row">
              <div class="checkout-page__form-input-group">
                <label
                  for="checkout__first-name"
                  class="checkout-page__form-label"
                >
                  {{ $t("common.firstName") }}
                </label>
                <input
                  v-model="firstName"
                  type="text"
                  id="checkout__first-name"
                  name="checkout__first-name"
                  class="checkout-page__form-input"
                  required
                />
              </div>
              <div class="checkout-page__form-input-group">
                <label
                  for="checkout__last-name"
                  class="checkout-page__form-label"
                >
                  {{ $t("common.lastName") }}
                </label>
                <input
                  v-model="lastName"
                  type="text"
                  id="checkout__last-name"
                  name="checkout__last-name"
                  class="checkout-page__form-input"
                  required
                />
              </div>
            </div>
            <div class="checkout-page__form-row">
              <div class="checkout-page__form-input-group">
                <label for="checkout__email" class="checkout-page__form-label">
                  {{ $t("common.email") }}
                </label>
                <input
                  v-model="email"
                  type="email"
                  id="checkout__email"
                  name="checkout__email"
                  class="checkout-page__form-input"
                  required
                />
              </div>
            </div>
          </div>
        </Section>
        <Section :title="$t('checkout.choosePaymentMethod')">
          <div class="checkout-page__payment-providers">
            <!-- @TODO: Add payment providers dynamically -->
            Payment providers go here
          </div>
        </Section>
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
import Cart from "./Cart";
import Totals from "../../components/Totals";
import { BASKET_STATUS } from "/store/basket/state";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
    };
  },
  components: { Section, Box, Cart, Totals },
  computed: {
    isLoading() {
      return this.$store.state.basket.status === BASKET_STATUS.NOT_HYDRATED;
    },
  },
};
</script>

<style scoped src='./index.css'></style>