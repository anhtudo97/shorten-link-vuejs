<template>
  <div class="link">
    <div class="link__diviner"></div>
    <v-row class="link__menu mx-0">
      <v-col cols="11" md="8" class="mx-auto py-0 py-md-3">
        <v-row class="align-center">
          <v-col cols="7" sm="8" lg="10">
            <div class="d-flex align-center">
              <div class="menu-text pr-4">8 Links</div>
              <div v-click-outside="externalClick" class="menu-selection pr-4 d-flex">
                <div class="d-flex align-center" @click="dialog = !dialog">
                  <div class="selection-text pr-2">{{keySort}}</div>
                  <img :src="require('@/assets/svg/ar.svg')" alt="arrow" />
                </div>
                <transition name="slide-fade">
                  <div v-if="dialog" class="selection-modal">
                    <div class="modal-option" @click="changeConditions('Lastest')">Lastest</div>
                    <div class="modal-option" @click="changeConditions('A - Z')">Slashtag A - Z</div>
                    <div class="modal-option" @click="changeConditions('Z - A')">Slashtag Z - A</div>
                  </div>
                </transition>
              </div>
            </div>
          </v-col>
          <v-col cols="5" sm="4" lg="2">
            <div class="add-new-link">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import vClickOutside from 'v-click-outside';
import Link from '@/components/links/Link';

export default {
  components: {
    Link,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      dialog: false,
      keySort: 'Sort By',
    };
  },
  computed: {
    ...mapGetters({
      links: 'links/getLinks',
    }),
    tempLinks() {
      return this.links.map((x) => x);
    },
  },
  methods: {
    changeConditions(value) {
      this.keySort = value;
      this.dialog = false;
      this.linksSortBy(this.keySort);
    },
    externalClick() {
      this.dialog = false;
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
  },
};
</script>

<style lang="scss" scoped>
.link {
  margin-top: 15vh;
  font-family: Montserrat, sans-serif;
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
        padding: 3px 20px;
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
        padding: 2px 20px;
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
  @media (max-width: 1440px) {
    margin-top: 20vh;
  }
}
</style>

