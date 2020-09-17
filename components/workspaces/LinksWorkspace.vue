<template>
  <div class="link">
    <v-row class="link__menu mx-0">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-3">
        <v-row class="align-center">
          <v-col cols="7" sm="8" lg="9">
            <div class="d-flex align-center flex-wrap">
              <div class="menu-text my-3 pr-4">{{ total }} Link(s)</div>
              <div class="menu-selection my-3 mr-4 d-flex">
                <div class="d-flex align-center" @click="models.sortModal = true">
                  <div class="selection-text pr-2">Sort by</div>
                  <img :src="require('@/assets/svg/ar.svg')" alt="arrow" />
                </div>
              </div>
              <div class="menu-selection my-3 d-flex">
                <div class="d-flex align-center" @click="models.filterModal = true">
                  <div class="selection-text pr-2">Filter by</div>
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
    <div v-if="$fetchState.pending" class="d-flex justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else class="link__management">
      <transition-group name="slide-fade" mode="out-in" tag="ul" class="pa-0">
        <li v-for="link in links" :key="link.id">
          <Link
            :id="link.id"
            :link="link.destination"
            :slashtag="link.slashtag"
            :clicks="link.clicks"
            :date="link.createdAt"
          />
        </li>
      </transition-group>
      <v-row v-if="links.length !== 0" justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination v-model="page" class="my-4" :length="totalPage"></v-pagination>
          </v-container>
        </v-col>
      </v-row>
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
      <SortModal @updateSort="updateSort" @closeModal="models.sortModal = false" />
    </v-dialog>
    <v-dialog v-model="models.filterModal" max-width="700">
      <MemberModal @updateFilter="updateFilter" @closeModal="models.filterModal = false" />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Link from '@/components/links/Link';
import CreateNewLink from '@/components/links/CreateNewLink';
import SortModal from '@/components/links/SortModal';
import MemberModal from '@/components/links/MemberModal';

import { getLinksWorkspaces } from '@/services/api';

export default {
  components: {
    Link,
    CreateNewLink,
    SortModal,
    MemberModal,
  },
  fetchOnServer: false,
  async fetch() {
    this.workspaceId = this.$route.params.id;
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
    await this.getListLinks(
      1,
      this.sort,
      this.direction,
      this.domainSelected,
      this.workspaceSelected
    );
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
    workspaceId: '',
    token: '',
    total: 0,
    totalPage: 0,
    domainSelected: [],
    userIdsSelected: [],
  }),
  computed: {
    ...mapGetters({ sort: 'links/getSort', direction: 'links/getDirection' }),
  },
  watch: {
    '$route.query': '$fetch',
    page(val) {
      this.getListLinks(
        val,
        this.sort,
        this.direction,
        this.domainSelected,
        this.workspaceSelected
      );
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
    ...mapMutations({
      setSort: 'links/setSort',
      setDirection: 'links/setDirection',
    }),
    async getListLinks(page, sort, direction, domainSelected, userIdsSelected) {
      const { token, workspaceId } = this;
      try {
        const resLink = await getLinksWorkspaces(
          token,
          workspaceId,
          page,
          sort,
          direction,
          domainSelected,
          userIdsSelected
        );
        const { status, data } = resLink.data;
        if (status === 200) {
          const { links, total, totalPage } = data;
          this.total = total;
          this.totalPage = totalPage;
          if (links.length) {
            this.links = links;
          }
        }
      } catch (error) {
        console.error(error.response);
        const { status } = error.response;
        if (status === 401) this.$router.push('/login');
      }
    },
    updateSort(sort, direction) {
      this.setSort(sort);
      this.setDirection(direction);
      this.getListLinks(
        this.page,
        this.sort,
        this.direction,
        this.domainSelected,
        this.workspaceSelected
      );
      this.$forceUpdate();
    },
    updateFilter(domainSelected, userIdsSelected) {
      this.domainSelected = domainSelected;
      this.userIdsSelected = userIdsSelected;
      this.getListLinks(
        this.page,
        this.sort,
        this.direction,
        this.domainSelected,
        this.userIdsSelected
      );
    },
    closeModalAddNewLink() {
      this.models.modal = false;
      this.getListLinks(
        this.page,
        this.sort,
        this.direction,
        this.domainSelected,
        this.workspaceSelected
      );
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
