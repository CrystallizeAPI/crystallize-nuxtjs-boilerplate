<template>
  <div>
    <template v-if="publishableKey">
      <StripeElementCard
        ref="stripeCardRef"
        :pk="publishableKey"
        @token="handleStripeToken"
      />
      <Button @click="handleSubmit" alignment="center" type="button">
        {{ $t("checkout.payNow") }}
      </Button>
    </template>
    <Spinner v-else />
  </div>
</template>

<script>
import { serviceApi } from "/lib/service-api";
import { StripeElementCard } from "@vue-stripe/vue-stripe";

export default {
  components: { StripeElementCard },
  data() {
    return {
      status: "idle",
      publishableKey: null,
    };
  },
  async beforeCreate() {
    const { data } = await serviceApi({
      query: `
      {
        paymentProviders {
          stripe {
            config
          }
        }
      }
    `,
    });

    this.publishableKey = data.paymentProviders.stripe.config.publishableKey;
  },
  methods: {
    handleStripeToken(token) {
      // 1. Confirm Card Payment
      // 2. If payment intent succeeded, do "mutation confirmStripeOrder"
      // 3. Redirect to /confirmation/{crystallizeOrderId}?emptyBasket
    },
    handleSubmit() {
      this.status = "confirming";
      this.$refs.stripeCardRef.submit();
    },
  },
};
</script>