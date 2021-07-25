<template>
  <Layout>
      <div class="flex flex-wrap items-start justify-start">

        <div class="order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky" style="top: 4rem">
          <!-- <MdnOnThisPage /> -->
        </div>

        <div class="order-1 w-full md:w-2/3">
          <div class="content">
            <h1>{{$page.mdnPage.title}}</h1>
            <div v-html="$page.mdnPage.content" />
          </div>

          <div class="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-ui-border">
            <!-- <NextPrevLinks /> -->
          </div>
        </div>

      </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  mdnPage(id: $id) {
    id
    title
    slug
    tags
    content
    browser_compat
  }
  allMdnPage{
    edges {
      node {
        path
        slug
        title
      }
    }
  }
}
</page-query>

<script>
import MdnOnThisPage from '@/components/MdnOnThisPage.vue';
import NextPrevLinks from '@/components/NextPrevLinks.vue';

export default {
  components: {
    MdnOnThisPage,
    NextPrevLinks
  },
  
  metaInfo() {
    const title = this.$page.mdnPage.title;
    const description = '';

    return {
      title: title,
      meta: [
        {
          name: 'description',
          content: description
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
      ]
    }
  }
}
</script>

<style>
@import 'prism-themes/themes/prism-material-oceanic.css';
</style>