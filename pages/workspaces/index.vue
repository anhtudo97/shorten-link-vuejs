<template>
  <div>
    <Workspaces :workspaces="workspaces" />
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
  layout: 'link',
  components: {
    Workspaces,
  },
  data: () => ({
    workspaces: [],
    page: 1,
    token: '',
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
          const { workspaces } = res.data.data;
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
