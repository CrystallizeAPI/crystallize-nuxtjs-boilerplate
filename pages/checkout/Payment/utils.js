export function retrieveEnabledPaymentProviders(paymentProvidersConfig) {
  const paymentProvidersNames = Object.keys(paymentProvidersConfig);

  let paymentProvidersEnabled = [];
  paymentProvidersNames.forEach((provider) => {
    /**
     * If the provider is enabled, we add it to the "paymentProvidersEnabled"
     */
    paymentProvidersConfig[provider].enabled &&
      paymentProvidersEnabled.push(provider);
  });

  return paymentProvidersEnabled;
}