<template>
  <v-row class="member-detail">
    <v-col
      cols="12"
      sm="10"
      md="8"
      class="mx-auto"
      @click.stop="openUserDetailModal = true"
    >
      <v-row class="align-center border-radius-10 mx-0 py-3">
        <v-col cols="12" sm="8" md="8">
          <div class="d-flex justify-space-between">
            <div class="member text-overflow-hidden">{{ member.fullName }}</div>
            <div :class="[colorStatus]" class="member text-overflow-hidden">
              {{ member.status }}
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="text-left text-sm-right relative">
          <div class="added text-overflow-hidden absolute">
            {{ member.email }}
          </div>
          <button
            :disabled="loading"
            class="button-warning btn-remove absolute"
            @click="removeFromList"
          >
            Remove
          </button>
        </v-col>
      </v-row>
    </v-col>
    <v-dialog
      v-model="openUserDetailModal"
      :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <DetailUserModal
        :user="member"
        @closeUserDetailModal="closeUserDetailModal"
      />
    </v-dialog>
    <v-snackbar v-model="showAlert400" top color="error">
      {{ messages }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          aria-label="close"
          @click="showAlert400 = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import { format } from 'date-fns';
import { removeMemberWorkspace } from '@/services/api';
import DetailUserModal from '@/components/user/DetailUserModal';
export default {
  components: {
    DetailUserModal,
  },
  props: {
    member: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    openUserDetailModal: false,
    openMemberModal: false,
    showAlert400: false,
    messages: '',
    width: 0,
    loading: false,
    token: '',
  }),
  computed: {
    date() {
      return format(new Date(this.member.createdAt), 'MMMM dd, yyyy');
    },
    colorStatus() {
      const { status } = this.member;
      return status === 'ACCEPTED'
        ? 'text-green'
        : status === 'PENDING'
        ? 'text-gray'
        : 'text-red';
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
    handleResize() {
      if (process.client) {
        this.width = window.innerWidth;
      }
    },
    closeUserDetailModal() {
      this.openUserDetailModal = false;
    },
    async removeFromList() {
      this.loading = true;
      try {
        await removeMemberWorkspace(
          this.token,
          this.$route.params.id,
          this.member.id
        );
        setTimeout(() => {
          this.loading = false;
          this.$emit('updateMembers');
        }, 2000);
      } catch (error) {
        const { status } = error.response;
        if (status === 401) {
          this.$router.push('/login');
          window.localStorage.clear();
        }
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.member-detail {
  cursor: pointer;
  .border-radius-10 {
    border: 1px solid #e8e9ea;
    border-radius: 10px;
    transition: box-shadow 0.3s ease-in-out;
    &:hover {
      background-color: #eaf6ff;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
  }
  .member {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #212732;
    &:hover {
      color: #3c64b1;
    }
  }
  .text-gray {
    color: rgba(0, 0, 0, 0.3);
  }
  .text-green {
    color: #02af63;
  }
  .text-red {
    color: #d34547;
  }
  .btn-remove {
    opacity: 0;
    padding: 5px 40px;
    transition: 0.3s all ease-in-out;
  }
  .added {
    opacity: 1;
    transition: 0.3s all ease-in-out;
  }
  .text-left {
    position: relative;
    .btn-remove {
      position: absolute;
      top: 15%;
      left: 50%;
    }
  }
  &:hover {
    .btn-remove {
      opacity: 1;
    }
    .added {
      opacity: 0;
    }
  }
  @media (max-width: 1366px) {
    .member {
      font-size: 18px;
      line-height: 26px;
    }
    .added {
      font-size: 15px;
    }
  }
  @media (max-width: 960px) {
    .member {
      font-size: 16px;
      line-height: 24px;
    }
    .added {
      font-size: 14px;
    }
  }
  @media (max-width: 600px) {
    .member {
      font-size: 14px;
      line-height: 22px;
    }
    .added {
      font-size: 12px;
    }
  }
}
</style>
