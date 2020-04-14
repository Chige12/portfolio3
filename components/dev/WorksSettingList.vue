<template lang="pug">
  .works-setting-list
    .works-title Works Setting
    .fetch-work-btn
      button(@click="fetchWork()").pure-button 更新
    .work-data(
      v-for="(work, work_key) in worksData"
      :key="`work-edit-data-${work_key}`"
    )
      WorksSetting(
        :work="work"
        :maxId="worksData.length"
        @workIdUp="workIdUp"
        @workIdDown="workIdDown"
        @uploadImageModalOpen="uploadImageModalOpen"
      )
    AddWorks(
      v-if="worksData.length !== 0"
      :maxId="worksData.length"
    )
    UploadImageModal(
      v-if="isUploadImageModalOpened"
      :uploadingImageHash="uploadingImageHash"
      @uploadImageModalClose="uploadImageModalClose"
    )
</template>
<script lang="ts">
import Vue from 'vue'
import WorksSetting from '~/components/dev/WorksSetting.vue'
import AddWorks from '~/components/dev/AddWork.vue'
import UploadImageModal from '~/components/dev/UploadImageModal.vue'

type Data = {
  isUploadImageModalOpened: boolean
  uploadingImageHash: string
}

export default Vue.extend({
  components: {
    WorksSetting,
    AddWorks,
    UploadImageModal
  },
  data(): Data {
    return {
      isUploadImageModalOpened: false,
      uploadingImageHash: ''
    }
  },
  computed: {
    worksData() {
      return this.$store.getters['develop/getWorks']
    }
  },
  methods: {
    workIdUp(work: any) {
      const twoWorks = [this.worksData[work.id - 1], work]
      this.$store.dispatch('develop/workIdReplace', twoWorks)
    },
    workIdDown(work: any) {
      const twoWorks = [work, this.worksData[work.id + 1]]
      this.$store.dispatch('develop/workIdReplace', twoWorks)
    },
    uploadImageModalOpen(hash: string) {
      this.isUploadImageModalOpened = true
      this.uploadingImageHash = hash
    },
    uploadImageModalClose() {
      this.isUploadImageModalOpened = false
    },
    fetchWork() {
      this.$store.dispatch('develop/fetchWorks')
    }
  }
})
</script>
<style lang="scss">
.works-setting-list {
  margin: 0 24px;
}
.fetch-work-btn {
  margin-top: 4px;
  button {
    background: $theme-mint;
    color: $white;
  }
}
</style>
