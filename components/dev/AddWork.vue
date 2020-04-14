<template lang="pug">
.add-work-wrapper
  button(@click="addWorkOpen()").pure-button.pure-button-primary Add Work
  .pure-form-aligned(v-if="isAddWorkOpened")
    fieldset
      .isid id: {{maxId}}
      .pure-control-group
        label タイトル
        input.org-input(
          type="text"
          v-model="work.title"
        )
      .pure-control-group
        label hash #
        input.org-input(
          type="text"
          v-model="work.hash"
        )
      .pure-control-group
        label 画像リンク
        input.org-input(
          type="text"
          v-model="work.image"
        )
        button() Upload
      .pure-control-group
        label リード文
        textarea.org-textarea(
          type="text"
          v-model="work.lead"
        )
      button(@click="addData()").pure-button.pure-button-primary Add
      p: small {{work}}
      .error-text {{errorText}}
</template>
<script lang="ts">
import Vue from 'vue'

type Data = {
  isAddWorkOpened: boolean
  errorText: string
  work: {
    id: number
    hash: string
    title: string
    image: string
    lead: string
  }
}
export default Vue.extend({
  props: {
    maxId: {
      type: Number,
      default: 0
    }
  },
  data(): Data {
    return {
      isAddWorkOpened: false,
      errorText: '',
      work: {
        id: 0,
        hash: '',
        title: '',
        image: '',
        lead: ''
      }
    }
  },
  methods: {
    addData() {
      const id: number = this.maxId
      this.work.id = id
      if (this.work.hash) {
        const work = { ...this.work }
        this.$store.dispatch('develop/addWork', work)
        this.errorText = ''
        this.addWorkClose()
      } else {
        this.errorText = 'hashが設定されていません'
      }
    },
    addWorkOpen() {
      this.isAddWorkOpened = !this.isAddWorkOpened
      this.work.hash = ''
      this.work.title = ''
      this.work.image = ''
      this.work.lead = ''
    },
    addWorkClose() {
      this.isAddWorkOpened = false
    }
  }
})
</script>
<style lang="scss">
.add-work-wrapper {
  margin-top: 8px;
}
.org-input,
.org-textarea {
  border: 1px solid $theme-gray-d1;
  border-radius: 2px;
  padding: 0 4px;
  display: inline-block;
  width: 600px;
}
</style>
