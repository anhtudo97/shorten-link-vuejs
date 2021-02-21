<template>
  <v-list class="modal-sort py-5 px-5 d-flex flex-column">
    <div class="d-flex justify-space-between">
      <div></div>
      <div class="dialog-icon" @click="$emit('closeModal')">
        <img class="ma-2" src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <div class="modal-sort__title">Filter by</div>
    <v-row class="d-flex modal-sort__tab mt-3">
      <v-col
        cols="6"
        :class="[tab === 'domains' ? 'active' : '']"
        class="font-weight-medium tab-title cursor-pointer text-center"
        @click="tab = 'domains'"
      >
        Domains
      </v-col>
      <v-col
        cols="6"
        :class="[tab === 'members' ? 'active' : '']"
        class="font-weight-medium tab-title cursor-pointer text-center"
        @click="tab = 'members'"
      >
        Members
      </v-col>
    </v-row>
    <v-row justify="center">
      <transition name="fade" mode="in-out">
        <v-col v-if="tab === 'domains'" cols="12">
          <div v-if="members.length !== 0">
            <v-checkbox
              v-for="domain in domains"
              :key="domain.id"
              v-model="domainsSelected"
              class="modal-sort__checkbox"
              dense
              :label="domain.name"
              :value="domain.id"
              @change="updateFilterBy()"
            />
          </div>
          <div v-else class="mt-4 text-notification">Have not any domains</div>
        </v-col>
      </transition>
      <transition name="fade" mode="in-out">
        <v-col v-if="tab === 'members'" cols="12">
          <div v-if="members.length !== 0">
            <v-checkbox
              v-for="mem in members"
              :key="mem.id"
              v-model="memberSelected"
              class="modal-sort__checkbox"
              dense
              :label="mem.fullName"
              :value="mem.id"
              @change="updateFilterBy()"
            />
          </div>
          <div v-else class="mt-4 text-notification">Have not any member</div>
        </v-col>
      </transition>
    </v-row>
    <client-only>
      <infinite-loading spinner="waveDots" @infinite="infiniteScroll"
        ><div slot="no-more"></div
      ></infinite-loading>
    </client-only>
  </v-list>
</template>

<script>
import { getMembersWorkspaces, getDomainsWorkspace } from '@/services/api';
export default {
  data: () => ({
    members: [],
    domains: [],
    domainsSelected: [],
    memberSelected: [],
    pageMembers: 1,
    pageDomains: 1,
    token: '',
    workspaceId: '',
    tab: 'domains',
  }),
  mounted() {
    this.workspaceId = this.$route.params.id;
  },
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },
  methods: {
    updateFilterBy() {
      this.$emit('updateFilter', this.domainsSelected, this.memberSelected);
    },
    async infiniteScroll($state) {
      const { token, pageMembers, pageDomains, workspaceId } = this;
      try {
        const resDomains = await getDomainsWorkspace(
          token,
          workspaceId,
          pageDomains
        );
        const resMembers = await getMembersWorkspaces(
          token,
          workspaceId,
          pageMembers
        );
        const statusDomains = resDomains.data.status;
        const statusMembers = resMembers.data.status;

        if (statusDomains === 200) {
          this.pageDomains += 1;
          const { domains } = resDomains.data.data;
          if (domains.length) {
            this.domains.push(...domains);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
        if (statusMembers === 200) {
          this.pageMembers += 1;
          const { members } = resMembers.data.data;
          if (members.length) {
            this.members.push(...members);
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
  },
};
</script>

<style lang="scss" scoped>
.modal-sort {
  font-family: Poppins, sans-serif;
  .dialog-icon {
    cursor: pointer;
    height: 32px;
    background-color: #f9f9fa;
    border-radius: 50%;
    img {
      object-fit: cover;
      width: 16px;
      height: auto;
    }
  }
  &__title {
    font-size: 22px;
    font-weight: 600;
  }
  &__button {
    font-weight: 500;
    padding: 5px 4vh;
  }
  &__tab {
    .tab-title {
      color: #000;
      transition: all 0.3s ease-in-out;
      border-bottom: 2px solid #fff;
    }
    .active {
      color: #3c64b1;
      border-bottom-color: #3c64b1;
    }
  }
  @media screen and (max-width: 1368px) {
    &__title {
      font-size: 20px;
    }
    &__button {
      font-size: 15px;
      padding: 5px 4vh;
    }
    &__checkbox::v-deep label,
    &__checkbox::v-deep input {
      font-size: 15px;
    }
    &__tab {
      .tab-title {
        font-size: 15px;
      }
    }
    .text-notification {
      font-size: 15px;
    }
  }
  @media screen and (max-width: 960px) {
    &__title {
      font-size: 18px;
    }
    &__button {
      font-size: 14px;
      padding: 4px 3.5vh;
    }
    &__checkbox::v-deep label,
    &__checkbox::v-deep input {
      font-size: 14px;
    }
    &__tab {
      .tab-title {
        font-size: 14px;
      }
    }
    .text-notification {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 600px) {
    &__title {
      font-size: 16px;
    }
    &__button {
      font-size: 13px;
      padding: 3px 3vh;
    }
    &__checkbox::v-deep label,
    &__checkbox::v-deep input {
      font-size: 13px;
    }
    &__tab {
      .tab-title {
        font-size: 13px;
      }
    }
    .text-notification {
      font-size: 13px;
    }
  }
}
</style>
