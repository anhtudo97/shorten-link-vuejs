<template>
  <v-list class="dialog-member-workspace">
    <div class="d-flex justify-space-between dialog-member-workspace__title border-b">
      <div class="d-flex align-center flex-wrap">
        <div class="dialog-title mr-4">{{ $route.query.name }}</div>
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
        aria-label="send"
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
        label="Enter email of user you want to invite"
        class="search-input mr-0 mr-sm-9"
        hide-details="auto"
        outlined
        dense
        @keyup.enter="searchMember"
      ></v-text-field>
      <button
        :disabled="loading"
        class="button-normal search-button font-weight-medium px-10"
        aria-label="search"
        @click.stop="searchMember"
      >Search</button>
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
    <v-snackbar v-model="showAlert" top color="success">
      {{ messages }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" aria-label="close" @click="showAlert = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="showAlertError" top color="error">
      {{ messages }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          aria-label="close"
          @click="showAlertError = false"
        >Close</v-btn>
      </template>
    </v-snackbar>
  </v-list>
</template>

<script>
import {
  getMember,
  inviteMembers,
} from '@/services/api';
import validations from '@/utils/validations';
export default {
  props: {
    workspace: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    ...validations,
    search: '',
    showAlert: false,
    showAlertError: false,
    loading: false,
    selected: [],
    token: '',
    page: 1,
    totalPage: 1,
    members: [],
    users: [],
    messages: '',
  }),
  computed: {
    unjoined() {
      return this.users;
    },
  },
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },
  methods: {
    isExistUsers(id) {
      let check = false;
      this.users.forEach((e) => {
        if (e.id === id) {
          check = true;
        } else {
          check = false;
        }
      });
      return check;
    },
    async searchMember() {
      this.loading = true;
      try {
        const res = await getMember(this.token, this.search);
        const { data } = res.data;
        const { users } = data;
        setTimeout(() => {
          if (!this.isExistUsers(users[0].id)) {
            this.users.push({
              id: users[0].id,
              name: users[0].fullName,
              email: users[0].email,
            });
          } else {
            this.messages = 'User is explored';
            this.showAlertError = true;
            setTimeout(() => {
              this.loading = false;
              this.showAlertError = false;
            }, 1500);
          }
          this.loading = false;
        }, 1000);
      } catch (error) {
        const { status, data } = error.response;
        if (status === 401) {
          this.$router.push('/login');
          return;
        }
        this.messages = data.message;
        this.showAlertError = true;
        setTimeout(() => {
          this.showAlertError = false;
          this.loading = false;
        }, 2000);
      }
    },
    async inviteMembers() {
      await this.inviteMoreMembers();
    },
    async inviteMoreMembers() {
      this.loading = true;
      try {
        const res = await inviteMembers(
          this.token,
          this.$route.params.id,
          this.selected
        );
        const { message } = res.data;
        this.messages = message;
        this.showAlert = true;
        setTimeout(() => {
          this.loading = false;
          this.showAlert = false;
          this.users = [];
          this.$emit('updateMember');
        }, 2000);
      } catch (error) {
        const { status, data } = error.response;
        const {message} = data
        if (status === 401) {
          this.$router.push('/login');
          return;
        }
        this.messages = message;
        this.showAlertError = true;
        setTimeout(() => {
          this.loading = false;
          this.showAlertError = false;
          this.users = [];
        }, 2000);
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
