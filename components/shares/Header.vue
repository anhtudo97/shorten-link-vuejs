<template>
  <div id="header" class="mx-auto py-0 py-sm-3">
    <div class="display-small-hidden mx-0 mx-sm-6 mx-lg-8 mx-xl-10">
      <div class="header d-flex absolute align-center">
        <nuxt-link to="/">
          <div class="header__logo">
            <img src="~/assets/logo.png" />
          </div>
        </nuxt-link>
        <ul>
          <li v-for="item in menu" :key="item.id">
            <nuxt-link :to="item.route" exact-active-class="nuxt-link-active">
              <div class="header__menu">
                <div class="menu-text">{{item.name}}</div>
              </div>
            </nuxt-link>
          </li>
        </ul>
        <v-spacer></v-spacer>
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
            <span class="notification--num">5</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/login">
          <div class="header__login mr-5">
            <div>Login</div>
          </div>
        </nuxt-link>
        <nuxt-link to="/sign-up">
          <button class="button-normal header__signup py-2 px-6 font-weight-bold">Sign up</button>
        </nuxt-link>
      </div>
    </div>
    <div class="display-big-show">
      <div class="header d-flex absolute align-center mx-2 mx-sm-7 py-0">
        <nuxt-link to="/">
          <div class="header__logo">
            <img src="~/assets/logo.png" />
          </div>
        </nuxt-link>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        {
          id: 4,
          name: 'Contact',
          route: '/c',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#header {
  border-bottom: 1px solid #c4c4c4;
}

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
  }
  &__login {
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    color: #3c64b1;
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
  @media (min-width: 900px) {
    display: block;
  }
}

.display-big-show {
  display: block;
  @media (min-width: 900px) {
    display: none;
  }
}
</style>
