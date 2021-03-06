<template>
  <div class="link-detail px-3">
    <v-col cols="12" sm="10" md="8" class="mx-auto">
      <v-row class="align-center border-radius-10 py-3">
        <v-col cols="12" md="8" @click.stop="models.isOpen = true">
          <div ref="shorten" class="shortened-link text-overflow-hidden">
            {{ shorten }}
          </div>
          <div class="origin-link pt-2 text-overflow-hidden">{{ link }}</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="d-flex justify-space-between align-center shortened-info">
            <div class="shortened-clicks">
              {{ clicks }} {{ clicks > 1 ? 'clicks' : 'click' }}
            </div>
            <div>
              <div class="shortened-date">{{ createAt }}</div>
              <div class="d-flex link-services">
                <v-tooltip top nudge-left="10">
                  <template v-slot:activator="{ on, attrs }">
                    <a :href="`https://${shorten}`" target="_blank">
                      <img
                        :src="require('@/assets/icons/route-solid.svg')"
                        alt="route"
                        class="ml-5"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </a>
                  </template>
                  <span class="text--black">Visit URL</span>
                </v-tooltip>
                <v-tooltip top nudge-left="10">
                  <template v-slot:activator="{ on, attrs }">
                    <button
                      type="button"
                      v-bind="attrs"
                      v-on="on"
                      @click="doCopy"
                    >
                      <img
                        :src="require('@/assets/icons/clone-solid.svg')"
                        alt="route"
                        class="ml-5"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </button>
                  </template>
                  <span class>Copy</span>
                </v-tooltip>
                <v-tooltip top nudge-left="10">
                  <template v-slot:activator="{ on, attrs }">
                    <div @click.stop="openModalUpdate">
                      <img
                        :src="require('@/assets/icons/edit-solid.svg')"
                        alt="route"
                        class="ml-5"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </div>
                  </template>
                  <span>Edit</span>
                </v-tooltip>
                <v-tooltip top nudge-left="10">
                  <template v-slot:activator="{ on, attrs }">
                    <div @click.stop="isRemoveModal = true">
                      <img
                        :src="require('@/assets/icons/trash-solid.svg')"
                        alt="route"
                        class="ml-5"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </div>
                  </template>
                  <span>Remove</span>
                </v-tooltip>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-dialog
      v-model="models.isOpen"
      class="dialog"
      max-width="900"
      :fullscreen="width < 600 ? true : false"
    >
      <DetailLinkModal
        :id="id"
        :slashtag="slashtag"
        @refetchLinks="$emit('refetch-links')"
        @close-modal-detail-link="closeModalDetailLink"
      />
    </v-dialog>
    <v-dialog
      v-model="modalEditLink"
      class="link__dialog"
      max-width="900"
      :fullscreen="width < 600 ? true : false"
    >
      <CreateNewLink
        :id="id"
        :edit="true"
        @refetchLinks="$emit('refetch-links')"
        @close-modal-add-new-link="closeModalEditNewLink"
      />
    </v-dialog>
    <v-dialog v-model="isRemoveModal" persistent width="500">
      <RemoveModal
        name="link"
        @closeRemoveModal="closeRemoveModal"
        @removeElement="removeLink"
      />
    </v-dialog>
    <v-snackbar v-model="showAlert" top color="success">
      Delete link is successfully
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
    <v-snackbar
      key="2"
      v-model="showAlertCopy"
      centered
      color="success"
      timeout="2000"
    >
      Link copied
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
  </div>
</template>

<script>
import { deleteLink } from '@/services/api';

import DetailLinkModal from '@/components/links/DetailLinkModal';
import CreateNewLink from '@/components/links/CreateNewLink';
import RemoveModal from '@/components/shares/RemoveModal';
export default {
  components: {
    DetailLinkModal,
    RemoveModal,
    CreateNewLink,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    slashtag: {
      type: String,
      default: '',
    },
    clicks: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: '',
    },
    domain: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    models: {
      isOpen: false,
    },
    isRemoveModal: false,
    modalEditLink: false,
    width: 0,
    showAlert: false,
    showAlertCopy: false,
  }),
  computed: {
    shorten() {
      return `${this.domain}/${this.slashtag}`;
    },
    createAt() {
      const today = Date.parse(new Date());
      const createdAt = Date.parse(this.date);
      const diffTime = Math.abs(today - createdAt);
      if (diffTime < 60) {
        const time = Math.ceil(diffTime);
        return `${time} ${time > 1 ? 'seconds' : 'second'} ago`;
      }
      if (diffTime < 3600 * 1000) {
        const diffmin = Math.floor(diffTime / (60 * 1000));
        return `${diffmin} ${diffmin > 1 ? 'mins' : 'min'} ago`;
      } else if (diffTime < 1000 * 60 * 60 * 24) {
        const diffday = Math.floor(diffTime / (3600 * 1000));
        return `${diffday} ${diffday > 1 ? 'hours' : 'hour'} hour(s) ago`;
      } else {
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} ${diffDays > 1 ? 'days' : 'day'} ago`;
      }
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },
  methods: {
    closeModalDetailLink() {
      this.models.isOpen = false;
      this.$emit('close-modal-add-new-link');
    },
    closeRemoveModal() {
      this.isRemoveModal = false;
    },
    handleResize() {
      if (process.client) {
        this.width = window.innerWidth;
      }
    },
    closeModalEditNewLink() {
      this.modalEditLink = false;
      this.$emit('close-modal-add-new-link');
    },
    doCopy() {
      this.$copyText(`https://${this.shorten}`).then(
        (this.showAlertCopy = true)
      );
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
            this.$emit('close-modal-add-new-link');
            this.showAlert = false;
            this.loading = false;
          }, 1000);
        }
      } catch (error) {
        const { status } = error.response;
        if (status === 401) {
          this.$router.push('/login');
          window.localStorage.clear();
        }
      }
    },
    openModalUpdate() {
      this.modalEditLink = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.link-detail {
  .border-radius-10 {
    border: 1px solid #e8e9ea;
    border-radius: 10px;
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      background-color: #eaf6ff;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

      .shortened-info {
        .link-services {
          transition-duration: 0.5s;
          transition-timing-function: linear;
          opacity: 1;
        }

        .shortened-date {
          opacity: 0;
        }
      }
    }
  }

  .shortened-link {
    cursor: pointer;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #212732;

    &:hover {
      color: #3c64b1;
    }
  }

  .origin-link {
    font-size: 15px;
    line-height: 24px;
    color: #595d66;
  }

  .shortened-info {
    position: relative;

    .shortened-date {
      opacity: 1;
    }

    .link-services {
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0;
      z-index: 99;

      img {
        cursor: pointer;
        object-fit: cover;
        width: 25px;
        height: auto;
      }

      .tooltip-white {
        background-color: white;
      }
    }
  }

  @media (max-width: 1366px) {
    .shortened-link {
      font-size: 18px;
      line-height: 26px;
    }

    .origin-link {
      font-size: 14px;
      line-height: 22px;
    }

    .shortened-clicks,
    .shortened-date {
      font-size: 15px;
    }

    .shortened-info {
      .link-services {
        img {
          width: 22px;
        }
      }
    }
  }

  @media (max-width: 960px) {
    .shortened-link {
      font-size: 16px;
      line-height: 24px;
    }

    .origin-link {
      font-size: 13px;
      line-height: 20px;
    }

    .shortened-clicks,
    .shortened-date {
      font-size: 14px;
    }

    .shortened-info {
      .link-services {
        img {
          width: 20px;
        }
      }
    }
  }

  @media (max-width: 600px) {
    .shortened-link {
      font-size: 14px;
      line-height: 22px;
    }

    .origin-link {
      font-size: 12px;
      line-height: 18px;
    }

    .shortened-clicks,
    .shortened-date {
      font-size: 12px;
    }

    .shortened-info {
      .link-services {
        img {
          width: 18px;
        }
      }
    }
  }
}

.dialog {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
