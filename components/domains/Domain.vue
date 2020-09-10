<template>
  <v-row class="domain-detail mt-5 mt-md-0 mx-3">
    <v-col
      cols="12"
      sm="10"
      md="8"
      class="mx-auto px-0 py-0 py-sm-3 border-radius-10"
      @click.stop="models.isOpen = true"
    >
      <v-row class="align-center mx-0">
        <v-col cols="12" sm="8" md="8" lg="9">
          <div class="domain text-overflow-hidden">{{ domain.name }}</div>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="3" class="text-left text-sm-right">
          <div class="added text-overflow-hidden">{{ date }}</div>
        </v-col>
      </v-row>
    </v-col>
    <v-dialog
      v-model="models.isOpen"
      class="dialog"
      max-width="900"
      :fullscreen="width < 600 ? true : false"
    >
      <DetailDomainModal
        :domain="domain"
        @closeModalDetailDomain="closeModalDetailDomain"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import { format } from 'date-fns';
import DetailDomainModal from '@/components/domains/DetailDomainModal';
export default {
  components: {
    DetailDomainModal,
  },
  props: {
    domain: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    models: {
      isOpen: false,
    },
    width: 0,
  }),
  computed: {
    date() {
      return format(new Date(this.domain.createdAt), 'MMMM dd, yyyy');
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    closeModalDetailDomain() {
      this.models.isOpen = false;
    },
    handleResize() {
      if (process.client) {
        this.width = window.innerWidth;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.domain-detail {
  margin-bottom: 20px;
  cursor: pointer;
  .border-radius-10 {
    border: 1px solid #e8e9ea;
    border-radius: 10px;
    transition: box-shadow 0.3s ease-in-out;
    &:hover {
      background-color: #eaf6ff;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
  }
  .domain {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #212732;
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
