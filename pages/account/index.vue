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
  middleware({ store, redirect }) {
    /*
     * Users that haven't logged in, are redirected to the login page
     * before the page is rendered, so the users doesn't see any flash.
     */
    if (!store.state.authentication.isLoggedIn) {
      redirect("/login");
    }
  },
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