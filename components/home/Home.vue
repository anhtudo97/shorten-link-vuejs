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
      <v-col cols="12" md="8" class="mx-auto">
        <v-row class="mb-3">
          <v-col cols="12" sm="8">
            <v-text-field
              background-color="white"
              class="shorten-input"
              placeholder="Enter your link"
              outlined
              dense
              clearable
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="ma-md-0">
            <button
              class="shorten-button button-primary"
              @click="isShorten = !isShorten"
            >{{isShorten ? 'Copy':'Shorten'}}</button>
          </v-col>
        </v-row>
        <slide-fade-transition mode="out-in">
          <div v-if="!isShorten" key="false" class="text-center shorten-policy">
            By clicking shorten, you agree to God Group’s
            <strong class="text-underline">Terms</strong> &
            <strong class="text-underline">Conditions and Privacy Policy</strong>
          </div>
          <v-row v-else key="true" class="shortened justify-space-between mb-0 mb-md-3">
            <v-col cols="12" md="7" lg="8" class="shortened__shortened-link">
              <div
                class="link-text text-overflow-hidden"
              >https://vuetifyjs.com/en/components/buttons/#buttons</div>
            </v-col>
            <v-col cols="12" md="5" lg="4" class="shortened__shortened-service">
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
        </slide-fade-transition>
      </v-col>
    </v-row>
    <Business />
  </div>
</template>

<script>
import Business from '@/components/home/HomeBusiness';
import SlideFadeTransition from '@/components/shares/SlideFadeTransition';
export default {
  components: {
    Business,
    SlideFadeTransition,
  },
  data() {
    return {
      isShorten: false,
      view: 'v-a',
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  font-family: Montserrat, sans-serif;
  &__hero {
    margin-top: 10vh;
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
          font-size: 50px;
          line-height: 62px;
        }
        &__sub {
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
    @media (max-width: 960px) {
      .hero-banner {
        &__title {
          font-size: 44px;
          line-height: 56px;
        }
        &__sub {
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
    @media (max-width: 600px) {
      .hero-banner {
        &__title {
          font-size: 34px;
          line-height: 48px;
        }
      }
    }
  }
  &__shorten {
    background-color: #263849;
    height: 100%;
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
    .shorten-input::v-deep v-input__control {
      height: 100%;
    }
    .shorten-button {
      padding: 10px 0;
      width: 100%;
      font-size: 18px;
      line-height: 24px;
      @media (max-width: 1366px) {
        font-size: 14px;
        line-height: 20px;
      }
      @media (max-width: 960px) {
        padding: 10px 0;
        font-size: 12px;
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
}
</style>
