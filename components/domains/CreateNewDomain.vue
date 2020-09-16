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
    <SnackbarSuccess
      message="Create new domain successfully"
      :show-alert="showAlert"
      @closeSnackbar="showAlert = false"
    />
    <SnackbarError
      message="Domain is existed"
      :show-alert="showAlert400"
      @closeSnackbar="showAlert400 = false"
    />
  </v-list>
</template>

<script>
import { createNewDomain } from '@/services/api';
import SnackbarSuccess from '@/components/shares/SnackbarSuccess';
import SnackbarError from '@/components/shares/SnackbarError';
export default {
  components: {
    SnackbarSuccess,
    SnackbarError,
  },
  data: () => ({
    destinationDomain: '',
    loading: false,
    showAlert: false,
    showAlert400: false,
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
            this.reload();
            this.showAlert = false;
            this.loading = false;
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        this.showAlert400 = true;
        setTimeout(() => {
          this.showAlert400 = false;
          this.loading = false;
        }, 2000);
      } finally {
        this.destinationDomain = '';
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
