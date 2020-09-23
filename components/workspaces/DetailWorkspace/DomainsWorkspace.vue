<template>
  <div class="domain">
    <v-row class="domain__menu">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-0 py-md-3">
        <v-row class="align-center">
          <v-col cols="6" sm="7" md="8" lg="9">
            <div class="d-flex align-center">
              <div class="domain-count pr-4">{{ total }} Domain(s)</div>
            </div>
          </v-col>
          <v-col cols="6" sm="5" md="4" lg="3" class="text-right">
            <button
              class="button-normal add-new-domain"
              aria-label="New Domain"
              @click.stop="openAddLinkDomainModal = true"
            >Add more domain</button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="domain__diviner"></div>
    <v-row class="domain__sub-menu">
      <v-col cols="10" md="8" class="mx-auto py-0">
        <v-row class="d-flex align-center py-3">
          <v-col cols="7" sm="9" lg="10">
            <div class="domains pr-4">Domain</div>
          </v-col>
          <v-col cols="5" sm="3" lg="2" class="text-center">
            <div class="added">Added on</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <transition name="slide-fade" mode="out-in">
      <transition-group name="slide-fade" mode="out-in" tag="section">
        <div v-for="(domain, index) in domains" :key="`domain_${index}`">
          <Domain :domain="domain" @updateDomains="updateDomains" />
        </div>
      </transition-group>
    </transition>
    <v-row v-if="domains.length !== 0" justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination v-model="page" class="my-4" :length="totalPage"></v-pagination>
        </v-container>
      </v-col>
    </v-row>
    <v-dialog
      v-model="openAddLinkDomainModal"
      max-width="700"
      :fullscreen="width < 600 ? true : false"
    >
      <AddLinksDomainsModal
        @updateDomains="updateDomains"
        @closeModalAddLinksDomain="closeModalAddLinksDomain"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Domain from '@/components/domains/DomainWorkspace';
import AddLinksDomainsModal from '@/components/workspaces/AddLinksDomainsModal';

import { getDomainsWorkspace } from '@/services/api';

export default {
  components: {
    Domain,
    AddLinksDomainsModal,
  },
  data: () => ({
    openModalCreateNewDomain: false,
    openAddLinkDomainModal: false,
    width: 0,
    page: 1,
    token: '',
  }),
  computed: {
    ...mapGetters({
      domains: 'workspaces/getDomainsWorkspace',
      total: 'workspaces/getDomainsTotalWorkspace',
      totalPage: 'workspaces/getDomainsTotalPageWorkspace',
    }),
  },
  watch: {
    page(val) {
      this.getDomainsWorkspace(val);
    },
  },
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    ...mapMutations({
      setDomainsTotalPageWorkspace: 'workspaces/setDomainsTotalPageWorkspace',
    }),
    ...mapActions({
      setDomainsWorkspace: 'workspaces/setDomainsWorkspace',
      setDomainsTotalWorkspace: 'workspaces/setDomainsTotalWorkspace',
    }),
    closeModalAddLinksDomain() {
      this.openAddLinkDomainModal = false;
      this.getDomainsWorkspace();
    },
    updateDomains() {
      this.getDomainsWorkspace();
    },
    async getDomainsWorkspace() {
      const { token, page } = this;
      try {
        const resDomainWorkspace = await getDomainsWorkspace(
          token,
          this.$route.params.id,
          page
        );
        const { status, data } = resDomainWorkspace.data;

        if (status === 200) {
          const { domains, total, totalPage } = data;
          this.setDomainsWorkspace(domains);
          this.setDomainsTotalWorkspace(total);
          this.setDomainsTotalPageWorkspace(totalPage);
        }
      } catch (error) {
        const { status } = error.response;
        if (status === 401) {
          this.$router.push('/login');
        }
      }
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
.domain {
  font-family: Poppins, sans-serif;
  &__menu {
    .domain-count {
      font-size: 18px;
      line-height: 24px;
      letter-spacing: 0.2px;
    }
    .add-new-domain {
      font-weight: 500;
      padding: 7px 35px;
      font-size: 16px;
      line-height: 24px;
    }
    @media (max-width: 1366px) {
      .domain-count {
        font-size: 17px;
        line-height: 22px;
      }
      .add-new-domain {
        font-size: 15px;
        line-height: 22px;
      }
    }
    @media (max-width: 960px) {
      .domain-count {
        font-size: 16px;
        line-height: 20px;
      }
      .add-new-domain {
        font-size: 14px;
        line-height: 20px;
      }
    }
    @media (max-width: 600px) {
      .domain-count {
        font-size: 14px;
        line-height: 18px;
      }

      .add-new-domain {
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
  &__sub-menu {
    .domains,
    .added {
      font-weight: 600;
      font-size: 12px;
    }
    @media (max-width: 960px) {
      display: none;
    }
  }
  &__diviner {
    width: 100%;
    height: 1px;
    background-color: #e8e9ea;
  }
  .hidden-on-below-960 {
    @media (max-width: 960px) {
      display: none;
    }
  }
}
</style>
