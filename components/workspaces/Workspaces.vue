<template>
  <div class="workspaces">
    <v-row class="workspaces__menu mx-0">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-2 py-md-3 py-lg-6">
        <v-row class="align-center justify-space-between main-menu px-3 px-sm-0">
          <v-col cols class="px-0">
            <button class="menu-text">{{workspaces.length}} Workspace(s)</button>
          </v-col>
          <v-col class="text-right px-0">
            <button
              class="button-normal menu-button"
              @click.stop="openCreateNewWorkspace = true"
            >New workspace</button>
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
    <v-row class="workspaces__management">
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <transition-group name="list" tag="section" class="pa-0">
          <Workspace v-for="workspace in workspaces" :key="workspace.id" :workspace="workspace" />
        </transition-group>
      </v-col>
    </v-row>
    <v-dialog v-model="openCreateNewWorkspace" max-width="850" :fullscreen="width<600?true: false">
      <CreateNewWorkspaceModal @closeCreateNewWorkspace="closeCreateNewWorkspace" />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Workspace from '@/components/workspaces/Workspace';
import CreateNewWorkspaceModal from '@/components/workspaces/CreateNewWorkspace';
export default {
  components: {
    Workspace,
    CreateNewWorkspaceModal,
  },
  data: () => ({
    openCreateNewWorkspace: false,

    width: 0,
  }),
  computed: {
    ...mapGetters({
      workspaces: 'workspaces/getWorkspaces',
    }),
    tempWorkspaces() {
      return [...this.workspaces].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
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
    closeCreateNewWorkspace() {
      this.openCreateNewWorkspace = false;
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
      border: 0.5px solid #ddd;
      border-radius: 4px;
      padding: 7px 35px;
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
}
</style>
