<template>
  <div class="link">
    <v-row class="link__menu mx-0">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-3">
        <v-row class="align-center">
          <v-col cols="12" sm="8" lg="9">
            <div class="d-flex align-center flex-wrap">
              <div class="menu-text my-3 pr-4 w-6">{{ total }} Link(s)</div>
              <div class="menu-selection my-md-3 mr-4 d-flex">
                <v-menu offset-y rounded="true">
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" class="d-flex align-center" v-on="on">
                      <div class="selection-text pr-2">Sort by</div>
                      <img :src="require('@/assets/svg/ar.svg')" alt="arrow" />
                    </div>
                  </template>
                  <div class="menu-list">
                    <div
                      class="menu-list__item"
                      @click="updateSort('created_at', 'DESC')"
                    >
                      The lastest
                    </div>
                    <div
                      class="menu-list__item"
                      @click="updateSort('slashtag', 'ASC')"
                    >
                      Slash tag A - Z
                    </div>
                    <div
                      class="menu-list__item"
                      @click="updateSort('slashtag', 'DESC')"
                    >
                      Slash tag Z - A
                    </div>
                  </div>
                </v-menu>
              </div>
              <div class="menu-selection my-md-3 mr-4 d-flex">
                <div class="d-flex align-center" @click="drawer = !drawer">
                  <div class="selection-text pr-2">Filter by</div>
                </div>
              </div>
              <v-text-field
                v-model="name"
                class="search-form"
                label="Search link ... "
                outlined
                dense
                hide-details="auto"
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="12" sm="4" lg="3" class="text-right">
            <button
              class="button-normal add-new-link"
              aria-label="New Link"
              @click.stop="models.modal = true"
            >
              New Link
            </button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="$fetchState.pending" justify="center" class="mx-0">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
    <div v-else>
      <transition-group name="slide-fade" mode="in-out" tag="section">
        <div v-for="link in links" :key="link.id">
          <Link
            :id="link.id"
            :link="link.destination"
            :slashtag="link.slashtag"
            :clicks="link.clicks"
            :date="link.createdAt"
            :domain="link.domain.name"
            @refetchLinks="refetchLinks"
            @closeModalAddNewLink="closeModalAddNewLink"
          />
        </div>
      </transition-group>
      <div v-if="links.length !== 0">
        <v-pagination
          v-model="page"
          class="my-4"
          :length="totalPage"
        ></v-pagination>
      </div>
    </div>

    <v-dialog
      v-model="models.modal"
      class="link__dialog"
      max-width="900"
      :fullscreen="width < 700 ? true : false"
    >
      <CreateNewLink
        @refetchLinks="refetchLinks"
        @closeModalAddNewLink="closeModalAddNewLink"
      />
    </v-dialog>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
      style="width:60%;"
    >
      <FilterModal @closeModal="drawer = false" />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Link from '@/components/links/Link';
import CreateNewLink from '@/components/links/CreateNewLink';
import FilterModal from '@/components/links/FilterModal';

export default {
  components: {
    Link,
    CreateNewLink,
    FilterModal,
  },
  fetchOnServer: false,
  async fetch() {
    await this.updateLinks({
      page: this.page,
    });
  },
  data: () => ({
    name: '',
    keySort: 'Sort By',
    models: {
      base: false,
      modal: false,
      filterModal: false,
    },
    width: 0,
    page: 1,
    drawer: false,
  }),
  computed: {
    ...mapGetters({
      sort: 'links/getSort',
      direction: 'links/getDirection',
      domainSelected: 'links/getDomainSelected',
      workspaceSelected: 'links/getWorkspaceSelected',
      links: 'links/getLinks',
      total: 'links/getTotal',
      totalPage: 'links/getTotalPage',
    }),
  },
  watch: {
    '$route.query': '$fetch',
    page(val) {
      this.updateLinks({
        page: val,
      });
    },
    name(val) {
      setTimeout(
        this.updateLinks({
          page: 1,
          name: val,
        }),
        2000
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
      setDomainSelected: 'links/setDomainSelected',
      setWorkspaceSelected: 'links/setWorkspaceSelected',
    }),
    ...mapActions({
      updateLinks: 'links/updateLinks',
    }),
    updateSort(sort, direction) {
      this.setSort(sort);
      this.setDirection(direction);
      this.updateLinks({
        page: this.page,
      });
    },
    updateFilter(domainSelected, workspaceSelected) {
      this.setDomainSelected(domainSelected);
      this.setWorkspaceSelected(workspaceSelected);
      this.updateLinks({
        page: this.page,
      });
    },
    refetchLinks() {
      this.updateLinks({
        page: this.page,
      });
    },
    closeModalAddNewLink() {
      this.models.modal = false;
      this.updateLinks({
        page: this.page,
      });
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
      padding: 7px 20px;
      cursor: pointer;
      img {
        align-self: center;
        object-fit: cover;
        width: 12px;
        height: auto;
        opacity: 0.7;
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
      .search-form::v-deep input,
      .search-form::v-deep label {
        font-size: 15px;
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
      .search-form::v-deep input,
      .search-form::v-deep label {
        font-size: 14px;
      }
      .add-new-link {
        padding: 5px 30px;
        font-size: 14px;
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
      .search-form::v-deep input,
      .search-form::v-deep label {
        font-size: 13px;
      }
      .add-new-link {
        font-size: 13px;
        line-height: 20px;
      }
    }
  }
  &__diviner {
    width: 100%;
    height: 1px;
    background-color: #c4c4c4;
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
