<template lang="pug">
  .works
    .work-list(v-for="(work, work_key) in worksData" :key="`work-list-${work_key}`")
      p {{work}}
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    worksData() {
      return this.$store.getters['works/getWorks']
    }
  }
})
</script>
