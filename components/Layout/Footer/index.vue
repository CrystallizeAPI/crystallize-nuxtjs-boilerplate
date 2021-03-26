<template>
  <footer class="outer">
    <div>
      <NuxtLink to="/" class="logo">
        <img
          src="/logo-shop.svg"
          alt=""
          width="69"
          height="84"
          style="border: none"
        />
      </NuxtLink>
    </div>
    <footer class="navlist">
      <h5>{{ $t("common.menu") }}</h5>
      <li v-for="child of navItems" :key="child.path" class="nav-list-item">
        <NuxtLink :to="child.path">
          {{ child.name }}
        </NuxtLink>
      </li>
    </footer>
    <div class="powered">
      <p>{{ $t("common.ecomBy") }}</p>
      <a href="https://crystallize.com" aria-label="crystallize.com">
        <img
          src="/logo-crystallize.svg"
          alt=""
          width="120"
          height="54"
          style="border: none"
        />
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped src='./index.css'></style>
