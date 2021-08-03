<template>
  <div v-if="showSidebar" ref="sidebar" class="px-4 pt-8 lg:pt-12">
    <nav-css
      v-if="showSidebar === 'CSSRef'"
      :all-pages="allPages"
      :current-page="currentPage"
    />
    <nav-js
      v-if="showSidebar === 'JsSidebar'"
      :all-pages="allPages"
      :current-page="currentPage"
    />
    <nav-js-ref
      v-if="showSidebar === 'JSRef'"
      :all-pages="allPages"
      :current-page="currentPage"
    />
  </div>
</template>

<script>
import NavCss from '@/components/NavCss.vue';
import NavJs from '@/components/NavJs.vue';
import NavJsRef from './NavJsRef.vue';

export default {
  components: {
    NavCss,
    NavJs,
    NavJsRef,
  },
  props: ['showSidebar', 'allPages', 'currentPage'],
};
</script>
