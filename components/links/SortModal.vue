<template>
  <v-list class="modal-sort py-5">
    <div>Sort By</div>
    <div @click="updateSortBy('lastest')">The lastest</div>
    <div @click="updateSortBy('slashTagAZ')">Slash tag A - Z</div>
    <div @click="updateSortBy('slashTagZA')">Slash tag Z - A</div>
  </v-list>
</template>

<script>
export default {
  methods: {
    updateSortBy(value) {
      switch (value) {
        case 'lastest': {
          this.$emit('updateSort', 'created_at', 'DESC');
          break;
        }
        case 'slashTagAZ': {
          this.$emit('updateSort', 'slashtag', 'ASC');
          break;
        }
        case 'slashTagZA': {
          this.$emit('updateSort', 'slashtag', 'DESC');
          break;
        }
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>