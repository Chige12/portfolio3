<template lang="pug">
  .error
    nuxt
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  created() {
    this.$store.dispatch('develop/fetchWorks')
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/purecss@1.0.1/build/pure-min.css',
          integrity:
            'sha384-oAOxQR6DkCoMliIh8yFnu25d7Eq/PHS21PClpwjOTeU2jRSq11vu66rf90/cZr47',
          crossorigin: 'anonymous'
        }
      ]
    }
  }
})
</script>
<style lang="scss">
@import '~/assets/style/_layout.scss';
</style>
