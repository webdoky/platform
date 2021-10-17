<template>
  <tr>
    <td>
      <a v-if="anchor" :href="`#${title}`" class="underline"> {{ title }} </a>
      <span v-if="!anchor">{{ title }}</span>
    </td>
    <td>{{ allPageCount }}</td>
    <td class="doc-status--translated">
      {{ translatedPageCount }} ({{ translatedPagePercent }}%)
    </td>
    <td
      class="doc-status--translated doc-status--up-to-date line-through"
      title="Наразі числа в цій колонці не відповідають дійсності"
    >
      {{ translationsUpToDateCount }} ({{ translationsUpToDatePercent }}%)
    </td>
    <td class="doc-status--not-translated">
      {{ allPageCount - translatedPageCount }} ({{
        100 - translatedPagePercent
      }}%)
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    anchor: {
      type: String,
      default: '',
    },
    allPages: {
      type: Array,
      default: () => {},
    },
  },
  computed: {
    allPageCount() {
      return this.allPages.length;
    },
    translatedPageCount() {
      return this.allPages.filter((node) => node.content).length;
    },
    translatedPagePercent() {
      return ((this.translatedPageCount / this.allPageCount) * 100).toFixed(2);
    },
    translationsUpToDateCount() {
      return this.allPages.filter(
        (node) => node.sourceLastUpdatetAt < node.translationLastUpdatedAt
      ).length;
    },
    translationsUpToDatePercent() {
      return (
        (this.translationsUpToDateCount / this.allPageCount) *
        100
      ).toFixed(2);
    },
  },
};
</script>

