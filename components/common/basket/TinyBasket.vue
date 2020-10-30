<template>
  <div v-if="!cart" class="outer">
    <div class="basket-is-empty">
      Your basket is empty
    </div>
  </div>
  <div v-else class="outer">
    <ul class="items">
      <!-- <li 
        v-for="item in cart"
        :key="item.sku"
        class="item-outer"
      >

      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: ['cart']
}
</script>

<style scoped>
.outer {
  flex: 1 1 auto;
  position: relative;
  z-index: 15;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.items {
  margin: 0;
  flex-grow: 3;
  padding: 0;
  list-style: none;
  overflow-y: auto;
}

.basket-is-empty {
  text-align: center;
  margin: 25px;
}

.remaining-until-freeshipping {
  text-align: left;
  flex-grow: 1;
  padding: 15px 0px;
  font-size: 14px;
  margin-top: 15px;
  font-weight: 600;
  border-top: 1px dashed #dfdfdf;
}

.item-outer {
  display: block;
  margin: 0;
}

.item-is-subscription {
  display: block;
  font-weight: bold;
}
</style>