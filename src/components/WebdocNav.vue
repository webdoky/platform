<template>
  <div
    ref="sidebar"
    v-if="showSidebar"
    class="px-4 pt-8 lg:pt-12"
  >
    <nav-css v-if="showSidebar === 'CSSRef'" :allPages="allPages" :currentPage="currentPage" />
    <nav-js v-if="showSidebar === 'JsSidebar'" :allPages="allPages" :currentPage="currentPage" />
  </div>
</template>

<script>
import NavCss from '@/components/NavCss.vue';
import NavJs from '@/components/NavJs.vue';

export default {
  components: {
    NavCss,
    NavJs
  },
  props: ['showSidebar', 'allPages', 'currentPage'], 
};
</script>
