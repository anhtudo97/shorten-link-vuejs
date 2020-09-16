<template>
  <v-list class="modal-detail-domain">
    <div class="d-flex justify-space-between">
      <div></div>
      <div
        class="modal-detail-domain__dialog-icon pa-2"
        @click.stop="$emit('closeModalDetailDomain')"
      >
        <img src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <div class="modal-detail-domain__domain">
      <div class="domain-url text-overflow-hidden">{{ domainURL }}</div>
      <div class="domain-created-at d-flex my-5 align-center">
        <img src="@/assets/svg/calendar.svg" alt="calendar" />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="date pl-3" v-bind="attrs" v-on="on">
              {{ date }}
            </div>
          </template>
          <span>Added on</span>
        </v-tooltip>
      </div>
    </div>
    </div>
    <v-row class="modal-detail-domain__services align-center my-6">
      <v-col cols="12" sm="3">
        <div class="services-title">Workspace(s)</div>
      </v-col>
      <v-col cols="12" sm="9">
        <div class="d-flex">
          <div v-for="(w, i) in works" :key="i" class="services-name d-flex">
            {{ w }}
            <div v-if="i < works.length - 1">,</div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <hr class="modal-detail-domain__underline" />
      </v-col>
    </v-row>
    <v-row class="modal-detail-domain__services align-center my-0 my-sm-5">
      <v-col cols="12" sm="3">
        <div class="services-title">Remove</div>
      </v-col>
      <v-col cols="12" sm="9">
        <button
          class="button-warning services-button"
          @click.stop="isRemoveModal = true"
        >
          <div class="button-text">Remove this domain</div>
        </button>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <hr class="modal-detail-domain__underline" />
      </v-col>
    </v-row>
    <v-dialog v-model="isRemoveModal" persistent width="500">
      <RemoveModal
        name="domain"
        @removeElement="removeDomain"
        @closeRemoveModal="closeRemoveModal"
      />
    </v-dialog>
    <SnackbarSuccess
      message="Delete domains is successfully"
      :show-alert="showAlert"
      @closeSnackbar="showAlert = false"
    />
  </v-list>
</template>

<script>
import { format, parseISO } from 'date-fns';
import { getDomain, deleteDomain } from '@/services/api';
import SnackbarSuccess from '@/components/shares/SnackbarSuccess';
export default {
  components:{
    SnackbarSuccess
  },
  props: {
    domain: {
      type: Object,
      default: () => {},
    },
  },
  async fetch() {
    try {
      const res = await getDomain(this.token, this.domain.id);
      const { status } = res.data;
      if (status === 200) {
        const { name, createdAt, workspaces } = res.data.data;
        this.domainURL = name;
        this.date = format(parseISO(createdAt), 'MMM dd, yyyy');
        this.works = [...workspaces].map((x) => {
          return x.name;
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  data: () => ({
    isRemoveModal: false,
    domainURL: '',
    date: '',
    works: [],
    token: '',
    showAlert: false,
    loading: false,
  }),
  created() {
   if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },
  methods: {
    reload() {
      window.location.reload();
    },
    async removeDomain() {
      this.loading = true;
      try {
        const res = await deleteDomain(this.token, this.domain.id);
        const { status } = res.data;
        if (status === 200) {
          this.showAlert = true;
          setTimeout(() => {
            this.closeRemoveModal();
            this.showAlert = false;
            this.loading = false;
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    },
    closeRemoveModal() {
      this.isRemoveModal = false;
      this.$emit('closeModalDetailDomain')
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-detail-domain {
  font-family: Poppins, sans-serif;
  height: 100%;
  padding: 2vh 4vh 4vh 4vh;
  &__dialog-icon {
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
  &__domain {
    .domain-url {
      font-size: 24px;
      line-height: 28px;
    }
    .domain-created-at {
      img {
        object-fit: cover;
        width: 18px;
        height: auto;
        padding-bottom: 5px;
      }
      .date {
        font-size: 13px;
        color: #595d66;
      }
    }
  }
  &__services {
    .services-title {
      color: #909398;
    }
    .services-button {
      padding: 1vh 4vh;
      font-weight: 500;
    }
  }
  &__underline {
    border-color: #e8e9ea;
    border-width: 1px;
    border-style: solid;
  }
  @media (max-width: 1368px) {
    &__domain {
      .domain-url {
        font-size: 23px;
        line-height: 26px;
      }
      .domain-created-at {
        img {
          width: 18px;
          padding-bottom: 5px;
        }
        .date {
          font-size: 12px;
          color: #595d66;
        }
      }
    }
    &__services {
      .services-title,
      .services-name {
        font-size: 15px;
      }
      .services-button {
        padding: 1vh 4vh;
        .button-text {
          font-size: 15px;
        }
      }
    }
  }
  @media (max-width: 960px) {
    &__domain {
      .domain-url {
        font-size: 22px;
        line-height: 26px;
      }
      .domain-created-at {
        img {
          width: 18px;
          padding-bottom: 5px;
        }
        .date {
          font-size: 11px;
          color: #595d66;
        }
      }
    }
    &__services {
      .services-title,
      .services-name {
        font-size: 14px;
      }
      .services-button {
        padding: 1vh 4vh;
        .button-text {
          font-size: 14px;
        }
      }
    }
  }
  @media (max-width: 600px) {
    &__domain {
      .domain-url {
        font-size: 20px;
        line-height: 24px;
      }
      .domain-created-at {
        img {
          width: 18px;
          padding-bottom: 5px;
        }
        .date {
          font-size: 10px;
          color: #595d66;
        }
      }
    }
    &__services {
      .services-title,
      .services-name {
        font-size: 12px;
      }
      .services-button {
        padding: 1vh 4vh;
        .button-text {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
