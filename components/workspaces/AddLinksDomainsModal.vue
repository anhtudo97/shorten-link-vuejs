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
        <div
          class="header-dialog-icon pa-2"
          @click.stop="$emit('closeModalAddLinksDomain')"
        >
          <img src="@/assets/svg/close.svg" alt="close" />
        </div>
      </div>
    </div>
    <v-row
      class="mx-0 justify-space-between py-3 align-center dialog-add-links-domains__menu border-b"
    >
      <div class="menu-title">Domains</div>
      <button
        :disabled="loading"
        class="button-normal add-button"
        @click="addMoreDomains"
      >
        Add more
      </button>
    </v-row>

    <div class="border-b">
      <transition-group
        v-if="domain_joined.length > 0"
        name="fade"
        mode="in-out"
      >
        <div
          v-for="(item, index) in domain_joined"
          :key="`Domain__${index}`"
          class="d-flex justify-space-between dialog-add-links-domains__domain align-center"
        >
          <div class="member-name">{{ item.name }}</div>

          <button
            :disabled="loading"
            class="button-warning member-action"
            @click="removeFromList(item.id)"
          >
            Remove
          </button>
        </div>
      </transition-group>
      <div
        v-else
        class="d-flex justify-space-between dialog-add-links-domains__domain align-center"
      >
        <div class="member-name">Dont have any domains</div>
      </div>
    </div>
    <transition-group name="fade" mode="in-out">
      <div
        v-for="(item, index) in unjoined"
        :key="`Domain__${index}`"
        class="d-flex justify-space-between dialog-add-links-domains__undomain align-center"
      >
        <v-checkbox
          v-model="domainSelected"
          class="checkbox-member"
          :label="item.name"
          :value="item.id"
        ></v-checkbox>
      </div>
    </transition-group>
    <v-snackbar v-model="showAlert400" top>
      Delete workspace is successfully
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="showAlert = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <client-only>
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteScroll"
      ></infinite-loading>
    </client-only>
  </v-list>
</template>

<script>
import {
  getDomainsWorkspace,
  getDomains,
  addDomainsWorkspace,
  removeDomainWorkspace,
} from '@/services/api';
export default {
  props: {
    workspace: {
      type: Object,
      default: () => {},
    },
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
  }),
  computed: {
    unjoined() {
      const names = [...this.domain_joined].map((x) => x.name);
      return [...this.domains].filter((x) => {
        if (!names.includes(x.name)) return x;
      });
    },
  },
  watch: {
    domainSelected(value) {
      console.log(value);
    },
  },
  created() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
  },
  methods: {
    reload() {
      window.location.reload();
    },
    async infiniteScroll($state) {
      const { token, workspace, pageDomain, pageDomainWorkspace } = this;
      try {
        const resDomainWorkspace = await getDomainsWorkspace(
          token,
          workspace.id,
          pageDomainWorkspace
        );
        const resDomain = await getDomains(token, pageDomain);

        const statusDomain = resDomain.data.status;
        const statusDomainWorkspace = resDomainWorkspace.data.status;

        if (statusDomain === 200) {
          this.pageDomain += 1;
          const { domains } = resDomain.data.data;
          if (domains.length) {
            this.domains.push(...domains);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
        if (statusDomainWorkspace === 200) {
          this.pageDomainWorkspace += 1;
          const { domains } = resDomainWorkspace.data.data;
          if (domains.length) {
            this.domain_joined.push(...domains);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addMoreDomains() {
      this.loading = true;
      try {
        const res = await addDomainsWorkspace(
          this.token,
          this.workspace.id,
          this.domainSelected
        );
        const { status } = res.data;
        if (status === 200) {
          this.showAlert = true;
          setTimeout(() => {
            this.$emit('closeModalAddLinksDomain');
            this.reload();
            this.loading = false;
          }, 2000);
        }
        console.log(res);
      } catch (error) {
        this.domainSelected = [];
        console.log(error);
      }
    },
    openModalRemove() {
      this.isRemoveModal = true;
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
            this.$emit('closeModalAddLinksDomain');
            this.loading = false;
            this.showAlert400 = false;
          }, 1000);
        }
      } catch (error) {}
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
