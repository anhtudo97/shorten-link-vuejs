<template>
  <div class="domain">
    <v-row class="domain__sub-menu">
      <v-col cols="10" md="8" class="mx-auto py-0">
        <v-row class="d-flex align-center">
          <v-col cols="12" sm="9" lg="10" class="d-flex align-center">
            <div class="domains pr-4">Domain</div>
            <div class="d-flex align-center hover-btn">
              <button
                class="plus-button"
                @click.stop="openAddLinkDomainModal = true"
              ></button>
              <div class="ml-4 add-more-domain">Add more domain</div>
            </div>
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
          <v-pagination
            v-model="page"
            class="my-4"
            :length="totalPage"
          ></v-pagination>
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
import { mapGetters, mapActions } from 'vuex';

import Domain from '@/components/domains/DomainWorkspace';
import AddLinksDomainsModal from '@/components/workspaces/AddLinksDomainsModal';

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
      this.setDomainsWorkspace({ page: val, id: this.$route.params.id });
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
    ...mapActions({
      setDomainsWorkspace: 'workspaces/setDomainsWorkspace',
    }),
    closeModalAddLinksDomain() {
      this.openAddLinkDomainModal = false;
      this.setDomainsWorkspace({ page: this.page, id: this.$route.params.id });
    },
    updateDomains() {
      this.setDomainsWorkspace({ page: this.page, id: this.$route.params.id });
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
  &__sub-menu {
    .domains,
    .added {
      font-weight: 600;
      font-size: 13px;
    }
    .hover-btn {
      .plus-button {
        border: 2px solid #3c64b1;
        background-color: #fff;
        font-size: 16px;
        height: 32px;
        width: 32px;
        border-radius: 999px;
        position: relative;
        &:after,
        &:before {
          content: '';
          display: block;
          background-color: #3c64b1;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &:before {
          height: 1.2em;
          width: 4px;
          border-radius: 100px;
        }
        &:after {
          height: 4px;
          width: 1.2em;
          border-radius: 100px;
        }
      }
      .add-more-domain {
        font-size: 13px;
        font-weight: 500;
        transition: 0.3s all ease-in-out;
        opacity: 0;
      }
      &:hover {
        .add-more-domain {
          opacity: 1;
        }
      }
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
.dialog::v-deep .v-dialog {
  background-color: #fff;
}
</style>
