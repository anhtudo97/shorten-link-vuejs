<template>
  <v-row class="domain-detail mx-0">
    <v-col cols="12" sm="10" md="8" class="mx-auto px-0">
      <v-row class="align-center mx-0">
        <v-col cols="12" sm="8" md="9" lg="10">
          <div class="domain">{{domain}}</div>
        </v-col>
        <v-col cols="12" sm="4" md="3" lg="2">
          <div class="added">{{date}}</div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { format } from 'date-fns';
export default {
  props: {
    domain: {
      type: String,
      default: '',
    },
    added: {
      type: String,
      default: '',
    },
  },
  computed: {
    date() {
      return format(new Date(this.added), 'MMMM dd, yyyy')
    },
  },
};
</script>

<style lang="scss" scoped>
.domain-detail {
  .domain {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #212732;
    cursor: pointer;
    text-overflow: ellipsis;
    &:hover {
      color: #3c64b1;
    }
  }
  @media (max-width: 1366px) {
    .domain {
      font-size: 18px;
      line-height: 26px;
    }
    .added {
      font-size: 15px;
    }
  }
  @media (max-width: 960px) {
    .domain {
      font-size: 16px;
      line-height: 24px;
    }
    .added {
      font-size: 14px;
    }
  }
  @media (max-width: 600px) {
    .domain {
      font-size: 14px;
      line-height: 22px;
    }
    .added {
      font-size: 12px;
    }
  }
}
</style>
