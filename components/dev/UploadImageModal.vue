<template lang="pug">
  .upload-image-modal
    .upload-image-wrapper
      input(
        type="file"
        style="display:none;"
        ref="imageInput"
        accept="image/png,image/jpeg,image/gif"
        @change="readImage"
      )
      button.pure-button.input-area(
        @click="selectImage()"
      ) UploadImage
      .upload-image-preview(v-if="imageBase !== ''")
        .image-preview-wrapper
          .image-preview-wrapper-big(:class="{'--transparent': isImageTransparented}")
            img(:src="imageBase").image-preview
            img(:src="imageBase").image-preview-big
          .image-preview-wrapper-small(:class="{'--transparent': isImageTransparented}")
            img(:src="imageBase").image-preview
            img(:src="imageBase").image-preview-small
        .preview-btn
          button(
            @click="isImageTransparented = !isImageTransparented"
          ).pure-button Preview
        .image-file-name
          input(type="text" v-model="imageFileName").file-name-input
          span .{{imageFiletype}}
      .btn-wrapper
        button.pure-button.pure-button-primary(
          v-if="imageBase !== ''"
          @click="uploadImage()"
        ) Save
        button.pure-button(@click="$emit('uploadImageModalClose')") Close
      
</template>
<script lang="ts">
import Vue from 'vue'

interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T
  dataTransfer: T
}

type Data = {
  imageFileName: string
  imageFiletype: string
  imageBase: string
  isImageTransparented: boolean
  file: File | null
}

export default Vue.extend({
  props: {
    uploadingImageHash: {
      type: String,
      default: ''
    }
  },
  data(): Data {
    return {
      imageFileName: '',
      imageFiletype: '',
      imageBase: '',
      isImageTransparented: false,
      file: null
    }
  },
  methods: {
    selectImage() {
      const input: HTMLInputElement | null = this.$refs.imageInput
      if (input) {
        input.click()
      }
    },
    async readImage(e: HTMLElementEvent<HTMLInputElement>) {
      const eventTarget = e.target || e.dataTransfer
      const file = eventTarget.files ? eventTarget.files[0] : null
      if (file !== null) {
        this.file = file
        if (this.checkFile(file)) {
          this.imageFileName = this.baseName(file.name)
          const fileTypeArr = file.name.match(/\.(jpg|png|gif)$/)
          this.imageFiletype = fileTypeArr ? fileTypeArr[1] : null
          this.imageBase = await this.getBase64(file)
        }
      }
    },
    getBase64(file: File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    checkFile(file: File) {
      let result = true
      const SIZE_LIMIT = 5000000 // 5MB
      // キャンセルしたら処理中断
      if (!file) {
        result = false
      }
      // jpeg か png 関連ファイル以外は受付けない
      if (file.type) {
        if (
          file.type !== 'image/jpeg' &&
          file.type !== 'image/png' &&
          file.type !== 'image/gif'
        ) {
          result = false
        }
      }
      // 上限サイズより大きければ受付けない
      if (file.size) {
        if (file.size > SIZE_LIMIT) {
          result = false
        }
      }
      return result
    },
    baseName(str: string) {
      let base: string = str.substring(str.lastIndexOf('/') + 1)
      if (base.lastIndexOf('.') !== -1)
        base = base.substring(0, base.lastIndexOf('.'))
      return base
    },
    uploadImage() {
      type ImageUpload = {
        name: string
        file: File
        hash: string
      }
      const image: ImageUpload = {
        name: `${this.imageFileName}.${this.imageFiletype}`,
        file: this.file,
        hash: this.uploadingImageHash
      }
      this.$store.dispatch('develop/uploadImage', image)
    }
  }
})
</script>
<style lang="scss" scoped>
.upload-image-modal {
  @include absolute($top: 0, $left: 0);
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba($theme-navy, 0.5);
  padding: 80px 200px;
}
.upload-image-wrapper {
  background: $white;
  width: 100%;
  height: 100%;
  padding: 24px;
}
.btn-wrapper {
  margin-top: 8px;
  .pure-button {
    margin-right: 8px;
  }
}
.preview-btn {
  margin-bottom: 16px;
}
.image-preview-wrapper {
  @include flex($justifyContent: flex-start, $alignItems: flex-end);
  padding: 24px 0;
}
.image-preview-wrapper-big {
  position: relative;
  width: 380px;
  height: auto;
  background: $theme-gray-d1;
  margin-right: 24px;
  transition: 0.3s ease-in-out;
  &.--transparent {
    background: $white;
    .image-preview {
      opacity: 0;
    }
  }
  .image-preview {
    display: block;
    width: 100%;
    opacity: 0.3;
    transition: 0.3s ease-in-out;
  }
  .image-preview-big {
    @include absolute(0, 0, 0, 0);
    display: block;
    width: 380px;
    height: 216px;
    object-fit: cover;
  }
}
.image-preview-wrapper-small {
  position: relative;
  width: 285px;
  height: auto;
  background: $theme-gray-d1;
  transition: 0.3s ease-in-out;
  &.--transparent {
    background: $white;
    .image-preview {
      opacity: 0;
    }
  }
  .image-preview {
    display: block;
    width: 100%;
    opacity: 0.3;
    transition: 0.3s ease-in-out;
  }
  .image-preview-small {
    @include absolute(0, 0, 0, 0);
    display: block;
    width: 285px;
    height: 162px;
    object-fit: cover;
  }
}

.file-name-input {
  padding: 2px 4px;
  margin-bottom: 16px;
  background: $light-gray;
}
</style>
