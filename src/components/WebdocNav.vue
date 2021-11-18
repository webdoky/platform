<template>
  <div v-if="sidebar.length" class="px-4 pt-8 lg:pt-12">
    <div
      v-for="(supSection, i) in navigationStructure"
      :key="`${i}_${supSection.title}`"
    >
      <WdNavMenu v-if="!supSection.groupItems" :sup-section="supSection" />
      <div v-if="supSection.groupItems" class="pt-1">
        <h2 class="text-base tracking-tight mt-2">{{ supSection.title }}:</h2>
        <WdNavMenu
          v-for="(subGroup, j) in supSection.groupItems"
          :key="`${j}_${subGroup.title}`"
          :sup-section="subGroup"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WdNavMenu from '@/components/WdNavMenu';

export default {
  components: {
    WdNavMenu,
  },
  props: {
    sidebar: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Object,
      required: true,
    },
  },
  computed: {
    navigationStructure() {
      return JSON.parse(this.currentPage.macros[0].result || '[]');
    },
  },
};
</script>
