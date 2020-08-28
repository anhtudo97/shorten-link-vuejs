<template>
  <v-list class="modal-detail-domain">
    <div class="d-flex justify-space-between">
      <div></div>
      <div class="modal-detail-domain__dialog-icon pa-2" @click="$emit('closeModalDetailLink')">
        <img src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <div class="modal-detail-domain__domain">
      <div class="domain-url">https://gitlab.com/</div>
      <div class="domain-created-at d-flex my-5 align-center">
        <img src="@/assets/svg/calendar.svg" alt="calendar" srcset />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="date pl-3" v-bind="attrs" v-on="on">{{date}}</div>
          </template>
          <span>Added on</span>
        </v-tooltip>
      </div>
    </div>
    <v-row class="modal-detail-domain__services align-center my-6">
      <v-col cols="12" sm="3">
        <div class="services-title">Workspace(s)</div>
      </v-col>
      <v-col cols="12" sm="9">
        <div class="services-name">Workspace 1</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <hr class="modal-detail-domain__underline" />
      </v-col>
    </v-row>
    <v-row class="modal-detail-domain__services align-center my-5">
      <v-col cols="12" sm="3">
        <div class="services-title">Remove</div>
      </v-col>
      <v-col cols="12" sm="9">
        <button class="services-button" @click.stop="isRemoveModal = true">
          <div class="button-text">Remove this domain</div>
        </button>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <hr class="modal-detail-domain__underline" />
      </v-col>
    </v-row>
    <v-dialog v-model="isRemoveModal" persistent width="500">
      <v-list class="modal-detail-domain__dialog-remove">
        <v-row class="mx-0">
          <v-col cols="11" class="mx-auto">
            <img src="@/assets/svg/warning.svg" alt="warning" srcset />
            <div class="dialog-main-title mb-3">Delete this link?</div>
            <div
              class="mb-6"
            >If you trash this link it won't redirect to the destination URL anymore and any stats will be lost forever. This is a permanent action and cannot be undone.</div>
            <div class="d-flex">
              <div class="dialog-button dialog-cancel-button mr-5" @click="isRemoveModal = false">Cancel</div>
              <div class="dialog-button dialog-delete-button" @click="removeLink">Delete</div>
            </div>
          </v-col>
        </v-row>
      </v-list>
    </v-dialog>
  </v-list>
</template>

<script>
import { format } from 'date-fns';
export default {
  computed: {
    date() {
      return format(new Date(), 'MMMM dd, yyy');
    },
  },
  data: () => ({
    isRemoveModal: false,
  }),
};
</script>

<style lang="scss" scoped>
.modal-detail-domain {
  font-family: Poppins, sans-serif;
  padding: 2vh 4vh 4vh 4vh;
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
  &__domain {
    .domain-url {
      font-size: 24px;
      line-height: 28px;
    }
    .domain-created-at {
      img {
        object-fit: cover;
        width: 18px;
        height: auto;
        padding-bottom: 5px;
      }
      .date {
        font-size: 13px;
        color: #595d66;
      }
    }
  }
  &__services {
    button{
      outline: none;
    }
    .services-title {
      color: #909398;
    }
    .services-name {
    }
    .services-button {
      padding: 1vh 4vh;
      border: 1px solid #d34547;
      border-radius: 10px;
      .button-text {
        font-weight: 500;
        color: #d34547;
      }
      transition: all 0.3s ease-in;
      &:hover {
        background-color: #d34547;
        .button-text {
          color: #fff;
        }
      }
    }
  }
  &__remove {
  }
  &__underline {
    border-color: #e8e9ea;
    border-width: 1px;
    border-style: solid;
  }
  &__dialog-remove {
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
    .dialog-button{
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
  }
}
</style>
