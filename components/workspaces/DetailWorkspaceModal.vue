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
    <div class="d-flex justify-space-between align-center mb-3">
      <div class="d-flex dialog-detail-workspace__name align-center">
        <img
          class="img"
          src="https://dashboard-cdn.rebrandly.com/support-images/new_default_avatar_team.png"
        />
        <div>
          <div class="dialog-name-text px-5">{{workspace.name}}</div>
          <div class="dialog-date-text px-5">
            <button disabled class="date-text">Default</button>
          </div>
        </div>
      </div>
      <div
        class="dialog-detail-workspace__modify d-flex align-center justify-end justify-md-center"
      >
        <img
          src="@/assets/svg/member.svg"
          alt="member"
          class="ml-4"
          @click.stop="openModalMemberModal = true"
        />
        <img
          src="@/assets/svg/trash.svg"
          alt="trash"
          class="ml-4"
          @click.stop="isRemoveModal = true"
        />
      </div>
    </div>
    <div class="my-16"></div>
    <div class="d-flex dialog-detail-workspace__info align-center mb-5">
      <img src="@/assets/svg/calendar.svg" alt="calendar" class="mr-3" />
      <div class="info-text">Created on {{createdDate}} by anhtudo97@gmail.com</div>
    </div>
    <div class="d-flex dialog-detail-workspace__info align-center mb-5">
      <img src="@/assets/svg/links.svg" alt="calendar" class="mr-3" />
      <nuxt-link to="/links">
        <div class="info-text info-link font-weight-medium">4 Links</div>
      </nuxt-link>
    </div>
    <div class="d-flex dialog-detail-workspace__info align-center mb-5">
      <img src="@/assets/svg/members.svg" alt="calendar" class="mr-3" />
      <nuxt-link to="/links">
        <div class="info-text font-weight-medium">3 teammates</div>
      </nuxt-link>
    </div>
    <div class="d-flex dialog-detail-workspace__info align-center mb-5">
      <img src="@/assets/svg/domains.svg" alt="calendar" class="mr-3" />
      <nuxt-link to="/domains">
        <div class="info-text info-link font-weight-medium">2 Branded domains included</div>
      </nuxt-link>
    </div>
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
  </v-list>
</template>

<script>
import { format } from 'date-fns';
import ManagementMemberModal from '@/components/workspaces/ManagementMembersModal';
export default {
  components: {
    ManagementMemberModal,
  },
  props: {
    workspace: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    openModalMemberModal: false,
    isRemoveModal: false,
  }),
  computed: {
    createdDate() {
      return format(new Date(this.workspace.createdAt), 'MMMM dd, yyyy');
    },
  },
  methods: {
    closeModalMembers() {
      this.openModalMemberModal = false;
    },
    removeWorkspace() {},
    closeRemoveModal() {
      this.isRemoveModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-detail-workspace {
  font-family: Poppins, sans-serif;
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
  &__modify {
    img {
      opacity: 0.6;
      object-fit: cover;
      width: 24px;
      height: auto;
    }
  }
  &__info {
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
}
</style>
