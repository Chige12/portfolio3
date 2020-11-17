<template lang="pug">
  .about-links
    .about-links-wrapper
      .about-link.first(
        v-for="(link, linkKey) in linksFirst"
        :key="`about-links-first-${linkKey}`"
      )
        a(:href="link.link")
          component(:is="link.component").link-svg
        .about-link-hover-box(:style="{ backgroundColor: link.color}")
          .about-link-hover-box-wrapper
            .about-link-title {{link.name}}
            .about-link-discription {{link.discription}}
    .about-links-wrapper
      .about-link.second(
        v-for="(link, linkKey) in linksSecond"
        :key="`about-links-second-${linkKey}`"
      )
        a(:href="link.link")
          component(:is="link.component").link-svg
        .about-link-hover-box(:style="{ backgroundColor: link.color}")
          .about-link-hover-box-wrapper
            .about-link-title {{link.name}}
            .about-link-discription {{link.discription}}
</template>
<script lang="ts">
import Vue from 'vue'
import TwitterSvg from '~/assets/svgs/links/twitter.svg?inline'
import GithubSvg from '~/assets/svgs/links/github.svg?inline'
import FacebookSvg from '~/assets/svgs/links/facebook.svg?inline'
import SpeakerDeckSvg from '~/assets/svgs/links/speaker_deck.svg?inline'
import TumblrSvg from '~/assets/svgs/links/tumblr.svg?inline'
import HatenaBlogSvg from '~/assets/svgs/links/hatena_blog.svg?inline'
import ScrapBoxSvg from '~/assets/svgs/links/scrapbox.svg?inline'
import VimeoSvg from '~/assets/svgs/links/vimeo.svg?inline'
import PixivSvg from '~/assets/svgs/links/pixiv.svg?inline'
import YoutubeSvg from '~/assets/svgs/links/youtube.svg?inline'

type Data = {
  linksFirst: Array<{
    name: string
    discription: string
    component: string
    link: string
    color: string
  }>
  linksSecond: Array<{
    name: string
    discription: string
    component: string
    link: string
    color: string
  }>
}

export default Vue.extend({
  components: {
    TwitterSvg,
    GithubSvg,
    FacebookSvg,
    SpeakerDeckSvg,
    TumblrSvg,
    ScrapBoxSvg,
    HatenaBlogSvg,
    VimeoSvg,
    PixivSvg,
    YoutubeSvg
  },
  data(): Data {
    return {
      linksFirst: [
        {
          name: 'Twitter @chige12_',
          discription: '主な生息地です。フォローしてね',
          component: 'TwitterSvg',
          link: 'https://twitter.com/chige12_',
          color: '#55acee'
        },
        {
          name: 'GitHub',
          discription: '草生やすぞ！！！',
          component: 'GithubSvg',
          link: 'https://github.com/Chige12',
          color: '#231815'
        },
        {
          name: 'Facebook',
          discription: '低浮上',
          component: 'FacebookSvg',
          link: 'https://www.facebook.com/chige12f',
          color: '#455a9e'
        }
      ],
      linksSecond: [
        {
          name: 'Speaker Deck',
          discription: '過去の発表スライドを公開しています',
          component: 'SpeakerDeckSvg',
          link: 'https://speakerdeck.com/chige',
          color: '#009287'
        },
        {
          name: 'Tumblr',
          discription: '作ったロゴや短い映像を投稿しています',
          component: 'TumblrSvg',
          link: 'https://chige12.tumblr.com/',
          color: '#001834'
        },
        {
          name: 'Hatena Blog | 鍋はすき焼きが好き',
          discription: '自分のブログ。デザインの話が人気。',
          component: 'HatenaBlogSvg',
          link: 'http://chige.hatenablog.com/',
          color: '#38393c'
        },
        {
          name: 'Scrapbox',
          discription: '技術や知見のメモ',
          component: 'ScrapBoxSvg',
          link: 'https://scrapbox.io/chige12memo/',
          color: '#00B52F'
        },
        {
          name: 'Vimeo',
          discription: '過去に作った映像を一部公開しています',
          component: 'VimeoSvg',
          link: 'https://vimeo.com/chige',
          color: '#32b8e8'
        },
        {
          name: 'Pixiv',
          discription: '趣味で描いている絵を投稿しています',
          component: 'PixivSvg',
          link: 'https://www.pixiv.net/users/7409815/illustrations',
          color: '#0096fa'
        },
        {
          name: 'YouTube',
          discription: 'マイクラのレッドストーン回路解説などをしています',
          component: 'YoutubeSvg',
          link: 'https://www.youtube.com/channel/UCtxSRt0BuGqiaZblOVXIPGw',
          color: '#ff0000'
        }
      ]
    }
  }
})
</script>
<style lang="scss" scoped>
.about-links {
  width: 80%;
  margin: auto;
  margin-top: 64px;
}
.about-links-wrapper {
  @include flex($justifyContent: center);
}

.link-svg {
  display: block;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0px 0px 0px rgba($theme-gray-d2, 0.4);
  transition: 0.2s $bezier-fast-ease-out;
}

.about-link-hover-box {
  @include absolute($left: 50%, $bottom: 64px);
  margin-left: 0px;
  width: 0px;
  color: $white;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s $bezier-fast-ease-out;
  &-wrapper {
    width: 320px;
    padding: 16px 24px;
  }
}
.about-link-title {
  @include noto($size: 16px, $color: $white, $weight: $font-bold);
}
.about-link-discription {
  @include noto($size: 14px, $color: $white);
}

.about-link {
  position: relative;
  margin: 32px 48px;
  &:hover {
    .link-svg {
      transform: scale(1.2);
      box-shadow: 0px 0px 16px rgba($theme-gray-d2, 0.6);
    }
    .about-link-hover-box {
      opacity: 1;
      margin-left: -160px;
      width: 320px;
    }
  }
}
</style>
