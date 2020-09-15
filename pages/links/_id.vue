<template>
  <div>
    <Link />
  </div>
</template>

<script>
import Link from '@/components/workspaces/LinksWorkspace';
export default {
  name: 'WorkspacesLinks',
  layout: 'link',
  components: {
    Link,
  },
  mounted() {
    console.log(this.$route.params.id);
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
