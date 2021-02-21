<template>
  <div>
    <transition name="fade" mode="out-in">
      <v-app v-if="loading">
        <div v-if="!token">
          <div id="header" class="relative">
            <Header class="header-fixed" @openModal="openModal" />
          </div>
          <nuxt />
          <Footer />
          <v-navigation-drawer v-model="drawer" absolute left temporary style="width: 60%;">
            <Drawer />
          </v-navigation-drawer>
        </div>
      </v-app>
    </transition>
  </div>
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
    token: '',
    loading: false,
  }),
  beforeMount() {
    this.delayLoading();
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
      setTimeout(() => {
        this.$router.push('/links');
      }, 300);
    }
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
.dots {
  text-align: center;
}
</style>
