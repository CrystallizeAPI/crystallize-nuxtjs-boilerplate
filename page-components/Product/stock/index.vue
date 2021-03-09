<template>
  <div class="document__stock">
    <img
      src="/icons/stock.svg"
      class="document__stock-icon"
      width="20"
      height="20"
      alt=""
    />

    <div v-if="!stock || stock === 0" class="document__stock-display">
      Out of stock
    </div>
    <div
      v-else-if="stock && stock > 1 && stock <= stockLimit"
      class="document__stock-display"
    >
      {{ stock }} in stock
    </div>
    <div v-else class="document__stock-display">{{ stockLimit }}+ in stock</div>
    <div
      class="document__stock-color-indicator"
      :style="{ background: stockColor }"
    />
  </div>
</template>

<script>
export default {
  props: {
    stock: {
      type: Number,
      required: false,
    },
  },
  data: function () {
    const STOCK_LIMIT = 20;
    const STOCK_COLOR_INDICATOR = {
      NO_STOCK: "red",
      ABOVE_LIMIT: "#DAF5CB",
      BEETWEN_ZERO_AND_LIMIT: "#FFD23F",
    };

    const hasStock = this.stock > 1;
    const hasMoreStockThanLimit = this.stock > STOCK_LIMIT;

    let stockColor;
    if (!hasStock) {
      stockColor = STOCK_COLOR_INDICATOR.NO_STOCK;
    } else if (hasMoreStockThanLimit) {
      stockColor = STOCK_COLOR_INDICATOR.ABOVE_LIMIT;
    } else {
      stockColor = STOCK_COLOR_INDICATOR.BEETWEN_ZERO_AND_LIMIT;
    }

    return {
      stockLimit: STOCK_LIMIT,
      stockColor,
    };
  },
};
</script>

<style scoped src='./index.css'></style>