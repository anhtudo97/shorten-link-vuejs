<template>
  <div class="detail-workspace">
    <v-row class="detail-workspace__menu">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-2 py-md-3">
        <v-row class="align-center justify-space-between main-menu">
          <v-col cols="12" md="4" class="text-sm-center text-md-left">
            <div class="menu-button">{{$route.query.name}}</div>
          </v-col>
          <v-col cols="12" md="8" class="d-flex justify-md-end justify-center">
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
      <v-col cols="12 py-0">
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
import { mapGetters, mapMutations } from 'vuex';
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
    page: 1,
    token: '',
    tabName: 'Link',
  }),
  computed: {
    ...mapGetters({
      totalLink: 'workspaces/getLinksTotalWorkspace',
      totalDomain: 'workspaces/getDomainsTotalWorkspace',
      totalMember: 'workspaces/getMembersTotalWorkspace',
    }),
  },
  methods: {
    ...mapMutations({
      // member
      setMembersTotalWorkspace: 'workspaces/setMembersTotalWorkspace',
      setMembersWorkspace: 'workspaces/setMembersWorkspace',
      setMembersTotalPageWorkspace: 'workspaces/setMembersTotalPageWorkspace',
      // domain
      setDomainsTotalWorkspace: 'workspaces/setDomainsTotalWorkspace',
      setDomainsWorkspace: 'workspaces/setDomainsWorkspace',
      setDomainsTotalPageWorkspace: 'workspaces/setDomainsTotalPageWorkspace',
      // link
      setLinksTotalWorkspace: 'workspaces/setLinksTotalWorkspace',
      setLinksWorkspace: 'workspaces/setLinksWorkspace',
      setLinksTotalPageWorkspace: 'workspaces/setLinksTotalPageWorkspace',
    }),
    async getMembers() {
      try {
        const resMembers = await getMembersWorkspaces(
          this.token,
          this.$route.params.id,
          this.page
        );
        const { status, data } = resMembers.data;
        if (status === 200) {
          const { total, totalPage, members } = data;
          this.setMembersTotalWorkspace(total);
          this.setMembersWorkspace(members);
          this.setMembersTotalPageWorkspace(totalPage);
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
        const { status, data } = resDomains.data;
        if (status === 200) {
          const { total, totalPage, domains } = data;
          this.setDomainsTotalWorkspace(total);
          this.setDomainsWorkspace(domains);
          this.setDomainsTotalPageWorkspace(totalPage);
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
        const { status, data } = resLinks.data;
        if (status === 200) {
          const { total, totalPage, links } = data;
          this.setLinksTotalWorkspace(total);
          this.setLinksWorkspace(links);
          this.setLinksTotalPageWorkspace(totalPage);
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
      padding: 7px 0;
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
