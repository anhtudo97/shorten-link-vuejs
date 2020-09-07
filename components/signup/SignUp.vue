<template>
  <div>
    <v-row id="signup" no-gutters class="signup overflow-hidden">
      <v-col
        cols="11"
        md="10"
        lg="7"
        class="signup__block mx-auto d-flex flex-column justify-center order-last order-md-first"
      >
        <v-row>
          <v-col cols="12" sm="6" class="signup__left pr-10">
            <div class="signup-title">Sign up</div>
            <v-text-field
              v-model="form.name"
              class="input-name mt-4 mt-sm-6"
              label="Your name"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-model="form.email"
              name="email"
              class="input-email mt-4 mt-sm-6"
              label="Your email"
              type="email"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              class="input-password mt-4 mt-sm-6"
              label="Password"
              type="password"
              hide-details="auto"
            ></v-text-field>
            <div class="mt-4 mt-sm-6">
              <div class="gender-title">Gender</div>
              <v-radio-group v-model="form.gender" :mandatory="false" dense hide-details="auto">
                <v-radio class="gender-input" label="Male" value="M"></v-radio>
                <v-radio class="gender-input" label="Female" value="F"></v-radio>
              </v-radio-group>
            </div>
            <v-menu
              ref="menu"
              v-model="form.menu"
              class="input-date mt-4 mt-sm-6"
              :close-on-content-click="false"
              :return-value.sync="form.date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="input-date mt-4 mt-sm-6"
                  v-model="form.date"
                  label="Date of birth"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="form.menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(form.date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <button
              class="button-normal signup-button mt-6 mt-sm-8"
              @click.prevent="register"
            >Register</button>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="text-center text-sm-right signup__right order-first order-sm-last"
          >
            <figure>
              <img src="@/assets/signup-image.jpg" alt="sing up image" />
            </figure>
            <nuxt-link to="/login">
              <div class="create-account text-center">
                <div>I am already member</div>
              </div>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
      gender: '',
      date: new Date().toISOString().substr(0, 10),
      menu: false,
    },
  }),
  methods: {
    register() {
      console.log(this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.signup {
  font-family: Poppins, sans-serif;
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
    .signup-title {
      line-height: 1.66;
      font-weight: bold;
      color: #222;
      font-size: 36px;
    }
    .signup-button {
      padding: 7px 7vh;
      font-weight: 500;
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
      .signup-title {
        font-size: 34px;
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
        padding: 7px 7vh;
        font-size: 15px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    &__block {
      margin: 100px 0;
      padding: 40px 60px;
    }
    &__right {
      .create-account {
        font-size: 14px;
      }
    }
    &__left {
      .signup-title {
        font-size: 32px;
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
        font-size: 14px;
      }
      .signup-button {
        padding: 5px 6.5vh;
        font-size: 14px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    &__block {
      margin: 100px 0;
      padding: 30px 50px;
    }
    &__right {
      .create-account {
        font-size: 13px;
      }
    }
    &__left {
      .signup-title {
        font-size: 30px;
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
        padding: 5px 6vh;
        font-size: 13px;
      }
    }
  }
}
</style>
