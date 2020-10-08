<template>
  <div>
    <transition name="fade" mode="in-out">
      <div v-if="showAlert">
        <v-alert type="success">Account is created</v-alert>
      </div>
    </transition>
    <transition name="fade" mode="in-out">
      <div v-if="showAlertError">
        <v-alert type="error">Email is existed</v-alert>
      </div>
    </transition>
    <v-row id="signup" no-gutters class="signup overflow-hidden">
      <v-col
        cols="11"
        md="10"
        lg="7"
        class="signup__block mx-auto d-flex flex-column justify-center order-last order-md-first"
      >
        <v-row>
          <v-col cols="12" sm="6" class="signup__left pr-0 pr-sm-10">
            <div class="signup-header text-center">
              <nuxt-link to="/">
                <div class="header__logo mr-4">
                  <img src="@/assets/logo_RELINKS.png" alt="logo" />
                </div>
              </nuxt-link>
              <div class="signup-title">Create a new account</div>
            </div>
            <v-text-field
              v-model="form.name"
              class="input-name mt-4 mt-sm-6"
              label="Your name"
              hide-details="auto"
              :rules="[(v) => !!v || 'Name is required']"
            ></v-text-field>
            <v-text-field
              v-model="form.email"
              name="email"
              class="input-email mt-4 mt-sm-6"
              label="Your email"
              type="email"
              hide-details="auto"
              :rules="[required('email'), emailFormat()]"
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              class="input-password mt-4 mt-sm-6"
              label="Password"
              type="password"
              hide-details="auto"
              :rules="[(v) => !!v || 'Password is required']"
            ></v-text-field>
            <button
              :disabled="isLoading"
              class="button-normal signup-button mt-6 mt-sm-8"
              aria-label="register"
              @click.prevent="register"
            >
              Register
            </button>
            <div class="text-center term-policy mt-5">
              By creating an account you agree to our
              <nuxt-link to="/terms-conditions">
                <span class="font-weight-bold text-blue-deep">terms</span>
              </nuxt-link>
              and
              <nuxt-link to="/privacy-policy">
                <span class="font-weight-bold text-blue-deep">privacy policy</span>
              </nuxt-link>
            </div>
            <div class="login-tip text-center mt-5">
              Already have an account?
              <nuxt-link to="/login">
                <span>Login</span>
              </nuxt-link>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="text-center text-sm-right signup__right order-first order-sm-last"
          >
            <figure>
              <img src="@/assets/svg/login.svg" alt="sing up image" />
            </figure>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createNewUser } from '@/services/api';
import validations from '@/utils/validations';
export default {
  data: () => ({
    ...validations,
    form: {
      name: '',
      email: '',
      password: '',
      gender: '',
      date: new Date().toISOString().substr(0, 10),
      menu: false,
    },
    showAlert: false,
    showAlertError: false,
    isLoading: false,
  }),
  methods: {
    async register() {
      let { name, email, password } = this.form;
      const { gender, date } = this.form;
      const tempDate = new Date(date).toISOString();
      this.isLoading = true;
      try {
        const res = await createNewUser(
          name,
          email,
          password,
          gender,
          tempDate
        );
        const { status } = res.data;
        if (status === 200) {
          name = '';
          email = '';
          password = '';
          this.showAlert = true;

          setTimeout(() => {
            this.showAlert = false;
            this.isLoading = false;
            this.$router.push('/login');
          }, 2000);
        }
      } catch (error) {
        this.showAlertError = true;
        setTimeout(() => {
          this.showAlertError = false;
          this.isLoading = false;
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.signup {
  font-family: Montserrat, sans-serif;
  &__block {
    margin: 150px 0;
    padding: 50px 100px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.4) 0 0 10px;
  }
  &__right {
    .create-account {
      width: 100%;
    }
    img {
      object-fit: cover;
      width: 100%;
      height: auto;
    }
  }
  &__left {
    .signup-header {
      img {
        object-fit: cover;
        width: 45%;
        height: auto;
      }
      .signup-title {
        line-height: 1.66;
        margin: 0;
        padding: 0;
        font-weight: 400;
        color: #222;
        font-size: 22px;
      }
    }
    .signup-button {
      width: 100%;
      padding: 7px 0;
      font-weight: 500;
    }
    .term-policy {
      font-size: 14px;
      span {
        color: #2281c2;
      }
    }
    .login-tip {
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
    &__right {
      .create-account {
        font-size: 15px;
      }
    }
    &__left {
      .signup-header {
        img {
          width: 40%;
        }
        .signup-title {
          font-size: 20px;
        }
      }
      .gender-title {
        font-size: 15px;
      }
      .input-name::v-deep label,
      .input-name::v-deep input,
      .input-email::v-deep label,
      .input-email::v-deep input,
      .input-password::v-deep label,
      .input-password::v-deep input,
      .gender-input::v-deep label,
      .gender-input::v-deep input,
      .input-date::v-deep label,
      .input-date::v-deep input {
        font-size: 15px;
      }
      .signup-button {
        font-size: 15px;
      }
      .term-policy {
        font-size: 13px;
      }
      .login-tip {
        font-size: 13px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    &__block {
      margin: 100px 0;
      padding: 40px 50px;
    }
    &__right {
      .create-account {
        font-size: 14px;
      }
    }
    &__left {
      .signup-header {
        img {
          width: 38%;
        }
        .signup-title {
          font-size: 18px;
        }
      }
      .gender-title {
        font-size: 14px;
      }
      .input-name::v-deep label,
      .input-name::v-deep input,
      .input-email::v-deep label,
      .input-email::v-deep input,
      .input-password::v-deep label,
      .input-password::v-deep input,
      .gender-input::v-deep label,
      .gender-input::v-deep input,
      .input-date::v-deep label,
      .input-date::v-deep input {
        font-size: 13px;
      }
      .signup-button {
        padding: 5px 0;
        font-size: 14px;
      }
      .term-policy {
        font-size: 13px;
        span {
          color: #2281c2;
        }
      }
      .login-tip {
        font-size: 12px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    &__block {
      margin: 100px 0;
      padding: 30px 30px;
    }
    &__right {
      .create-account {
        font-size: 13px;
      }
      img {
        display: none;
      }
    }
    &__left {
      .signup-header {
        img {
          width: 35%;
        }
        .signup-title {
          font-size: 16px;
        }
      }
      .gender-title {
        font-size: 13px;
      }
      .input-name::v-deep label,
      .input-name::v-deep input,
      .input-email::v-deep label,
      .input-email::v-deep input,
      .input-password::v-deep label,
      .input-password::v-deep input,
      .gender-input::v-deep label,
      .gender-input::v-deep input,
      .input-date::v-deep label,
      .input-date::v-deep input {
        font-size: 13px;
      }
      .signup-button {
        padding: 5px 0;
        font-size: 13px;
      }
      .term-policy {
        font-size: 13px;
      }
    }
  }
}
</style>
