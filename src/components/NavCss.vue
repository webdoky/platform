<template>
  <div>
    <h2 class="pt-0 mt-0 mb-4 text-base tracking-tight uppercase border-none">Довідник</h2>
    <div
      v-for="(section, index) in sections"
      :key="section.title"
      class="pb-4 mb-4 border-ui-border"
      :class="{ 'border-b': index < sections.length -1 }"
    >
      <nav-sub-menu :expanded="section.expanded">
        <template v-slot:header>{{ section.title }}</template>

        <ul class="max-w-full pl-2 mb-0">
          <li
            v-for="page in section.items"
            :id="page.path"
            :key="page.path"
            :class="getClassesForAnchor(page)"
            @mousedown="$emit('navigate')"
          >
            <nav-item :page="page" :is-current="currentPage.path === page.path" />
          </li>
        </ul>
      </nav-sub-menu>
    </div>
  </div>
</template>

<script>
import NavSubMenu from '@/components/NavSubMenu';
import NavItem from '@/components/NavItem';

export default {
  components: {
    NavSubMenu,
    NavItem
  },
  props: ['allPages', 'currentPage'],  
  computed: {
    pages() {
      return this.allPages.map(({node}) => node);
    },
    sections() {
        const cssPages = this.pages.filter(({path}) => path.indexOf('/en-US/docs/Web/CSS') >= 0);
        const standardPages = cssPages.filter(({tags}) => !tags.includes("Non-standard"));

        const groups = standardPages.filter(({tags}) => tags.includes("Overview"));
        const properties = standardPages.filter(({tags}) => tags.includes("CSS Property"));
        const selectors = standardPages.filter(({tags}) => (tags.includes("Selector") && !tags.includes("Pseudo-element") && !tags.includes("Pseudo-class")));
        const pseudoClasses = standardPages.filter(({tags}) => tags.includes("Pseudo-class"));
        const pseudoElements = standardPages.filter(({tags}) => tags.includes("Pseudo-element"));
        const atRules = standardPages.filter(({tags}) => tags.includes("At-rule"));
        const types = standardPages.filter(({tags}) => tags.includes("CSS Data Type"));

        return [
            {
            title: 'Модулі',
            items: groups,
            expanded: groups.find(({path}) => path === this.currentPage.path)
            },{
            title: 'Властивості',
            items: properties,
            expanded: properties.find(({path}) => path === this.currentPage.path)
            },{
            title: 'Селектори',
            items: selectors,
            expanded: selectors.find(({path}) => path === this.currentPage.path),
            },{
            title: 'Псевдокласи',
            items: pseudoClasses,
            expanded: pseudoClasses.find(({path}) => path === this.currentPage.path),
            },{
            title: 'Псевдоелементи',
            items: pseudoElements,
            expanded: pseudoElements.find(({path}) => path === this.currentPage.path),
            },{
            title: 'Анотації',
            items: atRules,
            expanded: atRules.find(({path}) => path === this.currentPage.path),
            },{
            title: 'Типи',
            items: types,
            expanded: types.find(({path}) => path === this.currentPage.path),
            },
        ]
    },
  },
  methods: {
    getClassesForAnchor({ path }) {
      return {
        "text-ui-primary": this.currentPage.path === path,
        "transition transform hover:translate-x-1 hover:text-ui-primary": ! this.currentPage.path === path
      };
    },
  },
};
</script>
