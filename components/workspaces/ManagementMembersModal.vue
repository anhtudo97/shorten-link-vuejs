<template>
  <v-list class="dialog-member-workspace">
    <div class="d-flex justify-space-between dialog-member-workspace__title border-b">
      <div class="d-flex align-center flex-wrap">
        <div class="dialog-title mr-4">{{ workspace.name }}</div>
      </div>
      <div class="d-flex justify-space-between dialog-icon-block">
        <div></div>
        <div class="dialog-icon pa-2" @click.stop="$emit('closeModalMembers')">
          <img src="@/assets/svg/close.svg" alt="close" />
        </div>
      </div>
    </div>
    <div
      class="dialog-member-workspace__header d-flex py-3 justify-space-between border-b align-center"
    >
      <div class="header-name">Name</div>
      <button
        :disabled="loading"
        class="button-normal dialog-button font-weight-medium px-4"
        @click.stop="inviteMembers"
      >Send the invitations</button>
    </div>
    <div
      class="d-flex flex-wrap justify-space-between py-3 dialog-member-workspace__search border-b"
    >
      <v-text-field
        v-model="search"
        :disabled="loading"
        :rules="[required('email'), emailFormat()]"
        label="Searching member ..."
        class="search-input mr-0 mr-sm-9"
        hide-details="auto"
        outlined
        dense
        @keyup.enter="searchMember"
      ></v-text-field>
      <button
        :disabled="loading"
        class="button-normal search-button font-weight-medium px-10"
        @click.stop="searchMember"
      >Search</button>
    </div>
    <div class="border-b">
      <transition-group name="fade" mode="in-out">
        <v-row
          v-for="item in joined"
          :key="item.id"
          class="d-flex justify-space-between dialog-member-workspace__member align-center mx-0"
        >
          <v-col cols="12" md="8">
            <div class="d-flex align-center justify-space-between">
              <div class="member-name" @click.stop="openDetailModal(item.email)">{{ item.fullName }}</div>
              <div class="member-name">{{ item.status }}</div>
            </div>
          </v-col>
          <v-col cols="12" md="4" class="text-right">
            <button
              :disabled="loading"
              class="button-warning member-action"
              @click="removeMembers(item.id)"
            >Remove</button>
          </v-col>
        </v-row>
      </transition-group>
      <div v-if="totalPage > 1" class="dialog-member-workspace__member">
        <button class="button-normal member-action" @click="addMore">Add more</button>
      </div>
    </div>
    <transition-group name="slide-fade" mode="in-out">
      <div
        v-for="item in unjoined"
        :key="item.id"
        class="d-flex justify-space-between dialog-member-workspace__unmember align-center"
      >
        <v-checkbox
          v-model="selected"
          dense
          :disabled="loading"
          class="checkbox-member"
          :label="item.name"
          :value="item.id"
        ></v-checkbox>
      </div>
    </transition-group>
    <v-dialog
      v-model="openUserDetailModal"
      :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <DetailUserModal :user="user" @closeUserDetailModal="closeUserDetailModal" />
    </v-dialog>
    <SnackbarSuccess
      message="Send the invitations is successfully"
      :show-alert="showAlert"
      @closeSnackbar="showAlert = false"
    />
    <v-snackbar v-model="showAlert400" top color="error">
      {{ messages }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="showAlert400 = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-list>
</template>

<script>
import {
  getMembersWorkspaces,
  getMember,
  inviteMembers,
  removeMemberWorkspace,
} from '@/services/api';
import validations from '@/utils/validations';
import DetailUserModal from '@/components/user/DetailUserModal';
import SnackbarSuccess from '@/components/shares/SnackbarSuccess';
export default {
  components: {
    DetailUserModal,
    SnackbarSuccess,
  },
  props: {
    workspace: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    ...validations,
    search: '',
    openUserDetailModal: false,
    showAlert400: false,
    showAlert: false,
    loading: false,
    selected: [],
    token: '',
    page: 1,
    totalPage: 1,
    members: [],
    users: [],
    user: {
      fullname: '',
      email: '',
      createdAt: '2020-08-26T10:11:25.704675+07:00',
    },
    messages: '',
  }),
  computed: {
    joined() {
      return this.members;
    },
    unjoined() {
      return this.users;
    },
  },
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },
  async mounted() {
    await this.getMembersJoined();
  },
  methods: {
    async addMore() {
      this.page++;
      await this.getMembersJoined();
    },
    async getMembersJoined() {
      try {
        const res = await getMembersWorkspaces(
          this.token,
          this.workspace.id,
          this.page
        );
        const { status, data } = res.data;
        if (status === 200) {
          const { members, totalPage } = data;
          this.totalPage = totalPage;
          this.members = members;
        }
      } catch (error) {
        console.error(error.response);
        const { status } = error.response;
        if (status === 401) this.$router.push('/login');
      }
    },
    async searchMember() {
      this.loading = true;
      try {
        const res = await getMember(this.token, this.search);
        const { data } = res.data;
        const { users } = data;
        setTimeout(() => {
          this.users.push({
            id: users[0].id,
            name: users[0].fullName,
            email: users[0].email,
          });
          this.loading = false;
        }, 2000);
      } catch (error) {
        this.showAlert400 = true;
        setTimeout(() => {
          this.showAlert400 = false;
          this.loading = false;
        }, 2000);
        console.error(error.response);
        const { status } = error.response;
        if (status === 401) this.$router.push('/login');
      }
    },
    async inviteMembers() {
      await this.inviteMoreMembers();
      await this.getMembersJoined();
    },
    async inviteMoreMembers() {
      this.loading = true;
      try {
        await inviteMembers(this.token, this.workspace.id, this.selected);
        this.showAlert = true;
        setTimeout(() => {
          this.loading = false;
          this.showAlert = false;
          this.users = [];
          this.$emit('updateMember');
        }, 2000);
      } catch (error) {
        const { status, message } = error.response.data;
        if (status === 401) this.$router.push('/login');
        this.messages = message;
        this.showAlert400 = true;
        setTimeout(() => {
          this.loading = false;
          this.showAlert400 = false;
          this.users = [];
        }, 2000);
      }
    },
    async removeMembers(id) {
      await this.removeMemberWorkspace(id);
      await this.getMembersJoined();
    },
    async removeMemberWorkspace(id) {
      this.loading = true;
      try {
        await removeMemberWorkspace(this.token, this.workspace.id, id);
        setTimeout(() => {
          this.loading = false;
          this.$emit('updateMember');
        }, 2000);
      } catch (error) {
        console.error(error.response);
        const { status } = error.response.data;
        if (status === 401) this.$router.push('/login');
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    closeUserDetailModal() {
      this.openUserDetailModal = false;
    },
    openDetailModal(email) {
      this.openUserDetailModal = true;
      this.getMemberDetail(email);
    },
    async getMemberDetail(email) {
      try {
        const res = await getMember(this.token, email);
        const { data } = res.data;
        const { users } = data;

        this.user = {
          fullname: users[0].fullName,
          email: users[0].email,
          createdAt: users[0].createdAt,
        };
      } catch (error) {
        console.error(error.response);
        const { status } = error.response;
        if (status === 401) this.$router.push('/login');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-member-workspace {
  font-family: Poppins, sans-serif;
  height: 100%;
  &__title {
    padding: 3vh 4vh;
    .dialog-title {
      font-size: 22px;
      font-weight: 500;
    }
    .dialog-icon-block {
      .dialog-icon {
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
  }
  &__header {
    padding: 1vh 2rem;
    .header-name {
      color: #909398;
      font-weight: 500;
    }
    .dialog-button {
      padding: 1px 20px;
    }
  }
  &__search {
    padding: 1vh 4vh;
    .search-button {
      height: 40px;
      padding: 0px 20px;
    }
  }
  &__member {
    padding: 1vh 4vh;
    .member-name {
      cursor: pointer;
      color: #909398;
    }
    .member-action {
      font-weight: 500;
      padding: 3px 25px;
    }
  }
  &__unmember {
    padding: 0 4vh;
    .member-name {
      color: #909398;
    }
    .member-action {
      font-weight: 500;
      padding: 3px 25px;
    }
    .checkbox-member::v-deep label {
      font-size: 15px;
    }
  }
  @media screen and (max-width: 1368px) {
    &__title {
      padding: 2.5vh 3.5vh;
      .dialog-title {
        font-size: 20px;
      }
    }
    &__header {
      padding: 1vh 3.5vh;
      .header-name {
        font-size: 15px;
      }
      .dialog-button {
        font-size: 15px;
        padding: 1px 20px;
      }
    }
    &__search {
      padding: 1vh 3.5vh;
      .search-input::v-deep label,
      .search-input::v-deep input {
        font-size: 15px;
      }
      .search-button {
        font-size: 15px;
        padding: 1px 20px;
      }
    }
    &__member {
      padding: 1vh 3.5vh;
      .member-name {
        font-size: 15px;
      }
      .member-action {
        font-size: 15px;
        padding: 3px 25px;
      }
    }
    &__unmember {
      padding: 0 3.5vh;
      .member-name {
        font-size: 15px;
      }
      .member-action {
        font-size: 15px;
        padding: 3px 25px;
      }
      .checkbox-member::v-deep label {
        font-size: 15px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    &__title {
      padding: 2.5vh 3vh;
      .dialog-title {
        font-size: 18px;
      }
    }
    &__header {
      padding: 1vh 3vh;
      .dialog-button {
        font-size: 14px;
        padding: 1px 20px;
      }
    }
    &__search {
      padding: 1vh 3vh;
      .search-input::v-deep label,
      .search-input::v-deep input {
        font-size: 14px;
      }
      .search-button {
        font-size: 14px;
        padding: 1px 20px;
      }
    }
    &__member {
      .member-name {
        font-size: 14px;
      }
      .member-action {
        font-size: 14px;
        padding: 3px 25px;
      }
    }
    &__unmember {
      .member-name {
        font-size: 14px;
      }
      .member-action {
        font-size: 14px;
        padding: 3px 25px;
      }
      .checkbox-member::v-deep label {
        font-size: 14px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    &__title {
      padding: 2.5vh 3vh;
      .dialog-title {
        font-size: 16px;
      }
    }
    &__header {
      padding: 1vh 3vh;
      .dialog-button {
        font-size: 13px;
        padding: 1px 20px;
      }
    }
    &__search {
      padding: 1vh 3vh;
      .search-input::v-deep label,
      .search-input::v-deep input {
        font-size: 13px;
      }
      .search-button {
        margin-top: 7px;
        width: 100%;
        font-size: 13px;
        padding: 8px 20px;
      }
    }
    &__member {
      padding: 0 3vh;
      .member-name {
        font-size: 13px;
      }
      .member-action {
        font-size: 13px;
        padding: 3px 25px;
      }
    }
    &__unmember {
      padding: 0 3vh;
      .member-name {
        font-size: 13px;
      }
      .member-action {
        font-size: 13px;
        padding: 3px 25px;
      }
      .checkbox-member::v-deep label {
        font-size: 13px;
      }
    }
  }
}
</style>
