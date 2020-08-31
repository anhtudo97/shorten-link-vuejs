<template>
  <v-list class="dialog-create-workspace">
    <div
      class="dialog-create-workspace__header d-flex justify-space-between align-center px-4 py-3"
    >
      <div class="header-title">Create a new workspace</div>
      <div class="d-flex justify-space-between">
        <div></div>
        <div class="header-dialog-icon pa-2" @click.stop="$emit('closeCreateNewWorkspace')">
          <img src="@/assets/svg/close.svg" alt="close" />
        </div>
      </div>
    </div>
    <div class="py-3">

    </div>
    <v-card flat>
      <v-tabs v-model="tabs" fixed-tabs>
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#links" class="primary--text">Add Links</v-tab>
        <v-tab href="#members" class="primary--text">Add Members</v-tab>
        <v-tab href="#domains" class="primary--text">Add Domains</v-tab>
      </v-tabs>
    </v-card>
    <v-tabs-items v-model="tabs" class="px-10">
      <v-tab-item value="links">
        <v-list>
          <v-checkbox
            v-for="link in links"
            :key="link.id"
            v-model="linkSelected"
            :label="link.link"
            :value="link.link"
          ></v-checkbox>
        </v-list>
      </v-tab-item>
      <v-tab-item value="members">
        <v-checkbox
          v-for="user in users"
          :key="user.id"
          v-model="userSelected"
          :label="user.name"
          :value="user.name"
        ></v-checkbox>
      </v-tab-item>
    </v-tabs-items>
    <v-tab-item value="domains">
      <v-checkbox
        v-for="domain in domains"
        :key="domain.id"
        v-model="domainSelected"
        :label="domain.domain"
        :value="domain.domain"
      ></v-checkbox>
    </v-tab-item>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    tabs: null,
    linkSelected: [],
    domainSelected: [],
    userSelected: [],
    users: [
      {
        id: 1,
        name: 'tuanh',
      },
    ],
  }),
  computed: {
    ...mapGetters({
      links: 'links/getLinks',
      domains: 'domains/getDomains',
    }),
  },
};
</script>

<style lang="scss" scoped>
.dialog-create-workspace {
  font-family: Poppins, sans-serif;
  &__header {
    border-bottom: 0.5px solid #e8e9ea;
    .header-title {
      font-size: 20px;
      font-weight: 500;
    }
    .header-dialog-icon {
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
  }
}
</style>
