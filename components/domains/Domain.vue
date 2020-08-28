<template>
  <v-row class="domain-detail mx-0">
    <v-col cols="12" sm="10" md="8" class="mx-auto px-0">
      <v-row class="align-center mx-0">
        <v-col cols="12" sm="8" md="9" lg="10" @click.stop="models.isOpen = true">
          <div class="domain">{{domain}}</div>
        </v-col>
        <v-col cols="12" sm="4" md="3" lg="2">
          <div class="added">{{date}}</div>
        </v-col>
      </v-row>
    </v-col>
    <v-dialog v-model="models.isOpen" class="dialog" max-width="900">
      <DetailDomainModal @closeModalDetailLink="closeModalDetailDomain" />
    </v-dialog>
  </v-row>
</template>

<script>
import { format } from 'date-fns';
import DetailDomainModal from '@/components/domains/DetailDomainModal';
export default {
  data: () => ({
    models: {
      isOpen: false,
    },
  }),
  components: {
    DetailDomainModal,
  },
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
      return format(new Date(this.added), 'MMMM dd, yyyy');
    },
  },
  methods: {
    closeModalDetailDomain() {
      this.models.isOpen = false;
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
.dialog {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
