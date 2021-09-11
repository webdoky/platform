<template>
  <Layout>
    <div class="pt-8 md:pt-16">
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center mb-2 text-ui-primary">
          <Logo :width="80" />
          <h2 class="text-3xl text-6xl font-black tracking-tighter border-none">
            WebDoky
          </h2>
        </div>
        <h1 class="text-4xl text-center lg:text-5xl">
          Ресурси і документація. <br />
          Від розробників — для розробників
        </h1>
        <div class="flex justify-space-between p-2">
          <a
            class="p-2 mx-5 border-b border-ui-border"
            :href="`/${targetLocale}/docs/Web/JavaScript`"
            >JavaScript &#8594;</a
          >
          <a
            class="p-2 mx-5 border-b border-ui-border"
            :href="`/${targetLocale}/docs/Web/CSS`"
            >CSS &#8594;</a
          >
          <a
            class="p-2 mx-5 border-b border-ui-border"
            :href="`/${targetLocale}/docs/Web/HTML`"
            >HTML &#8594;</a
          >
        </div>
      </div>

      <div
        class="
          pt-8
          mx-auto
          mt-8
          border-t
          md:mt-16 md:pt-16
          border-top border-ui-border
          max-w-screen-sm
        "
      ></div>

      <div class="section-info flex flex-wrap justify-center -mx-4">
        <div class="flex flex-col w-full px-4 mb-8 md:w-2/3">
          <h3 class="font-bold tracking-wide uppercase mb-0 text-ui-primary">
            Що нового
          </h3>
          <p class="mb-0">
            Найсвіжіші оновлення з нашого
            <a
              href="https://github.com/webdoky/content/"
              target="_blank"
              rel="noopener noreferrer"
              >репозиторію</a
            >
          </p>
          <div class="border-ui-border w-1/4 border-b mb-5 mt-1"></div>

          <div
            v-for="(edge, index) in $page.allChangelog.edges"
            :key="index"
            class="changelog"
            v-html="edge.node.content"
          />
        </div>

        <div class="flex flex-col w-full px-4 mb-8 md:w-1/3">
          <h3 class="font-bold tracking-wide uppercase text-ui-primary">
            Долучитись
          </h3>
          <p class="text-lg text-left">
            WebDoky — це відкритий проект, і будь-хто може долучитися і
            допомогти нам робити вебдокументацію доступною для україномовних
            читачів.
            <a href="/docs/">Докладніше — в розділі "Про проект"</a>
          </p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  allChangelog {
    edges {
      node {
        content
      }
    }
  }
}
</page-query>

<script>
import Logo from '@/components/Logo';

export default {
  components: {
    Logo,
  },

  metaInfo() {
    const title = 'Про веб, у вебі, для вебу';
    const description =
      'Проект Webdoky — це зібрання інформації про технології відкритого вебу. HTML, CSS, JavaScript, та API, як для вебсайтів, так і для прогресивних вебзастосунків';

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
  computed: {
    targetLocale() {
      return process.env.GRIDSOME_TARGET_LOCALE;
    },
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
.section-info a {
  text-decoration: underline;
}
.changelog li {
  margin-bottom: 0.5em;
}
</style>
