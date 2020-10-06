<template>
  <transition name="fade" mode="out-in">
    <v-app v-if="loading">
      <Header @openModal="openModal" />
      <nuxt />
      <v-navigation-drawer v-model="drawer" absolute left temporary style="width: 60%;">
        <Drawer />
      </v-navigation-drawer>
    </v-app>
  </transition>
</template>

<script>
import Header from '@/components/shares/Header';
import Drawer from '@/components/shares/NavigationDrawer';
export default {
  middleware: 'authentication',
  components: {
    Header,
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
