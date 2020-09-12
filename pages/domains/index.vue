<template>
  <div>
    <Domains :domains="domains" :total="total" />
    <client-only>
      <infinite-loading spinner="spiral" @infinite="infiniteScroll"></infinite-loading>
    </client-only>
  </div>
</template>

<script>
import { getDomains } from '@/services/api';
import Domains from '@/components/domains/Domains';
import { handle } from '@/utils/promise';
export default {
  layout: 'link',
  components: {
    Domains,
  },
  data: () => ({
    domains: [],
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
      const [resDomain, domainError] = await handle(getDomains(token, page));
      if (domainError) throw new Error('Could not fetch workspace link');

      const { status, data } = resDomain.data;
      if (status === 200) {
        this.page += 1;
        const { domains, total } = data;
        this.total = total;
        if (domains.length) {
          this.domains.push(...domains);
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
