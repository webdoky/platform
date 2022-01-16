<template>
  <div
    class="relative"
    @keydown.down="increment"
    @keydown.up="decrement"
    @keydown.enter="go"
  >
    <label class="relative block">
      <span class="sr-only">Пошук в документації</span>
      <div
        class="
          absolute
          inset-y-0
          left-0
          flex
          items-center
          justify-center
          px-3
          py-2
          opacity-50
        "
      >
        <SearchIcon size="1.4" class="text-ui-typo" />
      </div>
      <input
        ref="input"
        type="search"
        :value="query"
        class="
          block
          w-full
          py-2
          pl-10
          pr-4
          border-2
          rounded-lg
          bg-ui-sidebar
          border-ui-sidebar
          focus:bg-ui-background
        "
        :class="{ 'rounded-b-none': showResult }"
        placeholder="Пошук в документації..."
        @focus="focused = true"
        @blur="focused = false"
        @input="
          focusIndex = -1;
          query = $event.target.value;
        "
        @change="query = $event.target.value"
      />
    </label>
    <div
      v-if="showResult"
      class="
        fixed
        inset-x-0
        z-50
        overflow-y-auto
        border-2 border-t-0
        rounded-lg rounded-t-none
        shadow-lg
        results
        bg-ui-background
        bottom:0
        sm:bottom-auto sm:absolute
        border-ui-sidebar
      "
      style="max-height: calc(100vh - 120px)"
    >
      <ul class="px-4 py-2 m-0">
        <li v-if="results.length === 0" class="px-2">
          Немає результату для запиту <span class="font-bold">{{ query }}</span
          >.
        </li>

        <li
          v-for="(result, index) in results"
          v-else
          :key="result.path"
          class="border-ui-sidebar"
          :class="{
            'border-b': index + 1 !== results.length,
          }"
          @mouseenter="focusIndex = index"
          @mousedown="go"
        >
          <g-link
            :to="result.path"
            class="block p-2 -mx-2 text-base font-bold rounded-lg"
            :class="{
              'bg-ui-sidebar text-ui-primary': focusIndex === index,
            }"
          >
            <span class="flex items-center">
              {{ result.title }}
              <ChevronRightIcon size="1.3" class="mx-1" />
              <span class="font-normal opacity-75">{{ result.path }}</span>
            </span>
          </g-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<static-query>
query Search {
  allMarkdownPage {
    edges {
      node {
        path
        title
      }
    }
  }
  allMdnPage {
    edges {
      node {
        path
        title
        hasContent
      }
    }
  }
}
</static-query>

<script>
import Fuse from 'fuse.js';
import SearchIcon from '@/components/icons/Search';
import ChevronRightIcon from '@/components/icons/ChevronRight';

export default {
  components: {
    ChevronRightIcon,
    SearchIcon,
  },

  data() {
    return {
      query: '',
      focusIndex: -1,
      focused: false,
    };
  },
  computed: {
    results() {
      const fuse = new Fuse(this.headings, {
        keys: ['title', 'path'],
        threshold: 0.25,
      });

      return fuse.search(this.query).slice(0, 15);
    },
    headings() {
      let result = [];
      const allDocPages = this.$static.allMarkdownPage.edges.map(
        (edge) => edge.node
      );

      const allMdnPages = this.$static.allMdnPage.edges
        .map((edge) => edge.node)
        .filter((node) => node.hasContent); // filter out pages, that are not translated yet

      // Create the array of all headings of all pages.
      [...allDocPages, ...allMdnPages].forEach((page) => {
        result.push({
          path: page.path,
          title: page.title,
        });
      });

      return result;
    },
    showResult() {
      // Show results, if the input is focused and the query is not empty.
      return this.focused && this.query.length > 0;
    },
  },
  methods: {
    increment() {
      if (this.focusIndex < this.results.length - 1) {
        this.focusIndex++;
      }
    },
    decrement() {
      if (this.focusIndex >= 0) {
        this.focusIndex--;
      }
    },
    go() {
      // Do nothing if we don't have results.
      if (this.results.length === 0) {
        return;
      }

      let result;

      // If we don't have focus on a result, just navigate to the first one.
      if (this.focusIndex === -1) {
        result = this.results[0];
      } else {
        result = this.results[this.focusIndex];
      }

      this.$router.push(result.path);

      // Unfocus the input and reset the query.
      this.$refs.input.blur();
      this.query = '';
    },
  },
};
</script>

<style></style>
