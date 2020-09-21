<template>
  <header class="header">

  </header>
</template>

<style scoped>
:root {
  --color-text-sub: red;
  --color-text-main: blue;
  --color-main-background: green;
}

.header {
  text-align: center;
  padding: 20px 75px;
  max-width: 1600px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto 0;
}

.logo {
  height: 84px;
  display: block;
  object-fit: contain;
}

.logo img,
.logo svg {
  height: 100%;
}

.nav {
  display: flex;
  margin: 10px 0 0 15px;
  padding-left: 15px;
  width: 100%;
}

.nav-list {
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-list-item {
  margin: 0;
  padding: 0;
  display: inline-block;
  margin: 0 5px;
}

.nav-list-item a {
  display: inline-block;
  padding: 10px 10px;
  transition: all 100ms;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-list-item a {
  display: inline-block;
  padding: 10px 10px;
  transition: all 100ms;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-list-item a:hover {
  text-decoration: underline;
}

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

.nav-actions {
  margin: 8px 10px 0;
  display: flex;
  text-transform: uppercase;
  align-items: center;
}

.nav-actions a 
.nav-actions button {
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 500;
  border: 1.4px solid var(--color-text-main);
  color: var(--color-text-main);
  white-space: nowrap;
  cursor: pointer;
}

.nav-actions a:hover
.nav-actions button:hover {
  background: var( --color-text-main );
  color: var(--color-main-background);
  text-decoration: none;
}

.preview-bar {
  background: #000;
  color: #fff;
  padding: 20px;
  text-align: center;
}

@media (max-width: 768px) { 
  .header {
    padding: 10px 90px 10px 20px;
    justify-content: space-between;
  }

  .nav {
    display: none;
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    min-height: 100vh;
    height: 100%;
    overflow-x: auto;
    scroll-behavior: smooth;
    border: none;
    background: #fafafa;
    margin: 0;
    padding: 2em;
    font-size: 1.5rem;

    
     /* ${is('open')`
    display: block;
    `}; */
  }

 

  .nav-list {
    margin-top: 30px;
  } 

  .nav-list-item {
    display: block;
  }

  .nav-actions {
    display: none;
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    z-index: 99;
    text-align: center;
    margin: 0;
    font-size: 1.5rem;
  }

   /* ${is('open')`
      display: flex;
      justify-content: center;
    `}; */
}

@media (min-width: 768px) { 
  .nav {
    justify-content: center;
  }
}

</style>