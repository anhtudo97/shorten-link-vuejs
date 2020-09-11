<template>
  <div>
    <div>
      <Link />
    </div>
  </div>
</template>

<script>
import Link from '@/components/links/Links';
// import { getLinks } from '@/services/api';

export default {
  layout: 'link',
  components: {
    Link,
  },
  data: () => ({
    links: [],
  }),
  methods: {},
};
</script>

<style lang="scss" scoped></style>
