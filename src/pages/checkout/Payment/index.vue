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
        <client-only>
          <StripePayment v-if="selectedPaymentProvider === 'stripe'" />
        </client-only>
      </div>
    </Section>
  </div>
</template>

<script>
import { serviceApi } from "/lib/service-api";
import Section from "../Section";
import StripeSelector from "./Providers/Stripe/selector";
import StripePayment from "./Providers/Stripe/payment";

/**
 * Retrieves what payment providers have been enabled.
 *
 * We did the Stripe integration as an example, but feel free to add more
 * integrations such as vipps, klarna, etc.
 *
 * If you want to add more payment providers, feel free to remove the hardcoded
 * code, and uncomment the code below.
 */
export function retrieveEnabledPaymentProviders(paymentProvidersConfig) {
  return paymentProvidersConfig.stripe.enabled ? ["stripe"] : [];

  /**
   * Uncomment the following for multiple payment provider integrations.
   */
  // const paymentProvidersNames = Object.keys(paymentProvidersConfig);

  // let paymentProvidersEnabled = [];
  // paymentProvidersNames.forEach((provider) => {
  //   /**
  //    * If the provider is enabled, we add it to the "paymentProvidersEnabled"
  //    */
  //   paymentProvidersConfig[provider].enabled &&
  //     paymentProvidersEnabled.push(paymentProvidersConfig[provider]);
  // });

  // return paymentProvidersEnabled;
}

export default {
  components: { Section, StripeSelector, StripePayment },
  data() {
    /**
     * The checkout model shared between all the payment providers
     * It contains everything needed to make a purchase and complete
     * an order
     */
    const initialFirstName = "";
    const initialLastName = "";
    const initialEmail = "";
    const checkoutModel = {
      basketModel: this.$store.state.basket,
      customer: {
        firstName: initialFirstName,
        lastName: initialLastName,
        addresses: [
          {
            type: "billing",
            email: initialEmail || null,
          },
        ],
      },
      confirmationURL: this.getURL(
        `/confirmation/{crystallizeOrderId}?emptyBasket`
      ),
      checkoutURL: this.getURL(`/checkout`),
      termsURL: this.getURL(`/terms`),
    };

    return {
      firstName: initialFirstName,
      lastName: initialLastName,
      email: initialEmail,
      checkoutModel,
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
      query: `
      {
        paymentProviders {
          stripe {
            enabled
          }
          klarna {
            enabled
          }
          mollie {
            enabled
          }
          vipps {
            enabled
          }
        }
      }
    `,
    });

    this.isPaymentProvidersLoading = false;
    this.paymentProvidersEnabled = retrieveEnabledPaymentProviders(
      paymentProvidersResponse.data.paymentProviders
    );
  },
  watch: {
    /**
     * When the model of firstName changes
     */
    firstName(newValue) {
      this.checkoutModel.customer.firstName = newValue;
    },
    /**
     * When the model of lastName changes
     */
    lastName(newValue) {
      this.checkoutModel.customer.lastName = newValue;
    },
    /**
     * When the model of email changes
     */
    email(newValue) {
      this.checkoutModel.customer.addresses[0].email = newValue;
    },
  },
  methods: {
    handleSelectPaymentProvider({ name }) {
      this.selectedPaymentProvider = name;
    },
    getURL(path) {
      const isServer = typeof window === "undefined";
      if (isServer) {
        return "";
      }

      /**
       * For now, we assume that we only use English.
       * To add multilingual support, we must concat the locale to the URL
       */
      return `${location.protocol}//${location.host}${path}`;
    },
  },
};
</script>

<style scoped src='./index.css'></style>