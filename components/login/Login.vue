<template>
  <div>
    <v-row id="login" no-gutters class="login overflow-hidden">
      <v-col class="login__image" cols="12" sm="7" lg="8">
        <div class="image"></div>
      </v-col>
      <v-col
        class="pa-xs-10 pa-sm-7 pa-5 d-flex flex-column align-self-center login__form-login"
        cols="12"
        sm="5"
        lg="4"
      >
        <div class="login-image text-center">
          <img src="~/assets/logo.png" />
        </div>
        <div class="text-center login-title">Login to your dashboard</div>
        <v-sheet>
          <form action>
            <v-text-field class="login-email" label="Your Email" outlined></v-text-field>
            <v-text-field class="login-password" type="password" label="Your Password" outlined></v-text-field>
            <button class="login-button" @click="routeToLinks">
              <div class="button-text my-3">Login</div>
            </button>
          </form>
        </v-sheet>
        <div class="an-account text-center mt-3">
          Don't have an account ?
          <nuxt-link to="/sign-up">
            <strong class="account-signup">Sign up</strong>
          </nuxt-link>
        </div>
        <nuxt-link to="/">
          <div
            class="forgot-password text-center account-signup account-signup mt-1"
          >Forgot password</div>
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    routeToLinks() {
      this.$router.push('/links');
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  font-family: Montserrat, sans-serif;
  &__image {
    background-image: url('https://freelancer-free.johnleider.com/img/aboutme.f240a572.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 1;
    min-height: 100vh;
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
        color: white;
        font-size: 16px;
      }
    }
    .account-signup {
      font-weight: 600;
      color: #3c64b1;
    }
  }
  @media (max-width: 1368px) {
    &__form-login {
      .login-image {
        img {
          width: 120px;
        }
      }
      .login-title {
        font-size: 22px;
        line-height: 34px;
        margin-bottom: 30px;
      }
      .login-button {
        .button-text {
          font-size: 15px;
        }
      }
      .an-account,
      .forgot-password {
        font-size: 15px;
      }
      .login-email::v-deep label {
        font-size: 15px;
      }
      .login-email::v-deep input {
        font-size: 15px;
      }
      .login-password::v-deep label {
        font-size: 15px;
      }
      .login-password::v-deep input {
        font-size: 15px;
      }
    }
  }
  @media (max-width: 960px) {
    &__form-login {
      .login-image {
        img {
          width: 110px;
        }
      }
      .login-title {
        font-size: 20px;
        line-height: 32px;
        margin-bottom: 25px;
      }
      .login-button {
        width: 100%;
        .button-text {
          font-size: 14px;
        }
      }
      .an-account,
      .forgot-password {
        font-size: 14px;
      }
      .login-email::v-deep label {
        font-size: 14px;
      }
      .login-email::v-deep input {
        font-size: 14px;
      }
      .login-password::v-deep label {
        font-size: 14px;
      }
      .login-password::v-deep input {
        font-size: 14px;
      }
    }
  }
  @media (max-width: 600px) {
    &__image {
      min-height: 40vh;
    }
    &__form-login {
      .login-image {
        img {
          width: 110px;
        }
      }
      .an-account,
      .forgot-password {
        font-size: 13px;
      }
    }
  }
}
</style>
