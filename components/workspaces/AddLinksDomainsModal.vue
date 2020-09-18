<template>
  <v-list class="dialog-add-links-domains">
    <div
      class="dialog-add-links-domains__header d-flex justify-space-between align-center py-3 border-b"
    >
      <div class="d-flex align-center">
        <div class="header-title mr-3">Add more domains</div>
      </div>
      <div class="d-flex justify-space-between">
        <div></div>
        <div class="header-dialog-icon pa-2" @click.stop="$emit('closeModalAddLinksDomain')">
          <img src="@/assets/svg/close.svg" alt="close" />
        </div>
      </div>
    </div>

    <div class="border-b">
      <transition-group v-if="domain_joined.length > 0" name="slide-fade" mode="out-in">
        <div
          v-for="(item, index) in domain_joined"
          :key="`Domain__${index}`"
          class="d-flex justify-space-between dialog-add-links-domains__domain align-center"
        >
          <div class="member-name">{{ item.name }}</div>
          <button
            :disabled="loading"
            class="button-warning member-action"
            @click="removeDomainsToWorkspace(item.id)"
          >Remove</button>
        </div>
      </transition-group>
      <div
        v-else
        class="d-flex justify-space-between dialog-add-links-domains__domain align-center"
      >
        <div class="member-name">Dont have any domains</div>
      </div>
      <v-row v-if="totalPageJoined >1" class="py-0 mx-0">
        <v-col cols="12" class="py-0">
          <v-container class="max-width py-0">
            <v-pagination
              v-model="pageDomainWorkspace"
              class="text-right"
              :length="totalPageJoined"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </div>
    <v-row
      class="mx-0 justify-space-between py-3 align-center dialog-add-links-domains__menu border-b"
    >
      <div class="menu-title">Domains</div>
      <button
        :disabled="loading || !domainSelected || !domainSelected.length"
        class="button-normal add-button"
        @click="addDomainsToWorkspace"
      >Add more</button>
    </v-row>
    <transition-group name="slide-fade" mode="out-in">
      <div
        v-for="(item, index) in unjoined"
        :key="`Domain__${index}`"
        class="d-flex justify-space-between dialog-add-links-domains__undomain align-center"
      >
        <v-checkbox
          v-model="domainSelected"
          class="checkbox-member"
          :disabled="loading"
          :label="item.name"
          :value="item.id"
        ></v-checkbox>
      </div>
    </transition-group>
    <v-row v-if="totalPageJoined >1" class="py-0 mx-0">
      <v-col cols="12" class="py-0">
        <v-container class="max-width py-0">
          <v-pagination v-model="pageDomain" class="text-right" :length="totalPageDomains"></v-pagination>
        </v-container>
      </v-col>
    </v-row>
    <SnackbarError
      message="Delete domain is successfully"
      :show-alert="showAlert400"
      @closeSnackbar="showAlert400 = false"
    />
  </v-list>
</template>

<script>
import {
  getDomainsWorkspace,
  getDomains,
  addDomainsWorkspace,
  removeDomainWorkspace,
} from '@/services/api';
import SnackbarError from '@/components/shares/SnackbarError';
export default {
  components: {
    SnackbarError,
  },
  props: {
    workspace: {
      type: Object,
      default: () => {},
    },
  },
  async fetch() {
    await this.getDomains();
    await this.getDomainsWorkspace();
    this.domainSelected = [];
  },
  data: () => ({
    tabs: null,
    pageDomain: 1,
    pageDomainWorkspace: 1,
    domain_joined: [],
    domains: [],
    domainSelected: [],
    loading: false,
    showAlert400: false,
    totalJoined: 1,
    totalDomains: 1,
    totalPageJoined: 1,
    totalPageDomains: 1,
  }),
  computed: {
    unjoined() {
      const names = [...this.domain_joined].map((x) => x.name);
      return this.domains.filter((x) => {
        if (!names.includes(x.name)) return x;
      });
    },
    domainIsSelected() {
      return this.domainSelected;
    },
  },
  watch: {
    pageDomainWorkspace() {
      this.getDomainsWorkspace();
    },
    pageDomain() {
      this.getDomains();
    },
  },
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },
  methods: {
    async getDomains() {
      const { token, pageDomain } = this;
      try {
        const resDomain = await getDomains(token, pageDomain);
        const statusDomain = resDomain.data.status;

        if (statusDomain === 200) {
          const { domains, total, totalPage } = resDomain.data.data;
          this.domains = domains;
          this.totalDomains = total;
          this.totalPageDomains = totalPage;
        }
      } catch (error) {
        const { status } = error.response.data;
        if (status === 401) {
          this.$router.push('/login');
          
        }
      }
    },
    async getDomainsWorkspace() {
      const { token, workspace, pageDomainWorkspace } = this;
      try {
        const resDomainWorkspace = await getDomainsWorkspace(
          token,
          workspace.id,
          pageDomainWorkspace
        );
        const statusDomainWorkspace = resDomainWorkspace.data.status;

        if (statusDomainWorkspace === 200) {
          const { domains, totalPage, total } = resDomainWorkspace.data.data;
          this.domain_joined = domains;
          this.totalJoined = total;
          this.totalPageJoined = totalPage;
        }
      } catch (error) {
        const { status } = error.response.data;
        if (status === 401) {
          this.$router.push('/login');
          
        }
      }
    },
    async addDomainsToWorkspace() {
      await this.addDomains();
      // await this.getDomainsWorkspace();
    },
    async addDomains() {
      this.loading = true;
      try {
        const res = await addDomainsWorkspace(
          this.token,
          this.workspace.id,
          this.domainSelected
        );
        const { status } = res.data;
        await this.getDomainsWorkspace();
        if (status === 200) {
          this.showAlert = true;
          setTimeout(() => {
            this.domainSelected = [];
            this.$emit('updateDomains');
            this.loading = false;
          }, 300);
        }
      } catch (error) {
        this.domainSelected = [];
        const { status } = error.response.data;
        if (status === 401) {
          this.$router.push('/login');
          
        }
      }
    },
    async removeDomainsToWorkspace(id) {
      await this.removeFromList(id);
      await this.getDomainsWorkspace();
    },
    async removeFromList(id) {
      this.loading = true;
      try {
        const res = await removeDomainWorkspace(
          this.token,
          this.workspace.id,
          id
        );
        const { status } = res.data;
        if (status === 204) {
          this.showAlert400 = true;
          setTimeout(() => {
            this.domainSelected = [];
            this.$emit('updateDomains');
            this.loading = false;
            this.showAlert400 = false;
          }, 300);
        }
      } catch (error) {
        const { status } = error.response.data;
        if (status === 401) {
          this.$router.push('/login');
          
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-add-links-domains {
  font-family: Poppins, sans-serif;
  &__header {
    padding: 1vh 4vh;
    .header-title {
      font-size: 22px;
      font-weight: 500;
    }
    .header-dialog-icon {
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
  }
  &__menu {
    padding: 1vh 4vh;
    .menu-title {
      color: #909398;

      font-weight: 500;
    }
    .add-button {
      font-weight: 500;
      padding: 3px 5vh;
    }
  }
  &__domain {
    margin: 2vh 0;
    padding: 1vh 4vh;
    .member-name {
      color: #909398;
    }
    .member-action {
      font-weight: 500;
      padding: 3px 25px;
    }
  }
  &__undomain {
    padding: 0 4vh;
    .member-name {
      font-size: 15px;
      color: #909398;
    }
    .member-action {
      font-weight: 500;
      padding: 3px 25px;
    }
  }
  @media screen and (max-width: 1368px) {
    &__header {
      padding: 1vh 3.5vh;
      .header-title {
        font-size: 20px;
      }
    }
    &__menu {
      padding: 1vh 3.5vh;
      .menu-title {
        font-size: 15px;
      }
      .add-button {
        font-size: 15px;
        padding: 3px 4.5vh;
      }
    }
    &__domain {
      margin: 1.5vh 0;
      padding: 1vh 3.5vh;
      .member-name {
        font-size: 15px;
      }
      .member-action {
        font-size: 15px;
      }
    }
    &__undomain {
      padding: 0 3.5vh;
      .member-name {
        font-size: 15px;
      }
      .member-action {
        font-size: 15px;
      }
      .checkbox-member::v-deep label {
        font-size: 15px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    &__header {
      padding: 1vh 3vh;
      .header-title {
        font-size: 18px;
      }
    }
    &__menu {
      padding: 1vh 3.5vh;
      .menu-title {
        font-size: 14px;
      }
      .add-button {
        font-size: 14px;
        padding: 3px 4.5vh;
      }
    }
    &__domain {
      margin: 1.5vh 0;
      padding: 1vh 3.5vh;
      .member-name {
        font-size: 14px;
      }
      .member-action {
        font-size: 14px;
      }
    }
    &__undomain {
      padding: 0 3.5vh;
      .member-name {
        font-size: 14px;
      }
      .member-action {
        font-size: 14px;
      }
      .checkbox-member::v-deep label {
        font-size: 14px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    &__header {
      .header-title {
        font-size: 16px;
      }
    }
    &__menu {
      padding: 1vh 3.5vh;
      .menu-title {
        font-size: 13px;
      }
      .add-button {
        font-size: 13px;
        padding: 3px 4.5vh;
      }
    }
    &__domain {
      margin: 1.5vh 0;
      padding: 1vh 3.5vh;
      .member-name {
        font-size: 13px;
      }
      .member-action {
        font-size: 13px;
      }
    }
    &__undomain {
      padding: 0 3.5vh;
      .member-name {
        font-size: 13px;
      }
      .member-action {
        font-size: 13px;
      }
      .checkbox-member::v-deep label {
        font-size: 13px;
      }
    }
  }
}
</style>
