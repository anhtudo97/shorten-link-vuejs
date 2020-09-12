<template>
  <div class="notifications mt-5">
    <v-row class="notifications__management">
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <div class="mb-3 notifications-title ml-3 ml-sm-0">Notification</div>
        <transition-group name="list" tag="section" class="pa-0">
          <Notification v-for="noti in notifications" :key="noti.id" :notification="noti" />
        </transition-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Notification from '@/components/notification/notification';
export default {
  components: {
    Notification,
  },
  computed: {
    ...mapGetters({ notifications: 'notifications/getNotifications' }),
  },
};
</script>

<style lang="scss" scoped>
.notifications {
  font-family: Poppins, sans-serif;
  .notifications-title {
    font-weight: 500;
    font-size: 14px;
    color: #909398;
  }
  @media screen and (max-width: 1368px) {
    .notifications-title {
      font-size: 13px;
    }
  }
  @media screen and (max-width: 960px) {
    .notifications-title {
      font-size: 12px;
    }
  }
}
</style>
