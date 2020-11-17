<template lang="pug">
  .loading_animation
    .loading_animation-wrapper
      .clipping-box-wrapper.left
        .clipping-box-outer.left
          .clipping-box-inner.left
            .circle(
              :class="`circle-` + color"
            )
      .clipping-box-wrapper.right
        .clipping-box-outer.right
          .clipping-box-inner.right
            .circle(
              :class="`circle-` + color"
            )
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    color: {
      type: String,
      default: 'white'
    }
  }
})
</script>
<style lang="scss" scoped>
$circle-dir: 60px;
$circle-line-width: 6px;
$duration: 2s;

.loading_animation {
  @include absolute(0, 0, 0, 0);
  width: $circle-dir;
  height: $circle-dir;
}
.loading_animation-wrapper {
  width: $circle-dir;
  height: $circle-dir;
  animation: clipWrapper $duration infinite ease-in-out;
}
.clipping-box-wrapper {
  @include absolute(0, 0, 0, 0);
  &.right {
    transform: rotateZ(180deg);
  }
}
.clipping-box-outer {
  width: $circle-dir / 2;
  height: $circle-dir;
  overflow: hidden;
  transform-origin: right center 0;
  animation: clipOuter $duration infinite reverse $bezier-circle-ease-in;
  &.right {
    animation: clipOuter $duration ($duration / 4) infinite reverse
      $bezier-circle-ease-out;
  }
}
.clipping-box-inner {
  width: $circle-dir / 2;
  height: $circle-dir;
  overflow: hidden;
  transform-origin: right center 0;
  animation: clipInner ($duration / 2) infinite alternate $bezier-circle-ease-in;
  &.right {
    animation: clipInner ($duration / 2) ($duration / 4) infinite alternate
      $bezier-circle-ease-out;
  }
}
.circle {
  width: $circle-dir;
  height: $circle-dir;
  border-radius: 50%;
  &-white {
    border: $circle-line-width solid $white;
  }
  &-mint {
    border: $circle-line-width solid $theme-mint;
  }
}

@keyframes clipWrapper {
  0% {
    transform: rotateZ(180deg);
  }
  25% {
    transform: rotateZ(180deg);
  }
  100% {
    transform: rotateZ(360deg + 180deg);
  }
}

@keyframes clipOuter {
  0% {
    transform: rotateZ(180deg);
  }
  25% {
    transform: rotateZ(180deg);
  }
  50% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}

@keyframes clipInner {
  0% {
    transform: rotateZ(-180deg);
  }
  50% {
    transform: rotateZ(-180deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}

@keyframes clipInnerDot {
  0% {
    transform: rotateZ(-180deg);
    opacity: 0;
  }
  49% {
    transform: rotateZ(-180deg);
    opacity: 0;
  }
  50% {
    transform: rotateZ(-180deg);
    opacity: 1;
  }
  100% {
    transform: rotateZ(0deg);
    opacity: 1;
  }
}
</style>
