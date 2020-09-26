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
    <v-row class="d-flex flex-wrap align-start">
      <v-col cols="12" sm="8">
        <v-textarea
          v-model="destinationDomain"
          :rules="[domainFormat()]"
          auto-grow
          label="Destination your Domain"
          placeholder="What is your domain name"
          outlined
          rows="1"
          dense
          :disabled="loading"
          class="dialog-create-new-domain__input"
          @input="validURL(destinationDomain)"
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="4" class="text-right">
        <button
          :disabled="loading || !valid"
          class="button-normal dialog-create-new-domain__button"
          aria-label="Create new domain"
          @click.prevent="createNewDomain"
        >
          Create new domain
        </button>
      </v-col>
    </v-row>
    <v-snackbar v-model="showAlert" top color="success">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          aria-label="close"
          @click="showAlert = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="showAlert400" top color="error">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          aria-label="close"
          @click="showAlert400 = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </v-list>
</template>

<script>
import { debounce } from 'debounce';
import { createNewDomain } from '@/services/api';
import validation from '@/utils/validations';
export default {
  data: () => ({
    ...validation,
    destinationDomain: '',
    loading: false,
    showAlert: false,
    showAlert400: false,
    token: '',
    message: '',
    valid: false,
  }),
  created() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
  },
  methods: {
    validURL: debounce(function(str) {
      const pattern = new RegExp('^([a-z0-9]+(-[a-z0-9]+)*.)+[a-z]{2,}$'); // fragment locator
      this.valid = !!pattern.test(str);
    }, 1000),
    async createNewDomain() {
      if (this.valid) {
        this.loading = true;
        try {
          const resNewDomain = await createNewDomain(
            this.token,
            this.destinationDomain
          );
          const { status, message } = resNewDomain.data;
          this.message = message;
          this.destinationDomain = '';
          if (status === 200) {
            this.showAlert = true;
            setTimeout(() => {
              this.$emit('closeModalCreateNewDomain');
              this.showAlert = false;
              this.loading = false;
            }, 2000);
          }
        } catch (error) {
          const { data } = error.response;
          if (data.status === 401) {
            this.$router.push('/login');
            return;
          }
          this.message = data.message;
          this.showAlert400 = true;
          setTimeout(() => {
            this.showAlert400 = false;
            this.loading = false;
          }, 2000);
        }
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
