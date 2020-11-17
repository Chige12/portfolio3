<template lang="pug">
.index
  IndexTopVisual
  ClickMe(
    :isClickMeChanged="isClickMeChanged"
  )
  AboutTop(
    @saveScrollHeight="saveScrollHeight"
  ).about-top-animation
  MainWorks(
    @saveScrollHeight="saveScrollHeight"
  )
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import IndexTopVisual from '~/components/organisms/IndexTopVisual.vue'
import ClickMe from '~/components/atoms/ClickMe.vue'
import AboutTop from '~/components/organisms/AboutTop.vue'
import MainWorks from '~/components/organisms/MainWorks.vue'

type Data = {
  isClickMeChanged: boolean
}

export default Vue.extend({
  components: {
    IndexTopVisual,
    ClickMe,
    AboutTop,
    MainWorks
  },
  data(): Data {
    return {
      isClickMeChanged: false
    }
  },
  computed: {
    ...mapState({
      page: (state: any) => state.styles.page,
      indexScrollHeight: (state: any) => state.styles.indexScrollHeight
    }),
    aboutPageTop() {
      return this.$store.state.styles.aboutPageTop - this.indexScrollHeight
    }
  },
  watch: {
    page(to, from) {
      this.$el.scrollTo(0, this.indexScrollHeight)
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
    saveScrollHeight() {
      const height: number = this.$el.scrollTop
      this.$store.commit('styles/saveIndexScrollHeight', height)
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
</style>
