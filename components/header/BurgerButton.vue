<template>
  <button class="outer" >
    <div class="lines" 
      :class="open ? 'lines-active lines-transparent': 'lines-desactive lines-color-bg'"
    >
    </div>
  </button>
</template>

<script>
export default {
  props: ['open', 'onClick']
}
</script>

<style scoped>
.outer {
  appearance: none;
  display: none;
  cursor: pointer;
  background: transparent;
  width: 40px;
  height: 40px;
  position: absolute;
  margin-right: 15px;
  margin-top: 5px;
  right: 15px;
  z-index: 100;
  padding: 0;
}

.lines {
  width: 100%;
  position: absolute;
  background: rgb(85, 84, 84);
  /* background: ${(p) => (p.open ? 'transparent' : 'var(--color-text-main)')}; */
  height: 4px;
  top: 50%;
  margin-top: -2px;
  border-radius: 2px;
  transition: all 0.2s ease-out;
}

.lines-transparent-bg {
  background: transparent;
}

.lines-color-bg {
  background: var(--color-text-main);
}

.lines::before,
.lines::after {
  width: 100%;
  top: -14px;
  background: var(--color-text-main);
  height: 4px;
  content: '';
  position: absolute;
  left: 0;
  transition: all 0.2s ease-out;
}

.lines-active::after {
  transform: rotate(-45deg);
  left: 0px;
  width: 100%;
  top: 0;
}

.lines-desactive::after {
  transform: rotate(0deg);
  left: 8px;
  width: calc(100% - 8px);
  top: 14px;
}

.lines-active::before {
  transform: rotate(45deg);
  top: 0;
}

.lines-desactive::before {
  transform: rotate(0deg);
  top: 14px;
}

/* .lines::after {
  transform: ${(p) => (p.open ? 'rotate(-45deg)' : 'rotate(0deg)')};
  left: ${(p) => (p.open ? '0px' : '8px')};
  width: ${(p) => (p.open ? '100%' : 'calc(100% - 8px)')};
  top: ${(p) => (p.open ? '0' : '14px')};
} */
  
/* .lines::before {
  transform: ${(p) => (p.open ? 'rotate(45deg)' : 'rotate(0deg)')};
  top: ${(p) => (p.open ? '0' : '-14px')};
} */

@media (max-width: 1024px) { 
  .outer { 
    display: block;
  }
}
</style>