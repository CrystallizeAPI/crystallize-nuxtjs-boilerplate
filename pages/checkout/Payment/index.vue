<template>
  <div>
    <Section :title="$t('checkout.title')">
      <div class="payment">
        <div class="payment__row">
          <div class="payment__input-group">
            <label for="payment__first-name" class="payment__label">
              {{ $t("common.firstName") }}
            </label>
            <input
              v-model="firstName"
              type="text"
              id="payment__first-name"
              name="payment__first-name"
              class="payment__input"
              required
            />
          </div>
          <div class="payment__input-group">
            <label for="payment__last-name" class="payment__label">
              {{ $t("common.lastName") }}
            </label>
            <input
              v-model="lastName"
              type="text"
              id="payment__last-name"
              name="payment__last-name"
              class="payment__input"
              required
            />
          </div>
        </div>
        <div class="payment__row">
          <div class="payment__input-group">
            <label for="payment__email" class="payment__label">
              {{ $t("common.email") }}
            </label>
            <input
              v-model="email"
              type="email"
              id="payment__email"
              name="payment__email"
              class="payment__input"
              required
            />
          </div>
        </div>
      </div>
    </Section>
    <Section :title="$t('checkout.choosePaymentMethod')">
      <div class="checkout-page__payment__providers">
        <Spinner v-if="isPaymentProvidersLoading" />
        <div v-else-if="paymentProvidersEnabled.length === 0">
          {{ $t("checkout.noPaymentProvidersConfigured") }}
        </div>
        <!--
          Since we only did integrate with Stripe paymentProvidersEnabled.length > 0,
          we know for sure that it's the Stripe one.
        -->
        <StripeSelector
          v-else
          :isSelected="selectedPaymentProvider === 'stripe'"
          @on-payment-provider-change="handleSelectPaymentProvider"
          @click="() => handleSelectPaymentProvider({ name: 'stripe' })"
        />
        <StripePayment v-if="selectedPaymentProvider === 'stripe'" />
      </div>
    </Section>
  </div>
</template>

<script>
import { serviceApi } from "/lib/service-api";
import Section from "../Section";
import StripeSelector from "./Providers/Stripe/selector";
import StripePayment from "./Providers/Stripe/payment";
import { QUERY_GET_PAYMENT_PROVIDERS } from "./query-get-payment-providers";
import { retrieveEnabledPaymentProviders } from "./utils";

export default {
  components: { Section, StripeSelector, StripePayment },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      selectedPaymentProvider: null,
      isPaymentProvidersLoading: true,
      paymentProvidersEnabled: [],
    };
  },
  /**
   * Before the component is created
   */
  async beforeCreate() {
    const paymentProvidersResponse = await serviceApi({
      query: QUERY_GET_PAYMENT_PROVIDERS,
    });

    this.isPaymentProvidersLoading = false;
    this.paymentProvidersEnabled = retrieveEnabledPaymentProviders(
      paymentProvidersResponse.data.paymentProviders
    );
  },
  methods: {
    handleSelectPaymentProvider({ name }) {
      this.selectedPaymentProvider = name;
    },
  },
};
</script>

<style scoped src='./index.css'></style>