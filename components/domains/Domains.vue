<template>
  <div class="domain">
    <v-row class="domain__menu mx-0 my-3">
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
              @click.stop="openModalCreateNewDomain = true"
            >New domain</button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="domain__diviner"></div>
    <v-row class="domain__sub-menu mx-0">
      <v-col cols="10" md="8" class="mx-auto py-0">
        <v-row class="align-center py-3">
          <v-col cols="7" sm="9" lg="10">
            <div class="domains pr-4">Domain</div>
          </v-col>
          <v-col cols="5" sm="3" lg="2" class="text-center">
            <div class="added">Added on</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div v-if="$fetchState.pending" class="d-flex justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <transition v-else name="slide-fade" mode="out-in">
      <div class="domain__management">
        <transition-group name="slide-fade" mode="out-in" tag="ul" class="pa-0">
          <li v-for="domain in domains" :key="domain.id">
            <Domain :domain="domain" @closeModalCreateNewDomain="closeModalCreateNewDomain" />
          </li>
        </transition-group>
        <v-row v-if="domains.length !== 0" justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination v-model="page" class="my-4" :length="totalPage"></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </div>
    </transition>
    <v-dialog
      v-model="openModalCreateNewDomain"
      class="domain__dialog"
      max-width="900"
      :fullscreen="width < 600 ? true : false"
    >
      <CreateNewDomain @closeModalCreateNewDomain="closeModalCreateNewDomain" />
    </v-dialog>
  </div>
</template>

<script>
import Domain from '@/components/domains/Domain';
import CreateNewDomain from '@/components/domains/CreateNewDomain';
import { getDomains } from '@/services/api';
export default {
  components: {
    Domain,
    CreateNewDomain,
  },
  fetchOnServer: false,
  async fetch() {
    await this.getDomains(1);
  },
  data: () => ({
    openModalCreateNewDomain: false,
    width: 0,
    domains: [],
    page: 1,
    token: '',
    total: 0,
    totalPage: 1,
  }),
  watch: {
    page(val) {
      this.getDomains(val);
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
    closeModalCreateNewDomain() {
      this.openModalCreateNewDomain = false;
      this.getDomains(1);
    },
    async getDomains(page = 1) {
      const { token } = this;
      try {
        const resDomain = await getDomains(token, page);
        const { status, data } = resDomain.data;
        if (status === 200) {
          const { domains, total, totalPage } = data;
          this.total = total;
          this.totalPage = totalPage;
          this.domains = domains;
        }
      } catch (error) {
        const { status } = error.response.data;
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
    background-color: #c4c4c4;
  }
  &__management {
    li {
      list-style: none;
    }
  }
  .hidden-on-below-960 {
    @media (max-width: 960px) {
      display: none;
    }
  }
}
</style>
