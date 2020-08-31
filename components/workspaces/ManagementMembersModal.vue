<template>
  <v-list class="dialog-member-workspace">
    <div class="d-flex justify-space-between dialog-member-workspace__title">
      <div class="d-flex align-center flex-wrap">
        <div class="dialog-title mr-4">{{workspace.name}}</div>
        <button class="button-normal dialog-button">Save</button>
      </div>
      <div class="d-flex justify-space-between dialog-icon-block">
        <div></div>
        <div class="dialog-icon pa-2" @click.stop="$emit('closeModalMembers')">
          <img src="@/assets/svg/close.svg" alt="close" />
        </div>
      </div>
    </div>
    <div
      v-for="item in members_joined"
      :key="item.id"
      class="d-flex justify-space-between dialog-member-workspace__member align-center"
    >
      <div class="member-name">{{item.name}}</div>
      <button class="button-warning member-action">Remove</button>
    </div>
    <div
      v-for="item in unjoined"
      :key="item.id"
      class="d-flex justify-space-between dialog-member-workspace__member align-center"
    >
      <div class="member-name">{{item.name}}</div>
      <button class="button-normal member-action">Add New</button>
    </div>
  </v-list>
</template>

<script>
export default {
  props: {
    workspace: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    selected: [1],
    members_joined: [
      {
        id: 1,
        name: 'tuanh',
      },
      {
        id: 2,
        name: 'anhtu',
      },
    ],
    members_unjoined: [
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
      const names = [...this.members_joined].map((x) => x.name);
      return this.members_unjoined.filter((x) => {
        if (!names.includes(x.name)) return x;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-member-workspace {
  font-family: Poppins, sans-serif;
  &__title {
    border-bottom: 1px solid #e8e9ea;
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
    .dialog-button {
      padding: 1px 20px;
    }
  }
  &__member {
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
  @media screen and (max-width: 1368px) {
    &__title {
      padding: 2.5vh 3.5vh;
      .dialog-title {
        font-size: 20px;
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
        color: #909398;
      }
      .member-action {
        font-size: 15px;
        padding: 3px 25px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    &__title {
      padding: 2.5vh 3vh;
      .dialog-title {
        font-size: 18px;
      }
      .dialog-button {
        font-size: 14px;
        padding: 1px 20px;
      }
    }
    &__member {
      .member-name {
        font-size: 14px;
        color: #909398;
      }
      .member-action {
        font-size: 14px;
        padding: 3px 25px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    &__title {
      padding: 2.5vh 3vh;
      .dialog-title {
        font-size: 16px;
      }
      .dialog-button {
        font-size: 12px;
        padding: 1px 20px;
      }
    }
    &__member {
      padding: 0 3vh;
      .member-name {
        font-size: 13px;
        color: #909398;
      }
      .member-action {
        font-size: 13px;
        padding: 3px 25px;
      }
    }
  }
}
</style>
