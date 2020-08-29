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
    <div class="dialog-create-new-domain__title">Connect a domain name you already own</div>
    <div
      class="dialog-create-new-domain__description mb-10"
    >Configure a domain name you already own to use as a branded domain for your links.</div>
    <v-row class="d-flex flex-wrap align-center">
      <v-col cols="12" sm="6">
        <v-textarea
          v-model="destinationDomain"
          auto-grow
          label="Destination your Domain"
          hint="Type or paste your domain"
          placeholder="What is your domain name"
          outlined
          rows="1"
          dense
          class="dialog-create-new-domain__input"
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          class="dialog-create-new-domain__select"
          :items="items"
          label="Workspace(s)"
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-right">
        <button class="dialog-create-new-domain__button">
          <div class="button-text">Create new domain</div>
        </button>
      </v-col>
    </v-row>
    <div class></div>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    destinationDomain: '',
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
  }),
};
</script>

<style lang="scss" scoped>
.dialog-create-new-domain {
  padding: 2vh 3vh;
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
    padding: 10px 40px;
    border: 0.5px solid #3c64b1;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 500;
    color: #3c64b1;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: #3c64b1;
      color: #fff;
    }
  }
  @media (max-width: 1368px) {
    &__title {
      font-size: 22px;
    }
    &__description {
      font-size: 13px;
    }
    &__input {
      font-size: 15px;
    }
    &__select {
      font-size: 15px;
      ::v-deep.v-label {
        font-size: 15px;
      }
    }
    &__button {
      padding: 7px 35px;
      font-size: 16px;
    }
  }
  @media (max-width: 600px) {
    &__title {
      font-size: 20px;
    }
    &__description {
      font-size: 10px;
    }
    &__input {
      font-size: 12px;
    }
    &__select {
      font-size: 12px;
    }
    &__button {
      padding: 5px 35px;
      font-size: 12px;
    }
  }
}
</style>
