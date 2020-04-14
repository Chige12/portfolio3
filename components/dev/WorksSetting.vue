<template lang="pug">
  .works-setting
    .work-head-wrapper
      .work-data-btn
        button.pure-button(
          @click="workDataToggle()"
        ) {{work.id}}. {{work.title}}
      .id-up-down
        button(v-if="work.id !== 0" @click="workIdUp()").id-up-down-btn ↑上へ
        button(v-if="work.id !== maxId - 1" @click="workIdDown()").id-up-down-btn ↓下へ
    .work-data-wrapper(v-if="isWorkDataOpened")
      .pure-form-aligned
        fieldset
          .pure-control-group
            label タイトル
            input.org-input(
              type="text"
              :value="work.title"
              @input="newWork.title = $event.target.value"
            )
          .pure-control-group
            label hash #
            input.org-input(
              type="text"
              :value="work.hash"
              @input="newWork.hash = $event.target.value"
            )
          .pure-control-group
            label 画像リンク
            .org-input.--unEditable {{work.image}}
            button(@click="imgUploadModalOpen(work.hash)").img-upload-btn Upload
            img(v-if="work.image" :src="work.image").image-window
          .pure-control-group
            label リード文
            textarea.org-textarea(
              type="text"
              :value="work.lead"
              @input="newWork.lead = $event.target.value"
            )
          button(@click="saveData()").pure-button.pure-button-primary Save
          p: small {{work}}
</template>
<script lang="ts">
import Vue from 'vue'

type Data = {
  isWorkDataOpened: boolean
  newWork: {
    id: number
    hash: string
    title: string
    image: string
    lead: string
  }
}

type WorkInterface = {
  id: number
  title: string
  image: string
  lead: string
}

export default Vue.extend({
  props: {
    maxId: {
      type: Number,
      default: 0
    },
    work: {
      type: Object as () => WorkInterface,
      default: () => {}
    }
  },
  data(): Data {
    return {
      isWorkDataOpened: false,
      newWork: {
        id: 0,
        hash: '',
        title: '',
        image: '',
        lead: ''
      }
    }
  },
  watch: {
    work(newMaxId) {
      this.margeToNewWork()
    }
  },
  mounted() {
    this.margeToNewWork()
  },
  methods: {
    margeToNewWork() {
      for (const k of Object.keys(this.newWork)) {
        if (this.work[k] !== undefined) {
          this.newWork[k] = this.work[k]
        }
      }
    },
    workDataToggle() {
      this.isWorkDataOpened = !this.isWorkDataOpened
    },
    saveData() {
      this.$store.dispatch('develop/setWork', this.newWork)
    },
    workIdUp() {
      this.$emit('workIdUp', this.newWork)
    },
    workIdDown() {
      this.$emit('workIdDown', this.newWork)
    },
    imgUploadModalOpen(hash: string) {
      this.$emit('uploadImageModalOpen', hash)
    }
  }
})
</script>
<style lang="scss">
.org-input,
.org-textarea {
  border: 1px solid $theme-gray-d1;
  border-radius: 2px;
  padding: 0 4px;
  display: inline-block;
  width: 600px;
  min-height: 28px;
  &.--unEditable {
    background: $light-gray;
  }
}
.work-head-wrapper {
  margin-top: 8px;
  display: flex;
  align-items: center;
}
.work-data-btn {
  width: 400px;
}
.pure-control-group {
  display: flex;
  align-items: center;
}

.id-up-down {
  display: inline-block;
  &-btn {
    margin: 0 4px;
    padding: 2px 4px;
    background: $light-gray-d1;
    border-radius: 2px;
  }
}
.img-upload-btn {
  margin: 0 4px;
  padding: 2px 4px;
  background: $light-gray-d1;
  border-radius: 2px;
}
.image-window {
  display: inline-block;
  height: 80px;
}
</style>
