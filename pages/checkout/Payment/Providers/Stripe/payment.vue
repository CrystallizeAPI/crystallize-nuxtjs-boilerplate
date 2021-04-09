<template>
  <div>
    <div v-if="isMounted && isStripeLoaded">
      <StripeCardElement
        v-if="isStripeLoaded"
        :pk="publishableKey"
        @token="handleStripeToken"
      />
      <button @click="handlePayment" type="button">
        {{ $t("checkout.payNow") }}
      </button>
    </div>
    <div v-else>stripe is NOT loaded</div>
  </div>
</template>

<script>
import { serviceApi } from "/lib/service-api";

export default {
  data() {
    return {
      publishableKey: null,
      isMounted: false,
      isStripeLoaded: false,
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
  mounted() {
    this.isMounted = true;
  },
  methods: {
    handleStripeToken(token) {
      console.log(token);
    },
    handlePayment() {
      alert("pay");
    },
  },
  head() {
    return {
      script: [
        {
          hid: "stripe",
          src: "https://js.stripe.com/v3/",
          defer: true,
          callback: () => {
            this.isStripeLoaded = true;
          },
        },
      ],
    };
  },
};
</script>