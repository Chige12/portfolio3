<template lang="pug">
  .work-box
    nuxt-link(
      :to="`./works/${work.hash}`"
      @click.native="showWorkDetails(work.hash)"
    ).work-box-btn
      img.work-box-img(:src="work.image", :alt="work.title")
      .work-box-title {{work.title}}
      .work-box-lead {{work.lead}}
</template>
<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

type WorkInterface = {
  id: number
  title: string
  image: string
  lead: string
}

export default Vue.extend({
  props: {
    work: {
      type: Object as () => WorkInterface,
      default: () => {}
    }
  },
  methods: {
    ...mapMutations({
      showWorkDetails: 'works/showWorkDetails'
    })
  }
})
</script>
<style lang="scss">
.work-box {
  margin: 16px;
  margin-bottom: 48px;
}
.work-box-btn {
  display: block;
  width: 285px;
}
.work-box-img {
  display: block;
  width: 285px;
  height: 162px;
  object-fit: cover;
  background-color: $theme-gray;
}
.work-box-title {
  margin-top: 16px;
  text-align: left;
  @include noto($color: $theme-gray-d3, $weight: $font-bold);
}
.work-box-lead {
  margin-top: 8px;
  text-align: left;
  @include noto($size: 13px, $color: $theme-gray-d3);
}
</style>
