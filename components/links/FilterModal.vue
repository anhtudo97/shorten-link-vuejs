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
        :class="[tab === 'workspaces' ? 'active' : '']"
        class="font-weight-medium tab-title cursor-pointer text-center"
        @click="tab = 'workspaces'"
      >
        Workspaces
      </v-col>
    </v-row>
    <v-row justify="center">
      <transition name="fade" mode="in-out">
        <v-col v-if="tab === 'domains'" cols="12">
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
        </v-col>
      </transition>
      <transition name="fade" mode="in-out">
        <v-col v-if="tab === 'workspaces'" cols="12">
          <v-checkbox
            v-for="w in workspaces"
            :key="w.id"
            v-model="workspacesSelected"
            class="modal-sort__checkbox"
            dense
            :label="w.name"
            :value="w.id"
            @change="updateFilterBy()"
          />
        </v-col>
      </transition>
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
import { mapMutations, mapActions } from 'vuex';
import { getWorkspaces, getDomains } from '@/services/api';
export default {
  data: () => ({
    domains: [],
    workspaces: [],
    domainsSelected: [],
    workspacesSelected: [],
    pageDomains: 1,
    pageWorkspaces: 1,
    token: '',
    tab: 'domains',
  }),
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },
  methods: {
    ...mapMutations({
      setDomainSelected: 'links/setDomainSelected',
      setWorkspaceSelected: 'links/setWorkspaceSelected',
    }),
    ...mapActions({
      updateLinks: 'links/updateLinks',
    }),
    updateFilterBy() {
      this.setDomainSelected(this.domainsSelected);
      this.setWorkspaceSelected(this.workspacesSelected);
      this.updateLinks({
        page: 1,
      });
    },

    async infiniteScroll($state) {
      const { token, pageDomains, pageWorkspaces } = this;
      try {
        const resDomains = await getDomains(token, pageDomains, true);

        const resWorkspaces = await getWorkspaces(token, pageWorkspaces);

        const statusDomains = resDomains.data.status;
        const statusWorkspaces = resWorkspaces.data.status;

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
  }
}
</style>
