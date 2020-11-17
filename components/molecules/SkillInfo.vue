<template lang="pug">
  .skill-info
    .skill-info-icon
      component(:is="skill.icon").icon-svg
    .skill-info-data
      .skill-info-level
        .skill-info-level-bar(
          :style="{ width: `${skill.level}%`}"
        )
      .skill-info-pre-name.name-text(v-if="skill.preName") {{ skill.preName }}
      .skill-info-name.name-text(v-if="skill.name") {{ skill.name }}
      .skill-info-sub-name.name-text(v-if="skill.subName") {{ skill.subName }}
</template>
<script lang="ts">
import Vue from 'vue'
import AfterEffectsSvg from '~/assets/svgs/skills/afterEffects.svg?inline'
import ArduinoSvg from '~/assets/svgs/skills/arduino.svg?inline'
import AviUtlSvg from '~/assets/svgs/skills/aviutl.svg?inline'
import ClipStudioPaintSvg from '~/assets/svgs/skills/clipstudio_paint.svg?inline'
import Css3Svg from '~/assets/svgs/skills/css3.svg?inline'
import DessinSvg from '~/assets/svgs/skills/dessin.svg?inline'
import FigmaSvg from '~/assets/svgs/skills/figma.svg?inline'
import GitSvg from '~/assets/svgs/skills/git.svg?inline'
import Html5Svg from '~/assets/svgs/skills/html5.svg?inline'
import IllustratorSvg from '~/assets/svgs/skills/illustrator.svg?inline'
import IndesignSvg from '~/assets/svgs/skills/indesign.svg?inline'
import JavascriptSvg from '~/assets/svgs/skills/javascript.svg?inline'
import PhotoshopSvg from '~/assets/svgs/skills/photoshop.svg?inline'
import PythonSvg from '~/assets/svgs/skills/python.svg?inline'
import TypescriptSvg from '~/assets/svgs/skills/typescript.svg?inline'

type SkillInfoInterface = {
  type: string
  preName: string
  name: string
  subName: string
  level: string
  icon: string
}

export default Vue.extend({
  components: {
    AfterEffectsSvg,
    ArduinoSvg,
    AviUtlSvg,
    ClipStudioPaintSvg,
    Css3Svg,
    DessinSvg,
    FigmaSvg,
    GitSvg,
    Html5Svg,
    IllustratorSvg,
    IndesignSvg,
    JavascriptSvg,
    PhotoshopSvg,
    PythonSvg,
    TypescriptSvg
  },
  props: {
    skill: {
      type: Object as () => SkillInfoInterface,
      default: () => {}
    }
  }
})
</script>
<style lang="scss" scoped>
@import '~/assets/style/_skills.scss';

.skill-info {
  margin: 24px $skill-info_margin-left-right;
  width: $skill-info_width;
  height: 64px;
  @include flex($justifyContent: flex-start);
  &:hover {
    .name-text {
      color: $theme-mint;
    }
  }
}
.skill-info-icon {
  width: $skill-info-icon_width;
  height: $skill-info-icon_width;
  flex-shrink: 0;
  .icon-svg {
    display: block;
  }
}
.skill-info-data {
  padding-left: $skill-info-data_padding-left;
}
.skill-info-level {
  width: $skill-info-level_width;
  height: 2px;
  background: $light-gray-d1;
  margin-bottom: 8px;
}
.skill-info-level-bar {
  background: $theme-mint;
  height: 2px;
}

.name-text {
  transition: 0.2s $bezier-fast-ease-out;
}

.skill-info-pre-name {
  @include noto($size: 14px, $color: $theme-gray-d3);
}
.skill-info-name {
  @include noto($size: 20px, $color: $theme-gray-d3);
  line-height: 1.2;
}
.skill-info-sub-name {
  @include noto($size: 14px, $color: $theme-gray-d3);
}
</style>
