<template>
  <header class="outer">
    <NuxtLink to="/" class="logo">
      <LayoutHeaderLogo />
    </NuxtLink>
    
    <slot name="navigation"></slot>
  </header>
</template>

<style scoped src='./index.css'></style>
