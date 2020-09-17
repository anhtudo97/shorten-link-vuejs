<template>
  <div class="notifications mt-5">
    <v-row class="notifications__management">
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <div class="mb-3 notifications-title ml-3 ml-sm-0">Notification</div>
        <transition-group name="slide" mode="out-in" tag="section" class="pa-0">
          <Notification
            v-for="noti in getNiotifitcations"
            :key="noti.id"
            :notification="noti"
            @answerInvitations="answerInvitations"
          />
        </transition-group>
        <v-row v-if="getNiotifitcations.length !== 0" justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="totalPage"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getInvitations, answerInvitations } from '@/services/api';
import Notification from '@/components/notification/notification';
export default {
  components: {
    Notification,
  },
  data: () => ({
    notifications: [],
    token: '',
    page: 1,
    totalPage: 1,
  }),
  computed: {
    getNiotifitcations() {
      return this.notifications;
    },
  },
  watch: {
    page(va) {
      this.getInvitations();
    },
  },
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },
  mounted() {
    this.getInvitations();
  },
  methods: {
    async getInvitations() {
      try {
        const res = await getInvitations(this.token, this.page);
        const { status, data } = res.data;
        if (status === 200) {
          this.notifications = data.invitations;
          this.totalPage = data.totalPage;
        }
      } catch (error) {
        console.error(error.response);
        const { status } = error.response;
        if (status === 401) this.$router.push('/login');
      }
    },
    async answerInvitationWorkspace(invitationId, status = 'ACCEPTED') {
      try {
        await answerInvitations(this.token, invitationId, status);
      } catch (error) {
        console.error(error.response);
        const { status } = error.response;
        if (status === 401) this.$router.push('/login');
      }
    },
    async answerInvitations(invitationId, status = 'ACCEPTED') {
      await this.answerInvitationWorkspace(invitationId, status);
      await this.getInvitations();
    },
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
