<template>
  <div class="link">
    <v-row class="link__menu mx-0">
      <v-col cols="11" md="8" class="mx-auto py-3">
        <v-row class="align-center">
          <v-col cols="7" sm="8" lg="10">
            <div class="d-flex align-center">
              <div class="menu-text pr-4">{{links.length}} Link(s)</div>
              <div v-click-outside="onClickOutsideStandard" class="menu-selection pr-4 d-flex">
                <div class="d-flex align-center" @click="models.base = !models.base">
                  <div class="selection-text pr-2">{{keySort}}</div>
                  <img :src="require('@/assets/svg/ar.svg')" alt="arrow" />
                </div>
                <transition name="slide-fade">
                  <div v-if="models.base" class="selection-modal">
                    <div class="modal-option" @click="changeConditions('Lastest')">Lastest</div>
                    <div class="modal-option" @click="changeConditions('A - Z')">Slashtag A - Z</div>
                    <div class="modal-option" @click="changeConditions('Z - A')">Slashtag Z - A</div>
                  </div>
                </transition>
              </div>
            </div>
          </v-col>
          <v-col cols="5" sm="4" lg="2">
            <div class="add-new-link" @click.stop="models.modal = true">
              <div class="new-link">New Link</div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="link__diviner"></div>
    <div class="link__management">
      <ul class="pa-0">
        <li v-for="link in tempLinks" :key="link.id">
          <Link
            :link="link.link"
            :slashtag="link.slashtag"
            :clicks="link.clicks"
            :date="link.date"
          />
        </li>
      </ul>
    </div>

    <v-dialog v-model="models.modal" class="link__dialog" max-width="700px">
      <v-list class>
        <div class="d-flex justify-space-between px-4">
          <div></div>
          <div class="dialog-icon" @click="models.modal = false">
            <img class="ma-2" src="@/assets/svg/close.svg" alt="close" />
          </div>
        </div>
        <div class="modal-mask">
          <div class="modal-mask__title mb-5">Shorten a new link</div>
          <v-textarea
            v-model="destinationUrl"
            auto-grow
            label="Destination your URL"
            hint="Type or paste your URL"
            outlined
            rows="1"
          ></v-textarea>
          <transition name="slide-fade">
            <div v-if="validURL(destinationUrl)">
              <v-row>
                <v-col cols="12" md="6">
                  <v-select :items="tempDomains" label="Domain" dense outlined></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Slash tag" outlined dense></v-text-field>
                </v-col>
              </v-row>
              <div class="d-flex justify-space-between">
                <div></div>
                <div class="modal-mask__button">Create link</div>
              </div>
            </div>
          </transition>
        </div>
      </v-list>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Link from '@/components/links/Link';
export default {
  components: {
    Link,
  },
  data: () => ({
    keySort: 'Sort By',
    models: {
      base: false,
      modal: false,
    },
    destinationUrl: '',
  }),
  computed: {
    ...mapGetters({
      links: 'links/getLinks',
      domains: 'domains/getDomains',
    }),
    tempLinks() {
      return this.links.map((x) => x);
    },
    tempDomains() {
      return this.domains.map((x) => x.domain);
    },
  },
  methods: {
    changeConditions(value) {
      this.keySort = value;
      this.dialog = false;
      this.linksSortBy(this.keySort);
    },
    linksSortBy(key) {
      switch (key) {
        case 'Lastest':
          return this.tempLinks.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
          });
        case 'Z - A':
          return this.tempLinks.sort(function(a, b) {
            if (a.slashtag < b.slashtag) {
              return 1;
            }
            if (a.slashtag > b.slashtag) {
              return -1;
            }
            return 0;
          });
        case 'A - Z':
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
    validURL(str) {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ); // fragment locator
      return !!pattern.test(str);
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  font-family: Poppins, sans-serif;
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
      border-radius: 10px;
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
        border-radius: 10px;
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
      cursor: pointer;
      background-color: #3c64b1;
      border: 0.5px solid #dddddd;
      box-sizing: border-box;
      border-radius: 10px;
      text-align: center;
      color: #fff;
      font-weight: 600;
      padding: 5px 0;
      .new-link {
        font-size: 18px;
        line-height: 24px;
      }
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
        font-size: 17px;
        line-height: 22px;
      }
      .menu-selection {
        padding: 4px 20px;
        .selection-text {
          font-size: 15px;
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
          padding: 10px 25px;
          .modal-title {
            font-size: 18px;
            line-height: 24px;
          }
          .modal-option {
            font-size: 15px;
            line-height: 22px;
          }
        }
      }
      .add-new-link {
        padding: 4px 0;
        .new-link {
          font-size: 17px;
          line-height: 22px;
        }
      }
    }
    @media (max-width: 960px) {
      .menu-text {
        font-size: 16px;
        line-height: 20px;
      }
      .menu-selection {
        padding: 3px 18px;
        .selection-text {
          font-size: 14px;
        }
        img {
          align-self: center;
          object-fit: cover;
          width: 10px;
          height: auto;
          opacity: 0.7;
        }
        .selection-modal {
          top: 35px;
          padding: 10px 20px;
          .modal-title {
            font-size: 16px;
            line-height: 22px;
          }
          .modal-option {
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
      .add-new-link {
        padding: 3px 0;
        .new-link {
          font-size: 16px;
          line-height: 20px;
        }
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
        .new-link {
          font-size: 15px;
          line-height: 20px;
        }
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
    li:nth-child(even) {
      background: #f9f9fa;
    }
    li {
      &:hover {
        background-color: #eaf6ff;
      }
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
.modal-mask {
  font-family: Poppins, sans-serif;
  padding: 4vh 5vh;
  &__title {
    font-size: 26px;
  }
  &__button {
    cursor: pointer;
    color: #fff;
    font-weight: 500;
    padding: 10px 60px;
    border-radius: 10px;
    background-color: #3c64b1;
    &:hover {
      background-color: #2a5bd7;
    }
  }
}
</style>

