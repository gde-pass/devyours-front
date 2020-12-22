<template>
  <div class="btn-wrapper my-4 text-center">
    <social-button
      v-for="(icon, index) in icons"
      :key="icon[1] + index"
      :icon="icon"
      :color="colors[index]"
      :class="{ 'mr-2': index + 1 !== icons.length }"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { SocialButtonProps } from '~/components/atoms/SocialButton.vue'

export interface SocialButtonsProps {
  icons: Array<SocialButtonProps['icon']>
  colors: Array<SocialButtonProps['color']>
}

export default Vue.extend({
  props: {
    icons: {
      type: Array as () => SocialButtonsProps['icons'],
      default: (): SocialButtonsProps['icons'] => [
        ['fas', 'question'],
        ['fas', 'question'],
        ['fas', 'question'],
      ],
    },
    colors: {
      type: Array as () => SocialButtonsProps['colors'],
      default: (): SocialButtonsProps['colors'] => ['', '', ''],
    },
  },
})
</script>
