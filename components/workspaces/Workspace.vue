<template>
  <div class="workspace mb-5">
    <nuxt-link :to="`workspaces/${workspace.id}?name=${workspace.name}`">
      <v-row
        class="border-radius-10 align-center justify-space-between py-md-3 mx-3 mx-sm-0"
      >
        <v-col cols="6" sm="8" md="9" class="workspace__name my-3">
          <div class="d-flex">
            <img
              class="img"
              src="https://dashboard-cdn.rebrandly.com/support-images/new_default_avatar_team.png"
              alt="avatar"
            />
            <div class="name-text px-5 text-overflow-hidden">
              {{ workspace.name }}
            </div>
          </div>
        </v-col>
        <v-col
          cols="6"
          sm="4"
          md="3"
          class="text-md-center text-right workspace__content"
        >
          <div class="date">{{ createdDate }}</div>
        </v-col>
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
        <v-dialog v-model="isRemoveModal" persistent max-width="500">
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
            @closeModalAddLinksDomain="closeModalAddLinksDomain"
          />
        </v-dialog>
      </v-row>
    </nuxt-link>
    <v-snackbar v-model="showAlert" top color="success">
      Delete workspace is successfully
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          aria-label="close"
          @click="showAlert = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { deleteWorkspace } from '@/services/api';

import ManagementMemberModal from '@/components/workspaces/ManagementMembersModal';
import AddLinksDomainsModal from '@/components/workspaces/AddLinksDomainsModal';
export default {
  components: {
    ManagementMemberModal,
    AddLinksDomainsModal,
  },
  props: {
    workspace: {
      type: Object,
      default: () => {},
    },
    joined: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    openModalMemberModal: false,
    openAddLinkDomainModal: false,
    isRemoveModal: false,
    width: 0,
    token: '',
    showAlert: false,
    loading: false,
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
    closeModalAddLinksDomain() {
      this.openAddLinkDomainModal = false;
    },
    closeRemoveModal() {
      this.isRemoveModal = false;
    },
    async removeWorkspace() {
      this.loading = true;
      try {
        const res = await deleteWorkspace(this.token, this.workspace.id);
        const { status } = res.data;
        if (status === 200) {
          this.showAlert = true;
          setTimeout(() => {
            this.$emit('closeCreateNewWorkspace');
            this.reload();
            this.showAlert = false;
            this.loading = false;
          }, 1000);
        }
      } catch (error) {
        const { status } = error.response;
        if (status === 401) {
          this.$router.push('/login');
          window.localStorage.clear();
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
.workspace {
  a {
    color: #000;
  }
  cursor: pointer;
  .border-radius-10 {
    border: 1px solid #e8e9ea;
    border-radius: 5px;
    transition: box-shadow 0.3s ease-in-out;
    &:hover {
      background-color: #eaf6ff;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
  }
  &__name {
    img {
      object-fit: cover;
      width: 24px;
      height: auto;
    }
  }
  &__content {
    position: relative;
    .date {
      transition: all 0.2s ease-in-out;
      opacity: 1;
    }
    .modify {
      position: absolute;
      top: 6px;
      left: 12px;
      transition: all 0.2s ease-in-out;
      opacity: 0;
      width: 100%;
      img {
        object-fit: cover;
        width: 30px;
        height: auto;
      }
      .opacity-06 {
        opacity: 0.6;
      }
    }
  }
  .dialog-detail-600::v-deep .v-dialog {
    display: block;
    @media screen and (min-width: 600px) {
      display: none;
    }
  }
  .dialog-detail-other {
    display: none;
    @media screen and (min-width: 600px) {
      display: block;
    }
  }
  @media (max-width: 1368px) {
    &__name {
      img {
        width: 24px;
      }
      .name-text {
        font-size: 15px;
      }
    }
    &__content {
      .date {
        font-size: 15px;
      }
      .modify {
        img {
          width: 25px;
        }
      }
    }
  }
  @media (max-width: 960px) {
    &__name {
      img {
        width: 24px;
      }
      .name-text {
        font-size: 14px;
      }
    }
    &__content {
      .date {
        font-size: 14px;
      }
      .modify {
        width: 80%;
        img {
          margin-top: 2px;
          width: 22px;
        }
      }
    }
  }
  @media (max-width: 600px) {
    &__name {
      img {
        height: 20px;
      }
    }
    &__content {
      .modify {
        width: 80%;
        img {
          margin-top: 5px;
          width: 20px;
        }
      }
    }
  }
}
</style>
