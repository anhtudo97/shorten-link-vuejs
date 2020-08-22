<template>
  <div>
    <v-row id="login" no-gutters class="login overflow-hidden">
      <v-col class="pa-md-10 pa-16 align-self-center login__form-login" cols="12" md="5" lg="4">
        <div class="login-image text-center">
          <img src="~/assets/logo.png" />
        </div>
        <div class="text-center login-title">Create a new account</div>
        <v-sheet>
          <form action>
            <v-text-field label="Your name or company name" outlined></v-text-field>
            <v-text-field label="Your business email" outlined></v-text-field>
            <v-text-field label="Your Password" outlined type="password"></v-text-field>
            <v-btn class="login-button">
              <div class="button-text my-3">Create account</div>
            </v-btn>
          </form>
        </v-sheet>
        <div class="text-center mt-3 px-10">
          By creating an account you agree to our
          <strong class="account-signup">terms</strong> and
          <strong class="account-signup">privacy policy</strong>
        </div>
        <div class="text-center mt-1">
          Already have an account?
          <nuxt-link to="/">
            <strong class="account-signup">Login</strong>
          </nuxt-link>
        </div>
      </v-col>
      <v-col class="hidden-sm-and-down login__image" md="7" lg="8">
        <v-img
          src="https://freelancer-free.johnleider.com/img/aboutme.f240a572.png"
          class="grey darken-4 image"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.login {
  font-family: Montserrat-Regular, sans-serif;
  &__image {
    .image {
      min-height: 100vh;
      max-height: 100vh;
    }
  }
  &__form-login {
    .login-image {
      img {
        object-fit: cover;
        width: 150px;
        height: auto;
      }
    }
    .login-title {
      font-size: 24px;
      line-height: 36px;
      margin-bottom: 35px;
    }
    .login-button {
      width: 100%;
      height: 50px !important;
      background: #3c64b1 !important;
      border-radius: 10px;
      .button-text {
        font-weight: 600;
        font-size: 18px;
        line-height: 26px;
        color: white;
      }
    }

    .account-signup {
      font-weight: 600;
      color: #3c64b1;
    }
  }
}
</style>
