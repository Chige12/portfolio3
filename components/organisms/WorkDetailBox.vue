<template lang="pug">
  .work-detail-box
    .work-detail-header
      .work-detail-back
        img(:src="work.image").work-detail-back-img
      .work-detail-container
        .work-detail-top-wrapper
          .work-detail-top-left
            .work-detail-top-title {{work.title}}
            .work-detail-top-lead {{work.lead}}
          .work-detail-top-right
            img(:src="work.image").work-detail-top-img
</template>
<script lang="ts">
import Vue from 'vue'

type WorkInterface = {
  hash: string
  title: string
  image: string
  lead: string
}

export default Vue.extend({
  props: {
    work: {
      type: Object as () => WorkInterface,
      default: () => {}
    },
    id: {
      type: Number,
      default: 0
    }
  }
})
</script>
<style lang="scss" scoped>
.work-detail-box {
  width: 100%;
  height: 100%;
}
.work-detail-back {
  display: block;
  width: 100%;
  height: 120px;
  overflow: hidden;
  &-img {
    $blur: 8px;
    margin: -$blur;
    width: calc(100% + #{$blur * 2});
    height: 120px + ($blur * 2);
    object-fit: cover;
    filter: blur($blur);
  }
}
.work-detail-container {
  padding: 0 96px;
}
.work-detail-top-wrapper {
  @include flex();
  margin-top: 48px;
}

.work-detail-top-right {
  padding-left: 32px;
}
.work-detail-top-title {
  @include noto(
    $size: 32px,
    $color: darken($theme-gray-d2, 4%),
    $weight: $font-bold
  );
}
.work-detail-top-lead {
  margin-top: 8px;
  @include noto($size: 16px, $color: $theme-gray-d3);
}
.work-detail-top-img {
  $hoge: 100%;
  max-width: 528px;
  max-height: 300px;
  object-fit: cover;
  width: $hoge;
  height: $hoge * 300 / 528;
}
</style>
