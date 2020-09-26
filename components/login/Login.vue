<template>
  <div>
    <div class="alert">
      <transition name="fade" mode="in-out">
        <div v-if="showAlert">
          <v-alert type="success">Login successfully</v-alert>
        </div>
      </transition>
    </div>
    <v-row id="login" no-gutters class="login overflow-hidden">
      <v-col
        cols="11"
        md="10"
        lg="7"
        class="login__block mx-auto d-flex flex-column justify-center"
      >
        <transition name="fade" mode="out-in">
          <div v-show="showAlertError">
            <v-alert type="error">Email or password is incorrect</v-alert>
          </div>
        </transition>
        <v-row>
          <v-col cols="12" sm="6" class="text-center text-sm-left login__left">
            <figure>
              <img src="@/assets/signin-image.jpg" alt="sign in image" />
            </figure>
          </v-col>
          <v-col cols="12" sm="6" class="login__right">
            <div class="login-header text-center align-center">
              <nuxt-link to="/">
                <div class="header__logo mr-4">
                  <img src="~/assets/logo_RELINKS.png" />
                </div>
              </nuxt-link>
              <div class="login-title">Login to your dashboard</div>
            </div>
            <form action @keyup.enter="login">
              <v-text-field
                v-model="form.email"
                class="input-name mt-4 mt-sm-6"
                label="Your email"
                hide-details="auto"
                :rules="[required('email'), emailFormat()]"
              />
              <v-text-field
                v-model="form.password"
                class="input-password mt-4 mt-sm-6"
                label="Password"
                type="password"
                hide-details="auto"
                :rules="[required('password')]"
              />
            </form>
            <div class="text-center">
              <button
                :disabled="isLoading"
                class="button-normal login-button mt-8 mt-sm-10 mr-4"
                aria-label="Login"
                @click.prevent="login"
              >Login</button>
              <div class="signup-tip mt-5">
                Don’t have a Relinks account yet?
                <nuxt-link to="/sign-up">
                  <span>Get started</span>
                </nuxt-link>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import validations from '@/utils/validations';
import { loginUser } from '@/services/api';
export default {
  data: () => ({
    form: {
      email: '',
      password: '',
    },
    showAlert: false,
    isLoading: false,
    showAlertError: false,
    ...validations,
  }),
  methods: {
    ...mapMutations({
      setUser: 'setUser',
      setToken: 'setToken',
      setHeaders: 'setHeaders',
    }),
    redirectSignup() {
      this.$router.push('/sign-up');
    },
    async login() {
      this.isLoading = true;
      try {
        const res = await loginUser(this.form.email, this.form.password);
        const { status } = res.data;

        if (status === 200) {
          this.showAlert = true;
          const { data } = res.data;
          const { token, email } = data;
          this.setUser(data);
          this.setToken('Bearer ' + token);
          this.setHeaders('Bearer ' + token);

          localStorage.token = token;
          localStorage.email = email;
          setTimeout(() => {
            this.showAlert = false;
            this.isLoading = false;
            this.$router.push('/links');
          }, 500);
        }
      } catch (error) {
        this.showAlertError = true;
        setTimeout(() => {
          this.showAlertError = false;
          this.isLoading = false;
        }, 1000);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  height: 100px;
}
.login {
  font-family: Montserrat, sans-serif;
  &__block {
    margin-top: 20px;
    margin-bottom: 100px;
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
    .login-header {
      img {
        object-fit: cover;
        width: 45%;
        height: auto;
      }
      .login-title {
        line-height: 1.66;
        margin: 0;
        padding: 0;
        font-weight: 400;
        color: #222;
        font-size: 22px;
      }
    }
    .login-button {
      width: 100%;
      padding: 7px 0;
      font-weight: 500;
    }
    .signup-tip {
      font-size: 14px;
      span {
        font-weight: 500;
        color: #2281c2;
      }
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
      .login-header {
        img {
          object-fit: cover;
          width: 40%;
          height: auto;
        }
        .login-title {
          font-size: 20px;
        }
      }
      .login-button {
        font-size: 15px;
      }
      .signup-tip {
        font-size: 13px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    &__block {
      padding: 40px 50px;
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
      font-size: 13px;
    }
    &__right {
      .login-header {
        img {
          width: 38%;
        }
        .login-title {
          font-size: 18px;
        }
      }
      .login-button {
        font-size: 14px;
      }
      .signup-tip {
        font-size: 12px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    &__block {
      padding: 30px 30px;
    }
    &__left {
      img {
        display: none;
      }
      .create-account {
        font-size: 13px;
      }
    }
    &__right {
      .login-header {
        img {
          object-fit: cover;
          width: 35%;
          height: auto;
        }
        .login-title {
          font-size: 16px;
        }
      }
      .login-button {
        font-size: 13px;
      }
    }
  }
}
</style>
