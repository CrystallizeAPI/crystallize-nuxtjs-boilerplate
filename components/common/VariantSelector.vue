<template>
  <div class="outer">
    
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.outer {
  margin: 30px 0;
}

.variant {
  margin-bottom: 15px;
}

.button {
  color: var(--color-text-sub);
  width: 100%;
  font-weight: bold;
  appearance: none;
  background: white;
  border: none;
  padding: 8px 20px;
  margin: 0;
  cursor: pointer;
  text-transform: capitalize;
  position: relative;
  border-radius: 4px;
}

.button:focus,
.button:active {
  outline: none;
}

.button .selected {
  background: #000;
  color: white;
  border: 1px solid #000;
}

.attribute-name  {
  text-transform: uppercase;
  margin-bottom: 0.2rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.4);
  font-size: 13px;
}

.attribute-selector {
  display: flex;
  margin-bottom: 0.5rem;
}

.attribute-button {
  flex-grow: 1;
  flex-basis: 0;
  text-transform: capitalize;
  font-weight: bold;
  padding: 0.8rem;
}

.attribute-button .selected {
  background: var(--color-text-main);
  color: var(--color-main-background);
}

.attribute-button:first-child {
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
}

.attribute-button:last-child {
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  border-right: none;
}
</style>