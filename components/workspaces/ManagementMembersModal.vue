<template>
  <v-list class="dialog-member-workspace">
    <div class="d-flex justify-space-between dialog-member-workspace__title">
      <div class="d-flex align-center flex-wrap">
        <div class="dialog-title mr-4">{{workspace.name}}</div>
        <button class="button-normal  dialog-button">Save</button>
      </div>
      <div class="d-flex justify-space-between dialog-icon-block">
        <div></div>
        <div class="dialog-icon pa-2" @click.stop="$emit('closeModalMembers')">
          <img src="@/assets/svg/close.svg" alt="close" />
        </div>
      </div>
    </div>
    <div v-for="item in members" :key="item.id" class="d-flex dialog-member-workspace__member">
      <v-checkbox v-model="selected" :label="`${item.name}`" :value="item.id"></v-checkbox>
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
    members: [
      {
        id: 1,
        name: 'tuanh',
      },
      {
        id: 2,
        name: 'anhtu',
      },
    ],
  }),
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
    padding: 0 4vh;
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
      padding: 0 3.5vh;
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
      padding: 0 3vh;
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
    }
  }
}
</style>
