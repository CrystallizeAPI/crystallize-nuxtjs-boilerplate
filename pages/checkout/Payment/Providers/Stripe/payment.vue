<template>
  <div>
    <div v-if="isStripeLoaded">stripe is loaded</div>
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