<template>
  <div>
    <v-snackbar v-model="showAlert" top color="success">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="$emit('closeSnackbar')"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </div>
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
};
</script>
