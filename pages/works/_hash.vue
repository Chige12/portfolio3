<template lang="pug">
  .work-detail
    .work-detail-relative
      .work-detail-wrapper aaa
        nuxt-link(to="/") index
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  transition: {
    name: 'detail',
    mode: 'in-out'
  }
})
</script>
<style lang="scss" scoped>
.work-detail {
  @include absolute(0, 0, 0, 0, $z-work-details);
  position: fixed;
  width: 100%;
  height: 100%;
  background: $theme-mint-l1;
  padding: 18px 0;
}
.work-detail-relative {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 64px;
}
.work-detail-wrapper {
  margin: auto;
  width: 100%;
  height: 100%;
  background: $white;
}

.detail-enter,
.detail-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.detail-enter-to,
.detail-leave {
  transform: translateY(0);
  opacity: 1;
}
.detail-leave-active,
.detail-enter-active {
  transition: 0.5s $bezier-fast-ease-out;
}
</style>
