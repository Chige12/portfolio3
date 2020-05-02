<template lang="pug">
  .layout
    CinemaScope(@menuShow="menuShow")
    transition(name="NaviMenu")
      NavigationMenu(v-if="isMenuShowed")
    .page-wrapper
      nuxt
</template>
<script lang="ts">
import Vue from 'vue'
import CinemaScope from '~/layouts/-cinema-scope.vue'
import NavigationMenu from '~/components/organisms/NavigationMenu.vue'

type Data = {
  isMenuShowed: boolean
}

export default Vue.extend({
  components: {
    CinemaScope,
    NavigationMenu
  },
  data(): Data {
    return {
      isMenuShowed: false
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        if (to.name === 'works-detail') {
          this.isMenuShowed = false
        } else {
          this.isMenuShowed = true
        }
      }
    }
  },
  created() {
    this.$store.dispatch('works/fetchWorks')
  },
  methods: {
    menuShow() {
      this.isMenuShowed = true
    }
  }
})
</script>
<style lang="scss">
@import '~/assets/style/_layout.scss';

.page-wrapper {
  height: 100%;
  padding: 18px 0;
  overflow: hidden;
}

// NaviMenu transition
.NaviMenu-enter-active,
.NaviMenu-leave-active {
  transition: all 0.6s $bezier-fast-ease-out;
  transform: translateY(0px);
}
.NaviMenu-enter,
.NaviMenu-leave-to {
  transform: translateY(-64px);
}
</style>
