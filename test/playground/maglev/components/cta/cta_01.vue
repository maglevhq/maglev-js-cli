<script setup lang="ts">
import { PropType } from 'vue'
import { Cta01Section } from '~~/maglev/types'

defineProps({
  section: {
    type: Object as PropType<Cta01Section>,
    required: true
  }
})
</script>

<template>
  <aside class="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
    <div class="p-8 md:p-12 lg:px-16 lg:py-24">
      <div class="mx-auto max-w-xl text-center sm:text-left">
        <h2
          class="text-2xl font-bold text-gray-900 md:text-3xl"
          :data-maglev-id="`${section.settings.title.domId}`"
        >
          {{ section.settings.title.value }}
        </h2>

        <div
          class="hidden text-gray-500 md:mt-4 md:block"
          :data-maglev-id="section.settings.body.domId"
          v-html="section.settings.body.value"
        />

        <div class="mt-4 md:mt-8">
          <a
            href="#"
            class="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>

    <img
      :alt="section.settings.background_image.altText"
      :data-maglev-id="section.settings.background_image.domId"
      :src="section.settings.background_image.url"
      class="h-56 w-full object-cover sm:h-full"
    >
  </aside>
</template>
