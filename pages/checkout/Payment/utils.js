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
  return paymentProvidersConfig.stripe.enabled
    ? ["stripe"]
    : []

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