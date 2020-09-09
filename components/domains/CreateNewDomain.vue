<template>
  <v-list class="dialog-create-new-domain">
    <div class="d-flex justify-space-between">
      <div></div>
      <div
        class="dialog-create-new-domain__dialog-icon pa-2"
        @click.stop="$emit('closeModalCreateNewDomain')"
      >
        <img src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <div class="dialog-create-new-domain__title">
      Connect a domain name you already own
    </div>
    <div class="dialog-create-new-domain__description mb-10">
      Configure a domain name you already own to use as a branded domain for
      your links.
    </div>
    <v-row class="d-flex flex-wrap align-center">
      <v-col cols="12" sm="8">
        <v-textarea
          v-model="destinationDomain"
          auto-grow
          label="Destination your Domain"
          placeholder="What is your domain name"
          hide-details="auto"
          outlined
          rows="1"
          dense
          :disabled="loading"
          class="dialog-create-new-domain__input"
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="4" class="text-right">
        <button
          :disabled="loading"
          class="button-normal dialog-create-new-domain__button"
          @click.prevent="createNewDomain"
        >
          Create new domain
        </button>
      </v-col>
    </v-row>
    <v-row> </v-row>
    <v-snackbar v-model="showAlert" top color="success">
      Create new domain successfully
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="showAlert = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-list>
</template>

<script>
import { createNewDomain } from '@/services/api';
export default {
  data: () => ({
    destinationDomain: '',
    loading: false,
    showAlert: false,
    token: '',
  }),
  created() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
  },
  methods: {
    reload() {
      window.location.reload();
    },
    async createNewDomain() {
      this.loading = true;
      try {
        const res = await createNewDomain(this.token, this.destinationDomain);
        const { status } = res.data;
        if (status === 200) {
          this.showAlert = true;
          setTimeout(() => {
            this.$emit('closeModalCreateNewDomain');
            this.reload()
          }, 4000);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.destinationDomain = '';
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-create-new-domain {
  padding: 2vh 3vh;
  height: 100%;
  font-family: Poppins, sans-serif;
  &__dialog-icon {
    cursor: pointer;
    height: 32px;
    background-color: #f9f9fa;
    border-radius: 50%;
    img {
      object-fit: cover;
      width: 16px;
      height: auto;
    }
  }
  &__title {
    font-size: 24px;
  }
  &__description {
    font-size: 14px;
    color: #595d66;
  }
  &__button {
    padding: 8px 40px;
    font-weight: 500;
  }
  @media (max-width: 1368px) {
    &__title {
      font-size: 22px;
    }
    &__description {
      font-size: 13px;
    }
    &__input::v-deep label {
      font-size: 15px;
    }
    &__input::v-deep textarea {
      font-size: 15px;
    }
    &__select::v-deep label {
      font-size: 15px;
    }
    &__select::v-deep input {
      font-size: 15px;
    }
    &__button {
      padding: 7px 35px;
      font-size: 15px;
    }
  }
  @media (max-width: 600px) {
    &__title {
      font-size: 18px;
    }
    &__description {
      font-size: 10px;
    }
    &__input::v-deep label {
      font-size: 14px;
    }
    &__input::v-deep textarea {
      font-size: 14px;
    }
    &__select::v-deep label {
      font-size: 14px;
    }
    &__select::v-deep input {
      font-size: 14px;
    }
    &__button {
      padding: 5px 35px;
      font-size: 14px;
      width: 100%;
    }
  }
}
</style>
