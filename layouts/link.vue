<template>
  <v-app>
    <Header @openModal="openModal" />
    <nuxt />
    <v-navigation-drawer v-model="drawer" absolute left temporary style="width: 60%;">
      <Drawer />
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import Header from '@/components/shares/Header';
import Drawer from '@/components/shares/NavigationDrawer';
export default {
  components: {
    Header,
    Drawer,
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    openModal() {
      this.drawer = !this.drawer;
    },
  },
};
</script>
