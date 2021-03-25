<template>
  <div class="login-page">
    <Container>
      <template v-if="user.isLoggedIn">
        <h1 class="login-page-title">Welcome {{ user.email }}</h1>
        <p class="login-page__form-subtitle">You are logged in</p>
      </template>
      <template v-if="!user.isLoggedIn">
        <h1 class="login-page-title">Login</h1>
        <form v-on:submit.prevent="onLoginSubmit" class="login-page__form">
          <h4 class="login-page__form-title">
            Enter your email address and we’ll send a magic login link to your
            inbox.
          </h4>
          <div class="login-page__form-displayer">
            <input
              type="email"
              placeholder="Email"
              class="login-page__input"
              v-model="inputEmail"
            />
            <Button class="login-page__submit" alignment="center">
              <template v-if="isLoading">
                <Spinner />
              </template>
              <template v-if="!isLoading">Send me a magic link</template>
            </Button>
          </div>
          <p v-if="message" class="login-page__message">{{ message }}</p>
        </form>
      </template>
    </Container>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      isLoading: false,
      hasErrors: false,
      inputEmail: "",
      message: null,
    };
  },
  /*
   * Middlewares are functions that are executed before rendering a page.
   * It's useful in order to check for certain things such as the store.
   *
   * To learn more about middleware visit https://nuxtjs.org/docs/2.x/directory-structure/middleware/
   */
  async middleware({ store, redirect }) {
    /*
     * We redirect logged in users that are trying to visit "/login" to "/account".
     */
    if (store.state.authentication.isLoggedIn) {
      redirect("/account");
    }
  },
  methods: {
    onLoginSubmit: function () {
      this.isLoading = true;
      this.$store
        .dispatch("authentication/sendMagicLink", {
          email: this.inputEmail,
        })
        .then(() => {
          this.isLoading = false;
          this.hasErrors = false;
          this.message = "Check your mail inbox for a login link";
        })
        .catch(() => {
          this.isLoading = false;
          this.hasErrors = true;
          this.message = "Could not send the login link email =(";
        });
    },
  },
  computed: {
    user: function () {
      return this.$store.state.authentication;
    },
  },
};
</script>

<style scoped src='./index.css'></style>