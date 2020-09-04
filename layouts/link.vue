<template>
  <v-app>
    <Header />
    <nuxt />
  </v-app>
</template>

<script>
import Header from '@/components/shares/Header';
export default {
  components: {
    Header,
  },
};
</script>
