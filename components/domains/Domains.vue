<template>
  <div class="domain">
    <v-row class="domain__menu mx-0">
      <v-col cols="11" md="8" class="mx-auto py-0 py-md-3">
        <v-row class="align-center">
          <v-col cols="6" sm="8" lg="10">
            <div class="d-flex align-center">
              <div class="domain-count pr-4">{{domains.length}} Links</div>
            </div>
          </v-col>
          <v-col cols="6" sm="4" lg="2">
            <div class="add-new-domain">
              <div class="new-domain">New domain</div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="domain__diviner"></div>
    <v-row class="domain__sub-menu mx-0">
      <v-col cols="10" md="8" class="mx-auto py-0">
        <v-row class="align-center">
          <v-col cols="7" sm="9" lg="10">
            <div class="domains pr-4">Domain</div>
          </v-col>
          <v-col cols="5" sm="3" lg="2">
            <div class="added">Added</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="domain__diviner hidden-on-below-960"></div>
    <div class="domain__management">
      <ul class="pa-0">
        <li v-for="domain in tempDomains" :key="domain.id">
          <Domain :domain="domain.domain" :added="domain.createdAt" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Domain from '@/components/domains/Domain';

export default {
  components: {
    Domain,
  },
  computed: {
    ...mapGetters({
      domains: 'domains/getDomains',
    }),
    tempDomains() {
      return [...this.domains].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.domain {
  font-family: Poppins, sans-serif;
  &__menu {
    .domain-count {
      font-size: 18px;
      line-height: 24px;
      letter-spacing: 0.2px;
    }
    .add-new-domain {
      cursor: pointer;
      background-color: #3c64b1;
      border: 0.5px solid #dddddd;
      box-sizing: border-box;
      border-radius: 10px;
      text-align: center;
      color: #fff;
      font-weight: 600;
      padding: 5px 0;
      .new-domain {
        font-size: 18px;
        line-height: 24px;
      }
    }
    @media (max-width: 1366px) {
      .domain-count {
        font-size: 17px;
        line-height: 22px;
      }
      .add-new-domain {
        padding: 4px 0;
        .new-domain {
          font-size: 17px;
          line-height: 22px;
        }
      }
    }
    @media (max-width: 960px) {
      .domain-count {
        font-size: 16px;
        line-height: 20px;
      }
      .add-new-domain {
        padding: 3px 0;
        .new-domain {
          font-size: 16px;
          line-height: 20px;
        }
      }
    }
    @media (max-width: 600px) {
      .domain-count {
        font-size: 14px;
        line-height: 18px;
      }

      .add-new-domain {
        .new-domain {
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
  &__sub-menu {
    .domains,
    .added {
      font-weight: 500;
      font-size: 12px;
    }
    @media (max-width: 960px) {
      display: none;
    }
  }
  &__diviner {
    width: 100%;
    height: 1px;
    background-color: #c4c4c4;
  }
  &__management {
    ul {
      list-style: none;
    }
    li:nth-child(even) {
      background: #f9f9fa;
    }
    li {
      &:hover {
        background-color: #eaf6ff;
      }
    }
  }
  .hidden-on-below-960 {
    @media (max-width: 960px) {
      display: none;
    }
  }
}
</style>
