<template>
  <header class="outer">
    <NuxtLink to="/" class="logo">
      <img src="/logo-shop.svg" alt="" />
    </NuxtLink>
    <nav class="nav" :class="open ? 'nav-open' : ''">
      <ul class="nav-list">
        <li v-for="child of navItems" :key="child.path" class="nav-list-item">
          <NuxtLink :to="child.path">
            <span @click="hideNavBar">{{ child.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <BurgerButton :open="open" :toggle-nav-bar="toggleNavBar" />
  </header>
</template>

<script>
export default {
  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return { open: false };
  },
  methods: {
    toggleNavBar() {
      this.open = !this.open;
      document.body.style.overflow = this.open ? "hidden" : "auto";
    },
    hideNavBar() {
      this.open = false;
      document.body.style.overflow = "auto";
    },
  },
};
</script>

<style scoped>
.outer {
  text-align: center;
  padding: 20px 75px;
  max-width: 1600px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto 0;
}

.logo {
  display: inline-block;
  position: relative;
  z-index: 999;
}

.logo img {
  height: 84px;
  display: block;
  object-fit: contain;
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
  cursor: pointer;
}

@media (max-width: 1024px) {
  .outer {
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

  .nav-open {
    display: block;
  }

  .nav-list {
    margin-top: 30px;
  }

  .nav-list-item {
    display: block;
  }
}

@media (min-width: 768px) {
  .nav {
    justify-content: center;
  }
}
</style>
