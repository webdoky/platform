<template>
  <div>
    <ul class="max-w-full pl-2 mb-0">
      <li
        v-for="page in generalLinks.items"
        :id="page.path"
        :key="page.path"
        :class="getClassesForAnchor(page)"
        @mousedown="$emit('navigate')"
      >
        <nav-item :page="page" :is-current="currentPage.path === page.path" />
      </li>
    </ul>
    <div
      v-for="(section, index) in quickLinksSections"
      :key="section.title"
      class="pb-4 mb-4 border-ui-border"
      :class="{ 'border-b': index < quickLinksSections.length - 1 }"
    >
      <nav-sub-menu :expanded="section.expanded">
        <template #header>{{ section.title }}</template>

        <ul class="max-w-full pl-2 mb-0">
          <li
            v-for="page in section.items"
            :id="page.path"
            :key="page.path"
            :class="getClassesForAnchor(page)"
            @mousedown="$emit('navigate')"
          >
            <nav-item
              :page="page"
              :is-current="currentPage.path === page.path"
            />
          </li>
        </ul>
      </nav-sub-menu>
    </div>

    <ul class="max-w-full pl-2 mb-0">
      <li
        v-for="page in refTitleLinks.items"
        :id="page.path"
        :key="page.path"
        :class="getClassesForAnchor(page)"
        @mousedown="$emit('navigate')"
      >
        <nav-item :page="page" :is-current="currentPage.path === page.path" />
      </li>
    </ul>
    <div
      v-for="(section, index) in refSections"
      :key="section.title"
      class="pb-4 mb-4 border-ui-border"
      :class="{ 'border-b': index < refSections.length - 1 }"
    >
      <nav-sub-menu :expanded="section.expanded">
        <template #header>{{ section.title }}</template>

        <ul class="max-w-full pl-2 mb-0">
          <li
            v-for="page in section.items"
            :id="page.path"
            :key="page.path"
            :class="getClassesForAnchor(page)"
            @mousedown="$emit('navigate')"
          >
            <nav-item
              :page="page"
              :is-current="currentPage.path === page.path"
            />
          </li>
        </ul>
      </nav-sub-menu>
    </div>
  </div>
</template>

<script>
import NavSubMenu from '@/components/NavSubMenu';
import NavItem from '@/components/NavItem';
import { JSRefLabels } from '../../kuma';

const locale = `en-US`;

export default {
  components: {
    NavSubMenu,
    NavItem,
  },
  props: ['allPages', 'currentPage'],
  computed: {
    pages() {
      return this.allPages.map(({ node }) => node);
    },
    generalLinks() {
      const pages = [
        {
          path: `/${locale}/docs/Web/JavaScript`,
          title: JSRefLabels['JavaScript'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Tutorials`,
          title: JSRefLabels['Tutorials'],
        },
      ];

      return {
        items: pages,
        expanded: pages.find(({ path }) => path === this.currentPage.path),
      };
    },
    quickLinksSections() {
      const completeBeginners = [
        {
          path: `/${locale}/docs/Learn/Getting_started_with_the_web/JavaScript_basics`,
          title: JSRefLabels['Basics'],
        },
        {
          path: `/${locale}/docs/Learn/JavaScript/First_steps`,
          title: JSRefLabels['First_steps'],
        },
        {
          path: `/${locale}/docs/Learn/JavaScript/Building_blocks`,
          title: JSRefLabels['Building_blocks'],
        },
        {
          path: `/${locale}/docs/Learn/JavaScript/Objects`,
          title: JSRefLabels['Introducing_objects'],
        },
      ];

      const guide = [
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Introduction`,
          title: JSRefLabels['Guide_Introduction'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Grammar_and_Types`,
          title: JSRefLabels['Guide_Grammar'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Control_flow_and_error_handling`,
          title: JSRefLabels['Guide_Control_flow'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Loops_and_iteration`,
          title: JSRefLabels['Guide_Loops'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Functions`,
          title: JSRefLabels['Guide_Functions'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Expressions_and_Operators`,
          title: JSRefLabels['Guide_Expressions'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Numbers_and_dates`,
          title: JSRefLabels['Guide_Numbers'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Text_formatting`,
          title: JSRefLabels['Guide_Text'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Regular_Expressions`,
          title: JSRefLabels['Guide_RegExp'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Indexed_collections`,
          title: JSRefLabels['Guide_Indexed_collections'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Keyed_collections`,
          title: JSRefLabels['Guide_keyed_collections'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Working_with_Objects`,
          title: JSRefLabels['Guide_Objects'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Details_of_the_Object_Model`,
          title: JSRefLabels['Guide_OOP'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Using_promises`,
          title: JSRefLabels['Guide_promises'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Iterators_and_generators`,
          title: JSRefLabels['Guide_Iterators_Generators'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Meta_programming`,
          title: JSRefLabels['Guide_Meta'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Guide/Modules`,
          title: JSRefLabels['Guide_Modules'],
        },
      ];

      const intermediate = [
        {
          path: `/${locale}/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks`,
          title: JSRefLabels['Frameworks'],
        },
        {
          path: `/${locale}/docs/Learn/JavaScript/Client-side_web_APIs`,
          title: JSRefLabels['Client-side_APIs'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/A_re-introduction_to_JavaScript`,
          title: JSRefLabels['Re-introduction'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Data_structures`,
          title: JSRefLabels['Data_structures'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Equality_comparisons_and_sameness`,
          title: JSRefLabels['Equality'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Closures`,
          title: JSRefLabels['Closures'],
        },
      ];

      const advanced = [
        {
          path: `/${locale}/docs/Web/JavaScript/Inheritance_and_the_prototype_chain`,
          title: JSRefLabels['Inheritance'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Reference/Strict_mode`,
          title: JSRefLabels['Strict_mode'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Typed_arrays`,
          title: JSRefLabels['Typed_arrays'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Memory_Management`,
          title: JSRefLabels['Memory_Management'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/EventLoop`,
          title: JSRefLabels['Event_Loop'],
        },
      ];

      return [
        {
          title: JSRefLabels['Complete_beginners'],
          items: completeBeginners,
          expanded: completeBeginners.find(
            ({ path }) => path === this.currentPage.path
          ),
        },
        {
          title: JSRefLabels['Guide'],
          items: guide,
          expanded: guide.find(({ path }) => path === this.currentPage.path),
        },
        {
          title: JSRefLabels['Intermediate'],
          items: intermediate,
          expanded: intermediate.find(
            ({ path }) => path === this.currentPage.path
          ),
        },
        {
          title: JSRefLabels['Advanced'],
          items: advanced,
          expanded: advanced.find(({ path }) => path === this.currentPage.path),
        },
      ];
    },
    refTitleLinks() {
      const pages = [
        {
          path: `/${locale}/docs/Web/JavaScript/Reference`,
          title: JSRefLabels['Reference'],
        },
      ];

      return {
        items: pages,
        expanded: pages.find(({ path }) => path === this.currentPage.path),
      };
    },
    refSections() {
      const jsPages = this.pages.filter(
        ({ path }) => path.indexOf('/en-US/docs/Web/JavaScript/Reference/') >= 0
      );

      const globalObjectsPages = jsPages.filter(
        ({ path }) =>
          path.indexOf('/en-US/docs/Web/JavaScript/Reference/Global_Objects') >=
          0
      );
      const operatorsPages = jsPages.filter(
        ({ path }) =>
          path.indexOf('/en-US/docs/Web/JavaScript/Reference/Operators') >= 0
      );
      const statementsPages = jsPages.filter(
        ({ path }) =>
          path.indexOf('/en-US/docs/Web/JavaScript/Reference/Statements') >= 0
      );
      const functionsPages = jsPages.filter(
        ({ path }) =>
          path.indexOf('/en-US/docs/Web/JavaScript/Reference/Functions') >= 0
      );
      const classesPages = jsPages.filter(
        ({ path }) =>
          path.indexOf('/en-US/docs/Web/JavaScript/Reference/Classes') >= 0
      );
      const errorsPages = jsPages.filter(
        ({ path }) =>
          path.indexOf('/en-US/docs/Web/JavaScript/Reference/Errors') >= 0
      );

      const morePages = [
        {
          path: `/${locale}/docs/Web/JavaScript/JavaScript_technologies_overview`,
          title: JSRefLabels['Overview'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Reference/Lexical_grammar`,
          title: JSRefLabels['Lexical_grammar'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Data_structures`,
          title: JSRefLabels['Data_structures'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Enumerability_and_ownership_of_properties`,
          title: JSRefLabels['Enumerability'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Reference/Iteration_protocols`,
          title: JSRefLabels['Iteration_protocols'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Reference/Strict_mode`,
          title: JSRefLabels['Strict_mode'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode`,
          title: JSRefLabels['Transitioning_to_strict_mode'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Reference/Template_literals`,
          title: JSRefLabels['Template_strings'],
        },
        {
          path: `/${locale}/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features`,
          title: JSRefLabels['Deprecated_features'],
        },
      ];

      return [
        {
          title: JSRefLabels['Global_Objects'],
          items: globalObjectsPages,
          expanded: globalObjectsPages.find(
            ({ path }) => path === this.currentPage.path
          ),
        },
        {
          title: JSRefLabels['Operators'],
          items: operatorsPages,
          expanded: operatorsPages.find(
            ({ path }) => path === this.currentPage.path
          ),
        },
        {
          title: JSRefLabels['Statements'],
          items: statementsPages,
          expanded: statementsPages.find(
            ({ path }) => path === this.currentPage.path
          ),
        },
        {
          title: JSRefLabels['Functions'],
          items: functionsPages,
          expanded: functionsPages.find(
            ({ path }) => path === this.currentPage.path
          ),
        },
        {
          title: JSRefLabels['Classes'],
          items: classesPages,
          expanded: classesPages.find(
            ({ path }) => path === this.currentPage.path
          ),
        },
        {
          title: JSRefLabels['Errors'],
          items: errorsPages,
          expanded: errorsPages.find(
            ({ path }) => path === this.currentPage.path
          ),
        },
        {
          title: JSRefLabels['More'],
          items: morePages,
          expanded: morePages.find(
            ({ path }) => path === this.currentPage.path
          ),
        },
      ];
    },
  },
  methods: {
    getClassesForAnchor({ path }) {
      return {
        'text-ui-primary': this.currentPage.path === path,
        'transition transform hover:translate-x-1 hover:text-ui-primary':
          !this.currentPage.path === path,
      };
    },
  },
};
</script>
