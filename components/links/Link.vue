<template>
  <v-row class="link-detail mx-3">
    <v-col cols="12" sm="10" md="8" class="mx-auto px-0 border-radius-10">
      <v-row class="align-center mx-0">
        <v-col cols="12" md="8" @click.stop="models.isOpen = true">
          <div class="shortened-link text-overflow-hidden">{{slashtag}}</div>
          <div class="origin-link pt-2 text-overflow-hidden">{{link}}</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="d-flex justify-space-between align-center shortened-info">
            <div class="shortened-clicks">{{clicks}} click(s)</div>
            <div>
              <div class="shortened-date">{{createAt}}</div>
              <div class="d-flex link-services">
                <v-tooltip top nudge-left="10">
                  <template v-slot:activator="{ on, attrs }">
                    <a :href="slashtag">
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
                    <div v-clipboard="slashtag">
                      <img
                        :src="require('@/assets/icons/clone-solid.svg')"
                        alt="route"
                        class="ml-5"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </div>
                  </template>
                  <span class>Copy</span>
                </v-tooltip>
                <v-tooltip top nudge-left="10">
                  <template v-slot:activator="{ on, attrs }">
                    <div>
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
    <v-dialog v-model="models.isOpen" class="dialog" max-width="900">
      <DetailLinkModal :slashtag="slashtag" @closeModalDetailLink="closeModalDetailLink" />
    </v-dialog>
    <v-dialog v-model="isRemoveModal" persistent width="500">
      <RemoveModal name="link" @closeRemoveModal="closeRemoveModal" @removeElement="removeLink" />
    </v-dialog>
  </v-row>
</template>

<script>
import { clipboard } from 'vue-clipboards';

import DetailLinkModal from '@/components/links/DetailLinkModal';
import RemoveModal from '@/components/shares/RemoveModal';
export default {
  directives: { clipboard },
  components: {
    DetailLinkModal,
    RemoveModal,
  },
  props: {
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
  },
  data: () => ({
    models: {
      isOpen: false,
    },
    isRemoveModal: false,
  }),
  computed: {
    createAt() {
      const today = Date.parse(new Date());
      const createdAt = Date.parse(this.date);
      const diffTime = Math.abs(today - createdAt);
      if (diffTime < 60 * 1000) {
        return `${Math.ceil(diffTime)} second(s) ago`;
      }
      if (diffTime < 3600 * 1000) {
        return `${Math.ceil(diffTime / (60 * 1000))} min(s) ago`;
      } else if (diffTime < 1000 * 60 * 60 * 24) {
        return `${Math.ceil(diffTime / (3600 * 1000))} hour(s) ago`;
      } else {
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} day(s) ago`;
      }
    },
  },
  methods: {
    closeModalDetailLink() {
      this.models.isOpen = false;
    },
    removeLink() {},
    closeRemoveModal() {
      this.isRemoveModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.link-detail {
  cursor: pointer;
  margin-bottom: 20px;
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
