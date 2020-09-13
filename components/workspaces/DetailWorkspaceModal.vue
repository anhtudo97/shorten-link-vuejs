<template>
  <v-list class="dialog-detail-workspace">
    <div class="d-flex justify-space-between">
      <div></div>
      <div
        class="dialog-detail-workspace__dialog-icon pa-2"
        @click.stop="$emit('closeModalDetailWorkspace')"
      >
        <img src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <div class="d-flex align-start mb-3">
      <div class="d-flex dialog-detail-workspace__name align-center mr-10">
        <img
          class="img"
          src="https://dashboard-cdn.rebrandly.com/support-images/new_default_avatar_team.png"
        />
        <div>
          <div class="dialog-name-text px-5">{{ workspace.name }}</div>
          <div class="dialog-date-text px-5">
            <button disabled class="date-text">Default</button>
          </div>
        </div>
      </div>
      <button
        class="dialog-detail-workspace__button button-normal"
        @click="openEditWorkspace = true"
      >
        Edit
      </button>
    </div>
    <div class="mt-16 mb-4 border-b">
      <div class="d-flex dialog-detail-workspace__info align-center mb-5">
        <img src="@/assets/svg/calendar.svg" alt="calendar" class="mr-3" />
        <div class="info-text">
          Created on {{ createdDate }} by anhtudo97@gmail.com
        </div>
      </div>
      <div class="d-flex dialog-detail-workspace__info align-center mb-5">
        <img src="@/assets/svg/links.svg" alt="calendar" class="mr-3" />
        <nuxt-link to="/links">
          <div class="info-text info-link font-weight-medium">4 Links</div>
        </nuxt-link>
      </div>
      <div class="d-flex dialog-detail-workspace__info align-center mb-5">
        <img src="@/assets/svg/members.svg" alt="calendar" class="mr-3" />
        <div
          class="info-text font-weight-medium"
          @click.stop="openModalMemberModal = true"
        >
          3 teammates
        </div>
      </div>
      <div class="d-flex dialog-detail-workspace__info align-center mb-5">
        <img src="@/assets/svg/domains.svg" alt="calendar" class="mr-3" />
        <div
          class="info-text info-link font-weight-medium"
          @click.stop="openAddLinkDomainModal = true"
        >
          {{ total }} Branded domains included
        </div>
      </div>
    </div>
    <v-row v-if="!workspace.isDefault" class="align-center dialog-detail-workspace__button-remove">
      <v-col cols="12" sm="3">
        <div class="services-title">Delete this repository</div>
      </v-col>
      <v-col cols="12" sm="9" class="text-md-right text-left">
        <button
          class="button-warning button-remove"
          @click.stop="isRemoveModal = true"
        >
          <div class="button-text">Remove this domain</div>
        </button>
      </v-col>
    </v-row>
    <v-dialog
      v-model="openModalMemberModal"
      class="dialog"
      max-width="650"
      :fullscreen="width < 600 ? true : false"
    >
      <ManagementMemberModal
        :workspace="workspace"
        @closeModalMembers="closeModalMembers"
      />
    </v-dialog>
    <v-dialog v-model="isRemoveModal" persistent width="500">
      <RemoveModal
        name="workspace"
        :loading="loading"
        @closeRemoveModal="closeRemoveModal"
        @removeElement="removeWorkspace"
      />
    </v-dialog>
    <v-dialog
      v-model="openAddLinkDomainModal"
      max-width="700"
      :fullscreen="width < 600 ? true : false"
    >
      <AddLinksDomainsModal
        :workspace="workspace"
        @closeModalAddLinksDomain="closeModalAddLinksDomain"
      />
    </v-dialog>
    <v-dialog
      v-model="openEditWorkspace"
      max-width="850"
      :fullscreen="width < 600 ? true : false"
    >
      <CreateNewWorkspaceModal
        :id="workspace.id"
        :edit="true"
        :name="workspace.name"
        @closeCreateNewWorkspace="closeEditWorkspace"
      />
    </v-dialog>
    <v-snackbar v-model="showAlert" top>
      Delete workspace is successfully
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="showAlert = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-list>
</template>

<script>
import { format } from 'date-fns';
import { deleteWorkspace, getDomainsWorkspace } from '@/services/api';

import ManagementMemberModal from '@/components/workspaces/ManagementMembersModal';
import AddLinksDomainsModal from '@/components/workspaces/AddLinksDomainsModal';
import CreateNewWorkspaceModal from '@/components/workspaces/CreateNewWorkspace';

export default {
  components: {
    ManagementMemberModal,
    AddLinksDomainsModal,
    CreateNewWorkspaceModal,
  },
  props: {
    workspace: {
      type: Object,
      default: () => {},
    },
  },
  async fetch() {
    try {
      const res = await getDomainsWorkspace(
        this.token,
        this.workspace.id,
        this.pageDomainWorkspace
      );
      const { status } = res.data;
      if (status === 200) {
        const { total } = res.data.data;
        this.total = total;
      }
    } catch (error) {
      console.log(error);
    }
  },
  data: () => ({
    openModalMemberModal: false,
    openAddLinkDomainModal: false,
    isRemoveModal: false,
    openEditWorkspace: false,
    width: 0,
    token: '',
    showAlert: false,
    loading: false,
    pageDomainWorkspace: 1,
    total: 0,
  }),
  computed: {
    createdDate() {
      return format(new Date(this.workspace.createdAt), 'MMMM dd, yyyy');
    },
  },
  created() {
    if (localStorage.token) {
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
    reload() {
      window.location.reload();
    },
    closeModalMembers() {
      this.openModalMemberModal = false;
    },
    closeRemoveModal() {
      this.isRemoveModal = false;
    },
    closeModalAddLinksDomain() {
      this.openAddLinkDomainModal = false;
    },
    closeEditWorkspace() {
      this.openEditWorkspace = false;
    },
    async removeWorkspace() {
      this.showAlert = false;
      this.loading = true;
      try {
        const res = await deleteWorkspace(this.token, this.workspace.id);
        const { status } = res.data;
        if (status === 200) {
          this.showAlert = true;
          setTimeout(() => {
            this.reload();
            this.showAlert = false;
            this.loading = false;
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      } finally {
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
.dialog-detail-workspace {
  font-family: Poppins, sans-serif;
  height: 100%;
  padding: 3vh 4vh;
  &__dialog-icon {
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
  &__name {
    img {
      object-fit: cover;
      width: 60px;
      height: auto;
    }
    .dialog-name-text {
      font-size: 22px;
    }
    .dialog-date-text {
      .date-text {
        padding: 2px 4px;
        font-size: 10px;
        border-radius: 4px;
        background-color: #02af63;
        color: #fff;
      }
    }
  }
  &__button {
    padding: 5px 5vh;
  }
  &__info {
    cursor: pointer;
    img {
      object-fit: cover;
      width: 20px;
      height: auto;
    }
    .info-text {
      font-size: 15px;
      color: #595d66;
    }
    .info-link {
      color: #2281c2;
      &:hover {
        color: #2c96df;
      }
    }
  }
  &__button-remove {
    border: 1px solid #d34547;
    border-radius: 10px;
    .services-title {
      color: #000;
    }
    .button-remove {
      padding: 0.5vh 4vh;
      font-weight: 500;
    }
  }
  @media screen and (max-width: 1368px) {
    &__name {
      .dialog-name-text {
        font-size: 20px;
      }
    }
    &__info {
      img {
        width: 20px;
      }
      .info-text {
        font-size: 15px;
      }
    }
    &__button-remove {
      .services-title {
        font-size: 15px;
        color: #000;
      }
      .button-remove {
        padding: 0.5vh 4vh;
        font-weight: 500;
        font-size: 15px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    &__name {
      .dialog-name-text {
        font-size: 18px;
      }
    }
    &__info {
      img {
        width: 20px;
      }
      .info-text {
        font-size: 14px;
      }
    }
    &__button-remove {
      .services-title {
        font-size: 15px;
        color: #000;
      }
      .button-remove {
        padding: 0.5vh 4vh;
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
}
</style>
