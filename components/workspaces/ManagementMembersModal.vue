<template>
  <v-list class="dialog-member-workspace">
    <div class="d-flex justify-space-between dialog-member-workspace__title">
      <div class="d-flex align-center">
        <div class="dialog-title">{{workspace.name}}</div>
        <button class="ml-4 dialog-button">Save</button>
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
}
</style>
