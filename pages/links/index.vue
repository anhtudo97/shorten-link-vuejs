<template>
  <div>
    <Link :links="links" :total="total" />
    <client-only>
      <infinite-loading spinner="spiral" @infinite="infiniteScroll"></infinite-loading>
    </client-only>
  </div>
</template>

<script>
import Link from '@/components/links/Links';
import { getLinks } from '@/services/api';
import { handle } from '@/utils/promise';
export default {
  layout: 'link',
  components: {
    Link,
  },
  data: () => ({
    links: [],
    page: 1,
    token: '',
    total: 0,
  }),
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },

  methods: {
    async infiniteScroll($state) {
      const { token, page } = this;
      const [resLink, linkError] = await handle(getLinks(token, page));
      if (linkError) throw new Error('Could not fetch workspace link');

      const { status, data } = resLink.data;
      if (status === 200) {
        this.page += 1;
        const { links, total } = data;
        this.total = total;
        if (links.length) {
          this.links.push(...links);
          $state.loaded();
        } else {
          $state.complete();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
