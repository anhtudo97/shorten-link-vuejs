<template>
  <v-app>
    <Header @openModal="openModal" />
    <nuxt />
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
</template>

<script>
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  beforeMount() {
    if (this.user.token === '') {
      this.$router.push('/');
    }
  },
  methods: {
    openModal() {
      this.drawer = !this.drawer;
    },
  },
};
</script>
