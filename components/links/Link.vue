<template>
  <v-row class="link-detail mx-0">
    <v-col cols="10" md="8" class="mx-auto">
      <v-row class="align-center mx-0">
        <v-col cols="12" md="8">
          <div class="shortened-link">{{shortened}}</div>
          <div class="origin-link pt-2">{{link}}</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="d-flex justify-space-between">
            <div>{{clicks}} clicks</div>
            <div>{{date}}</div>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: '',
    },
    shortened: {
      type: String,
      default: '',
    },
    clicks: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.link-detail {
  .shortened-link {
    font-size: 20px;
    line-height: 28px;
    color: #212732;
    cursor: pointer;
    text-overflow: ellipsis;
    &:hover {
      color: #3c64b1;
    }
  }
  .origin-link {
    font-size: 15px;
    line-height: 24px;
    color: #595d66;
  }
}
</style>
