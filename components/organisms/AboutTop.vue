<template lang="pug">
  .about-top
    .about-top-box.--left
      .real-name-en Uchida Keita
      .real-name-ja 内田 啓太
      .about-comment デザインのできるエンジニアになりたいな
    .about-chige-icon
      button(
        @click="goAboutPageTop()"
        :class="{'--unable': !isAboutLinkEnabled}"
      ).about-chige-icon-link
        img.about-chige-icon-img(src="~/assets/imgs/Chige.png")
    .about-top-box.--right
      .about-column(
        v-for="(about, aboutKey) in abouts"
        :key="`about-top-${aboutKey}`"
      )
        .about-property - {{about.property}}
        .about-value(v-if="about.link !== ''")
          a(:href="about.link")
            span {{about.value}}
            LinkSvg.link-icon
        .about-value(v-else) {{about.value}}

</template>
<script lang="ts">
import Vue from 'vue'
import LinkSvg from '~/assets/svgs/link.svg?inline'

type Data = {
  abouts: Array<{
    property: string
    value: string
    link: string
  }>
}

export default Vue.extend({
  components: {
    LinkSvg
  },
  data(): Data {
    return {
      abouts: [
        {
          property: 'Pen name',
          value: 'ちげ (Chige)',
          link: ''
        },
        {
          property: 'Birthday',
          value: '1998/12/15',
          link: 'https://www.amazon.co.jp/hz/wishlist/ls/2587LR7B6QTVS'
        },
        {
          property: 'Age',
          value: '20',
          link: ''
        },
        {
          property: 'Living',
          value: 'Kyoto',
          link: ''
        },
        {
          property: 'Affiliation',
          value: '奈良高専 専攻科 (NITNC)',
          link: 'https://www.nara-k.ac.jp/'
        }
      ]
    }
  },
  computed: {
    isAboutLinkEnabled() {
      return this.$route.name !== 'about'
    }
  },
  mounted() {
    this.changeAge()
  },
  methods: {
    async goAboutPageTop() {
      const clientRect = this.$el.getBoundingClientRect()
      this.$store.commit(
        'styles/setAboutPageTop',
        clientRect.top - (18 + 112 + 32)
      )
      // cinema-scroll-top height 18px
      // about-header-cover height 112px
      // about-top-wrapper-parent margin-top 32px
      await this.$emit('saveScrollHeight')
      this.$router.push('/about')
    },
    changeAge() {
      // 年齢変更
      const today = new Date()
      let tempAge = today.getFullYear() - 1998 - 1
      const month = today.getMonth() + 1
      const date = today.getDate()
      if (month >= 12 && date >= 15) {
        // 誕生日が過ぎた時
        tempAge = tempAge + 1
      }
      for (let i = 0; i < this.abouts.length; i++) {
        if (this.abouts[i].property === 'Age') {
          this.abouts[i].value = String(tempAge)
        }
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.about-top {
  margin: 0 32px;
  @include flex();
}
.about-top-box {
  width: 100%;
  &.--left {
    padding-right: 8px;
  }
}
.about-chige-icon {
  margin: 48px 0;
  width: 148px + (64px * 2);
  flex-shrink: 0;
  &-link {
    display: block;
    margin: auto;
    width: 148px;
    height: 148px;
    border-radius: 50%;
    box-shadow: 0px 0px 48px rgba($theme-gray-d2, 0.24);
    overflow: hidden;
    transition: 0.5s $bezier-fast-ease-out;
    &:hover,
    &:focus {
      transform: scale(1.1);
    }
    &.--unable {
      cursor: initial;
      &:hover,
      &:focus {
        transform: scale(1);
      }
    }
  }
  &-img {
    display: block;
    width: 148px;
    height: 148px;
  }
}
.real-name-en {
  @include roboto($size: 40px, $color: $theme-gray-d2, $weight: $font-bold);
  text-align: right;
}
.real-name-ja {
  @include noto($size: 18px, $color: $theme-gray-d2);
  text-align: right;
}
.about-comment {
  margin-top: 24px;
  @include noto($size: 16px, $color: $theme-gray-d3);
  text-align: right;
  letter-spacing: 0.1em;
}

.about-column {
  @include flex($justifyContent: flex-start);
  margin: 8px 0;
}
.about-property {
  width: 128px;
  @include roboto($size: 16px, $weight: $font-bold);
}
.about-value {
  @include noto($size: 16px, $color: $theme-gray-d3);
  a {
    @include noto($size: 16px, $color: $theme-gray-d3);
    transition: 0.3s $bezier-fast-ease-out;
    .link-icon {
      margin-left: 4px;
      transition: 0.3s $bezier-fast-ease-out;
      .link_svg {
        fill: $theme-gray-d3;
      }
    }
    &:hover,
    &:focus {
      color: $theme-mint;
      .link-icon {
        transform: scale(1.2) rotateZ(-45deg);
        .link_svg {
          fill: $theme-mint;
        }
      }
    }
  }
}
</style>
