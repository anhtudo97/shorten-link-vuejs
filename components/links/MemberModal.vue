<template>
  <v-list class="modal-sort py-5 px-5 d-flex flex-column">
    <div class="d-flex justify-space-between">
      <div></div>
      <div class="dialog-icon" @click="$emit('closeModal')">
        <img class="ma-2" src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <div class="modal-sort__title">Filter by</div>
    <button
      class="button-normal modal-sort__button mt-3"
      @click="updateFilterBy()"
    >
      Filter
    </button>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <div>Domains</div>
        <v-checkbox
          v-for="domain in domains"
          :key="domain.id"
          v-model="domainsSelected"
          class="modal-sort__checkbox"
          dense
          :label="domain.name"
          :value="domain.id"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div>Members</div>
        <div v-if="members.length !== 0">
          <v-checkbox
            v-for="mem in members"
            :key="mem.id"
            v-model="memberSelected"
            class="modal-sort__checkbox"
            dense
            :label="mem.name"
            :value="mem.id"
          />
        </div>
        <div v-else class="mt-4">Have not any member</div>
      </v-col>
    </v-row>
    <client-only>
      <infinite-loading
        spinner="waveDots"
        @infinite="infiniteScroll"
      ></infinite-loading>
    </client-only>
  </v-list>
</template>

<script>
import { getMembersWorkspaces, getDomainsWorkspace } from '@/services/api';
import { handle } from '@/utils/promise';
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
      this.$emit('updateFilter', this.domainsSelected, this.workspacesSelected);
    },
    async infiniteScroll($state) {
      const { token, pageMembers, pageDomains, workspaceId } = this;
      const [resDomains, domainsError] = await handle(
        getDomainsWorkspace(token, workspaceId, pageDomains)
      );
      if (domainsError) throw new Error('Could not fetch domains details');
      const [resMembers, membersError] = await handle(
        getMembersWorkspaces(token, workspaceId, pageMembers)
      );
      if (membersError) throw new Error('Could not fetch members details');

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
  }
}
</style>
