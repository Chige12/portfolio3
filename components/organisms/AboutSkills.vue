<template lang="pug">
  .about-skills
    .skill-box
      .skill-box-type Cording Skills
      .skill-box-list
        SkillInfo(
          v-for="(skill, skillKey) in cordingSkills"
          :key="`cording-skill-${skillKey}`"
          :skill="skill"
        )
    .skill-box
      .skill-box-type Design Skills
      .skill-box-list
        SkillInfo(
          v-for="(skill, skillKey) in designSkills"
          :key="`design-skill-${skillKey}`"
          :skill="skill"
        )
</template>
<script lang="ts">
import Vue from 'vue'
import SkillInfo from '~/components/molecules/SkillInfo.vue'
import skillJson from '~/assets/json/skills.json'

type Data = {}

export default Vue.extend({
  components: {
    SkillInfo
  },
  data(): Data {
    return {
      skills: skillJson
    }
  },
  computed: {
    cordingSkills() {
      const cordingSkills = this.skills.filter((x: any) => {
        return x.type === 'cording'
      })
      return cordingSkills
    },
    designSkills() {
      return this.skills.filter((x: any) => {
        return x.type === 'design'
      })
    }
  }
})
</script>
<style lang="scss" scoped>
@import '~/assets/style/_skills.scss';

.about-skills {
  @include flex($justifyContent: center, $alignItems: stretch);
  width: 100%;
  margin: 120px 0;
}
.skill-box {
  margin: 0 32px;
  width: ($skill-info_width + $skill-info_margin-left-right) * 2;
}
.skill-box-type {
  text-align: center;
  @include roboto($size: 20px, $color: $theme-gray-d2);
}

.skill-box-list {
  @include flex($wrap: wrap, $justifyContent: flex-start);
  margin: 0 -$skill-info_margin-left-right;
  margin-top: 32px;
}
</style>
