<template>
  <v-list class="modal-detail-link py-5">
    <div class="d-flex justify-space-between px-4">
      <div></div>
      <div class="modal-detail-link__dialog-icon pa-2" @click="$emit('closeModalDetailLink')">
        <img src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <v-row class="mx-0">
      <v-col cols="11" class="mx-auto">
        <div
          class="d-flex justify-space-between modal-detail-link__dialog-main align-center mb-10 flex-wrap"
        >
          <div class="main-title">https://www.johnsmilga.com/projects</div>
          <div class="d-flex dialog-link-service align-center">
            <div v-clipboard="slashtag" class="dialog-button-copy mr-3">Copy</div>
            <button class="dialog-button">Edit</button>
            <!-- <v-tooltip top nudge-left="10">
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
            </v-tooltip>-->
          </div>
        </div>
        <div class="modal-detail-link__dialog-sub">
          <v-row class="information d-flex align-center">
            <v-col cols="12" md="3">
              <div class="information-title">Created date</div>
            </v-col>
            <v-col cols="12" md="9">
              <div class="information-content">{{date}}</div>
            </v-col>
          </v-row>
          <v-row class="information d-flex align-center">
            <v-col cols="12" md="3">
              <div class="information-title">Title</div>
            </v-col>
            <v-col cols="12" md="9">
              <div
                class="information-content content-border"
              >Get title from remote HTML URL - without jQuery · GitHub</div>
            </v-col>
          </v-row>
          <v-row class="information d-flex align-center">
            <v-col cols="12" md="3">
              <div class="information-title">Original link</div>
            </v-col>
            <v-col cols="12" md="9">
              <div
                class="information-content content-border"
              >https://blog.tqdesign.vn/5-meo-thiet-ke-ux-ung-dung-thuong-mai-dien-tu-thien-voi-nguoi-dung-hon-16661.html</div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="isRemoveModal" persistent width="500">
      <RemoveModal name="link" @closeRemoveModal="closeRemoveModal" @removeElement="removeLink" />
    </v-dialog>
  </v-list>
</template>

<script>
import { clipboard } from 'vue-clipboards';
import { format } from 'date-fns';

import RemoveModal from '@/components/shares/RemoveModal';
export default {
  directives: { clipboard },
  components: {
    RemoveModal,
  },
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
      return format(new Date(), 'MMMM dd, yyyy');
    },
  },
  methods: {
    removeLink() {
      console.log('remove');
    },
    closeRemoveModal() {
      this.isRemoveModal = false;
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
      .dialog-button-copy {
        cursor: pointer;
        padding: 3px 20px;
        border: 0.5px solid #3c64b1;
        border-radius: 4px;
        transition: all 0.2s ease-in-out;
        &:hover {
          background-color: #3c64b1;
          color: #fff;
        }
      }
      .dialog-button {
        padding: 3px 25px;
      }
    }
  }
  &__dialog-sub {
    .link-title,
    .destination-url {
      font-size: 15px;
    }
    .information {
      .information-title {
        color: #909398;
        font-size: 15px;
        font-weight: 500;
      }
      .information-content {
        font-size: 15px;
        color: #595d66;
      }
      .content-border {
        font-size: 15px;
        padding: 1vh 2vh;
        background-color: #eaf6ff;
        color: #212732;
        border-radius: 10px;
      }
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
  }
}
</style>
