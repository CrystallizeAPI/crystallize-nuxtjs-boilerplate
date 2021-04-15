<template>
  <header class="layout-header">
    <NuxtLink to="/" class="logo" aria-label="crystallize.com">
      <LayoutHeaderLogo />
    </NuxtLink>
    <div class="layout-header__menu">
      <slot name="navigation" />
    </div>
    <div class="layout-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped src='./index.css'></style>
