<template lang="pug">
.index
  IndexTopVisual
  .container Portfolio site
</template>

<script lang="ts">
import Vue from 'vue'
import IndexTopVisual from '~/components/organisms/IndexTopVisual.vue'

export default Vue.extend({
  components: {
    IndexTopVisual
  }
})
</script>

<style lang="scss" scoped>
.index {
  height: 100%;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @include roboto-black();
}
</style>
