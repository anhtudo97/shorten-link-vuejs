<template>
  <div class="workspace mb-5">
    <v-row class="border-radius-10 align-center justify-space-between py-md-3 mx-3 mx-sm-0">
      <v-col
        cols="7"
        sm="8"
        md="9"
        class="workspace__name"
        @click.stop="openModalDetailModal = true"
      >
        <div class="d-flex">
          <img
            class="img"
            src="https://dashboard-cdn.rebrandly.com/support-images/new_default_avatar_team.png"
          />
          <div class="name-text px-5 text-overflow-hidden">{{workspace.name}}</div>
        </div>
      </v-col>
      <v-col cols="5" sm="4" md="3" class="text-md-center text-right workspace__content">
        <div class="date">{{createdDate}}</div>
        <div class="modify d-flex align-center justify-end justify-md-center">
          <img
            src="@/assets/svg/addlink.svg"
            alt="add link"
            class="ml-4"
            @click.stop="openAddLinkDomainModal=true"
          />
          <img
            src="@/assets/svg/member.svg"
            alt="member"
            class="ml-4 opacity-06"
            @click.stop="openModalMemberModal=true"
          />
          <img
            src="@/assets/svg/trash.svg"
            alt="trash"
            class="ml-4 opacity-06"
            @click.stop="isRemoveModal = true"
          />
        </div>
      </v-col>
      <v-dialog v-model="openModalDetailModal" class="dialog" max-width="1000">
        <DetailWorkspaceModal
          :workspace="workspace"
          @closeModalDetailWorkspace="closeModalDetailWorkspace"
        />
      </v-dialog>
      <v-dialog v-model="openModalMemberModal" class="dialog" max-width="650">
        <ManagementMemberModal :workspace="workspace" @closeModalMembers="closeModalMembers" />
      </v-dialog>
      <v-dialog v-model="isRemoveModal" persistent width="500">
        <RemoveModal
          name="workspace"
          @closeRemoveModal="closeRemoveModal"
          @removeElement="removeWorkspace"
        />
      </v-dialog>
      <v-dialog v-model="openAddLinkDomainModal" width="700">
        <AddLinksDomainsModal
          @closeModalAddLinksDomain="closeModalAddLinksDomain"
        />
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { format } from 'date-fns';

import DetailWorkspaceModal from '@/components/workspaces/DetailWorkspaceModal';
import ManagementMemberModal from '@/components/workspaces/ManagementMembersModal';
import AddLinksDomainsModal from '@/components/workspaces/AddLinksDomainsModal';

export default {
  components: {
    DetailWorkspaceModal,
    ManagementMemberModal,
    AddLinksDomainsModal,
  },
  props: {
    workspace: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    openModalDetailModal: false,
    openModalMemberModal: false,
    openAddLinkDomainModal: false,
    isRemoveModal: false,
    items: ['https://passport.yandex.com/', 'https://www.notion.so/'],
    value: ['https://www.notion.so/'],
  }),
  computed: {
    createdDate() {
      return format(new Date(this.workspace.createdAt), 'MMMM dd, yyyy');
    },
  },
  methods: {
    closeModalDetailWorkspace() {
      this.openModalDetailModal = false;
    },
    closeModalMembers() {
      this.openModalMemberModal = false;
    },
    closeModalAddLinksDomain() {
      this.openAddLinkDomainModal = false;
    },
    removeWorkspace() {},
    closeRemoveModal() {
      this.isRemoveModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.workspace {
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
  &:hover {
    .workspace__content {
      .date {
        opacity: 0;
      }
      .modify {
        opacity: 1;
      }
    }
  }
  @media (max-width: 1368px) {
    &__name {
      img {
        object-fit: cover;
        width: 24px;
        height: auto;
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
          opacity: 0.6;
          object-fit: cover;
          width: 30px;
          height: auto;
        }
      }
    }
  }
  @media (max-width: 960px) {
    &__name {
      img {
        object-fit: cover;
        width: 24px;
        height: auto;
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
          opacity: 0.6;
          object-fit: cover;
          width: 30px;
          height: auto;
        }
      }
    }
  }
  @media (max-width: 600px) {
    &__name {
      img {
        object-fit: cover;
        width: auto;
        height: 20px;
      }
      .name-text {
        font-size: 12px;
      }
    }
    &__content {
      .date {
        font-size: 12px;
      }
      .modify {
        width: 80%;
        img {
          margin-top: 5px;
          width: 20px;
          height: auto;
        }
      }
    }
  }
}
</style>
