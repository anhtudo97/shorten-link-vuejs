<template>
  <v-list class="modal-detail-link py-5">
    <div class="d-flex justify-space-between px-4">
      <div></div>
      <div class="modal-detail-link__dialog-icon" @click="$emit('closeModalDetailLink')">
        <img class="ma-2" src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <v-row class="mx-0">
      <v-col cols="11" class="mx-auto">
        <div
          class="d-flex justify-space-between modal-detail-link__dialog-main align-center mb-10 flex-wrap"
        >
          <div class="main-title">https://www.johnsmilga.com/projects</div>
          <div class="d-flex dialog-link-service align-center">
            <v-tooltip top nudge-left="10">
              <template v-slot:activator="{ on, attrs }">
                <a :href="slashtag" class="align-self-center">
                  <img
                    :src="require('@/assets/icons/route-solid.svg')"
                    alt="route"
                    class="mr-5"
                    v-bind="attrs"
                    v-on="on"
                  />
                </a>
              </template>
              <span class="text--black">Visit URL</span>
            </v-tooltip>
            <v-tooltip top nudge-left="10">
              <template v-slot:activator="{ on, attrs }">
                <div v-clipboard="slashtag">
                  <img
                    :src="require('@/assets/icons/clone-solid.svg')"
                    alt="route"
                    class="mr-5"
                    v-bind="attrs"
                    v-on="on"
                  />
                </div>
              </template>
              <span class>Copy</span>
            </v-tooltip>
            <v-tooltip top nudge-left="10">
              <template v-slot:activator="{ on, attrs }">
                <div @click="isRemoveModal = true">
                  <img
                    :src="require('@/assets/icons/trash-solid.svg')"
                    alt="route"
                    class="mr-5"
                    v-bind="attrs"
                    v-on="on"
                  />
                </div>
              </template>
              <span>Remove</span>
            </v-tooltip>
          </div>
        </div>
        <div class="modal-detail-link__dialog-sub">
          <div class="link-title">Get title from remote HTML URL - without jQuery · GitHub</div>
          <div
            class="destination-url my-4"
          >https://blog.tqdesign.vn/5-meo-thiet-ke-ux-ung-dung-thuong-mai-dien-tu-thien-voi-nguoi-dung-hon-16661.html</div>
          <div class="calendar d-flex">
            <img src="@/assets/svg/calendar.svg" alt="calendar" srcset />
            <div class="date pl-3">{{date}}</div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="isRemoveModal" persistent width="500">
      <v-list class="modal-detail-link__dialog-remove">
        <v-row class="mx-0">
          <v-col cols="11" class="mx-auto">
            <img src="@/assets/svg/warning.svg" alt="warning" srcset />
            <div class="dialog-main-title mb-3">Delete this link?</div>
            <div
              class="mb-6"
            >If you trash this link it won't redirect to the destination URL anymore and any stats will be lost forever. This is a permanent action and cannot be undone.</div>
            <div class="d-flex">
              <div class="dialog-cancel-button mr-5" @click="isRemoveModal = false">Cancel</div>
              <div class="dialog-delete-button" @click="removeLink">Delete</div>
            </div>
          </v-col>
        </v-row>
      </v-list>
    </v-dialog>
  </v-list>
</template>

<script>
import { clipboard } from 'vue-clipboards';
import { format } from 'date-fns';

export default {
  directives: { clipboard },
  props: {
    slashtag: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    isRemove: false,
    isRemoveModal: false,
  }),
  computed: {
    date() {
      return format(new Date(), 'MMM dd, yyyy');
    },
  },
  methods: {
    removeLink() {
      console.log('remove');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-detail-link {
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
  &__dialog-main {
    .main-title {
      font-size: 24px;
      font-weight: 500;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .dialog-link-service {
      img {
        margin-top: 10px;
        cursor: pointer;
        object-fit: cover;
        width: 30px;
        height: auto;
      }
    }
  }
  &__dialog-sub {
    .link-title,
    .destination-url {
      font-size: 15px;
    }
    .calendar {
      img {
        object-fit: cover;
        width: 16px;
        height: auto;
      }
      .date {
        font-size: 14px;
      }
    }
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
    .dialog-cancel-button {
      cursor: pointer;
      width: 100px;
      padding: 5px;
      text-align: center;
      border: 1px solid #2c96df;
      border-radius: 10px;
    }
    .dialog-delete-button {
      cursor: pointer;
      width: 100px;
      padding: 5px;
      text-align: center;
      background-color: #d34547;
      border-radius: 10px;
      color: white;
    }
  }

  @media (max-width: 1368px) {
    &__dialog-main {
      .main-title {
        font-size: 22px;
      }
      .dialog-link-service {
        img {
          margin-top: 10px;
          width: 27px;
        }
      }
    }
    &__dialog-sub {
      .link-title,
      .destination-url {
        font-size: 14px;
      }
      .calendar {
        img {
          width: 15px;
        }
        .date {
          font-size: 13px;
        }
      }
    }
    &__dialog-remove {
      img {
        width: 34px;
      }
      .dialog-main-title {
        font-size: 22px;
        font-weight: 500;
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
  }
  @media (max-width: 960px) {
    &__dialog-main {
      .main-title {
        font-size: 20px;
      }
      .dialog-link-service {
        img {
          margin-top: 10px;
          width: 25px;
        }
      }
    }
    &__dialog-sub {
      .link-title,
      .destination-url {
        font-size: 13px;
      }
      .calendar {
        img {
          width: 14px;
        }
        .date {
          font-size: 12px;
        }
      }
    }
    &__dialog-remove {
      img {
        width: 32px;
      }
      .dialog-main-title {
        font-size: 20px;
        font-weight: 500;
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
  }
  @media (max-width: 600px) {
    &__dialog-main {
      .main-title {
        font-size: 18px;
      }
      .dialog-link-service {
        img {
          margin-top: 10px;
          width: 22px;
        }
      }
    }
    &__dialog-sub {
      .link-title,
      .destination-url {
        font-size: 12px;
      }
      .calendar {
        img {
          width: 12px;
        }
        .date {
          font-size: 11px;
        }
      }
    }
    &__dialog-remove {
      img {
        width: 30px;
      }
      .dialog-main-title {
        font-size: 18px;
        font-weight: 500;
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
}
</style>
