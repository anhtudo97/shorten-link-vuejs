<template>
  <div class="detail-workspace">
    <v-row class="detail-workspace__menu mx-0">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-2 py-md-3">
        <v-row class="align-center justify-space-between main-menu px-3 px-sm-0">
          <v-col cols="12" md="8" class="px-0 d-flex">
            <button
              class="menu-text menu-text-left"
              aria-label="total workspace"
              @click="joined = false"
            >{{ totalLink }} Link(s)</button>
            <button
              class="menu-text menu-text-center"
              aria-label="total workspace joined"
              @click="joined = true"
            >{{ totalDomain }} Domain(s)</button>
            <button
              class="menu-text menu-text-right"
              aria-label="total workspace joined"
              @click="joined = true"
            >{{ totalMember }} Member(s)</button>
          </v-col>
          <v-col cols="12" md="4" class="text-right px-0">
            <button
              class="button-normal menu-button"
              aria-label="new workspace"
              @click.stop="openCreateNewWorkspace = true"
            >New workspace</button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  getDomainsWorkspace,
  getLinksWorkspaces,
  getMembersWorkspaces,
} from '@/services/api';
export default {
  async fetch() {
    await Promise.all([this.getLinks(), this.getDomains(), this.getMembers()]);
  },
  data: () => ({
    totalMember: 0,
    totalLink: 0,
    totalDomain: 0,
  }),
  methods: {
    async getMembers() {
      try {
        const resMembers = await getMembersWorkspaces(
          this.token,
          this.workspace.id,
          this.page
        );
        const statusMembers = resMembers.data.status;
        if (statusMembers === 200) {
          const { total, members } = resMembers.data.data;
          this.totalMember = total;
          this.members = members;
        }
      } catch (error) {
        const { status } = error.response.data;
        if (status === 401) this.$router.push('/login');
      }
    },
    async getDomains() {
      try {
        const resDomains = await getDomainsWorkspace(
          this.token,
          this.workspace.id,
          this.page
        );
        const statusDomains = resDomains.data.status;

        if (statusDomains === 200) {
          const { total } = resDomains.data.data;
          this.totalDomain = total;
        }
      } catch (error) {
        const { status } = error.response.data;
        if (status === 401) this.$router.push('/login');
      }
    },
    async getLinks() {
      try {
        const resLinks = await getLinksWorkspaces(
          this.token,
          this.workspace.id,
          this.page
        );
        const statusLinks = resLinks.data.status;
        if (statusLinks === 200) {
          const { total } = resLinks.data.data;
          this.totalLink = total;
        }
      } catch (error) {
        const { status } = error.response.data;
        if (status === 401) this.$router.push('/login');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-workspace {
  font-family: Poppins, sans-serif;
  &__menu {
    border-bottom: 1px solid #e8e9ea;
    .menu-text {
      padding: 7px 35px;
    }
    .menu-text-left {
      border: 0.5px solid #ddd;
      border-radius: 4px 0 0 4px;
    }
    .menu-text-center {
      border: 0.5px solid #ddd;
      border-left: none;
      border-right: none;
    }
    .menu-text-right {
      border: 0.5px solid #ddd;
      border-radius: 0 4px 4px 0;
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
}
</style>
