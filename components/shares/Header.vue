<template>
  <div class="mx-auto py-3">
    <div class="display-small-hidden mx-0 mx-sm-6 mx-lg-8 mx-xl-10">
      <div class="header d-flex absolute align-center">
        <nuxt-link to="/">
          <div class="header__logo">
            <img src="~/assets/logo.png" />
          </div>
        </nuxt-link>
        <v-spacer></v-spacer>
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
        <nuxt-link to="/login">
          <div class="header__login mr-5">
            <div>Login</div>
          </div>
        </nuxt-link>
        <nuxt-link to="/sign-up">
          <div class="header__signup py-3 px-6">
            <div class="signup-text">Sign up</div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="display-big-show">
      <div class="header d-flex absolute align-center mx-7">
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
          route: '/b',
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
    @media (max-width: 660px) {
      display: none;
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
    background: #3c64b1;
    border-radius: 10px;
    .signup-text {
      font-weight: bold;
      font-size: 14px;
      line-height: 18px;
      color: #fff;
    }
    &:hover {
      background-color: #2a5bd7;
    }
  }
  &__menu {
    .menu-text {
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: #000;
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
  @media (min-width: 660px) {
    display: block;
  }
}

.display-big-show {
  display: block;
  @media (min-width: 660px) {
    display: none;
  }
}
</style>
