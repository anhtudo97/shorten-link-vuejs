<template>
  <div>
    <Domains :domains="domains" />
    <infinite-loading
      spinner="spiral"
      @infinite="infiniteScroll"
    ></infinite-loading>
  </div>
</template>

<script>
import { getDomains } from '@/services/api';
import Domains from '@/components/domains/Domains';
export default {
  layout: 'link',
  components: {
    Domains,
  },
  data: () => ({
    domains: [],
    page: 1,
    token: '',
  }),
  created() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
  },
  methods: {
    async infiniteScroll($state) {
      const { token, page } = this;
      try {
        const res = await getDomains(token, page);
        const { status } = res.data;
        if (status === 200) {
          this.page += 1;
          const { domains } = res.data.data;
          if (domains.length) {
            this.domains.push(...domains);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
