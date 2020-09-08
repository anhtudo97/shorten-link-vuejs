<template>
  <div>
    <div v-if="$fetchState.pending">
      <loading
        :active.sync="$fetchState.pending"
        :can-cancel="true"
        :on-cancel="onCancel"
        :is-full-page="true"
      ></loading>
    </div>
    <div v-else>
      <Link />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loading from 'vue-loading-overlay';
import Link from '@/components/links/Links';
import { getLinks } from '@/services/api';
// Import component
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  layout: 'link',
  components: {
    Link,
    Loading,
  },
  data: () => ({
    links: [],
  }),
  computed: {
    ...mapGetters({ user: 'getUser' }),
  },
  async fetch() {
    let res = null;
    try {
      res = await getLinks(this.user.token);
      const { status, data } = res.data;
      if (status === 200) {
        const { links } = data;
        this.links = links;
      }

    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    onCancel() {
      console.log('User cancelled the loader.');
    },
  },
};
</script>

<style lang="scss" scoped></style>
