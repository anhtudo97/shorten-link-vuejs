<template>
  <transition name="fade" mode="out-in">
    <v-app v-if="loading">
      <nuxt />
    </v-app>
  </transition>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  beforeMount() {
    this.delayLoading();
  },
  methods: {
    delayLoading() {
      setTimeout(() => {
        this.loading = true;
      }, 200);
    },
  },
};
</script>

<style lang="scss">
body {
  font-family: Montserrat-Regular, sans-serif;
}
</style>
