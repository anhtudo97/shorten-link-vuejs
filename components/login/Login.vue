<template>
  <div>
    <v-row id="login" no-gutters class="login overflow-hidden">
      <v-col
        cols="11"
        md="10"
        lg="7"
        class="login__block mx-auto d-flex flex-column justify-center"
      >
        <v-row>
          <v-col cols="12" sm="6" class="text-center text-sm-left login__left">
            <figure>
              <img src="@/assets/signin-image.jpg" alt="sing up image" />
            </figure>
            <div class="create-account text-center">
              <a href="#">Create an account</a>
            </div>
          </v-col>
          <v-col cols="12" sm="6" class="login__right">
            <div class="login-title">Sign in</div>
            <v-text-field class="input-name mt-4 mt-sm-6" label="Your name" hide-details="auto"></v-text-field>
            <v-text-field
              class="input-password mt-4 mt-sm-6"
              label="Password"
              type="password"
              hide-details="auto"
            ></v-text-field>
            <button class="button-normal login-button mt-8 mt-sm-10" @click="routeToLinks">Login</button>
          </v-col>
        </v-row>
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
  font-family: Poppins, sans-serif;
  &__block {
    margin: 150px 0;
    padding: 50px 100px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.4) 0 0 10px;
  }
  &__left {
    .create-account {
      width: 100%;
    }
    img {
      object-fit: cover;
      width: 100%;
      height: auto;
    }
  }
  &__right {
    .login-title {
      line-height: 1.66;
      margin: 0;
      padding: 0;
      font-weight: bold;
      color: #222;
      font-size: 36px;
    }
    .login-button {
      padding: 7px 7vh;
      font-weight: 500;
    }
  }
  @media screen and (max-width: 1368px) {
    &__block {
      padding: 50px 70px;
    }
    &__left {
      .create-account {
        font-size: 15px;
      }
    }
    .input-name::v-deep label,
    .input-name::v-deep input,
    .input-password::v-deep label,
    .input-password::v-deep input,
    .input-checkbox::v-deep label,
    .input-checkbox::v-deep input {
      font-size: 15px;
    }
    &__right {
      .login-title {
        font-size: 32px;
      }
      .login-button {
        font-size: 15px;
        padding: 5px 6.5vh;
        font-weight: 500;
      }
    }
  }
  @media screen and (max-width: 960px) {
    &__block {
      margin: 100px 0;
      padding: 40px 60px;
    }
    &__left {
      .create-account {
        font-size: 14px;
      }
    }
    .input-name::v-deep label,
    .input-name::v-deep input,
    .input-password::v-deep label,
    .input-password::v-deep input,
    .input-checkbox::v-deep label,
    .input-checkbox::v-deep input {
      font-size: 14px;
    }
    &__right {
      .login-title {
        font-size: 30px;
      }
      .login-button {
        font-size: 14px;
        padding: 5px 6vh;
        font-weight: 500;
      }
    }
  }
  @media screen and (max-width: 600px) {
    &__block {
      margin: 100px 0;
      padding: 30px 50px;
    }
    &__left {
      .create-account {
        font-size: 13px;
      }
    }
    .input-name::v-deep label,
    .input-name::v-deep input,
    .input-password::v-deep label,
    .input-password::v-deep input,
    .input-checkbox::v-deep label,
    .input-checkbox::v-deep input {
      font-size: 13px;
    }
    &__right {
      .login-title {
        font-size: 28px;
      }
      .login-button {
        font-size: 13px;
        padding: 5px 5.5vh;
        font-weight: 500;
      }
    }
  }
}
</style>
