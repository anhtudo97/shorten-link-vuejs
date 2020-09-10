<template>
  <v-list class="dialog-remove">
    <v-row class="mx-0">
      <v-col cols="11" class="mx-auto">
        <img src="@/assets/svg/warning.svg" alt="warning" />
        <div class="dialog-main-title mb-3">Delete this {{ name }}?</div>
        <div class="mb-6 dialog-main-des">
          If you trash this it won't never exist on your dashboard anymore and
          any stats will be lost forever.
        </div>
        <div class="d-flex">
          <button
            :disabled="loading"
            class="dialog-button dialog-cancel-button mr-5"
            @click="$emit('closeRemoveModal')"
          >
            Cancel
          </button>
          <button
            :disabled="loading"
            class="dialog-button dialog-delete-button"
            @click="$emit('removeElement')"
          >
            Delete
          </button>
        </div>
      </v-col>
    </v-row>
  </v-list>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'Link',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-remove {
  font-family: Poppins, sans-serif;
  img {
    object-fit: cover;
    width: 36px;
    height: auto;
  }
  .dialog-main-title {
    font-size: 24px;
    font-weight: 500;
  }
  .dialog-button {
    cursor: pointer;
    width: 100px;
    padding: 5px;
    text-align: center;
    border-radius: 10px;
  }
  .dialog-cancel-button {
    border: 1px solid #2c96df;
  }
  .dialog-delete-button {
    background-color: #d34547;
    color: white;
  }
  @media screen and (max-width: 1368px) {
    img {
      width: 34px;
    }
    .dialog-main-title {
      font-size: 22px;
      font-weight: 500;
    }
    .dialog-main-des {
      font-size: 15px;
    }
    .dialog-cancel-button {
      width: 90px;
      padding: 5px;
      font-size: 15px;
    }
    .dialog-delete-button {
      width: 90px;
      padding: 5px;
      font-size: 15px;
    }
  }
  @media screen and (max-width: 960px) {
    img {
      width: 32px;
    }
    .dialog-main-title {
      font-size: 20px;
      font-weight: 500;
    }
    .dialog-main-des {
      font-size: 14px;
    }
    .dialog-cancel-button {
      width: 85px;
      padding: 4px;
      font-size: 14px;
    }
    .dialog-delete-button {
      width: 85px;
      padding: 4px;
      font-size: 14px;
    }
  }
  @media screen and (max-width: 600px) {
    img {
      width: 30px;
    }
    .dialog-main-title {
      font-size: 16px;
      font-weight: 500;
    }
    .dialog-main-des {
      font-size: 12px;
    }
    .dialog-cancel-button {
      width: 80px;
      padding: 3px;
      font-size: 13px;
    }
    .dialog-delete-button {
      width: 80px;
      padding: 4px;
      font-size: 13px;
    }
  }
}
</style>
