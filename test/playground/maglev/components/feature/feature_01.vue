<script setup lang="ts">
import { PropType } from 'vue'
import { Feature01Section } from '~~/maglev/types'

defineProps({
  section: {
    type: Object as PropType<Feature01Section>,
    required: true
  }
})
</script>

<template>
  <div class="text-white bg-gray-900" :data-maglev-section-id="section.id">
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="max-w-xl">
        <h2 :data-maglev-id="section.settings.title.domId" class="text-3xl font-bold sm:text-4xl">
          {{ section.settings.title.value }}
        </h2>

        <div :data-maglev-id="section.settings.body.domId" class="mt-4 text-gray-300" v-html="section.settings.body.value" />
      </div>

      <div
        class="grid grid-cols-1 gap-8 mt-8 md:gap-12 md:mt-16 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="block in section.blocks"
          :key="block.id"
          class="flex items-start"
          :data-maglev-block-id="block.id"
        >
          <span class="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-gray-800 rounded-lg">
            <i :class="['text xl', block.settings.icon.value]" :data-maglev-id="block.settings.icon.domId" />
          </span>
          <div class="ml-4">
            <h3 :data-maglev-id="block.settings.name.domId">
              {{ block.settings.name.value }}
            </h3>
            <p class="mt-1 text-sm text-gray-300" :data-maglev-id="block.settings.description.domId" v-html="block.settings.description.value" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
