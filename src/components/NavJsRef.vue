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
      v-for="(section, index) in ownPropertiesAndMethods"
      :key="section.title"
      class="pb-4 mb-4 border-ui-border"
      :class="{ 'border-b': index < ownPropertiesAndMethods.length - 1 }"
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

    <h3
      v-if="
        functionInheritanceSections.length && objectInheritanceSections.length
      "
      class="pt-0 mt-0 mb-1 text-sm tracking-tight border-none"
    >
      Inheritance:
    </h3>
    <h3
      v-if="functionInheritanceSections.length"
      class="pt-0 mt-0 mb-1 text-sm tracking-tight border-none"
    >
      Function:
    </h3>
    <div
      v-for="(section, index) in functionInheritanceSections"
      :key="'function' + section.title"
      class="pb-4 mb-4 border-ui-border"
      :class="{ 'border-b': index < functionInheritanceSections.length - 1 }"
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
    <h3
      v-if="objectInheritanceSections.length"
      class="pt-0 mt-0 mb-1 text-sm tracking-tight border-none"
    >
      Object:
    </h3>
    <div
      v-for="(section, index) in objectInheritanceSections"
      :key="'object' + section.title"
      class="pb-4 mb-4 border-ui-border"
      :class="{ 'border-b': index < objectInheritanceSections.length - 1 }"
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
import { inheritanceData, groupData } from '../../kuma';

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
      const { objectName, pages } = this;
      const generalPages = [
        pages.find(
          ({ slug }) => slug === 'Web/JavaScript/Reference/Global_Objects'
        ),
        pages.find(
          ({ slug }) =>
            slug === `Web/JavaScript/Reference/Global_Objects/${objectName}`
        ),
      ];

      return {
        items: generalPages,
        expanded: generalPages.find(
          ({ path }) => path === this.currentPage.path
        ),
      };
    },
    objectName() {
      const { slug } = this.currentPage;
      let obj = slug
        .replace('Web/JavaScript/Reference/Global_Objects/', '')
        .split('/')[0];

      // TODO: generalize this?
      // Exceptions, we want the main object in the sidebar (e.g. Int8Array -> TypedArray)
      if (groupData['TypedArray'].indexOf(obj) != -1) {
        obj = 'TypedArray';
      }
      if (groupData['Error'].indexOf(obj) != -1) {
        obj = 'Error';
      }
      if (groupData['Proxy'].indexOf(obj) != -1) {
        obj = 'Proxy/handler';
      }

      return obj;
    },
    navigationStructure() {
      const {
        currentPage: { slug },
        objectName,
      } = this;

      const inheritance =
        inheritanceData[objectName] || inheritanceData.default;

      var group = [];
      for (let g in groupData) {
        var index = groupData[g].indexOf(objectName);
        if (index != -1) {
          group = groupData[g];
          group.splice(index, 1);
          break;
        }
      }

      const source = {};
      const result = {};
      const globalObjectsPages = this.pages.filter(
        ({ path }) =>
          path.indexOf('/en-US/docs/Web/JavaScript/Reference/Global_Objects') >=
          0
      );
      source[objectName] = globalObjectsPages.filter(
        ({ path }) =>
          path.indexOf(
            `/en-US/docs/Web/JavaScript/Reference/Global_Objects/${objectName}/`
          ) >= 0
      );
      result[objectName] = {
        title: objectName,
        methods: [],
        properties: [],
      };
      if (inheritance.indexOf('Function') > -1) {
        source['iFunction'] = globalObjectsPages.filter(
          ({ path }) =>
            path.indexOf(
              '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function'
            ) >= 0
        );
        result['iFunction'] = {
          title: 'Function',
          methods: [],
          properties: [],
        };
      }
      if (inheritance.indexOf('Object') > -1) {
        source['iObject'] = globalObjectsPages.filter(
          ({ path }) =>
            path.indexOf(
              '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object'
            ) >= 0
        );
        result['iObject'] = {
          title: 'Object',
          methods: [],
          properties: [],
        };
      }

      let pageList;
      let isObj;
      let includeme;

      for (let object in source) {
        pageList = source[object];
        if (object == 'iObject') {
          isObj = true;
        }
        for (let aPage in pageList) {
          includeme = isObj ? pageList[aPage].tags.includes('Prototype') : true;

          if (pageList[aPage].tags.includes('Property') && includeme) {
            result[object].properties.push(pageList[aPage]);
          }

          if (pageList[aPage].tags.includes('Method') && includeme) {
            result[object].methods.push(pageList[aPage]);
          }
        }
      }

      return result;
    },
    ownPropertiesAndMethods() {
      const { navigationStructure, objectName } = this;
      const { properties, methods } = navigationStructure[objectName];

      return [
        {
          title: 'properties',
          items: properties,
          expanded: properties.find(
            ({ path }) => path === this.currentPage.path
          ),
        },
        {
          title: 'methods',
          items: methods,
          expanded: methods.find(({ path }) => path === this.currentPage.path),
        },
      ];
    },
    objectInheritanceSections() {
      const { navigationStructure } = this;
      if (navigationStructure['iObject']) {
        const { properties: objectProperties, methods: objectMethods } =
          navigationStructure['iObject'];

        return [
          {
            title: 'properties',
            items: objectProperties,
            expanded: objectProperties.find(
              ({ path }) => path === this.currentPage.path
            ),
          },
          {
            title: 'methods',
            items: objectMethods,
            expanded: objectMethods.find(
              ({ path }) => path === this.currentPage.path
            ),
          },
        ];
      }

      return [];
    },
    functionInheritanceSections() {
      const { navigationStructure } = this;
      if (navigationStructure['iFunction']) {
        const { properties: functionProperties, methods: functionMethods } =
          navigationStructure['iFunction'];

        return [
          {
            title: 'properties',
            items: functionProperties,
            expanded: functionProperties.find(
              ({ path }) => path === this.currentPage.path
            ),
          },
          {
            title: 'methods',
            items: functionMethods,
            expanded: functionMethods.find(
              ({ path }) => path === this.currentPage.path
            ),
          },
        ];
      }

      return [];
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
