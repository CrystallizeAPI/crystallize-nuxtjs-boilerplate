<template>
  <div class="basket">
    <h4 class="header">BASKET</h4>
    <TinyBasket />
    <div class="footer">
      <NuxtLink to="somewhere">
        <button class="checkout-btn">
          Go to checkout
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.header {
  flex: 0 0 100px;
  padding: 50px 0;
  align-items: center;
  position: relative;
}

.basket {
  position: relative;
  height: 100vh;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: var(--color-main-background);
  z-index: 15;
}

.footer {
  padding: 0px 0 50px;
}

.checkout-btn {
  width: 100%;
  margin: 20px 0;
  border: 2px solid var(--color-text-main);
  padding: 10px 20px;
  display: block;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}

.checkout-btn:not([disable]):hover {
  background: var(--color-text-main);
  color: var(--color-main-background);
  text-decoration: none;
}

.checkout-btn[disable] {
  cursor: default;
  opacity: 0.5;
  text-decoration: none;
}

</style>