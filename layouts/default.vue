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
  methods: {
    menuShow() {
      this.isMenuShowed = true
    }
  }
})
</script>
<style lang="scss">
html {
  @include noto($color: $theme-navy);
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body,
#__nuxt,
#__layout,
.layout {
  height: 100%;
}

a,
a:link,
a:visited {
  outline: none;
  text-decoration: none;
}

button {
  outline: none;
}

.page-wrapper {
  height: 100%;
  padding: 18px 0;
}

// NaviMenu transition
.NaviMenu-enter-active {
  transition: all 0.6s $bezier-fast-ease-out;
  transform: translateY(0px);
}
.NaviMenu-enter {
  transform: translateY(-64px);
}
</style>
