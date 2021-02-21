<template>
  <transition name="fade" mode="out-in">
    <v-app v-if="loading">
      <div id="header" class="relative">
        <Header class="header-fixed" @openModal="openModal" />
      </div>
      <v-row class="sub-menu">
        <v-col cols="11" md="10" lg="8" class="mx-auto">
          <v-row class="mx-0">
            <nuxt-link to="/terms-conditions">
              <div class="pr-5 font-semiblod">Terms of use</div>
            </nuxt-link>
            <nuxt-link to="/privacy-policy">
              <div class="pr-5 font-semiblod">Privacy policy</div>
            </nuxt-link>
          </v-row>
        </v-col>
      </v-row>
      <nuxt />
      <Footer />
      <v-navigation-drawer
        v-model="drawer"
        absolute
        left
        temporary
        style="width: 60%;"
      >
        <Drawer />
      </v-navigation-drawer>
    </v-app>
  </transition>
</template>

<script>
import Header from '@/components/shares/Header';
import Footer from '@/components/shares/Footer';
import Drawer from '@/components/shares/NavigationDrawer';
export default {
  components: {
    Header,
    Footer,
    Drawer,
  },
  data: () => ({
    drawer: false,
    loading: false,
  }),
  beforeMount() {
    this.delayLoading();
  },
  methods: {
    openModal() {
      this.drawer = !this.drawer;
    },
    delayLoading() {
      setTimeout(() => {
        this.loading = true;
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
#header {
  position: relative;
  z-index: 6;
}
.header-fixed {
  position: fixed;
  background-color: #fff;
  width: 100%;
}
.sub-menu {
  font-family: Poppins, sans-serif;
  margin-top: 4.5rem;
}
</style>
