<template>
  <div class="login-page">
    <Container>
      <template v-if="isLoggedIn">
        <h1 class="login-page-title">
          {{ $t("common.welcome", { name: user.email }) }}
        </h1>
        <p class="login-page__form-subtitle">
          {{ $t("customer.authentication.login.loggedIn") }}
        </p>
      </template>
      <template v-if="!isLoggedIn">
        <h1 class="login-page-title">
          {{ $t("authentication.login.title") }}
        </h1>
        <form v-on:submit.prevent="onLoginSubmit" class="login-page__form">
          <h4 class="login-page__form-title">
            {{ $t("authentication.login.instructions") }}
          </h4>
          <div class="login-page__form-displayer">
            <input
              type="email"
              :placeholder="$t('common.email')"
              class="login-page__input"
              v-model="inputEmail"
            />
            <Button class="login-page__submit" alignment="center">
              <template v-if="isLoading">
                <Spinner aria-hidden="true" />
              </template>
              <template v-if="!isLoading">
                {{ $t("authentication.login.cta") }}
              </template>
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
     *
     * Take into account that the login page will be rendered if the user
     * is server loading the login page, (for example, going directly to SITE_URL/login).
     * This behavior is expected because since the store would not have been
     * updated at that point, "isLoggedIn" will equal false.t.
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
      return this.$store.state.authentication.user;
    },
    isLoggedIn: function () {
      return this.$store.state.authentication.isLoggedIn;
    },
  },
};
</script>

<style scoped src='./index.css'></style>
