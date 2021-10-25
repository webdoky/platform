<template>
  <Layout>
    <div class="flex flex-wrap items-start justify-start">
      <!-- <div
        class="order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky"
        style="top: 4rem"
      >
        // TODO: OnThisPage
      </div> -->

      <div class="order-1 w-full md:w-2/3">
        <div class="content">
          <h1 id="пара-слів-про-нас">
            <a href="#Стан-перекладу-документації" aria-hidden="true"
              ><span class="icon icon-link"></span></a
            >Статус перекладу пріоритетних сторінок
          </h1>
          <p>
            <a href="/translation-status-general"
              >Перейти на огляд сторінок загалом</a
            >
          </p>
          <h2 id="як-зявився-цей-проєкт">
            <a href="#Огляд" aria-hidden="true"
              ><span class="icon icon-link"></span></a
            >Огляд
          </h2>
          <p>
            Популярність різних сторінок береться з аналітики MDN, де ця
            інформація застосовується для ранжування пошуку (докладніше про це
            <a href="https://github.com/mdn/yari/blob/main/docs/popularities.md"
              >тут</a
            >). Ми її використовуємо як орієнтир для вибору сторінок, які слід
            перекласти в першу чергу.
          </p>
          <p>
            Індекс популярності вже нормалізований, і коливається між 0 та 1.
            Більший рейтинг означає вищий пріоритет перекладу.
          </p>
          <p>
            Наразі тут показані сторінки з популярністю
            <strong>понад 1%</strong>
          </p>
          <table class="table table-bordered w-full doc-status__table">
            <thead>
              <tr>
                <th>Розділ</th>
                <th>Сторінки</th>
                <th>З них перекладено</th>
                <th>З них актуально</th>
                <th>Очікує на переклад</th>
              </tr>
            </thead>
            <tbody>
              <TranslationOverallStatusRow
                :all-pages="sections.css"
                :title="'CSS'"
                :anchor="'CSS'"
              />
              <TranslationOverallStatusRow
                :all-pages="sections.html"
                :title="'HTML'"
                :anchor="'HTML'"
              />
              <TranslationOverallStatusRow
                :all-pages="sections.javascript"
                :title="'JavaScript'"
                :anchor="'JavaScript'"
              />
              <TranslationOverallStatusRow
                :all-pages="sections.svg"
                :title="'SVG'"
                :anchor="'SVG'"
              />
              <TranslationOverallStatusRow
                :all-pages="sections.guide"
                :title="'Посібники'"
                :anchor="'Посібники'"
              />
              <TranslationOverallStatusRow
                :all-pages="allSupportedPages"
                :title="'Загалом'"
              />
            </tbody>
          </table>

          <h2 id="Стан-перекладу-за-розділами">
            <a href="#Стан-перекладу-за-розділами" aria-hidden="true"
              ><span class="icon icon-link"></span></a
            >Стан перекладу за розділами
          </h2>
          <h3 id="CSS">
            <a href="#CSS" aria-hidden="true"
              ><span class="icon icon-link"></span></a
            >CSS
          </h3>
          <TranslationStatusSection
            :pages="sections.css"
            :include-popularity="true"
          />

          <h3 id="HTML">
            <a href="#HTML" aria-hidden="true"
              ><span class="icon icon-link"></span></a
            >HTML
          </h3>
          <TranslationStatusSection
            :pages="sections.html"
            :include-popularity="true"
          />

          <h3 id="JavaScript">
            <a href="#JavaScript" aria-hidden="true"
              ><span class="icon icon-link"></span></a
            >JavaScript
          </h3>
          <TranslationStatusSection
            :pages="sections.javascript"
            :include-popularity="true"
          />

          <h3 id="SVG">
            <a href="#SVG" aria-hidden="true"
              ><span class="icon icon-link"></span></a
            >SVG
          </h3>
          <TranslationStatusSection
            :pages="sections.svg"
            :include-popularity="true"
          />

          <h3 id="Посібники">
            <a href="#Посібники" aria-hidden="true"
              ><span class="icon icon-link"></span></a
            >Посібники
          </h3>
          <TranslationStatusSection
            :pages="sections.guide"
            :include-popularity="true"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  allMdnPage(sortBy: "title", order: ASC) {
    edges {
      node {
        id
        title
        slug
        path
        section
        originalPath
        content
        sourceLastUpdatetAt
        translationLastUpdatedAt
      }
    }
  }
  allPopularity(sortBy: "popularity", order: DESC) {
    edges {
      node {
        link
        popularity
      }
    }
  }
}
</page-query>

<script>
import TranslationStatusSection from '@/components/TranslationStatusSection.vue';
import TranslationOverallStatusRow from '@/components/TranslationOverallStatusRow.vue';

const NUMBER_OF_SGNIFICANT_DIGITS = 2;

export default {
  components: {
    TranslationStatusSection,
    TranslationOverallStatusRow,
  },

  metaInfo() {
    const title = 'Про веб, у вебі, для вебу';
    const description =
      'Проєкт Webdoky — це зібрання інформації про технології відкритого вебу. HTML, CSS, JavaScript, та API, як для вебсайтів, так і для прогресивних вебзастосунків';

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
        {
          key: 'robots',
          name: 'robots',
          content: 'noindex,nofollow',
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: `${process.env.GRIDSOME_BASE_PATH}/`,
        },
      ],
    };
  },
  computed: {
    allPages() {
      return this.$page.allMdnPage.edges.map((node) => node.node);
    },
    pathToPagesMap() {
      return Object.fromEntries(this.allPages.map((page) => [page.path, page]));
    },
    allPopularities() {
      return this.$page.allPopularity.edges.map((node) => node.node);
    },
    sections() {
      const supportedSections = {
        css: [],
        html: [],
        javascript: [],
        svg: [],
        guide: [],
      };

      this.allPopularities.forEach((entry) => {
        const { link, popularity } = entry;
        const normalizedPopularity = popularity.toFixed(
          NUMBER_OF_SGNIFICANT_DIGITS
        );
        if (normalizedPopularity > 0) {
          const page = this.pathToPagesMap[link];
          if (page && page.section) {
            const { section } = page;
            supportedSections[section].push({
              ...page,
              popularity: normalizedPopularity,
            });
          }
        }
      });

      return supportedSections;
    },
    allSupportedPages() {
      const {
        css = [],
        html = [],
        javascript = [],
        svg = [],
        guide = [],
      } = this.sections;

      return [...css, ...html, ...javascript, ...svg, ...guide];
    },
  },
};
</script>

<style>
.doc-status__table .doc-status--not-translated {
  background-color: var(--color-intl-status-not-translated);
}
.doc-status__table .doc-status--translated {
  background-color: var(--color-intl-status-out-of-date);
}
.doc-status__table .doc-status--translated.doc-status--up-to-date {
  background-color: var(--color-intl-status-up-to-date);
}
</style>
