<template>
  <div class="outer">
    <div class="login">
      <h1 class="title">Login</h1>
      <form>
        <h4>Enter your email address and we’ll send a magic login link to your inbox.</h4>
        <div class="login">
          <div class="fields">
            <input 
              type="email" 
              name="email" 
              placeholder="Email"
              required
            >
            <Button />
            <!-- <button type="submit" value="Submit">
              send me a magick link
            </button> -->
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.outer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.title {
  margin: 0 0 15px;
  font-size: 3rem;
  font-family: 'Roboto Slab', sans-serif;
  color: var(--color-text-main);
}

.login {
  text-align: center;
}

.login form {
  background: var(--color-box-background);
  padding: 50px;
  margin: 100px auto 0;
  max-width: 700px;
}

.login h4 {
  margin: 0 auto;
  max-width: 400px;
}

.login p {
  margin: 50px 20px;
}

.fields {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.fields input {
  flex: 1 1 auto;
  border: 2px solid #000;
  border-right-width: 0;
  padding: 15px;
  margin: 0;
}

.fields button {
  flex: 0 0 auto;
}

@media (max-width: 1024px) {
  .title {
    font-size: 2.5rem;
  }

  .fields {
    display: block;
  }

  .fields input { 
    width: 100%;
    min-width: auto;
    border-right-width: 2px;
    margin-bottom: 20px;
  }
}
</style>
