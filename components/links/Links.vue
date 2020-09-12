<template>
  <div class="link">
    <v-row class="link__menu mx-0">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-3">
        <v-row class="align-center">
          <v-col cols="7" sm="8" lg="9">
            <div class="d-flex align-center">
              <div class="menu-text pr-4">{{ total }} Link(s)</div>
              <div
                v-click-outside="onClickOutsideStandard"
                class="menu-selection pr-4 d-flex"
              >
                <div
                  class="d-flex align-center"
                  @click="models.base = !models.base"
                >
                  <div class="selection-text pr-2">{{ keySort }}</div>
                  <img :src="require('@/assets/svg/ar.svg')" alt="arrow" />
                </div>
                <transition name="slide-fade">
                  <div v-if="models.base" class="selection-modal">
                    <div
                      class="modal-option"
                      @click="changeConditions('Lastest')"
                    >
                      Lastest
                    </div>
                    <div
                      class="modal-option"
                      @click="changeConditions('Slashtag A - Z')"
                    >
                      Slashtag A - Z
                    </div>
                    <div
                      class="modal-option"
                      @click="changeConditions('Slashtag Z - A')"
                    >
                      Slashtag Z - A
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </v-col>
          <v-col cols="5" sm="4" lg="3" class="text-right">
            <button
              class="button-normal add-new-link"
              @click.stop="models.modal = true"
            >
              New Link
            </button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="link__management">
      <transition-group name="list" tag="ul" class="pa-0">
        <li v-for="link in tempLinks" :key="link.id">
          <Link
            :id="link.id"
            :link="link.destination"
            :slashtag="link.slashtag"
            :clicks="link.clicks"
            :date="link.createdAt"
          />
        </li>
      </transition-group>
    </div>
    <v-dialog
      v-model="models.modal"
      class="link__dialog"
      max-width="900"
      :fullscreen="width < 600 ? true : false"
    >
      <CreateNewLink @closeModalAddNewLink="closeModalAddNewLink" />
    </v-dialog>
  </div>
</template>

<script>
import Link from '@/components/links/Link';
import CreateNewLink from '@/components/links/CreateNewLink';
export default {
  components: {
    Link,
    CreateNewLink,
  },
  props: {
    links: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    keySort: 'Sort By',
    models: {
      base: false,
      modal: false,
    },
    width: 0,
    destinationUrl: '',
  }),
  computed: {
    tempLinks() {
      return this.links.map((x) => x);
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    changeConditions(value) {
      this.keySort = value;
      this.models.base = false;
      this.linksSortBy(this.keySort);
    },
    linksSortBy(key) {
      switch (key) {
        case 'Lastest':
          return this.tempLinks.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
          });
        case 'Slashtag Z - A':
          return this.tempLinks.sort(function(a, b) {
            if (a.slashtag < b.slashtag) {
              return 1;
            }
            if (a.slashtag > b.slashtag) {
              return -1;
            }
            return 0;
          });
        case 'Slashtag A - Z':
          return this.tempLinks.sort(function(a, b) {
            if (a.slashtag < b.slashtag) {
              return -1;
            }
            if (a.slashtag > b.slashtag) {
              return 1;
            }
            return 0;
          });
        default:
          return this.tempLinks;
      }
    },
    onClickOutsideStandard() {
      this.models.base = false;
    },
    closeModalAddNewLink() {
      this.models.modal = false;
      this.$forceUpdate();
    },
    handleResize() {
      if (process.client) {
        this.width = window.innerWidth;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  font-family: Poppins, sans-serif;
  height: 100%;
  &__menu {
    .menu-text {
      font-size: 18px;
      line-height: 24px;
      letter-spacing: 0.2px;
    }
    .menu-selection {
      position: relative;
      background: #ffffff;
      border: 0.5px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 5px 20px;
      cursor: pointer;
      img {
        align-self: center;
        object-fit: cover;
        width: 12px;
        height: auto;
        opacity: 0.7;
      }
      .selection-modal {
        background-color: #fff;
        position: absolute;
        top: 45px;
        left: 0;
        border: 0.5px solid #dddddd;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 10px 30px;
        .modal-title {
          font-size: 20px;
          line-height: 26px;
        }
        .modal-option {
          font-size: 16px;
          line-height: 24px;
          white-space: nowrap;
          padding: 5px 0;
        }
      }
    }
    .add-new-link {
      font-weight: 500;
      padding: 7px 35px;
      font-size: 16px;
      line-height: 24px;
    }
    .menu-dialog {
      padding: 2vh 3vh;
      font-family: Poppins, sans-serif;
      .dialog-title {
        font-size: 24px;
        font-weight: 500;
      }
    }
    @media (max-width: 1366px) {
      .menu-text {
        font-size: 16px;
        line-height: 22px;
      }
      .menu-selection {
        padding: 4px 20px;
        .selection-text {
          font-size: 14px;
        }
        img {
          align-self: center;
          object-fit: cover;
          width: 11px;
          height: auto;
          opacity: 0.7;
        }
        .selection-modal {
          top: 40px;
          padding: 7px 15px;
          .modal-title {
            font-size: 16px;
            line-height: 24px;
          }
          .modal-option {
            font-size: 15px;
            line-height: 22px;
          }
        }
      }
      .add-new-link {
        font-size: 16px;
        line-height: 22px;
      }
    }
    @media (max-width: 960px) {
      .menu-text {
        font-size: 15px;
        line-height: 20px;
      }
      .menu-selection {
        padding: 3px 18px;
        .selection-text {
          font-size: 14px;
        }
        img {
          width: 10px;
          opacity: 0.7;
        }
        .selection-modal {
          top: 35px;
          padding: 7px 15px;
          .modal-title {
            font-size: 15px;
            line-height: 22px;
          }
          .modal-option {
            font-size: 13px;
            line-height: 20px;
          }
        }
      }
      .add-new-link {
        padding: 5px 30px;
        font-size: 15px;
        line-height: 20px;
      }
    }
    @media (max-width: 600px) {
      .menu-text {
        font-size: 14px;
        line-height: 18px;
      }
      .menu-selection {
        padding: 2px 12px;
        .selection-text {
          font-size: 12px;
        }
        .selection-modal {
          top: 30px;
          padding: 10px 15px;
          .modal-title {
            font-size: 14px;
            line-height: 18px;
          }
          .modal-option {
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
      .add-new-link {
        font-size: 15px;
        line-height: 20px;
      }
    }
  }
  &__diviner {
    width: 100%;
    height: 1px;
    background-color: #c4c4c4;
  }
  &__management {
    ul {
      list-style: none;
    }
  }
  &__dialog {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
