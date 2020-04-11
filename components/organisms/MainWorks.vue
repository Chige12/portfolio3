<template lang="pug">
  .main-works
    .main-works-title Works
    .main-works-list
      WorkBoxSmall(
        v-for="(work,work_id) in works"
        :key="`main-work-${work_id}`"
        :work="work"
      )
    .and-more
      nuxt-link(to="./works").and-more-link and more...
</template>
<script lang="ts">
import Vue from 'vue'
import WorkBoxSmall from '~/components/atoms/WorkBoxSmall.vue'

type Data = {
  works: Array<{
    id: number
    title: string
    image: string
    lead: string
  }>
}

export default Vue.extend({
  components: {
    WorkBoxSmall
  },
  data(): Data {
    return {
      works: [
        {
          id: 0,
          title: 'プログラミング言語かるた',
          image: '',
          lead:
            'クラウドファンディングで目標金額の270%を達成した、話題の人気商品。'
        },
        {
          id: 0,
          title: 'プログラミング言語かるた',
          image: '',
          lead:
            'クラウドファンディングで目標金額の270%を達成した、話題の人気商品。'
        },
        {
          id: 0,
          title: 'プログラミング言語かるた',
          image: '',
          lead:
            'クラウドファンディングで目標金額の270%を達成した、話題の人気商品。'
        }
      ]
    }
  }
})
</script>
<style lang="scss">
.main-works {
  margin-bottom: 104px;
}
.main-works-title {
  margin-top: 64px;
  text-align: center;
  @include roboto($size: 24px);
}
.main-works-list {
  margin-top: 32px;
  @include flex($justifyContent: center);
}
.and-more {
  margin-top: 16px;
  &-link {
    display: block;
    width: 340px;
    height: 52px;
    padding: 12px 0;
    margin: 0 auto;
    background-color: $theme-greem-l1;
    border-radius: 26px;
    text-align: center;
    text-indent: 0.6em;
    @include roboto($size: 20px, $color: $white);
  }
}
</style>
