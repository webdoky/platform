<template>
  <div
    ref="sidebar"
    v-if="showSidebar"
    class="px-4 pt-8 lg:pt-12"
  >
    <nav-css v-if="showSidebar === 'CSSRef'" :allPages="allPages" :currentPage="currentPage" />
  </div>
</template>

<script>
import NavCss from '@/components/NavCss.vue';

export default {
  components: {
    NavCss,
  },
  props: ['showSidebar', 'allPages', 'currentPage'], 
};
</script>
