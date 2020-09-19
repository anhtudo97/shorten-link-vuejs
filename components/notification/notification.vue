<template>
  <div class="notification">
    <v-row
      class="border-radius-10 py-4 mx-3 mx-sm-0 px-4 align-center justify-space-between mb-5"
    >
      <div class="notification__name">{{ notification.workspace.name }}</div>
      <div class="notification__actions d-flex">
        <button
          class="button-normal btn-accept mr-4"
          aria-label="Accept"
          @click="answerInvitations('ACCEPTED')"
        >
          Accept
        </button>
        <button
          class="button-warning btn-decline"
          aria-label="decline"
          @click="answerInvitations('DENIED')"
        >
          Decline
        </button>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    answerInvitations(status) {
      this.$emit('answerInvitations', this.notification.id, status);
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  .border-radius-10 {
    border: 1px solid #e8e9ea;
    border-radius: 5px;
    transition: box-shadow 0.3s ease-in-out;
    &:hover {
      background-color: #eaf6ff;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
  }
  &__name {
    font-size: 20px;
    font-weight: 500;
  }
  &__actions {
    .btn-accept {
      font-weight: 500;
      padding: 3px 25px;
    }
    .btn-decline {
      font-weight: 500;
      padding: 3px 30px;
    }
  }
  @media screen and (max-width: 1368px) {
    &__name {
      font-size: 18px;
    }
    &__actions {
      .btn-accept {
        font-size: 15px;
        padding: 3px 25px;
      }
      .btn-decline {
        font-size: 15px;
        padding: 3px 30px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    &__name {
      font-size: 16px;
    }
    &__actions {
      .btn-accept {
        font-size: 14px;
        padding: 2px 22px;
      }
      .btn-decline {
        font-size: 14px;
        padding: 2px 27px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    &__name {
      font-size: 14px;
    }
    &__actions {
      .btn-accept {
        font-size: 13px;
        padding: 2px 22px;
      }
      .btn-decline {
        font-size: 13px;
        padding: 2px 27px;
      }
    }
  }
}
</style>
