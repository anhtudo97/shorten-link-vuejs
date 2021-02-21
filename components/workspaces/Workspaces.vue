<template>
  <div class="workspaces">
    <v-row class="workspaces__menu mx-0">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-2 py-md-3 py-lg-6">
        <v-row
          class="align-center justify-space-between main-menu px-3 px-sm-0"
        >
          <v-col cols="12" md="8" class="px-0 d-flex">
            <button
              :class="[!joined ? 'active' : '']"
              class="menu-text menu-text-left"
              aria-label="total workspace"
              @click="joined = false"
            >
              {{ total }} {{ total > 1 ? 'Workspaces' : 'Workspace' }}
            </button>
            <button
              :class="[joined ? 'active' : '']"
              class="menu-text menu-text-right"
              aria-label="total workspace joined"
              @click="joined = true"
            >
              {{ totalJoined }}
              {{ totalJoined > 1 ? 'Workspaces' : 'Workspace' }} joined
            </button>
          </v-col>
          <v-col cols="12" md="4" class="text-md-right text-left px-0">
            <button
              class="button-normal menu-button"
              aria-label="new workspace"
              @click.stop="openCreateNewWorkspace = true"
            >
              New workspace
            </button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="workspaces__menu-sub hidden-on-below-960">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-5">
        <v-row class>
          <v-col cols="10" class="px">
            <div>Workspace</div>
          </v-col>
          <v-col cols="2" class="text-left">
            <div>Created date</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-col cols="12" sm="10" md="8" class="mx-auto">
      <transition v-if="!joined" name="slide-fade" mode="out-in">
        <div>
          <transition-group name="slide-fade" tag="section" class="pa-0">
            <Workspace
              v-for="workspace in workspaces"
              :key="workspace.id"
              :workspace="workspace"
              @closeCreateNewWorkspace="closeCreateNewWorkspace"
            />
          </transition-group>
          <v-row v-if="workspaces && workspaces.length !== 0" justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="page"
                  class="my-4"
                  :length="totalPage"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </div>
      </transition>
      <transition v-else name="slide-fade" mode="out-in">
        <div>
          <transition-group name="slide-fade" tag="section" class="pa-0">
            <Workspace
              v-for="workspace in workspacesJoined"
              :key="workspace.id"
              :workspace="workspace.workspace"
              :joined="joined"
              @closeCreateNewWorkspace="closeCreateNewWorkspace"
            />
          </transition-group>
          <v-row
            v-if="workspacesJoined && workspacesJoined.length !== 0"
            justify="center"
          >
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="pageJoined"
                  class="my-4"
                  :length="totalPageJoined"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </div>
      </transition>
    </v-col>

    <v-dialog
      v-model="openCreateNewWorkspace"
      max-width="850"
      :fullscreen="width < 600 ? true : false"
    >
      <CreateNewWorkspaceModal
        @closeCreateNewWorkspace="closeCreateNewWorkspace"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Workspace from '@/components/workspaces/Workspace';
import CreateNewWorkspaceModal from '@/components/workspaces/CreateNewWorkspace';
export default {
  components: {
    Workspace,
    CreateNewWorkspaceModal,
  },
  async fetch() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
    await this.setWorkspaces({ page: 1 });
    await this.setWorkspacesJoined({ page: 1 });
  },
  data: () => ({
    openCreateNewWorkspace: false,
    width: 0,
    token: '',
    joined: false,
    // default
    page: 1,
    // joined
    pageJoined: 1,
  }),
  fetchOnServer: false,
  computed: {
    ...mapGetters({
      workspaces: 'workspaces/getWorkspaces',
      total: 'workspaces/getTotal',
      totalPage: 'workspaces/getTotalPage',
      workspacesJoined: 'workspaceJoined/getWorkspaces',
      totalJoined: 'workspaceJoined/getTotal',
      totalPageJoined: 'workspaceJoined/getTotalPage',
    }),
  },
  watch: {
    page(val) {
      this.setWorkspaces({ page: val });
    },
    pageJoined(val) {
      this.setWorkspacesJoined({ page: val });
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
    ...mapActions({
      setWorkspaces: 'workspaces/setWorkspaces',
      setWorkspacesJoined: 'workspaceJoined/setWorkspaces',
    }),
    closeCreateNewWorkspace() {
      this.openCreateNewWorkspace = false;
      this.setWorkspaces({ page: 1 });
      this.setWorkspacesJoined({ page: 1 });
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
.workspaces {
  font-family: Poppins, sans-serif;
  &__menu {
    border-bottom: 1px solid #c4c4c4;
    .menu-text {
      padding: 7px 35px;
      font-weight: 500;
      color: #3c64b1;
    }
    .menu-text-left {
      border: 0.5px solid #ddd;
      border-radius: 4px 0 0 4px;
    }
    .menu-text-right {
      border: 0.5px solid #ddd;
      border-radius: 0 4px 4px 0;
      border-left: none;
    }
    .menu-button {
      padding: 7px 35px;
      font-weight: 500;
    }
    @media (max-width: 1368px) {
      .menu-text {
        font-size: 15px;
        padding: 5px 30px;
      }
      .menu-button {
        font-size: 15px;
        padding: 5px 30px;
      }
    }
    @media (max-width: 960px) {
      border-bottom: none;
      .menu-text {
        font-size: 14px;
        padding: 4px 28px;
      }
      .menu-button {
        font-size: 14px;
        padding: 4px 28px;
      }
    }
    @media (max-width: 600px) {
      border-bottom: none;
      .menu-text {
        font-size: 12px;
        padding: 4px 26px;
      }
      .menu-button {
        font-size: 12px;
        padding: 4px 25px;
      }
    }
  }
  &__menu-sub {
    font-size: 12px;
    font-weight: bold;
    color: #595d66;
  }
  .hidden-on-below-960 {
    @media (max-width: 960px) {
      display: none;
    }
  }
  .active {
    background-color: #3c64b1;
    color: #fff;
  }
}
</style>
