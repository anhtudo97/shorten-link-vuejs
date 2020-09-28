<template>
  <transition name="fade" mode="out-in">
    <v-row class="shortened justify-space-between align-center mx-0 mb-3">
      <v-col cols="12" md="7" lg="6" class="shortened__shortened-link">
        <div class="link-text text-overflow-hidden">
          {{ data.destination }}
        </div>
      </v-col>
      <v-col cols="12" md="5" lg="6" class="shortened__shortened-service">
        <div class="d-flex flex-wrap justify-space-between">
          <div class="shortened-link align-self-center">
            <a :href="data.shortUrl">{{ data.shortUrl }}</a>
          </div>
          <div v-clipboard="data.shortUrl" class="shortened-button">
            <div class="shortened-text">Copy</div>
          </div>
        </div>
      </v-col>
    </v-row>
  </transition>
</template>

<script>
import { clipboard } from 'vue-clipboards';
export default {
  directives: { clipboard },
  props: {
    data: {
      type: Object,
      default() {
        return {
          destination: '',
          shortUrl: '',
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.shortened {
  background-color: #fff;
  border-radius: 10px;
  padding: 5px 15px;
  &__shortened-link {
    font-size: 18px;
    line-height: 24px;
  }
  &__shortened-service {
    align-items: center;
    .shortened-link {
      color: #3c64b1;
      font-size: 18px;
      line-height: 24px;
    }
    .shortened-button {
      cursor: pointer;
      background-color: #cedafa;
      padding: 5px 20px;
      border-radius: 10px;
    }
  }
  @media (max-width: 1366px) {
    &__shortened-link {
      font-size: 14px;
      line-height: 20px;
    }
    &__shortened-service {
      align-items: center;
      .shortened-link {
        font-size: 14px;
        line-height: 20px;
      }
      .shortened-button {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
  @media (max-width: 960px) {
    &__shortened-link {
      font-size: 12px;
      line-height: 18px;
    }
    &__shortened-service {
      .shortened-link {
        font-size: 12px;
        line-height: 18px;
      }
      .shortened-button {
        font-size: 12px;
        line-height: 18px;
      }
    }
  }
  @media (max-width: 600px) {
    padding: 10px 0;
    &__shortened-link {
      font-size: 10px;
      line-height: 16px;
    }
    &__shortened-service {
      .shortened-link {
        font-size: 10px;
        line-height: 16px;
      }
      .shortened-button {
        font-size: 10px;
        line-height: 16px;
      }
    }
  }
}
</style>
