<template>
  <div>
    <Workspaces :workspaces="workspaces" :total="total" />
    <client-only>
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteScroll"
      ></infinite-loading>
    </client-only>
  </div>
</template>

<script>
import { getWorkspaces } from '@/services/api';
import Workspaces from '@/components/workspaces/Workspaces';
export default {
  name: 'Workspaces',
  layout: 'link',
  components: {
    Workspaces,
  },
  data: () => ({
    workspaces: [],
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
        const res = await getWorkspaces(token, page);
        const { status } = res.data;
        if (status === 200) {
          this.page += 1;
          const { workspaces, total } = res.data.data;
          this.total = total;
          if (workspaces.length) {
            this.workspaces.push(...workspaces);
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
