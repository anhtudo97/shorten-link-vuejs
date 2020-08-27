<template>
  <div>
    <v-row id="signup" no-gutters class="signup overflow-hidden">
      <v-col
        class="px-5 px-md-7 py-sm-10 py-5 d-flex flex-column align-self-center signup__form-signup order-last order-sm-first"
        cols="12"
        sm="5"
        lg="4"
      >
        <div class="signup-image text-center">
          <img src="~/assets/logo.png" />
        </div>
        <div class="text-center signup-title">Create a new account</div>
        <v-sheet>
          <form action>
            <v-text-field label="Your name or company name" outlined></v-text-field>
            <v-text-field label="Your business email" outlined></v-text-field>
            <v-text-field label="Your Password" outlined type="password"></v-text-field>
            <v-btn class="signup-button">
              <div class="button-text my-3">Create account</div>
            </v-btn>
          </form>
        </v-sheet>
        <div class="an-account text-center mt-3 px-2 px-md-4 px-lg-10">
          By creating an account you agree to our
          <strong class="account-signup">terms</strong> and
          <strong class="account-signup">privacy policy</strong>
        </div>
        <div class="signup-an-account text-center mt-1">
          Already have an account?
          <nuxt-link to="/login">
            <strong class="account-signup">login</strong>
          </nuxt-link>
        </div>
      </v-col>
      <v-col class="signup__image order-first order-sm-last" cols="12" sm="7" lg="8">
        <div class="image"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.signup {
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
  &__form-signup {
    .signup-image {
      img {
        object-fit: cover;
        width: 150px;
        height: auto;
      }
    }
    .signup-title {
      font-size: 24px;
      line-height: 36px;
      margin-bottom: 35px;
    }
    .signup-button {
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
  @media (max-width: 1366px) {
    &__form-signup {
      .signup-image {
        img {
          object-fit: cover;
          width: 130px;
          height: auto;
        }
      }
      .signup-title {
        font-size: 22px;
        line-height: 34px;
        margin-bottom: 30px;
      }
      .signup-button {
        height: 45px !important;
        border-radius: 10px;
        .button-text {
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: white;
        }
      }
      .an-account,
      .signup-an-account {
        font-size: 14px;
      }
      .account-signup {
        font-weight: 600;
        color: #3c64b1;
      }
    }
  }
  @media (max-width: 960px) {
    &__form-signup {
      .signup-image {
        img {
          object-fit: cover;
          width: 110px;
          height: auto;
        }
      }
      .signup-title {
        font-size: 20px;
        line-height: 32px;
        margin-bottom: 25px;
      }
      .signup-button {
        height: 40px !important;
        .button-text {
          font-weight: 600;
          font-size: 14px;
          line-height: 22px;
        }
      }
      .an-account,
      .signup-an-account {
        font-size: 13px;
      }
      .account-signup {
        font-weight: 600;
        color: #3c64b1;
      }
    }
  }
  @media (max-width: 600px) {
    &__image {
      min-height: 35vh;
    }
    &__form-signup {
      .signup-image {
        img {
          object-fit: cover;
          width: 100px;
          height: auto;
        }
      }
      .signup-title {
        font-size: 18px;
        line-height: 30px;
        margin-bottom: 20px;
      }
      .signup-button {
        height: 40px !important;
        .button-text {
          font-weight: 600;
          font-size: 12px;
          line-height: 20px;
        }
      }
      .an-account,
      .signup-an-account {
        font-size: 12px;
      }
      .account-signup {
        font-weight: 600;
        color: #3c64b1;
      }
    }
  }
}
</style>
