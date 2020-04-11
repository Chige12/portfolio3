<template lang="pug">
.index
  IndexTopVisual
  ClickMe(
    :isClickMeChanged="isClickMeChanged"
  )
  AboutTop
  .container Portfolio site
</template>

<script lang="ts">
import Vue from 'vue'
import IndexTopVisual from '~/components/organisms/IndexTopVisual.vue'
import ClickMe from '~/components/atoms/ClickMe.vue'
import AboutTop from '~/components/organisms/AboutTop.vue'

type Data = {
  isClickMeChanged: boolean
}

export default Vue.extend({
  components: {
    IndexTopVisual,
    ClickMe,
    AboutTop
  },
  data(): Data {
    return {
      isClickMeChanged: false
    }
  },
  mounted() {
    const indexPage: HTMLElement = this.$el
    this.listen(indexPage, 'scroll', this.scrollEvent)
  },
  methods: {
    scrollEvent(event: Event) {
      // console.log(Object.prototype.toString.call(event.target))
      if (event.target instanceof HTMLDivElement) {
        this.clickMeTextChange(event.target)
      }
    },
    clickMeTextChange(target: HTMLDivElement) {
      if (target.scrollTop >= 288 && !this.isClickMeChanged) {
        this.isClickMeChanged = true
      } else if (target.scrollTop < 288 && this.isClickMeChanged) {
        this.isClickMeChanged = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.index {
  height: 100%;
  overflow-y: scroll;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @include roboto($weight: $font-bold);
}
</style>
