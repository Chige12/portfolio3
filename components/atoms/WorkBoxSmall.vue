<template lang="pug">
  .work-box
    button(@click="workModalOpen()").work-box-btn
      .work-box-img(:src="work.image", :alt="work.title")
      .work-box-title {{work.title}}
      .work-box-lead {{work.lead}}
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    work: {
      type: Object,
      default: () => ({}),
      id: {
        type: Number,
        default: 0
      },
      title: {
        type: String,
        default: ''
      },
      image: {
        type: String,
        default: ''
      },
      lead: {
        type: String,
        default: ''
      }
    }
  },
  methods: {
    workModalOpen() {}
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
  width: 285px;
  height: 162px;
  object-fit: cover;
  background-color: $theme-gray;
}
.work-box-title {
  margin-top: 8px;
  text-align: left;
  @include noto($color: $theme-gray-d3, $weight: $font-bold);
}
.work-box-lead {
  margin-top: 4px;
  text-align: left;
  @include noto($size: 13px, $color: $theme-gray-d3);
}
</style>
