<template>
  <div>
    <nav class="nav" :class="open ? 'nav--open' : ''">
      <ul class="nav__list">
        <li v-for="child of navItems" :key="child.path" class="nav__item">
          <NuxtLink :to="child.path">
            <span @click="hideNavBar">{{ child.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <BurgerButton :open="open" @click="toggleNavBar" />
  </div>
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
      this.open ? this.lockDocumentScroll() : this.unlockDocumentScroll();
    },
    hideNavBar() {
      this.open = false;
      this.unlockDocumentScroll();
    },
    lockDocumentScroll() {
      document.body.style.overflow = "hidden";
    },
    unlockDocumentScroll() {
      document.body.style.overflow = "auto";
    },
  },
};
</script>

<style scoped src='./index.css'></style>
