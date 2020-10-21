<template>
  <v-list class="navigation-drawer d-flex flex-column justify-center mt-16">
    <div class="navigation-drawer__header">
      <v-row class="header d-flex align-center mx-0">
        <nuxt-link to="/">
          <div class="logo">
            <img src="~/assets/logo_R.png" alt="logo" />
          </div>
        </nuxt-link>
        <v-spacer></v-spacer>
        <nuxt-link to="/notifications">
          <div class="notification align-self-center">
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
      </v-row>
    </div>
    <nuxt-link v-for="item in items" :key="item.id" :to="item.link">
      <div
        v-if="
          item.name !== 'Log out' &&
            item.name !== 'Sign up' &&
            item.name !== 'Login'
        "
        class="navigation-drawer__item text-center"
      >
        <div class="noselect" :class="[activatedRoute(item.link)]">
          {{ item.name }}
        </div>
      </div>
    </nuxt-link>
    <div v-if="token !== ''">
      <nuxt-link v-for="item in items" :key="item.id" :to="item.link">
        <div
          v-if="item.name === 'Log out'"
          class="navigation-drawer__item text-center"
          @click="logout"
        >
          <div class="noselect" :class="[activatedRoute(item.link)]">
            {{ item.name }}
          </div>
        </div>
      </nuxt-link>
    </div>
    <div v-else>
      <nuxt-link v-for="item in items" :key="item.id" :to="item.link">
        <div
          v-if="item.name === 'Sign up' || item.name === 'Login'"
          class="navigation-drawer__item text-center"
        >
          <div class="noselect" :class="[activatedRoute(item.link)]">
            {{ item.name }}
          </div>
        </div>
      </nuxt-link>
    </div>
  </v-list>
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
    items: [
      {
        id: 2,
        name: 'Links',
        link: '/links',
      },
      {
        id: 3,
        name: 'Domains',
        link: '/domains',
      },
      {
        id: 7,
        name: 'Workspace',
        link: '/workspaces',
      },
      {
        id: 4,
        name: 'Login',
        link: '/login',
      },
      {
        id: 5,
        name: 'Sign up',
        link: '/sign-up',
      },
      {
        id: 6,
        name: 'Contact us',
        link: '/contact',
      },
      {
        id: 8,
        name: 'Log out',
        link: '/',
      },
    ],
    token: '',
    email: null,
  }),
  fetchOnServer: false,
  computed: {
    ...mapGetters({
      notifications: 'notifications/getNotifications',
      total: 'notifications/getTotal',
    }),
  },
  methods: {
    activatedRoute(route) {
      return route === this.$route.path ? 'active-route' : '';
    },
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
.navigation-drawer {
  font-family: Montserrat, sans-serif;
  padding: 3vh 24px;
  &__header {
    .header {
      .logo {
        img {
          object-fit: cover;
          width: 60px;
          height: auto;
        }
      }
      .notification {
        position: relative;
        width: 3em;
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
    }
  }
  &__item {
    cursor: pointer;
    width: 100%;
    height: 50px;
    border: 1px solid #ddd;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 0;
    transition: 0.4s;
    // padding: 2vh 1vh;
    margin: 1vh 0;
    font-weight: 500;
    color: #2281c2;
    transition: all 0.3s ease-in-out;
    &:hover {
      font-weight: 700;
      background: #2281c2;
      .noselect {
        color: #fff;
      }
    }
    &::before {
      height: 20px;
      width: 110%;
    }
    &::after {
      width: 90%;
      height: 50px;
    }
    &::before,
    &::after {
      position: absolute;
      background: #fff;
      z-index: -1;
      transition: 0.2s;
      content: '';
    }
    &:hover::before {
      width: 0px;
      background: #fff;
    }
    &:hover::after {
      height: 0px;
      background: #fff;
    }
    .noselect {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
  .active-route {
    font-weight: 700;
  }
  @media screen and (max-width: 600px) {
    padding: 3vh 12px;
    &__item {
      font-size: 14px;
    }
    &__header {
      .header {
        .logo {
          img {
            width: 50px;
          }
        }
      }
    }
  }
}
</style>
