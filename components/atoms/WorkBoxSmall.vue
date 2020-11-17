<template lang="pug">
  .work-box
    button(
      @click="showWorkDetails"
    ).work-box-btn
      .work-box-img-wrapper
        img.work-box-img(:src="work.image", :alt="work.title")
      .work-box-title {{work.title}}
      .work-box-lead {{work.lead}}
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
  },
  methods: {
    async showWorkDetails() {
      await this.$emit('saveScrollHeight')
      this.$store.commit('works/showWorkDetails', this.id)
      this.$store.commit('works/setworkDetailsBackPath', '/')
      this.$router.push(`./works/detail#${this.work.hash}`)
    }
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
.work-box-img-wrapper {
  width: 285px;
  height: 162px;
  background-color: $theme-gray;
}
.work-box-img {
  display: block;
  width: 285px;
  height: 162px;
  object-fit: cover;
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
