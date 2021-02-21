<template>
  <v-list class="dialog-detail-user">
    <div class="d-flex justify-space-between">
      <div></div>
      <div
        class="dialog-detail-user__dialog-icon pa-2"
        @click.stop="$emit('closeUserDetailModal')"
      >
        <img src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <div class="d-flex justify-space-between align-center mb-3">
      <div class="d-flex dialog-detail-user__name align-center">
        <img
          class="img"
          src="https://dashboard-cdn.rebrandly.com/support-images/new_default_avatar_team.png"
        />
        <div>
          <div class="dialog-name-text px-5">{{ user.fullName }}</div>
          <div class="dialog-email-text px-5">
            <button disabled class="date-text" aria-label="email">{{ user.email }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-16 mb-4 border-b">
      <div class="d-flex dialog-detail-user__info align-center mb-5">
        <img src="@/assets/svg/calendar.svg" alt="calendar" class="mr-3" />
        <div class="info-text">Accout is created at {{ createdDate }}</div>
      </div>
    </div>
  </v-list>
</template>

<script>
import { format } from 'date-fns';
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    createdDate() {
      return format(new Date(this.user.createdAt), 'MMMM dd, yyyy');
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-detail-user {
  font-family: Poppins, sans-serif;
  padding: 3vh 4vh;
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
  &__name {
    img {
      object-fit: cover;
      width: 60px;
      height: auto;
    }
    .dialog-name-text {
      font-size: 22px;
    }
    .dialog-email-text {
      .date-text {
        padding: 2px 4px;
        font-size: 10px;
        border-radius: 4px;
        background-color: #02af63;
        color: #fff;
      }
    }
  }
  &__info {
    cursor: pointer;
    img {
      object-fit: cover;
      width: 20px;
      height: auto;
    }
    .info-text {
      font-size: 15px;
      color: #595d66;
    }
    .info-link {
      color: #2281c2;
      &:hover {
        color: #2c96df;
      }
    }
  }
  @media screen and (max-width: 1368px) {
    &__name {
      img {
        width: 55px;
      }
      .dialog-name-text {
        font-size: 20px;
      }
      .dialog-email-text {
        .date-text {
          padding: 2px 4px;
          font-size: 10px;
          border-radius: 4px;
          background-color: #02af63;
          color: #fff;
        }
      }
    }
    &__info {
      img {
        width: 20px;
      }
      .info-text {
        font-size: 15px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    &__name {
      img {
        width: 50px;
      }
      .dialog-name-text {
        font-size: 18px;
      }
      .dialog-email-text {
        .date-text {
          font-size: 10px;
        }
      }
    }
    &__info {
      img {
        width: 18px;
      }
      .info-text {
        font-size: 14px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    &__name {
      img {
        width: 45px;
      }
      .dialog-name-text {
        font-size: 16px;
      }
      .dialog-email-text {
        .date-text {
          padding: 1px 4px;
          font-size: 8px;
        }
      }
    }
    &__info {
      img {
        width: 15px;
      }
      .info-text {
        font-size: 13px;
      }
    }
  }
}
</style>
