<template>
  <div class="m-6">
    <div class="container text-center">
      <button class="btn btn-primary m-2" @click="toggle">
        Connected: {{ isConnected }}
      </button>
      <p>{{ $t('welcome') }}</p>
      <nuxt-link
        v-for="locale in availableLocales"
        :key="locale.code"
        class="btn btn-primary m-2"
        :to="switchLocalePath(locale.code)"
        >{{ locale.name }}</nuxt-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { mapMutations, mapGetters } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  name: 'Index',
  computed: {
    ...mapGetters({ isConnected: 'user/getStatus' }),
    availableLocales() {
      return this.$i18n.locales?.filter(
        (locale) => locale !== this.$i18n.locale
      )
    },
  },
  methods: {
    ...mapMutations({
      toggle: 'user/toggle',
    }),
  },
})
</script>
