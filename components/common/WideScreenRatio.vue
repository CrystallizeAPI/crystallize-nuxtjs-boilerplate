<template>
  <div class="outer" :style="{ paddingTop: `${(9 / 16) * 100}%` }">
    <div class="inner">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.outer {
  /* padding-top: ${(9 / 16) * 100}%; */
  position: relative;
}

.inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}
</style>