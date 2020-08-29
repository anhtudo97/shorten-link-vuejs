<template>
  <div class="workspaces">
    <v-row class="workspaces__menu mx-0">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-5">
        <v-row class="align-center justify-space-between main-menu">
          <v-col cols class="px-sm-0">
            <button class="menu-text">1 Workspace(s)</button>
          </v-col>
          <v-col class="text-right">
            <button class="menu-button">
              <div class="button-text">New workspace</div>
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
    <v-row class="workspaces__management">
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <transition-group name="list" tag="section" class="pa-0">
          <Workspace
            :name="workspace.name"
            :date="workspace.createdAt"
            v-for="workspace in workspaces"
            :key="workspace.id"
          />
        </transition-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Workspace from '@/components/workspaces/Workspace';
export default {
  components: {
    Workspace,
  },
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
      border: 0.5px solid #3c64b1;
      border-radius: 4px;
      padding: 7px 35px;
      color: #3c64b1;
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: #3c64b1;
        color: white;
      }
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
        padding: 4px 28px;
      }
      .menu-button {
        font-size: 12px;
        padding: 4px 28px;
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
