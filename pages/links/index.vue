<template>
  <div>
    <Link />
  </div>
</template>

<script>
import Link from '@/components/links/Links';
// import { getLinks } from '@/services/api';

export default {
  name: 'Links',
  layout: 'link',
  components: {
    Link,
  },
  data: () => ({
    links: [],
  }),
};
</script>

<style lang="scss" scoped></style>
