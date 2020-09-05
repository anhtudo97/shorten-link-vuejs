<template>
  <div>
    <v-row id="signup" no-gutters class="signup overflow-hidden">
      <v-col
        cols="11"
        md="10"
        lg="7"
        class="signup__block mx-auto d-flex flex-column justify-center"
      >
        <v-row>
          <v-col cols="12" sm="6" class="signup__left pr-10">
            <div class="signup-title">Sign up</div>
            <v-text-field class="input-name mt-4 mt-sm-6" label="Your name" hide-details="auto"></v-text-field>
            <v-text-field
              class="input-password mt-4 mt-sm-6"
              label="Your email"
              type="email"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              class="input-password mt-4 mt-sm-6"
              label="Password"
              type="password"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              class="input-password mt-4 mt-sm-6"
              label="Password"
              type="password"
              hide-details="auto"
            ></v-text-field>
            <v-menu
              ref="menu"
              v-model="menu"
              class="input-date mt-4 mt-sm-6"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="input-date mt-4 mt-sm-6"
                  v-model="date"
                  label="Date of birth"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <button class="button-normal signup-button mt-6 mt-sm-8" @click="routeToLinks">Register</button>
          </v-col>
          <v-col cols="12" sm="6" class="text-center text-sm-right signup__right">
            <figure>
              <img src="@/assets/signup-image.jpg" alt="sing up image" />
            </figure>
            <div class="create-account text-center">
              <a href="#">I am already member</a>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
  }),
  methods: {
    routeToLinks() {
      this.$router.push('/links');
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
      margin: 0;
      padding: 0;
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
  }
  @media screen and (max-width: 960px) {
    &__block {
      margin: 100px 0;
      padding: 40px 60px;
    }
  }
  @media screen and (max-width: 600px) {
    &__block {
      margin: 100px 0;
      padding: 30px 50px;
    }
  }
}
</style>
