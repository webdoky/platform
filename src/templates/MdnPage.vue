<template>
  <WebdocPageLayout>
    <aside
      v-if="$page.mdnPage.hasSidebar"
      class="sidebar"
      :class="{ open: sidebarOpen }"
      :style="sidebarStyle"
    >
      <div class="w-full pb-16 bg-ui-background">
        <WebdocNav
          :show-sidebar="$page.mdnPage.hasSidebar"
          :all-pages="$page.allMdnPage.edges"
          :current-page="$page.mdnPage"
          @navigate="sidebarOpen = false"
        />
      </div>
    </aside>

    <div
      class="w-full pb-24"
      :class="{ 'pl-0 lg:pl-12 lg:w-3/4': $page.mdnPage.hasSidebar }"
    >
      <div class="flex flex-wrap items-start justify-start">
        <div
          v-if="$page.mdnPage.content"
          class="order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky"
          style="top: 4rem"
        >
          <MdnOnThisPage />
        </div>

        <div class="order-1 w-full md:w-2/3">
          <div class="content">
            <h1>{{ $page.mdnPage.title }}</h1>
            <div v-if="$page.mdnPage.content" v-html="$page.mdnPage.content" />
            <div v-if="!$page.mdnPage.content">
              <p>
                Схоже, що ми іще не переклали цей розділ. Скористайтеся цим
                посиланням, щоб перейти на оригінальну версію ціє статті в MDN.
              </p>
              <a
                :href="`${mdnUrlPrefix}${$page.mdnPage.slug}`"
                target="_blank"
                rel=" noopener"
                >{{ $page.mdnPage.title }}</a
              >
            </div>
          </div>

          <div class="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-ui-border">
            <!-- <NextPrevLinks /> -->
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="$page.mdnPage.hasSidebar"
      class="fixed bottom-0 right-0 z-50 p-8 lg:hidden"
    >
      <button
        class="
          p-3
          text-white
          rounded-full
          shadow-lg
          bg-ui-primary
          hover:text-white
        "
        @click="sidebarOpen = !sidebarOpen"
      >
        <XIcon v-if="sidebarOpen" />
        <MenuIcon v-else />
      </button>
    </div>
  </WebdocPageLayout>
</template>

<page-query>
query ($id: ID!) {
  mdnPage(id: $id) {
    id
    title
    slug
    tags
    path
    headings {
      depth
      value
      anchor
    }
    content
    hasSidebar
    browser_compat
  }
  allMdnPage {
    edges {
      node {
        path
        slug
        tags
        title
      }
    }
  }
}
</page-query>

<script>
import MdnOnThisPage from '@/components/MdnOnThisPage.vue';
import NextPrevLinks from '@/components/NextPrevLinks.vue';
import { MenuIcon, XIcon } from 'vue-feather-icons';
import WebdocNav from '@/components/WebdocNav.vue';

export default {
  components: {
    MdnOnThisPage,
    NextPrevLinks,
    WebdocNav,
    MenuIcon,
    XIcon,
  },
  data() {
    return {
      sidebarOpen: false,
    };
  },
  computed: {
    sidebarStyle() {
      return {
        top: this.headerHeight + 'px',
        height: `calc(100vh - ${this.headerHeight}px)`,
      };
    },
    hasSidebar() {
      return this.$page && this.headerHeight > 0;
    },
    mdnUrlPrefix() {
      return 'https://developer.mozilla.org/en-US/docs/';
    },
  },
  watch: {
    sidebarOpen: function (isOpen) {
      document.body.classList.toggle('overflow-hidden', isOpen);
    },
  },

  metaInfo() {
    const title = this.$page.mdnPage.title;
    const description = '';

    return {
      title: title,
      meta: [
        {
          name: 'description',
          content: description,
        },
        {
          key: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          key: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          key: 'og:description',
          name: 'og:description',
          content: description,
        },
        {
          key: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import 'prism-themes/themes/prism-material-oceanic.css';

.sidebar {
  @apply fixed bg-ui-background px-4 inset-x-0 bottom-0 w-full border-r border-ui-border overflow-y-auto transition-all z-40;
  transform: translateX(-100%);

  &.open {
    transform: translateX(0);
  }

  @screen lg {
    @apply w-1/4 px-0 bg-transparent top-0 bottom-auto inset-x-auto sticky z-0;
    transform: translateX(0);
  }
}
</style>