<template>
  <div class="pagination">
    <button
      class="pagination__button"
      aria-label="Navigate to previous page"
      @click="$emit('pagination-change', { direction: directions.previous })"
      :aria-hidden="!hasPreviousPage"
      :disabled="!hasPreviousPage"
    >
      ←
    </button>
    <button
      class="pagination__button"
      aria-label="Navigate to next page"
      @click="$emit('pagination-change', { direction: directions.next })"
      :aria-hidden="!hasNextPage"
      :disabled="!hasNextPage"
    >
      →
    </button>
  </div>
</template>

<script>
import { PAGINATION_DIRECTION } from "./utils";

export default {
  props: {
    hasPreviousPage: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasNextPage: {
      type: Boolean,
      required: true,
    },
  },
  data: function () {
    return {
      directions: PAGINATION_DIRECTION,
    };
  },
};
</script>

<style scoped src='./index.css'></style>