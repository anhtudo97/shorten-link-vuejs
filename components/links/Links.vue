<template>
  <div class="link">
    <v-row class="link__menu mx-0">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-3">
        <v-row class="align-center">
          <v-col cols="7" sm="8" lg="9">
            <div class="d-flex align-center">
              <div class="menu-text pr-4">{{ total }} Link(s)</div>
              <div v-click-outside="onClickOutsideStandard" class="menu-selection pr-4 d-flex">
                <div class="d-flex align-center" @click="models.sortModal = !models.sortModal">
                  <div class="selection-text pr-2">Sort by</div>
                  <img :src="require('@/assets/svg/ar.svg')" alt="arrow" />
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="5" sm="4" lg="3" class="text-right">
            <button class="button-normal add-new-link" @click.stop="models.modal = true">New Link</button>
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
    <v-dialog v-model="models.sortModal" max-width="400">
      <SortModal @updateSort="updateSort" />
    </v-dialog>
    <client-only>
      <infinite-loading spinner="spiral" @infinite="infiniteScroll"></infinite-loading>
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Link from '@/components/links/Link';
import CreateNewLink from '@/components/links/CreateNewLink';
import SortModal from '@/components/links/SortModal';

import { getLinks } from '@/services/api';
import { handle } from '@/utils/promise';

export default {
  components: {
    Link,
    CreateNewLink,
    SortModal,
  },
  data: () => ({
    keySort: 'Sort By',
    models: {
      base: false,
      modal: false,
      sortModal: false,
      filterModal: false,
    },
    width: 0,
    links: [],
    page: 1,
    token: '',
    total: 0,
  }),
  computed: {
    ...mapGetters({ sort: 'links/getSort', direction: 'links/getDirection' }),
    tempLinks() {
      return this.links.map((x) => x);
    },
  },
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
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
  mounted() {
    console.log(this.sort, this.direction);
  },
  methods: {
    ...mapMutations({
      setSort: 'links/setSort',
      setDirection: 'links/setDirection',
    }),
    reload() {
      window.location.reload();
    },

    async infiniteScroll($state) {
      const { token, page, sort, direction } = this;
      const [resLink, linkError] = await handle(
        getLinks(token, page, sort, direction)
      );
      if (linkError) throw new Error('Could not fetch workspace link');

      const { status, data } = resLink.data;
      if (status === 200) {
        this.page += 1;
        const { links, total } = data;
        this.total = total;
        if (links.length) {
          this.links.push(...links);
          $state.loaded();
        } else {
          $state.complete();
        }
      }
    },
    updateSort(sort, direction) {
      this.setSort(sort);
      this.setDirection(direction);
      console.log(this.sort, this.direction);
      this.$forceUpdate();
    },
    changeConditions(value) {
      this.keySort = value;
      this.models.base = false;
      this.linksSortBy(this.keySort);
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
