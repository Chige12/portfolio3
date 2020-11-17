<template lang="pug">
  .work-detail
    transition(name="fade")
      LoadingAnm(v-if="isLoading" :color="'mint'")
    Carousel(
      :per-page="1"
      :easing="'cubic-bezier(0.1, 0, 0, 1)'"
      :loop="true"
      :navigate-to="[workDetailsId, isNavAnm]"
      :paginationActiveColor="'#48a290'"
      :paginationColor="'#c9cac2'"
      :paginationPosition="'bottom-overlay'"
      :paginationSize="8"
      @pageChange="pageChange"
    ).work-detail-carousel
      Slide(v-for="(work, work_key) in worksData" :key="`work-hash-${work.hash}`")
        .work-detail-relative
          transition(name="detail-wrapper")
            .work-detail-wrapper(
              v-if="work"
              :class="{'--clip-top': isHoverTop,'--clip-left': isHoverLeft,'--clip-right': isHoverRight}"
            )
              WorkDetailBox(:work="work" :id="work_key")
    button.back-to-page(
      @click="backToPage()"
      :class="{'--hover': isHoverTop}"
      @mouseover="isHoverTop = true"
      @mouseleave="isHoverTop = false"
    )
      .back-to-page-btn 
        TimesSvg.back-to-page-btn-svg
    button.prev-to-page(
      :class="{'--hover': isHoverLeft}"
      @click="prevToPage()"
      @mouseover="isHoverLeft = true"
      @mouseleave="isHoverLeft = false"
    )
      .prev-to-page-btn 
        ArrowSvg.prev-to-page-btn-svg
    button.next-to-page(
      :class="{'--hover': isHoverRight}"
      @click="nextToPage()"
      @mouseover="isHoverRight = true"
      @mouseleave="isHoverRight = false"
    )
      .next-to-page-btn 
        ArrowSvg.next-to-page-btn-svg
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState, mapMutations } from 'vuex'

import Carousel from 'vue-carousel/src/Carousel.vue'
import Slide from 'vue-carousel/src/Slide.vue'
import WorkDetailBox from '~/components/organisms/WorkDetailBox.vue'
import LoadingAnm from '~/components/atoms/LoadingAnm.vue'

import TimesSvg from '~/assets/svgs/times.svg?inline'
import ArrowSvg from '~/assets/svgs/arrow.svg?inline'

type Data = {
  isHoverTop: boolean
  isHoverLeft: boolean
  isHoverRight: boolean
  isNavAnm: boolean
  isLoading: boolean
}

export default Vue.extend({
  components: {
    Carousel,
    Slide,
    WorkDetailBox,
    LoadingAnm,
    TimesSvg,
    ArrowSvg
  },
  transition: {
    name: 'detail',
    mode: 'in-out'
  },
  data(): Data {
    return {
      isHoverTop: false,
      isHoverLeft: false,
      isHoverRight: false,
      isNavAnm: false,
      isLoading: true
    }
  },
  computed: {
    ...mapGetters({
      worksData: 'works/getWorks'
    }),
    ...mapState({
      isWorkDetailsShowed: (state: any) => state.works.isWorkDetailsShowed,
      workDetailsId: (state: any) => state.works.workDetailsId,
      backPath: (state: any) => state.works.workDetailsBackPath
    })
  },
  watch: {
    worksData(newWorks) {
      const openHash = this.$route.hash
      if (openHash) {
        const id = newWorks.findIndex((v: any) => `#${v.hash}` === openHash)
        if (id !== -1) {
          this.showWorkDetails(id)
          this.finishLoading()
        }
      }
    }
  },
  mounted() {
    if (this.isWorkDetailsShowed) {
      this.finishLoading()
    }
  },
  methods: {
    ...mapMutations({
      showWorkDetails: 'works/showWorkDetails'
    }),
    pageChange(id: string, anm: boolean) {
      const work = this.worksData.find((v: any) => v.id === id)
      if (work !== undefined) {
        this.isNavAnm = anm
        this.showWorkDetails(id)
        this.$router.push(`/works/detail#${work.hash}`)
      }
    },
    backToPage() {
      this.$router.push(this.backPath)
    },
    prevToPage() {
      const nowId = this.workDetailsId
      if (nowId <= 0) {
        this.pageChange(this.worksData.length - 1, true)
      } else {
        this.pageChange(nowId - 1, true)
      }
    },
    nextToPage() {
      const nowId = this.workDetailsId
      if (nowId < this.worksData.length - 1) {
        this.pageChange(nowId + 1, true)
      } else {
        this.pageChange(0, true)
      }
    },
    finishLoading() {
      this.isLoading = false
    }
  }
})
</script>
<style lang="scss" scoped>
$click-padding: 40px;

$btn-short-side: 40px;
$btn-long-side: 56px;
$btn-padding: 12px;

$btn-long-side--hover: 72px;

.work-detail {
  @include absolute(0, 0, 0, 0, $z-work-details);
  position: fixed;
  width: 100%;
  height: 100%;
  background: lighten($theme-mint-l1, 32%);
  padding: 18px 0;
}
.work-detail-carousel {
  width: 100%;
  height: 100%;
}
.work-detail-relative {
  position: relative;
  width: 100%;
  height: calc(100vh - (18px * 2));
  padding: $click-padding;
}
.work-detail-wrapper {
  display: block;
  margin: auto;
  width: 100%;
  height: 100%;
  background: $white;
  overflow: hidden;
  transition: clip-path 0.3s $bezier-fast-ease-out;
  animation: detailWrapperOpen 0.5s 0.2s $bezier-fast-ease-out both;
  clip-path: polygon(50% 0%, 100% 0, 100% 50%, 100% 100%, 0 100%, 0 50%, 0 0);
  &.--clip-top {
    clip-path: polygon(50% 6%, 100% 0, 100% 50%, 100% 100%, 0 100%, 0 50%, 0 0);
  }
  &.--clip-left {
    clip-path: polygon(50% 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 6% 50%, 0 0);
  }
  &.--clip-right {
    clip-path: polygon(50% 0, 100% 0, 94% 50%, 100% 100%, 0 100%, 0 50%, 0 0);
  }
}

.back-to-page {
  @include absolute($top: 18px, $left: 0);
  position: fixed;
  display: block;
  width: 100%;
  height: $click-padding;
}
.prev-to-page {
  @include absolute($top: 0, $left: 0);
  position: fixed;
  display: block;
  width: $click-padding;
  height: 100vh;
}
.next-to-page {
  @include absolute($top: 0, $right: 0);
  position: fixed;
  display: block;
  width: $click-padding;
  height: 100vh;
}

.back-to-page-btn {
  @include absolute($top: 0, $left: 0, $right: 0);
  display: block;
  width: $btn-short-side;
  height: $btn-long-side;
  background: $theme-mint;
  margin: auto;
  transition: all 0.3s $bezier-fast-ease-out;
  cursor: pointer;
  &-svg {
    @include absolute(0, 0, 0, 0);
    display: block;
    width: $btn-short-side;
    height: $btn-short-side;
    padding: $btn-padding;
    .arrow_svg {
      fill: $white;
    }
  }
}
.--hover .back-to-page-btn {
  height: $btn-long-side--hover;
}

.prev-to-page-btn {
  @include absolute($top: 0, $left: 0, $bottom: 0);
  display: block;
  width: $btn-long-side;
  height: $btn-short-side;
  background: $theme-mint;
  margin: auto;
  transition: all 0.3s $bezier-fast-ease-out;
  cursor: pointer;
  &-svg {
    @include absolute(0, 0, 0, 0);
    display: block;
    width: $btn-short-side;
    height: $btn-short-side;
    padding: $btn-padding;
    transform: rotate(90deg);
    .arrow_svg {
      fill: $white;
    }
  }
}
.--hover .prev-to-page-btn {
  width: $btn-long-side--hover;
}

.next-to-page-btn {
  @include absolute($top: 0, $right: 0, $bottom: 0);
  display: block;
  width: $btn-long-side;
  height: $btn-short-side;
  background: $theme-mint;
  margin: auto;
  transition: all 0.3s $bezier-fast-ease-out;
  cursor: pointer;
  &-svg {
    @include absolute(0, 0, 0, 0);
    display: block;
    width: $btn-short-side;
    height: $btn-short-side;
    padding: $btn-padding;
    transform: rotate(-90deg);
    .arrow_svg {
      fill: $white;
    }
  }
}
.--hover .next-to-page-btn {
  width: $btn-long-side--hover;
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
.detail-enter-active,
.detail-leave-active {
  transition: 0.5s $bezier-fast-ease-out;
}

@keyframes detailWrapperOpen {
  0% {
    transform: translateY(150%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
