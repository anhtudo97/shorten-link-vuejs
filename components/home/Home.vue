<template>
  <div class="home">
    <v-row class="home__hero mx-0 mb-8">
      <v-col cols="10" md="8" class="mx-auto">
        <v-row class="hero-banner align-center">
          <v-col cols="12" md="8">
            <div class="hero-banner__title">Create Click-Worthy Links</div>
            <div
              class="hero-banner__sub"
            >Build and protect your brand using powerful, recognizable short links.</div>
          </v-col>
          <v-col cols="12" md="4">
            <v-img
              src="https://i.pinimg.com/originals/74/04/a7/7404a70c336bd4da793ef0d9e1b39d7f.png"
            ></v-img>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="home__shorten mb-8 mx-0">
      <v-col cols="8" class="mx-auto">
        <v-row>
          <v-col cols="12" md="8" class="pb-0 pa-small-hidden">
            <v-text-field
              background-color="white"
              class="shorten-input"
              placeholder="Enter your link"
              outlined
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="mb-8 ma-md-0 pa-small-hidden">
            <div class="shorten-button" @click="isShorten = !isShorten">
              <div class="button-text">{{isShorten ? 'Copy':'Shorten'}}</div>
            </div>
          </v-col>
        </v-row>
        <div v-if="!isShorten" class="text-center shorten-policy">
          By clicking shorten, you agree to God Group’s
          <strong class="text-underline">Terms</strong> &
          <strong class="text-underline">Conditions and Privacy Policy</strong>
        </div>
        <v-row v-else class="shortened justify-space-between mb-0 mb-md-3">
          <v-col cols="12" md="7" lg="8" xl="9" class="shortened__shortened-link">
            <div class="link-text">https://vuetifyjs.com/en/components/buttons/#buttons</div>
          </v-col>
          <v-col cols="12" md="5" lg="4" xl="3" class="shortened__shortened-service">
            <div class="d-flex flex-wrap justify-space-between">
              <div class="shortened-link align-self-center">
                <a href="https://bit.ly/3hC00TH">https://bit.ly/3hC00TH</a>
              </div>
              <div class="shortened-button">
                <div class="shortened-text">Copy</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <Business />
  </div>
</template>

<script>
import Business from '@/components/home/HomeBusiness';
export default {
  components: {
    Business,
  },
  data() {
    return {
      isShorten: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  font-family: Montserrat, sans-serif;
  &__hero {
    margin-top: 5vh;
    .hero-banner {
      &__title {
        font-weight: bold;
        font-size: 56px;
        line-height: 68px;
        color: #373f41;
      }
      &__sub {
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.3px;
        color: #737b7d;
      }
    }
    @media (max-width: 1366px) {
      margin-top: 10vh;
      .hero-banner {
        &__title {
          font-weight: bold;
          font-size: 50px;
          line-height: 62px;
        }
        &__sub {
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.3px;
        }
      }
    }
    @media (max-width: 960px) {
      margin-top: 10vh;
      .hero-banner {
        &__title {
          font-weight: bold;
          font-size: 44px;
          line-height: 56px;
        }
        &__sub {
          font-size: 12px;
          line-height: 18px;
          letter-spacing: 0.3px;
        }
      }
    }
    @media (max-width: 600px) {
      margin-top: 10vh;
      .hero-banner {
        &__title {
          font-weight: bold;
          font-size: 38px;
          line-height: 48px;
        }
        &__sub {
          font-size: 10px;
          line-height: 16px;
          letter-spacing: 0.3px;
        }
      }
    }
  }
  &__shorten {
    background-color: #263849;
    .shorten-input {
      color: #fff;
      @media (max-width: 1366px) {
        font-size: 14px;
        line-height: 20px;
      }
      @media (max-width: 960px) {
        font-size: 12px;
        line-height: 18px;
      }
    }
    .shorten-button {
      cursor: pointer;
      background-color: #3c64b1;
      border-radius: 10px;
      padding: 14px 0;
      .button-text {
        color: #fff;
        text-align: center;
        font-weight: bold;
        font-size: 18px;
        line-height: 24px;
      }
      &:hover {
        background-color: #2a5bd7;
      }
      @media (max-width: 1366px) {
        padding: 12px 0;
        .button-text {
          font-size: 14px;
          line-height: 20px;
        }
      }
      @media (max-width: 960px) {
        padding: 10px 0;
        .button-text {
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
    .shorten-policy {
      color: white;
      .text-underline {
        cursor: pointer;
        text-decoration: underline;
      }
      @media (max-width: 1366px) {
        font-size: 15px;
      }
      @media (max-width: 960px) {
        font-size: 14px;
      }
      @media (max-width: 600px) {
        font-size: 12px;
      }
    }
    .shortened {
      align-items: center;
      background-color: #fff;
      border-radius: 10px;
      margin: 0;
      padding: 10px 15px;
      &__shortened-link {
        font-size: 18px;
        line-height: 24px;
        .link-text {
          text-overflow: ellipsis;
        }
      }
      &__shortened-service {
        align-items: center;
        .shortened-link {
          color: #3c64b1;
          font-size: 18px;
          line-height: 24px;
        }
        .shortened-button {
          background-color: #cedafa;
          padding: 5px 20px;
          border-radius: 10px;
        }
      }
      @media (max-width: 1366px) {
        &__shortened-link {
          font-size: 14px;
          line-height: 20px;
        }
        &__shortened-service {
          align-items: center;
          .shortened-link {
            font-size: 14px;
            line-height: 20px;
          }
          .shortened-button {
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
      @media (max-width: 960px) {
        &__shortened-link {
          font-size: 12px;
          line-height: 18px;
        }
        &__shortened-service {
          .shortened-link {
            font-size: 12px;
            line-height: 18px;
          }
          .shortened-button {
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
      @media (max-width: 600px) {
        padding: 10px 0;
        &__shortened-link {
          font-size: 10px;
          line-height: 16px;
          text-overflow: ellipsis;
        }
        &__shortened-service {
          .shortened-link {
            font-size: 10px;
            line-height: 16px;
          }
          .shortened-button {
            font-size: 10px;
            line-height: 16px;
          }
        }
      }
    }
  }
  .pa-small-hidden {
    @media (max-width: 1366px) {
      padding: 0 12px;
    }
  }
}
</style>
