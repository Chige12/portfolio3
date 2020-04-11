<template lang="pug">
  .click-me
    .click-me-wrapper(
      :class="{'--click-me': isClickMeChanged}"
    )
      .click-me-text() {{clickMeText}}
      .click-me-arrow
        ArrowSvg.svg_wrapper
</template>
<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import ArrowSvg from '~/assets/svgs/arrow.svg?inline'

type Data = {
  arrowSvg: string
}

export default Vue.extend({
  components: {
    ArrowSvg
  },
  props: {
    isClickMeChanged: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    clickMeText() {
      return this.isClickMeChanged ? 'Click Me!' : 'Scroll'
    }
  }
})
</script>
<style lang="scss" scoped>
.click-me {
  position: relative;
}
.click-me-wrapper {
  @include absolute($bottom: 24px, $left: 0, $right: 0);
  transition: 0.8s $bezier-fast-ease-out;
  &.--click-me {
    bottom: -20px;
  }
}
.click-me-text {
  @include roboto($size: 18px, $color: $theme-mint, $weight: $font-bold);
  text-align: center;
}
.click-me-arrow {
  width: 16px;
  margin: 0 auto;
  transform: scaleX(2);
  animation: rotateArrow 3s $bezier-fast-ease-in-out infinite;
  perspective: 500;
  .svg_wrapper {
    animation: rotateArrowWidth 3s ease-in-out infinite;
    .arrow_svg {
      fill: $theme-mint;
    }
  }
}

@keyframes rotateArrow {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
@keyframes rotateArrowWidth {
  0% {
    transform: scaleX(1);
  }
  70% {
    transform: scaleX(1);
  }
  75% {
    transform: scaleX(2);
  }
  90% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>
