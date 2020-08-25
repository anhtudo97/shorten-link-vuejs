<template>
  <div class="link">
    <div class="link__diviner"></div>
    <v-row class="link__menu mx-0">
      <v-col cols="10" md="8" class="mx-auto">
        <v-row>
          <v-col cols="12" sm="8" lg="10">
            <div class="d-flex align-center">
              <div class="menu-text pr-4">8 Links</div>
              <div v-click-outside="externalClick" class="menu-selection pr-4 d-flex">
                <div class="d-flex align-center" @click="dialog = !dialog">
                  <div class="pr-2">{{keySort}}</div>
                  <img :src="require('@/assets/svg/ar.svg')" alt="arrow" />
                </div>
                <transition name="fade">
                  <div v-if="dialog" class="selection-modal">
                    <div class="modal-option" @click="changeConditions('Lastest')">Lastest</div>
                    <div class="modal-option" @click="changeConditions('A-Z')">Slashtag A - Z</div>
                    <div class="modal-option" @click="changeConditions('Z-A')">Slashtag Z - A</div>
                  </div>
                </transition>
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="4" lg="2">
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
        <li v-for="link in links" :key="link.id">
          <Link
            :link="link.link"
            :shortened="link.shortened"
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
  },
  components: {
    Link,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    changeConditions(value) {
      this.keySort = value;
      this.dialog = false;
    },
    externalClick() {
      this.dialog = false;
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

