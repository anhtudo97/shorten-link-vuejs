<template>
  <div>
    <div class=" display-small-hidden border-b py-3">
      <div class="header d-flex align-center mx-0 mx-sm-6 mx-lg-8 mx-xl-10">
        <nuxt-link to="/">
          <div class="header__logo">
            <img src="~/assets/logo_R.png" alt="logo" />
          </div>
        </nuxt-link>
        <ul>
          <li v-for="item in menu" :key="item.id">
            <nuxt-link :to="item.route" exact-active-class="nuxt-link-active">
              <div class="header__menu">
                <div class="menu-text">{{ item.name }}</div>
              </div>
            </nuxt-link>
          </li>
        </ul>
        <v-spacer></v-spacer>
        <client-only>
          <div v-if="token === ''" class="d-flex align-center">
            <nuxt-link to="/login">
              <div class="header__login mr-5">
                <div>Login</div>
              </div>
            </nuxt-link>
            <nuxt-link to="/sign-up">
              <button
                class="button-normal header__signup py-2 px-6 font-weight-bold"
                aria-label="Signup"
              >
                Sign up
              </button>
            </nuxt-link>
          </div>
          <div v-else class="d-flex align-center">
            <nuxt-link to="/notifications">
              <div class="header__notification align-self-center">
                <svg viewBox="-10 0 35 35">
                  <path
                    class="notification--bell"
                    d="M14 12v1H0v-1l0.73-0.58c0.77-0.77 0.81-3.55 1.19-4.42 0.77-3.77 4.08-5 4.08-5 0-0.55 0.45-1 1-1s1 0.45 1 1c0 0 3.39 1.23 4.16 5 0.38 1.88 0.42 3.66 1.19 4.42l0.66 0.58z"
                  />
                  <path
                    class="notification--bellClapper"
                    d="M7 15.7c1.11 0 2-0.89 2-2H5c0 1.11 0.89 2 2 2z"
                  />
                </svg>
                <span class="notification--num">{{ total }}</span>
              </div>
            </nuxt-link>
            <div class="pr-4 header__signup">{{ email }}</div>
            <button
              class="button-normal header__signup py-2 px-6 font-weight-bold"
              aria-label="Logout"
              @click.prevent="logout"
            >
              Logout
            </button>
          </div>
        </client-only>
      </div>
    </div>

    <v-col class="display-big-show border-b" cols="12">
      <v-row class="header align-center mx-2 mx-sm-7 py-0">
        <nuxt-link to="/">
          <div class="header__logo">
            <img src="@/assets/logo_R.png" alt="logo" />
          </div>
        </nuxt-link>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon
          @click.stop="$emit('openModal')"
        ></v-app-bar-nav-icon>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getInvitations } from '@/services/api';
export default {
  async fetch() {
    if (
      typeof localStorage !== 'undefined' &&
      localStorage.token &&
      localStorage.email
    ) {
      this.token = localStorage.token;
      this.email = localStorage.email;
    }
    if (this.token !== '') {
      await this.getInvitaions();
    }
  },
  data: () => ({
    menu: [
      {
        id: 1,
        name: 'Links',
        route: '/links',
      },
      {
        id: 2,
        name: 'Domains',
        route: '/domains',
      },
      {
        id: 3,
        name: 'Workspaces',
        route: '/workspaces',
      },
    ],
    token: '',
    email: null,
  }),
  computed: {
    ...mapGetters({
      notifications: 'notifications/getNotifications',
      total: 'notifications/getTotal',
    }),
  },
  fetchOnServer: false,
  methods: {
    ...mapActions({
      setNotifications: 'notifications/setNotifications',
      setTotal: 'notifications/setTotal',
    }),
    async getInvitaions() {
      try {
        const res = await getInvitations(this.token, 1);
        const { status, data } = res.data;
        if (status === 200) {
          const { total, invitations } = data;
          this.setNotifications(invitations);
          this.setTotal(total);
        }
      } catch (error) {
        const { status } = error.response;
        if (status === 401) {
          this.$router.push('/login');
          window.localStorage.clear();
        }
      }
    },
    logout() {
      this.$store.commit('setUser', null);
      this.$store.commit('setToken', 'Bearer ' + null);
      this.$store.commit('setHeaders', 'Bearer ' + null);
      window.localStorage.clear();
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  font-family: Montserrat, sans-serif;
  ul {
    list-style: none;
    display: flex;
    li {
      margin-right: 32px;
    }
    li:last-child {
      margin-right: 0;
    }
  }
  &__logo {
    img {
      object-fit: cover;
      width: 60px;
      height: auto;
    }
    @media (max-width: 600px) {
      img {
        width: 50px;
      }
    }
  }
  &__login {
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    color: #3c64b1;
    border-radius: 4px;
    padding: 10px 24px;
    transition: 0.2s all ease-in-out;
    &:hover {
      color: #fff;
      background-color: #3c64b1;
    }
  }
  &__signup {
    font-weight: bold;
    font-size: 14px;
  }
  &__menu {
    .menu-text {
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: #000;
    }
  }
  &__notification {
    position: relative;
    width: 4em;
    height: 1.75em;
    .notification--bell {
      animation: bell 2.2s linear infinite;
      transform-origin: 50% 0%;
    }
    .notification--bellClapper {
      animation: bellClapper 2.2s 0.1s linear infinite;
    }
    .notification--num {
      position: absolute;
      top: -10px;
      left: 25px;
      background-color: #ff4c13;
      border-radius: 50%;
      color: #fff;
      font-size: 11px;
      padding: 3px 8px;
      animation: notification 2.2s linear;
    }
  }
  svg {
    width: 3.5em;
    height: 3.5em;
    path {
      border: 0.5px solid #3c64b1;
      fill: #3c64b1;
    }
  }
  .nuxt-link-active {
    .header__menu {
      .menu-text {
        color: #3c64b1;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
      }
    }
  }
}

.display-small-hidden {
  display: none;
  @media (min-width: 800px) {
    display: block;
  }
}

.display-big-show {
  display: block;
  @media (min-width: 800px) {
    display: none;
  }
}
</style>
