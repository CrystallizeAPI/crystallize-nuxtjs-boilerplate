<template>
  <div class="product-footer">
    <div class="price">
      <strong>${{ selectedVariant.price }}.00</strong>
    </div>
    <Button>
      Add to Basket
    </Button>
  </div>
</template>

<script>
export default {
  props: ['product', 'selectedVariant']
}
</script>

<style scoped>
.product-footer {
  display: flex;
  flex-wrap: wrap;
  padding: 45px 0 0;
  justify-content: space-between;
  border-top: 1px solid #cecece;
  align-items: center;
}

.price {
  text-align: center;
  color: var(--color-text-sub);
  font-size: 30px;
  margin: 20px;
  margin-left: 0;
}

.price strong {
  display: inline-block;
  margin-left: 5px;
}

@media (max-width: 768px) { 
  .product-footer button {
    flex-grow: 1;
    margin: 1rem 0;
  }

  .price {
    flex-grow: 1;
  }
}
</style>