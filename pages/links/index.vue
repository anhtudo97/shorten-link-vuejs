<template>
  <div>
    <div>
      <Link />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Link from '@/components/links/Links';
import { getLinks } from '@/services/api';

export default {
  layout: 'link',
  components: {
    Link,
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
  data: () => ({
    links: [],
  }),
  computed: {
    ...mapGetters({ user: 'getUser' }),
  },
  methods: {
    onCancel() {
      console.log('User cancelled the loader.');
    },
  },
};
</script>

<style lang="scss" scoped></style>
