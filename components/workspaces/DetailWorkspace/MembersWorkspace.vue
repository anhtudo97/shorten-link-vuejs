<template>
  <div class="member">
    <v-row class="member__menu border-b mb-3">
      <v-col cols="12" sm="10" md="8" class="mx-auto py-0 py-md-3">
        <v-row class="align-center">
          <v-col cols="6" sm="7" md="8" lg="9">
            <div class="member-count pr-4">{{ total }} Member(s)</div>
          </v-col>
          <v-col cols="6" sm="5" md="4" lg="3" class="text-right">
            <button
              class="button-normal add-new-member"
              aria-label="New member"
              @click.stop="openMemberModal = true"
            >Add more members</button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <transition name="slide-fade" mode="out-in">
      <transition-group name="slide-fade" mode="out-in" tag="section">
        <div v-for="(member, index) in members" :key="`index_${index}`">
          <Member :member="member" @updateMembers="updateMembers" />
        </div>
      </transition-group>
    </transition>
    <v-row v-if="members.length !== 0" justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination v-model="page" class="my-4" :length="totalPage"></v-pagination>
        </v-container>
      </v-col>
    </v-row>
    <v-dialog
      v-model="openMemberModal"
      class="dialog"
      max-width="650"
      :fullscreen="width < 600 ? true : false"
    >
      <ManagementMemberModal @updateMember="updateMembers" @closeModalMembers="closeAddMoreMember" />
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import Member from '@/components/user/UserWorkspace';
import ManagementMemberModal from '@/components/workspaces/ManagementMembersModal';
export default {
  components: {
    Member,
    ManagementMemberModal,
  },
  data: () => ({
    width: 0,
    page: 1,
    token: '',
    openMemberModal: false,
  }),
  computed: {
    ...mapGetters({
      members: 'workspaces/getMembersWorkspace',
      total: 'workspaces/getMembersTotalWorkspace',
      totalPage: 'workspaces/getMembersTotalPageWorkspace',
    }),
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
      setMembersTotalPageWorkspace: 'workspaces/setMembersTotalPageWorkspace',
    }),
    ...mapActions({
      setMembersWorkspace: 'workspaces/setMembersWorkspace',
      setMembersTotalWorkspace: 'workspaces/setMembersTotalWorkspace',
    }),
    updateMembers() {
      this.getMembersJoined();
    },
    closeAddMoreMember() {
      this.openMemberModal = false;
    },
    async getMembersJoined() {
      const { page } = this;
      await this.setMembersWorkspace({ page, id: this.$route.params.id });
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
.member {
  font-family: Poppins, sans-serif;
  &__menu {
    .member-count {
      font-size: 18px;
      line-height: 24px;
      letter-spacing: 0.2px;
    }
    .add-new-member {
      font-weight: 500;
      padding: 7px 35px;
      font-size: 16px;
      line-height: 24px;
    }
    @media (max-width: 1366px) {
      .member-count {
        font-size: 17px;
        line-height: 22px;
      }
      .add-new-member {
        font-size: 15px;
        line-height: 22px;
      }
    }
    @media (max-width: 960px) {
      .member-count {
        font-size: 16px;
        line-height: 20px;
      }
      .add-new-member {
        font-size: 14px;
        line-height: 20px;
      }
    }
    @media (max-width: 600px) {
      .member-count {
        font-size: 14px;
        line-height: 18px;
      }

      .add-new-member {
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
  .hidden-on-below-960 {
    @media (max-width: 960px) {
      display: none;
    }
  }
}
</style>
