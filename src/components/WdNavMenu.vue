<template>
  <div>
    <h2
      v-if="supSection.title"
      class="pt-0 mt-0 mb-4 text-base tracking-tight uppercase border-none"
    >
      {{ supSection.title }}
    </h2>
    <ul
      v-if="supSection.links && supSection.links.length"
      class="max-w-full pl-2 mb-2"
    >
      <li
        v-for="link in supSection.links"
        :id="link.path"
        :key="link.path"
        :class="{
          'text-ui-primary': link.isCurrent,
          'transition transform hover:translate-x-1 hover:text-ui-primary':
            !link.isCurrent,
        }"
      >
        <nav-item :page="link" :is-current="link.isCurrent" />
      </li>
    </ul>
    <div
      v-for="(section, index) in supSection.sections"
      :key="section.title"
      class="pb-4 mb-4 border-ui-border"
      :class="{ 'border-b': index < supSection.sections.length - 1 }"
    >
      <nav-sub-menu
        :expanded="!!section.expanded"
        :show-header="!!section.title"
      >
        <template #header>{{ section.title }}</template>

        <ul class="max-w-full pl-2 mb-0">
          <li
            v-for="page in section.items"
            :id="page.path"
            :key="page.path"
            :class="{
              'text-ui-primary': page.isCurrent,
              'transition transform hover:translate-x-1 hover:text-ui-primary':
                !page.isCurrent,
            }"
            @mousedown="$emit('navigate')"
          >
            <nav-item :page="page" :is-current="page.isCurrent" />
          </li>
        </ul>
      </nav-sub-menu>
    </div>
  </div>
</template>

<script>
import NavSubMenu from '@/components/WdNavSubMenu';
import NavItem from '@/components/WdNavItem';

export default {
  components: {
    NavSubMenu,
    NavItem,
  },
  props: {
    supSection: {
      type: Object,
      required: true,
    },
  },
};
</script>
