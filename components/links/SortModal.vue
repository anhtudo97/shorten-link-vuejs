<template>
  <v-list class="modal-sort py-5 px-5 d-flex flex-column">
    <div class="d-flex justify-space-between">
      <div></div>
      <div class="dialog-icon" @click="$emit('closeModal')">
        <img class="ma-2" src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <div class="modal-sort__title">Sort By</div>
    <button
      class="button-normal modal-sort__button mt-3"
      aria-label="The lastest"
      @click="updateSortBy('lastest')"
    >
      The lastest
    </button>
    <button
      class="button-normal modal-sort__button mt-3"
      aria-label="SlashTagAZ"
      @click="updateSortBy('slashTagAZ')"
    >
      Slash tag A - Z
    </button>
    <button
      class="button-normal modal-sort__button mt-3"
      aria-label="SlashTagZA"
      @click="updateSortBy('slashTagZA')"
    >
      Slash tag Z - A
    </button>
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
.modal-sort {
  font-family: Poppins, sans-serif;
  &__title {
    font-size: 22px;
    font-weight: 600;
  }
  &__button {
    font-weight: 500;
    padding: 5px 4vh;
  }
  .dialog-icon {
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
}
</style>
