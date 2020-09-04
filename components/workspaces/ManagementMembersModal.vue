<template>
  <v-list class="dialog-member-workspace">
    <div class="d-flex justify-space-between dialog-member-workspace__title border-b">
      <div class="d-flex align-center flex-wrap">
        <div class="dialog-title mr-4">{{workspace.name}}</div>
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
      <button class="button-normal dialog-button font-weight-medium px-4">Send the invitations</button>
    </div>
    <div class="border-b">
      <transition-group name="fade" mode="in-out">
        <div
          v-for="item in joined"
          :key="item.id"
          class="d-flex justify-space-between dialog-member-workspace__member align-center"
        >
          <div class="member-name" @click.stop="openUserDetailModal = true">{{item.name}}</div>
          <button class="button-warning member-action" @click="removeFromList(item.id)">Remove</button>
        </div>
      </transition-group>
    </div>
    <transition-group name="fade" mode="in-out">
      <div
        v-for="item in unjoined"
        :key="item.id"
        class="d-flex justify-space-between dialog-member-workspace__unmember align-center"
      >
        <v-checkbox v-model="selected" class="checkbox-member" :label="item.name"></v-checkbox>
      </div>
    </transition-group>
    <v-dialog
      v-model="openUserDetailModal"
      :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <DetailUserModal @closeUserDetailModal="closeUserDetailModal" />
    </v-dialog>
  </v-list>
</template>

<script>
import DetailUserModal from '@/components/user/DetailUserModal';
export default {
  components: {
    DetailUserModal,
  },
  props: {
    workspace: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    openUserDetailModal: false,
    selected: [],
    joined: [
      {
        id: 1,
        name: 'tuanh',
      },
      {
        id: 2,
        name: 'anhtu',
      },
    ],
    users: [
      {
        id: 1,
        name: 'tuanh',
      },
      {
        id: 2,
        name: 'anhtu',
      },
      {
        id: 3,
        name: 'Lnacgh',
      },
      {
        id: 4,
        name: 'Pcbwiqug',
      },
    ],
  }),
  computed: {
    unjoined() {
      const names = [...this.joined].map((x) => x.name);
      return [...this.users].filter((x) => {
        if (!names.includes(x.name)) return x;
      });
    },
  },
  methods: {
    closeUserDetailModal() {
      this.openUserDetailModal = false;
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
    padding: 1vh 4vh;
    .header-name {
      color: #909398;
      font-weight: 500;
    }
    .dialog-button {
      padding: 1px 20px;
    }
  }
  &__member {
    margin: 2vh 0;
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
    &__member {
      margin: 2vh 0;
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
