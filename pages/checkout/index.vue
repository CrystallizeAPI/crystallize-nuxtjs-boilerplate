<template>
  <div class="checkout-page">
    <Container class="checkout-page__inner">
      <Box>
        <Section :title="$t('checkout.title')">
          <div class="checkout-page__form">
            <div class="checkout-page__form-row">
              <div class="checkout-page__form-input-group">
                <label class="checkout-page__form-label">
                  {{ $t("common.firstName") }}
                </label>
                <input
                  type="text"
                  class="checkout-page__form-input"
                  name="firstname"
                  value=""
                  required
                />
              </div>
              <div class="checkout-page__form-input-group">
                <label class="checkout-page__form-label">
                  {{ $t("common.lastName") }}
                </label>
                <input
                  type="text"
                  class="checkout-page__form-input"
                  name="lastname"
                  value=""
                  required
                />
              </div>
            </div>
            <div class="checkout-page__form-row">
              <div class="checkout-page__form-input-group">
                <label class="checkout-page__form-label">
                  {{ $t("common.email") }}
                </label>
                <input
                  type="email"
                  class="checkout-page__form-input"
                  name="email"
                  value=""
                  required
                />
              </div>
            </div>
          </div>
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