export const QUERY_GET_PAYMENT_PROVIDERS = `{
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
}`