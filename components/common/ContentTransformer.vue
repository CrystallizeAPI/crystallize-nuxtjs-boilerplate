<template>
  <div>
    <slot>
    </slot>
  </div>
</template>


<style scoped>
p,
h2,
h3,
h4,
h5,
h6 {
  margin: 0 auto;
  text-align: left;
  /* max-width: ${maxWidth}; */
}

h3 {
  font-size: 2rem;
}

p,
li {
  font-size: 1.1rem;
  line-height: 1.6rem;
}

p {
  margin: 0 0 0.5em;
  line-height: 1.8;
}

ul {
  /* max-width: ${maxWidth}; */
  margin: 0 auto;
  display: block;
  list-style: none;
  margin: 1em 0 1em 30px;
}

ul > li {
  position: relative;
  display: block;
}

ul > li:not(:last-child) {
  margin-bottom: 1em;
}

ul > li::before {
  position: absolute;
  width: 8px;
  top: 50%;
  margin-top: -5px;
  left: -30px;
  height: 8px;
  content: '';
  border-radius: 50%;
  background: rgb(143, 222, 203);
}

pre {
  margin-left: calc(-0.5 * var(--content-padding));
  width: calc(100% + var(--content-padding));
  font-size: 16px;
  box-shadow: rgba(0, 0, 0, 0.05) 2px 1px 1px;
  line-height: 1.6;
  padding: 25px 50px;
  background: rgb(243, 244, 246);
  border-radius: 5px;
  overflow: auto;
}
</style>