<template>
  <div class="domain">
    <v-row class="domain__menu mx-0 my-3">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-0 py-md-3">
        <v-row class="align-center">
          <v-col cols="6" sm="7" md="8" lg="9">
            <div class="d-flex align-center">
              <div class="domain-count pr-4">
                {{ domains.length }} Domain(s)
              </div>
            </div>
          </v-col>
          <v-col cols="6" sm="5" md="4" lg="3" class="text-right">
            <button
              class="button-normal add-new-domain"
              @click.stop="openModalCreateNewDomain = true"
            >
              New domain
            </button>
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
    <div class="domain__management">
      <transition-group name="list" tag="ul" class="pa-0">
        <li v-for="domain in domains" :key="domain.id">
          <Domain
            :id="domain.id"
            :domain="domain.name"
            :added="domain.createdAt"
          />
        </li>
      </transition-group>
    </div>
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
export default {
  components: {
    Domain,
    CreateNewDomain,
  },
  props: {
    domains: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    openModalCreateNewDomain: false,
    width: 0,
  }),
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
