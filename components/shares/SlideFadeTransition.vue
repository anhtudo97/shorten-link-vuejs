<template>
  <transition name="slide-fade" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </transition>
</template>
<script>
export default {
  inheritAttrs: false,
};
</script>
