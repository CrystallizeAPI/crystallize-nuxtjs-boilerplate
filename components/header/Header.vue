<template>
  <header class="outer">
    <NuxtLink to="/">
      <div class="logo">
        <img src="/shop-logo.svg" alt="" />
      </div>
    </NuxtLink>
    <nav 
      class="nav"
      :class="open ? 'nav-open' : ''"
    >
      <p v-if="$fetchState.pending">Fetching data...</p>
      <p v-else-if="$fetchState.error">Error while fetching data</p>
      <ul v-else class="nav-list">
        <li
          v-for="child of catalogue.children"
          :key="child.path"
          class="nav-list-item"
        >
         <NuxtLink :to="child.name.toLowerCase()">
           {{ child.name }}
        </NuxtLink>
        </li>
      </ul>
    </nav>
    <div 
      class="nav-actions"
      :class="open ? 'nav-actions-open' : ''"
    >
      <NuxtLink to="/">
        <span class="link">Login</span>
      </NuxtLink>
    </div>
    <BasketButton />
    <BurgerButton :open="open" :toggleNavBar="toggleNavBar" />
  </header>
</template>

<script>
import { simplyFetchFromGraph } from '../../libs/graph';

export default {
  data() {
    return { catalogue: {}, open: false };
  },
  async fetch() {
    const query = `
      query {
        catalogue {
          children {
            id
            name
          }
        }
      }
    `
    const { data } = await simplyFetchFromGraph({ query });

    this.catalogue = data.catalogue;
  },
  methods: {
    toggleNavBar() {
      this.open = !this.open;
    }
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
  cursor: pointer;
}

.nav-actions {
  margin: 8px 10px 0;
  display: flex;
  text-transform: uppercase;
  align-items: center;
}

.nav-actions .link,
.nav-actions button {
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 500;
  border: 1.4px solid var(--color-text-main);
  color: var(--color-text-main);
  white-space: nowrap;
  cursor: pointer;
}

.nav-actions .link:hover,
.nav-actions button:hover {
  background: var(--color-text-main);
  color: var(--color-main-background);
  text-decoration: none;
}

.preview-bar {
  background: #000;
  color: #fff;
  padding: 20px;
  text-align: center;
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

  .nav-actions-open {
    display: flex;
    justify-content: center;
  }
}

@media (min-width: 768px) {
  .nav {
    justify-content: center;
  }
}
</style>
