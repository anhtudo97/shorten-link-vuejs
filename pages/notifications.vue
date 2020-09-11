<template>
  <div>
    <Notification />
  </div>
</template>

<script>
import Notification from '@/components/notification/notifications';
export default {
  name: 'Notification',
  layout: 'link',
  components: {
    Notification,
  },
};
</script>
