<template>
  <v-snackbar v-model="show" top color="success">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="$emit('closeSnackbar')">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
    showAlert: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    show: false,
  }),
  beforeMount() {
    this.show = this.showAlert;
  },
};
</script>
