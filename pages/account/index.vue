<template>
  <div class="account-page">
    <Container>
      <template v-if="user.isLoggedIn">
        <h1 class="account-page-title">Welcome {{ user.email }}</h1>
        <p>You are logged in</p>
      </template>
      <template v-if="!user.isLoggedIn">
        <h1 class="account-page-title">Login</h1>
        <div class="account-page__form-wrapper">
          <form class="account-page__form">
            <h4 class="account-page__form-title">
              Enter your email address and we’ll send a magic login link to your
              inbox.
            </h4>
            <div class="account-page__form-displayer">
              <input
                type="email"
                placeholder="Email"
                class="account-page__input"
              />
              <Button class="account-page__submit" alignment="center">
                Send me a magic link
              </Button>
            </div>
          </form>
        </div>
      </template>
    </Container>
  </div>
</template>

<script>
export default {
  computed: {
    user: function () {
      return this.$store.state.authentication;
    },
  },
};
</script>

<style scoped src='./index.css'></style>