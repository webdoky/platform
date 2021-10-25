<template>
  <table class="table table-bordered w-full doc-status__table">
    <thead>
      <tr>
        <th v-if="includePopularity">Рейтинг</th>
        <th>Сторінка</th>
        <th>Оригінал</th>
        <th>Дії</th>
      </tr>
    </thead>
    <tbody>
      <TranslationStatusRow
        v-for="page in pages"
        :id="page.path"
        :key="page.path"
        :page="page"
        :include-popularity="includePopularity"
      />
    </tbody>
  </table>
</template>

<script>
import TranslationStatusRow from '@/components/TranslationStatusRow.vue';

export default {
  components: {
    TranslationStatusRow,
  },
  props: {
    pages: {
      type: Array,
      default: () => {},
    },
    includePopularity: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

