<template>
  <div class="home">
    <v-row class="home__hero mx-0 mb-8">
      <v-col cols="10" md="8" class="mx-auto">
        <v-row class="hero-banner align-center">
          <v-col cols="12" md="7" lg="8">
            <div class="hero-banner__title">Create Click-Worthy Links</div>
            <div class="hero-banner__sub">
              Build and protect your brand using powerful, recognizable short
              links.
            </div>
          </v-col>
          <v-col cols="12" md="5" lg="4">
            <img src="@/assets/home.webp" alt="home" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="home__shorten mb-8 mx-0">
      <v-col cols="12" md="6" class="mx-auto">
        <v-row class="mb-3">
          <v-col cols="12" sm="8">
            <form @submit.prevent="shortendLink()">
              <v-text-field
                v-model="destination"
                background-color="white"
                class="shorten-input"
                placeholder="Enter your link"
                outlined
                clearable
                hide-details="auto"
              ></v-text-field>
            </form>
          </v-col>
          <v-col cols="12" sm="4" class="ma-md-0 align-self-center">
            <button
              :disabled="loading"
              class="shorten-button"
              aria-label="Action"
              @click.stop="shortendLink()"
            >
              <div v-if="loading">
                <img
                  class="loading"
                  src="@/assets/svg/Ellipsis-1s-200px.svg"
                  alt="loading"
                />
              </div>
              <div v-else class="btn-text">Shorten URL</div>
            </button>
          </v-col>
        </v-row>
        <slide-fade-transition mode="out-in">
          <div v-if="isShorten">
            <Shorten
              v-for="(data, index) in shortenLinks"
              :key="`index_${index}`"
              :data="data"
            />
          </div>
        </slide-fade-transition>
        <div key="false" class="text-center shorten-policy">
          By clicking shorten, you agree to Relinks team’s
          <nuxt-link to="/terms-conditions">
            <strong class="text-white cursor-pointer text-decoration-underline"
              >Terms of Use</strong
            >
          </nuxt-link>
          &
          <nuxt-link to="/privacy-policy">
            <strong class="text-white cursor-pointer text-decoration-underline"
              >Privacy Policy</strong
            >
          </nuxt-link>
        </div>
      </v-col>
    </v-row>
    <Business />
    <v-snackbar v-model="showAlert400" top color="error">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          aria-label="close"
          @click="showAlert403 = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { shortendLink } from '@/services/api';
import Shorten from '@/components/home/Shorten';
import Business from '@/components/home/HomeBusiness';
import SlideFadeTransition from '@/components/shares/SlideFadeTransition';
export default {
  components: {
    Shorten,
    Business,
    SlideFadeTransition,
  },
  data: () => ({
    destination: '',
    data: {
      destination: '',
      shortUrl: '',
      date: '',
    },
    loading: false,
    isShorten: false,
    valid: false,
    message: '',
    view: 'v-a',
    showAlert400: false,
    links: [],
  }),
  computed: {
    shortenLinks() {
      const temp = [...this.links].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      console.log(temp);
      return temp;
    },
  },
  created() {
    if (this.$cookies.get('links')) {
      this.isShorten = true;
      this.links = JSON.parse(this.$cookies.get('links'));
      this.$forceUpdate();
    }
  },
  methods: {
    validURL(str) {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ); // fragment locator
      this.valid = !!pattern.test(str);
    },
    async shortendLink() {
      this.validURL(this.destination);
      let str = '';
      if (
        !this.destination.includes('http') ||
        !this.destination.includes('https')
      ) {
        str = 'http://' + this.destination;
      } else {
        str = this.destination;
      }
      if (this.valid) {
        this.loading = true;
        try {
          const res = await shortendLink(str);
          const { status, data } = res.data;

          if (status === 200) {
            this.isShorten = true;
            const { destination, shortUrl } = data;
            this.data = {
              destination,
              shortUrl,
              date: new Date(),
            };
          }
          this.links.push(this.data);
          this.$cookies.set(
            'links',
            JSON.stringify(this.links, null, 2),
            60 * 60 * 24 * 30
          );
          this.loading = false;
          this.destination = '';
        } catch (error) {
          const { status, data } = error.response;
          this.message = data.message;
          if (status === 401) this.$router.push('/login');
          this.showAlert400 = true;
          setTimeout(() => {
            this.showAlert400 = false;
            this.loading = false;
            this.destination = '';
          }, 1500);
        }
      } else {
        this.message = 'Invalid URL';
        this.showAlert400 = true;
        setTimeout(() => {
          this.showAlert400 = false;
        }, 1500);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  font-family: Poppins, sans-serif;
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
      img {
        object-fit: cover;
        width: 100%;
        height: auto;
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
      display: flex;
      justify-content: center;
      align-items: center;
      // padding: 15px 0;
      width: 100%;
      border-radius: 4px;
      background-color: #3c64b1;
      font-size: 18px;
      line-height: 18px;
      .loading {
        margin-top: 3px;
        object-fit: cover;
        width: auto;
        height: 50px;
      }
      .btn-text {
        color: #fff;
        text-align: center;
        font-weight: bold;
        margin: 18px 0;
      }
      &:hover {
        background-color: #2a5bd7;
      }
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
      font-size: 15px;
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
  }
}
</style>
