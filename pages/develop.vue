<template lang="pug">
  .error
    button(@click="isDevOpened = !isDevOpened") change
    div(v-if="isDevOpened")
      .develop
        button.pure-button(@click="auth()") Auth
        .user(v-if="user !== null") 
          .user-name {{user.displayName}}
          .setting(v-if="user.uid === ownerUid")
    WorksSettingList
    .alert-wrapper
      transition-group(name="alert")
        .alert(
          v-for="alert in alertTextArr"
          :key="`alert-id-${alert.key}`"
        ) ❕ {{alert.text}}
</template>
<script lang="ts">
import { mapState } from 'vuex'
import Vue from 'vue'
import WorksSettingList from '~/components/dev/WorksSettingList.vue'

type Data = {
  isDevOpened: boolean
  ownerUid: string
}

type TextArr = []

export default Vue.extend({
  layout: 'dev',
  components: {
    WorksSettingList
  },
  data(): Data {
    return {
      isDevOpened: false,
      ownerUid: process.env.FB_OWNER_UID || ''
    }
  },
  computed: {
    ...mapState({
      user: (state: any) => state.develop.user,
      alertTextArr: (state: any) => state.develop.alertTextArr,
      alertCounter: (state: any) => state.develop.alertCounter
    })
  },
  watch: {
    async alertCounter(newAlertCount) {
      await this.$delay(2000)
      this.$store.commit('develop/deleteAlertText')
    }
  },
  methods: {
    auth() {
      this.$store.dispatch('develop/login')
    }
  }
})
</script>
<style lang="scss" scoped>
.alert-wrapper {
  @include absolute($top: 32px, $right: 0);
}
.alert {
  display: block;
  min-width: 200px;
  margin-bottom: 4px;
  padding: 8px 16px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: darken($theme-pink, 4%);
  transition: all 0.3s $bezier-fast-ease-in-out;
  color: $white;
}
// alert
.alert-leave-active {
  position: absolute;
}
.alert-enter,
.alert-leave-to {
  opacity: 0;
  transform: translateX(50%);
}
</style>
