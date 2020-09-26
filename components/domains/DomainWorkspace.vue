<template>
  <v-row class="domain-detail mb-5 mb-md-0">
    <v-col cols="12" sm="10" md="8" class="mx-auto" @click.stop="models.isOpen = true">
      <v-row class="align-center border-radius-10 mx-0 py-3">
        <v-col cols="12" sm="8" md="8" lg="9">
          <div class="d-flex justify-space-between">
            <div class="domain text-overflow-hidden">{{ domain.name }}</div>
            <div
              :class="[domain.dnsVerified?'text-green': 'text-gray']"
              class="domain text-overflow-hidden"
            >{{ domain.dnsVerified ? 'Verified': 'Unverified' }}</div>
          </div>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="3" class="text-left text-sm-right relative">
          <div class="added text-overflow-hidden absolute">{{ date }}</div>
          <button
            :disabled="loading"
            class="button-warning btn-remove absolute"
            @click="removeFromList"
          >Remove</button>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { format } from 'date-fns';
import { removeDomainWorkspace } from '@/services/api';
export default {
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
    loading: false,
    token: '',
  }),
  computed: {
    date() {
      return format(new Date(this.domain.createdAt), 'MMMM dd, yyyy');
    },
  },
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      if (process.client) {
        this.width = window.innerWidth;
      }
    },
    async removeFromList() {
      this.loading = true;
      try {
        const res = await removeDomainWorkspace(
          this.token,
          this.$route.params.id,
          this.domain.id
        );

        const { status } = res.data;
        if (status === 200) {
          this.showAlert400 = true;
          setTimeout(() => {
            this.domainSelected = [];
            this.$emit('updateDomains');
            this.loading = false;
            this.showAlert400 = false;
          }, 300);
        }
      } catch (error) {
        const { status } = error.response;
        if (status === 401) {
          this.$router.push('/login');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.domain-detail {
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
  .text-gray {
    color: rgba(0, 0, 0, 0.3);
  }
  .text-green {
    color: #02af63;
  }
  .btn-remove {
    opacity: 0;
    padding: 5px 40px;
    transition: 0.3s all ease-in-out;
  }
  .added {
    opacity: 1;
    transition: 0.3s all ease-in-out;
  }
  .text-left {
    position: relative;
    .btn-remove {
      position: absolute;
      top: 15%;
      left: 40%;
    }
  }
  &:hover {
    .btn-remove {
      opacity: 1;
    }
    .added {
      opacity: 0;
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
    .text-left {
      .btn-remove {
        left: 30%;
      }
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
    .text-left {
      .btn-remove {
        left: 20%;
      }
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
    .text-left {
      .btn-remove {
        left: 10%;
      }
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
