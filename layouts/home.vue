<template>
  <v-app>
    <div id="header" class="relative">
      <Header class="header-fixed" />
    </div>
    <nuxt />
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/shares/Header';
import Footer from '@/components/shares/Footer';
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
#header {
  position: relative;
  z-index: 999;
}
.header-fixed {
  position: fixed;
  background-color: #fff;
  width: 100%;
}
</style>
