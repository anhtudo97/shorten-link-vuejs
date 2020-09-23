<template>
  <v-list class="modal-detail-link py-5">
    <div class="d-flex justify-space-between px-4">
      <div></div>
      <div class="modal-detail-link__dialog-icon pa-2" @click="$emit('closeModalDetailLink')">
        <img src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <v-row class="mx-0">
      <v-col cols="12" class="px-3 px-sm-5">
        <div
          class="d-flex justify-space-between modal-detail-link__dialog-main align-center mb-10 flex-wrap"
        >
          <a
            :href="`https://${shorten}`"
            class="main-title text-overflow-hidden pb-3 pb-sm-0"
          >{{ shorten }}</a>
          <div class="d-flex dialog-link-service align-center">
            <div v-clipboard="`https://${shorten}`" class="dialog-button-copy mr-3">Copy</div>
            <button
              class="dialog-button button-normal"
              aria-label="Edit"
              @click.stop="modalEditLink = true"
            >Edit</button>
          </div>
        </div>
        <div class="modal-detail-link__dialog-sub">
          <v-row class="information d-flex align-center">
            <v-col cols="12" md="3">
              <div class="information-title">Created date</div>
            </v-col>
            <v-col cols="12" md="9">
              <div class="information-content">{{ createdDate }}</div>
            </v-col>
          </v-row>
          <v-row class="information d-flex align-center">
            <v-col cols="12" md="3">
              <div class="information-title">Title</div>
            </v-col>
            <v-col cols="12" md="9">
              <div class="information-content content-border">{{ title }}</div>
            </v-col>
          </v-row>
          <v-row class="information d-flex align-center">
            <v-col cols="12" md="3">
              <div class="information-title">Original link</div>
            </v-col>
            <v-col cols="12" md="9">
              <div class="information-content content-border">{{ destination }}</div>
            </v-col>
          </v-row>
          <v-row class="information d-flex align-center">
            <v-col cols="12" md="3">
              <div class="information-title">Remove</div>
            </v-col>
            <v-col cols="12" md="9">
              <button
                class="remove-button button-warning"
                aria-label="Remove this link"
                @click.stop="isRemoveModal = true"
              >Remove this link</button>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-dialog
      v-model="modalEditLink"
      class="link__dialog"
      max-width="900"
      :fullscreen="width < 600 ? true : false"
    >
      <CreateNewLink :id="id" :edit="true" @closeModalAddNewLink="closeModalAddNewLink" />
    </v-dialog>
    <v-dialog v-model="isRemoveModal" persistent width="500">
      <RemoveModal name="link" @closeRemoveModal="closeRemoveModal" @removeElement="removeLink" />
    </v-dialog>
    <v-snackbar v-model="showAlert" top color="success">
      Delete link is successfully
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" aria-label="close" @click="showAlert = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-list>
</template>

<script>
import { clipboard } from 'vue-clipboards';
import { getLink, deleteLink } from '@/services/api';

import CreateNewLink from '@/components/links/CreateNewLink';
import RemoveModal from '@/components/shares/RemoveModal';
export default {
  directives: { clipboard },
  components: {
    RemoveModal,
    CreateNewLink,
  },
  props: {
    slashtag: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
  async fetch() {
    await this.getLink();
  },
  data: () => ({
    isRemove: false,
    isRemoveModal: false,
    modalEditLink: false,
    width: 0,
    token: '',
    date: '',
    title: '',
    destination: '',
    domain: {},
    shorten: '',
    loading: false,
    showAlert: false,
  }),
  computed: {
    createdDate() {
      const temp = new Date(this.date).toString().split(' ');
      return `${temp[0]} ${temp[1]} ${temp[2]} ${temp[3]}`;
    },
  },
  created() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    closeRemoveModal() {
      this.isRemoveModal = false;
    },
    closeModalAddNewLink() {
      this.modalEditLink = false;
      this.getLink();
    },
    handleResize() {
      if (process.client) {
        this.width = window.innerWidth;
      }
    },
    async getLink() {
      try {
        const resLink = await getLink(this.token, this.id);
        const { status, data } = resLink.data;
        if (status === 200) {
          const { createdAt, title, destination, domain, slashtag } = data;
          this.date = createdAt;
          this.title = title;
          this.destination = destination;
          this.shorten = `${domain.name}/${slashtag}`;
        }
      } catch (error) {
        const { status } = error.response.data;
        if (status === 401) this.$router.push('/login');
      }
    },
    async removeLink() {
      try {
        this.loading = true;
        const resDeleteLink = await deleteLink(this.token, this.id);
        const { status } = resDeleteLink.data;
        if (status === 200) {
          this.showAlert = true;
          setTimeout(() => {
            this.closeRemoveModal();
            this.$emit('closeModalDetailLink');
            this.showAlert = false;
            this.loading = false;
          }, 1000);
        }
      } catch (error) {
        const { status } = error.response.data;
        if (status === 401) this.$router.push('/login');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-detail-link {
  font-family: Poppins, sans-serif;
  height: 100%;
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
      cursor: pointer;
      font-size: 24px;
      font-weight: 500;
      &:hover {
        color: #3c64b1;
      }
    }
    .dialog-link-service {
      .dialog-button-copy {
        cursor: pointer;
        color: #3c64b1;
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
      .remove-button {
        padding: 1vh 10vh;
      }
    }
  }

  @media (max-width: 1368px) {
    &__dialog-main {
      .main-title {
        font-size: 22px;
      }
      .dialog-link-service {
        .dialog-button-copy {
          font-size: 15px;
          padding: 2px 20px;
        }
        .dialog-button {
          font-size: 15px;
          padding: 2px 25px;
        }
      }
    }
    &__dialog-sub {
      .information {
        .information-title {
          font-size: 14px;
        }
        .information-content {
          font-size: 14px;
        }
        .content-border {
          font-size: 14px;
          padding: 1vh 2vh;
        }
        .remove-button {
          font-size: 14px;
          padding: 0.5vh 7vh;
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
        .dialog-button-copy {
          font-size: 14px;
          padding: 2px 20px;
        }
        .dialog-button {
          font-size: 14px;
          padding: 2px 25px;
        }
      }
    }
    &__dialog-sub {
      .information {
        .information-title {
          font-size: 13px;
        }
        .information-content {
          font-size: 13px;
        }
        .content-border {
          font-size: 13px;
          padding: 1vh 2vh;
        }
        .remove-button {
          font-size: 13px;
          padding: 0.5vh 7vh;
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
        .dialog-button-copy {
          font-size: 13px;
          padding: 2px 20px;
        }
        .dialog-button {
          font-size: 13px;
          padding: 2px 25px;
        }
      }
    }
    &__dialog-sub {
      .information {
        .information-title {
          font-size: 12px;
        }
        .information-content {
          font-size: 12px;
        }
        .content-border {
          font-size: 12px;
          padding: 1vh 2vh;
        }
        .remove-button {
          font-size: 12px;
          padding: 0.3vh 6vh;
        }
      }
    }
  }
}
</style>
