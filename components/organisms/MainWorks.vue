<template lang="pug">
  .main-works
    .main-works-title Works
    .main-works-list
      transition-group(tag="div" name="fade" appear).main-works-list-wrapper
        WorkBoxSmall(
          v-for="(work,work_id) in worksData"
          :key="`main-work-${work_id}`"
          :work="work"
          :id="work_id"
          @saveScrollHeight="saveScrollHeight"
        )
    .and-more
      nuxt-link(to="/works").and-more-link and more...
</template>
<script lang="ts">
import Vue from 'vue'
import WorkBoxSmall from '~/components/atoms/WorkBoxSmall.vue'

export default Vue.extend({
  components: {
    WorkBoxSmall
  },
  computed: {
    worksData() {
      return this.$store.getters['works/getSmallWorks']
    }
  },
  methods: {
    saveScrollHeight() {
      this.$emit('saveScrollHeight')
    }
  }
})
</script>
<style lang="scss">
.main-works {
  margin-bottom: 112px;
}
.main-works-title {
  margin-top: 80px;
  text-align: center;
  @include roboto($size: 24px);
}
.main-works-list {
  margin: 0 auto;
  margin-top: 40px;
  max-width: 960px;
}
.main-works-list-wrapper {
  width: 100%;
  @include flex($wrap: wrap, $justifyContent: center);
}
.and-more {
  margin-top: 24px;
  &-link {
    display: block;
    width: 340px;
    height: 52px;
    padding: 12px 0;
    margin: 0 auto;
    background-color: $theme-mint-l1;
    border-radius: 26px;
    text-align: center;
    text-indent: 0.6em;
    @include roboto($size: 20px, $color: $white);
  }
}
</style>
