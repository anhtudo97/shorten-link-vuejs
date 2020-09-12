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
import { handle } from '@/utils/promise';
export default {
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
      const [resWorkspace, workspaceError] = await handle(
        getWorkspaces(token, page)
      );
      if (workspaceError) throw new Error('Could not fetch workspace link');
      const { status, data } = resWorkspace.data;
      if (status === 200) {
        this.page += 1;
        const { workspaces, total } = data;
        this.total = total;
        if (workspaces.length) {
          this.workspaces.push(...workspaces);
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
