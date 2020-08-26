<template>
  <div>
    <v-row id="login" no-gutters class="login overflow-hidden">
      <v-col class="hidden-sm-and-down login__image" md="7" lg="8">
        <v-img
          src="https://freelancer-free.johnleider.com/img/aboutme.f240a572.png"
          class="grey darken-4 image"
        ></v-img>
      </v-col>
      <v-col class="pa-md-10 pa-16 align-self-center login__form-login" cols="12" md="5" lg="4">
        <div class="login-image text-center">
          <img src="~/assets/logo.png" />
        </div>
        <div class="text-center login-title">Login to your dashboard</div>
        <v-sheet>
          <form action>
            <v-text-field label="Your Email" outlined></v-text-field>
            <v-text-field label="Your Password" outlined></v-text-field>
            <v-btn class="login-button">
              <div class="button-text my-3">Login</div>
            </v-btn>
          </form>
        </v-sheet>
        <div class="text-center mt-3">
          Don't have an account ?
          <strong class="account-signup">Sign up</strong>
        </div>
        <nuxt-link to="/">
          <div class="text-center account-signup account-signup mt-1">Forgot password</div>
        </nuxt-link>
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
        font-size: 20px;
        line-height: 28px;
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
