<template>
  <div class="detail-workspace">
    <v-row class="detail-workspace__menu mx-0">
      <v-col cols="12" sm="10" md="8" class="mx-auto px-0 py-2 py-md-3">
        <v-row class="align-center justify-space-between main-menu px-3 px-sm-0">
          <v-col cols="12" md="4" class="tex-center text-md-left px-0">
            <button class="menu-button" aria-label="new workspace">{{$route.query.name}}</button>
          </v-col>
          <v-col cols="12" md="8" class="px-0 d-flex justify-md-end justify-center">
            <button
              :class="[tabName === 'Link'? 'active':'']"
              class="menu-text menu-text-left"
              aria-label="total workspace"
              @click="changeTab('Link')"
            >{{ totalLink }} Link(s)</button>
            <button
              :class="[tabName === 'Domain'? 'active':'']"
              class="menu-text menu-text-center"
              aria-label="total workspace joined"
              @click="changeTab('Domain')"
            >{{ totalDomain }} Domain(s)</button>
            <button
              :class="[tabName === 'Member'? 'active':'']"
              class="menu-text menu-text-right"
              aria-label="total workspace joined"
              @click="changeTab('Member')"
            >{{ totalMember }} Member(s)</button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <transition v-if="tabName === 'Link'" name="fade" mode="out-in">
          <Link />
        </transition>
        <transition v-if="tabName === 'Domain'" name="fade" mode="out-in">
          <Domain />
        </transition>
        <transition v-if="tabName === 'Member'" name="fade" mode="out-in">
          <Member />
        </transition>
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
import Link from '@/components/workspaces/DetailWorkspace/LinksWorkspace';
import Domain from '@/components/workspaces/DetailWorkspace/DomainsWorkspace';
import Member from '@/components/workspaces/DetailWorkspace/MembersWorkspace';
export default {
  components: {
    Link,
    Domain,
    Member,
  },
  async fetch() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
    await Promise.all([this.getLinks(), this.getDomains(), this.getMembers()]);
  },
  data: () => ({
    totalMember: 0,
    totalLink: 0,
    totalDomain: 0,
    page: 1,
    token: '',
    tabName: 'Link',
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
          this.$route.params.id,
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
          this.$route.params.id,
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
    changeTab(value) {
      this.tabName = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-workspace {
  font-family: Poppins, sans-serif;
  .active {
    background-color: #3c64b1;
    color: #fff;
  }
  &__menu {
    border-bottom: 1px solid #e8e9ea;
    .menu-text {
      padding: 7px 35px;
      transition: 0.3s all ease-in-out;
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
      font-size: 20px;
      padding: 7px 35px;
      font-weight: 500;
      color: #3c64b1;
    }
    @media (max-width: 1368px) {
      .menu-text {
        font-size: 15px;
        padding: 5px 30px;
      }
      .menu-button {
        font-size: 18px;
        padding: 5px 0;
      }
    }
    @media (max-width: 960px) {
      border-bottom: none;
      .menu-text {
        font-size: 14px;
        padding: 4px 28px;
      }
      .menu-button {
        font-size: 15px;
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
        font-size: 14px;
        padding: 4px 25px;
      }
    }
  }
}
</style>
