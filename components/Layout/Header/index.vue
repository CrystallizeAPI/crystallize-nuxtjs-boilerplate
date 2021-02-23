<template>
  <header class="layout-header">
    <NuxtLink to="/" class="logo">
      <LayoutHeaderLogo />
    </NuxtLink>
    <div class="layout-header__menu">
      <slot name="navigation"></slot>
    </div>
    <div class="layout-header__actions">
      <slot name="actions"></slot>
    </div>
  </header>
</template>

<style scoped src='./index.css'></style>
