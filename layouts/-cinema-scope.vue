<template lang="pug">
  .cinema-scope(
    :class="{'is-finish':isLoadFinished}"
  )
    .cinema-scope-top
    .cinema-scope-bottom
</template>
<script lang="ts">
import Vue from 'vue'

type Data = {
  isLoadFinished: boolean
}

export default Vue.extend({
  data(): Data {
    return {
      isLoadFinished: false
    }
  },
  mounted() {
    this.listen(window, 'load', this.loadFinish)
    // if (location.host === 'localhost:3000') {
    //   this.loadFinish()
    // }
  },
  methods: {
    loadFinish() {
      this.isLoadFinished = true
      console.log(this.$route)
      if (this.$route.name !== 'works-detail') {
        this.$emit('menuShow')
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.cinema-scope {
  .cinema-scope-top {
    @include absolute($top: 0, $left: 0, $z: $z-cinema-scope);
    position: fixed;
    width: 100%;
    height: 50%;
    background: $theme-navy;
    transition: 0.3s $bezier-fast-ease-out;
  }
  .cinema-scope-bottom {
    @include absolute($bottom: 0, $left: 0, $z: $z-cinema-scope);
    position: fixed;
    width: 100%;
    height: 50%;
    background: $theme-navy;
    transition: 0.3s $bezier-fast-ease-out;
  }
  &.is-finish {
    .cinema-scope-top {
      height: 18px;
    }
    .cinema-scope-bottom {
      height: 18px;
    }
  }
  .loading-anm {
    @include absolute($z: $z-cinema-scope);
  }
}
</style>
