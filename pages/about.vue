<template lang="pug">
  .about
    .about-header
      img(src="~/assets/imgs/tottori-sakyu.jpg").about-header-img
      .about-header-cover
        .about-header-cover-text About
      .back-index
        nuxt-link(to="/").back-index-link
          ArrowSvg.svg-wrapper  
          span Index
    .about-top-wrapper-parent
      AboutTop(
        id="aboutTop"
        :style="{transform: `translateY(${aboutPageTop}px`}"
      ).about-top-animation
    AboutLinks
    AboutSkills
</template>
<script lang="ts">
import Vue from 'vue'
import AboutTop from '~/components/organisms/AboutTop.vue'
import AboutLinks from '~/components/organisms/AboutLinks.vue'
import AboutSkills from '~/components/organisms/AboutSkills.vue'
import ArrowSvg from '~/assets/svgs/arrow.svg?inline'

export default Vue.extend({
  components: {
    AboutTop,
    AboutLinks,
    AboutSkills,
    ArrowSvg
  },
  computed: {
    aboutPageTop() {
      return this.$store.state.styles.aboutPageTop
    }
  }
})
</script>
<style lang="scss" scoped>
.about {
  height: 100%;
  overflow-y: scroll;
}
.about-header {
  position: relative;
  width: 100%;
  height: 112px;
  background: $light-gray;
  &-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &-cover {
    @include absolute(0, 0, 0, 0);
    width: 100%;
    height: 100%;
    background: rgba($white, 0.9);
    &-text {
      @include absolute(0, 0, 0, 0);
      width: 100%;
      height: min-content;
      text-align: center;
      @include roboto($size: 32px, $weight: $font-bold);
    }
  }
}
.back-index {
  @include absolute($top: 0, $left: 32px, $bottom: 0);
  height: min-content;
  &-link {
    @include roboto($size: 18px, $weight: $font-bold);
    @include flex();
    .svg-wrapper {
      display: inline-block;
      margin-right: 6px;
      width: 15px;
      height: 15px;
      transform: rotateZ(90deg);
      .arrow_svg {
        fill: $theme-gray-d2;
      }
    }
  }
  &:hover {
    .back-index-link {
      color: $theme-mint;
    }
    .svg-wrapper .arrow_svg {
      fill: $theme-mint;
    }
  }
}
.about-top-animation {
  animation: aboutTopAnm 0.8s $bezier-fast-ease-out forwards;
}
@keyframes aboutTopAnm {
  0% {
  }
  100% {
    transform: translateY(0);
  }
}

.about-top-wrapper-parent {
  margin-top: 32px;
}
</style>
