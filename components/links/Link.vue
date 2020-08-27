<template>
  <v-row class="link-detail mx-0">
    <v-col cols="10" md="8" class="mx-auto px-0">
      <v-row class="align-center mx-0">
        <v-col cols="12" md="8">
          <div class="shortened-link">{{slashtag}}</div>
          <div class="origin-link pt-2">{{link}}</div>
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
                    <div>
                      <img
                        :src="require('@/assets/icons/edit-solid.svg')"
                        alt="route"
                        class="mr-5"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </div>
                  </template>
                  <span>Edit</span>
                </v-tooltip>
                <v-tooltip top nudge-left="10">
                  <template v-slot:activator="{ on, attrs }">
                    <div>
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
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { clipboard } from 'vue-clipboards';

export default {
  directives: { clipboard },
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
};
</script>

<style lang="scss" scoped>
.link-detail {
  .shortened-link {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #212732;
    cursor: pointer;
    text-overflow: ellipsis;
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
      z-index: 999;
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
  &:hover {
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
  }
}
</style>
