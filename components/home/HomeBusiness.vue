<template>
  <div class="business pt-10 mb-8 mx-0">
    <div class="business__title text-center">Grow your business with better Shortening</div>
    <div
      class="business__description text-center my-5"
    >We help the world’s leading organizations follow their shipping</div>
    <v-row class="mx-0">
      <v-col cols="12" md="8" class="mx-auto my-5">
        <v-row>
          <v-col
            v-for="option in options"
            :key="option.id"
            cols="12"
            md="4"
            class="text-center business__options"
          >
            <div>
              <img :src="require(`@/assets/svg/${option.sym}.svg`)" :alt="option.sym" />
            </div>
            <div class="options-title">{{option.title}}</div>
            <div class="options-description">{{option.description}}</div>
            <nuxt-link :to="option.route">
              <div class="discovery my-3">Discovery</div>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          id: 1,
          title: 'Links management',
          description:
            'At eripuit signiferumque sea, vel ad mucius molestie, cu labitur iuvaret vulputate sed.',
          sym: 'link',
          route: '/links',
        },
        {
          id: 2,
          title: 'Domains management',
          description:
            'At eripuit signiferumque sea, vel ad mucius molestie, cu labitur iuvaret vulputate sed.',
          sym: 'domain',
          route: '/domains',
        },
        {
          id: 3,
          title: 'Workspace management',
          description:
            'At eripuit signiferumque sea, vel ad mucius molestie, cu labitur iuvaret vulputate sed.',
          sym: 'workspace',
          route: '/workspaces',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.business {
  &__title {
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #373f41;
  }
  &__description {
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #737b7d;
  }
  &__options {
    padding: 20px;
    .options-title {
      margin: 12px 0;
      font-weight: bold;
      font-size: 24px;
      line-height: 30px;
      text-align: center;
      color: #373f41;
    }
    .options-description {
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      letter-spacing: 0.2px;
      color: #373f41;
    }
    .discovery {
      font-weight: bold;
      font-size: 24px;
      line-height: 36px;
      text-align: center;
      color: #2a5bd7;
    }
  }
  @media (max-width: 1366px) {
    &__title {
      font-size: 28px;
      line-height: 36px;
    }
    &__description {
      font-size: 14px;
      line-height: 20px;
    }
    &__options {
      padding: 20px;
      .options-title {
        margin: 6px 0;
        font-size: 22px;
        line-height: 28px;
      }
      .options-description {
        font-size: 13px;
        line-height: 20px;
      }
      .discovery {
        font-size: 22px;
        line-height: 34îpx;
      }
    }
  }
  @media (max-width: 960px) {
    &__title {
      font-size: 26px;
      line-height: 34px;
    }
    &__description {
      font-size: 13px;
      line-height: 18px;
    }
    &__options {
      padding: 20px;
      .options-title {
        font-size: 20px;
        line-height: 26px;
      }
      .options-description {
        font-size: 12px;
        line-height: 18px;
      }
      .discovery {
        font-size: 20px;
        line-height: 32px;
      }
    }
  }
  @media (max-width: 600px) {
    &__title {
      font-size: 24px;
      line-height: 32px;
    }
    &__description {
      font-size: 12px;
      line-height: 16px;
    }
    &__options {
      .discovery {
        font-size: 18px;
        line-height: 30px;
      }
    }
  }
}
</style>
