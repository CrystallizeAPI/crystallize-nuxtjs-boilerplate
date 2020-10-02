<template>
  <button 
    class="outer" 
    :type="type ? 'type' : 'button'"
  >
    <span class="inner">
      <span class="text">
        send me a magick link
      </span>
    </span>
  </button>
</template>

<script>
export default {
  props: ['type', 'width']
}
</script>

<style scoped>
.inner {
  flex: 1 1 auto;
  background: var(--color-box-background);
  color: var(--color-text-main);
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  padding: 16px 25px;
  position: relative;
}

.outer {
  /* min-width: ${(p) => (p.width ? p.width : '120px')}; */
  min-width: 120px;
  display: inline-flex;
  border-radius: 0;
  border: none;
  border: 2px solid var(--color-text-main);
  padding: 0;
  appearance: none;
  cursor: pointer;
  text-decoration: none;
}

.inner:hover {
  background: var(--color-text-main);
  color: var(--color-main-background);
}

.outer:disabled {
  cursor: default;
}

.outer:disabled .inner {
  background: #aaa;
  color: #333;
}

.text {
  position: relative;
  z-index: 2;
  transition: opacity 100ms, transform 100ms;
  white-space: nowrap;

   /* ${isNot('shown')`
    opacity: 0;
    transform: scale(0.7);
  `}; */
}

</style>