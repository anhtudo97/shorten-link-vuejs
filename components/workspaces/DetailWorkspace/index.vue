<template>
  <div class="detail-workspace">
    <v-row class="detail-workspace__menu border-b">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-2 py-md-3">
        <v-row class="align-center justify-space-between main-menu">
          <v-col cols="12" sm="3" class="text-center text-sm-left">
            <v-menu offset-y :close-on-content-click="true">
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" class="menu-button" v-on="on">
                  {{ $route.query.name }}
                </div>
              </template>

              <v-list class="menu-list">
                <v-list-item
                  v-for="(item, index) in workspaces"
                  :key="index"
                  @click="changeWorkspace(item.id, item.name)"
                >
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="8" class="d-flex justify-sm-end justify-center">
            <button
              :class="[tabName === 'Link' ? 'active' : '']"
              class="menu-text menu-text-left"
              aria-label="total workspace"
              @click="changeTab('Link')"
            >
              {{ totalLink }} Link(s)
            </button>
            <button
              :class="[tabName === 'Domain' ? 'active' : '']"
              class="menu-text menu-text-center"
              aria-label="total workspace joined"
              @click="changeTab('Domain')"
            >
              {{ totalDomain }} Domain(s)
            </button>
            <button
              :class="[tabName === 'Member' ? 'active' : '']"
              class="menu-text menu-text-right"
              aria-label="total workspace joined"
              @click="changeTab('Member')"
            >
              {{ totalMember }} Member(s)
            </button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <client-only>
      <infinite-loading
        spinner="waveDots"
        @infinite="infiniteScroll"
      ></infinite-loading>
    </client-only>
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
import { mapGetters, mapActions } from 'vuex';
import { getWorkspaces, getWorkspacesJoined } from '@/services/api';
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
    await Promise.all([
      this.setLinksWorkspace({
        page: this.page,
        id: this.$route.params.id,
      }),
      this.setDomainsWorkspace({
        page: this.page,
        id: this.$route.params.id,
      }),
      this.setMembersWorkspace({
        page: this.page,
        id: this.$route.params.id,
      }),
    ]);
  },
  data: () => ({
    page: 1,
    token: '',
    tabName: 'Link',
    workspaces: [],
    pageWorkspaces: 1,
    pageWorkspacesJoined: 1,
  }),
  computed: {
    ...mapGetters({
      totalLink: 'workspaces/getLinksTotalWorkspace',
      totalDomain: 'workspaces/getDomainsTotalWorkspace',
      totalMember: 'workspaces/getMembersTotalWorkspace',
    }),
  },
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },
  methods: {
    ...mapActions({
      setMembersWorkspace: 'workspaces/setMembersWorkspace',
      setDomainsWorkspace: 'workspaces/setDomainsWorkspace',
      setLinksWorkspace: 'workspaces/setLinksWorkspace',
    }),
    changeWorkspace(id, name) {
      this.$router.push(`/workspaces/${id}?name=${name}`);
    },
    async infiniteScroll($state) {
      const { token, pageWorkspaces, pageWorkspacesJoined } = this;
      try {
        const resWorkspaces = await getWorkspaces(token, pageWorkspaces);
        const resWorkspacesJoined = await getWorkspacesJoined(
          token,
          pageWorkspacesJoined
        );

        const statusWorkspaces = resWorkspaces.data.status;
        const statusWorkspacesJoined = resWorkspacesJoined.data.status;

        if (statusWorkspaces === 200) {
          this.pageWorkspaces += 1;
          const { workspaces } = resWorkspaces.data.data;
          if (workspaces.length) {
            this.workspaces.push(...workspaces);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
        if (statusWorkspacesJoined === 200) {
          this.pageWorkspacesJoined += 1;
          const { invitations } = resWorkspacesJoined.data.data;
          if (invitations.length) {
            const workspaces = invitations.map((x) => x.workspace);
            this.workspaces.push(...workspaces);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      } catch (error) {
        const { status } = error.response;
        if (status === 401) {
          this.$router.push('/login');
          window.localStorage.clear();
        }
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
      .menu-list::v-deep div {
        font-size: 10px !important;
      }
    }
    @media (max-width: 960px) {
      .menu-text {
        font-size: 14px;
        padding: 4px 28px;
      }
      .menu-button {
        font-size: 15px;
        padding: 4px 0;
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
        padding: 4px 0;
      }
    }
  }
}
</style>
