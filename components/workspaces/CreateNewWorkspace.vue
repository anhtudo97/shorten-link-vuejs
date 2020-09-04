<template>
  <v-list class="dialog-create-workspace">
    <div
      class="dialog-create-workspace__header d-flex justify-space-between align-center py-3 border-b"
    >
      <div class="d-flex align-center">
        <div class="header-title mr-3">Create a new workspace</div>
      </div>
      <div class="d-flex justify-space-between">
        <div></div>
        <div class="header-dialog-icon pa-2" @click.stop="$emit('closeCreateNewWorkspace')">
          <img src="@/assets/svg/close.svg" alt="close" />
        </div>
      </div>
    </div>
    <div class="dialog-create-workspace__content">
      <v-row class="py-5 align-center">
        <v-col cols="12" sm="4" class="py-0 mb-4 mb-sm-0">
          <div class="label-text">Workspace name:</div>
        </v-col>
        <v-col cols="12" sm="8" class="py-0">
          <v-text-field
            class="text-field-name"
            outlined
            dense
            label="Workspace name"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="py-1 align-center my-3">
        <v-col cols="12" class="py-0 text-right">
          <button class="button-normal button-create">Create workspace</button>
        </v-col>
      </v-row>
    </div>
  </v-list>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.dialog-create-workspace {
  font-family: Poppins, sans-serif;
  height: 100%;
  &__header {
    padding: 1vh 4vh;
    .header-title {
      font-size: 22px;
      font-weight: 500;
    }

    .header-dialog-icon {
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
  &__content {
    padding: 1vh 4vh;
    .label-text {
      font-weight: 500;
      color: #909398;
    }
    .button-create {
      font-weight: 500;
      padding: 5px 5vh;
    }
  }

  @media screen and (max-width: 1368px) {
    &__header {
      .header-title {
        font-size: 20px;
      }
    }
    .button-create {
      font-size: 15px;
    }
    .label-text {
      font-size: 15px;
    }
    .text-field-name::v-deep label {
      font-size: 15px;
    }
    .text-field-name::v-deep input {
      font-size: 15px;
    }
  }
  @media screen and (max-width: 960px) {
    &__header {
      .header-title {
        font-size: 18px;
        font-weight: 500;
      }
    }
    .button-create {
      font-size: 14px;
    }
    .label-text {
      font-size: 14px;
    }
    .text-field-name::v-deep label {
      font-size: 14px;
    }
    .text-field-name::v-deep input {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 600px) {
    &__header {
      .header-title {
        font-size: 16px;
        font-weight: 500;
      }
    }
    .button-create {
      font-size: 13px;
    }
    .label-text {
      font-size: 13px;
    }
    .text-field-name::v-deep label {
      font-size: 13px;
    }
    .text-field-name::v-deep input {
      font-size: 13px;
       padding: 3px 5vh;
    }
  }
}
</style>
