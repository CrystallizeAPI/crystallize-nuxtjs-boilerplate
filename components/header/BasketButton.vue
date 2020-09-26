<template>
  <button class="basket">
    <IconBasket />
    <div class="basket-quantity">0</div>
  </button>
</template>

<style scoped>
.basket {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  padding: 0;
  border-radius: 5px;
  justify-self: flex-end;
}

.basket img,
.basket svg {
  width: 40px;
}

.basket:hover,
.basket:active {
  background: rgba(0, 0, 0, 0.05);
}

.basket svg path {
  stroke: var(--color-text-sub);
}

.basket-quantity {
  position: absolute;
  font-weight: 500;
  font-size: 14px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -25%);
}
</style>