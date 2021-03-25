<template>
  <div class="account-page">
    <Container>
      <template v-if="user">
        <h1 class="account-page__title">Hi {{ user.email }}</h1>
        <a class="account-page__logout" :href="logoutLink.href">Logout</a>
      </template>
      <p v-else>you are not logged in</p>
    </Container>
  </div>
</template>

<script>
export default {
  computed: {
    user: function () {
      return this.$store.state.authentication.user;
    },
    logoutLink: function () {
      return this.$store.state.authentication.logoutLink;
    },
  },
};
</script>

<style scoped src='./index.css'></style>