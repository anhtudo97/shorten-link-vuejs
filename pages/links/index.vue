<template>
  <div>
    <Link :links="links" :total="total" />
    <client-only>
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteScroll"
      ></infinite-loading>
    </client-only>
  </div>
</template>

<script>
import Link from '@/components/links/Links';
import { getLinks } from '@/services/api';

export default {
  name: 'Links',
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
      try {
        const res = await getLinks(token, page);
        const { status } = res.data;
        if (status === 200) {
          this.page += 1;
          const { links, total } = res.data.data;
          this.total = total;
          if (links.length) {
            this.links.push(...links);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
