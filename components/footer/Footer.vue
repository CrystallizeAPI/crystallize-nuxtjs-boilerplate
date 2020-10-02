<template>
  <footer class="outer">
    <NuxtLink to="/">
      <div class="logo">
        <img src="/shop-logo.svg" alt="">
      </div>
    </NuxtLink>
    <footer class="navlist">
      <h5>Menu</h5>
      <p v-if="$fetchState.pending">Fetching data...</p>
      <p v-else-if="$fetchState.error">Error while fetching data</p>
      <li
        v-for="child of catalogue.children"
        :key="child.path"
        class="nav-list-item"
      >
        <NuxtLink :to="child.name.toLowerCase()">
          {{ child.name }}
      </NuxtLink>
      </li>
    </footer>
    <div class="powered">
      <p>eCommerce by</p>
      <a href="https://crystallize.com" aria-label="crystallize.com">
        <LogoCrystallize />
      </a>
    </div>
  </footer>
</template>

<script>
import { simplyFetchFromGraph } from '../../libs/graph';

export default {
   data() {
    return { catalogue: {} };
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
}
</script>

<style scoped>
.outer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 1600px;
  margin: 50px auto;
  border-top: 2px solid var(--color-box-background);
  padding: 50px 50px;
  justify-content: space-between;
}

.logo {
  width: 70px;
}

.powered {
  width: 100%;
  display: block;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
}

.powered p {
  margin: 0;
}

.powered svg {
  width: 120px;
}

.navlist {
  list-style: none;
  font-weight: 500;
  font-size: 1rem;
  display: block;
  margin: 0 0 0 auto;
}

.navlist li {
  line-height: 1.5rem;
}

.navlist h5 {
  font-size: 0.7rem;
  font-weight: 400;
  margin-bottom: 10px;
}
</style>