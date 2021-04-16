<template>
  <Container>
    <div class="footer__inner">
      <div>
        <NuxtLink to="/" aria-label="crystallize.com">
          <img
            class="footer__logo"
            src="/logo-shop.svg"
            alt=""
            width="69"
            height="84"
            style="border: none"
          />
        </NuxtLink>
      </div>
      <footer class="footer__navlist">
        <h5>{{ $t("common.menu") }}</h5>
        <ul class="footer__navlist-list" v-if="navItems">
          <li
            v-for="child of navItems"
            :key="child.path"
            class="footer__navlist-item"
          >
            <NuxtLink :to="child.path">
              {{ child.name }}
            </NuxtLink>
          </li>
        </ul>
      </footer>
      <div class="footer__powered">
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
    </div>
  </Container>
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
