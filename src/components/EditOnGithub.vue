<template>
  <div class="highlight-block mt-8 pt-5 pb-5 pl-5 pr-5 mb-8 rounded">
    <h3>Помітили помилку на цій сторінці?</h3>
    <p>
      <a
        class="underline"
        :href="sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Переглянути сирці на GitHub</a
      >.
    </p>
    <p>
      <a
        class="underline"
        :href="`https://github.com/webdoky/content/edit/master/files/uk${currentPage.originalPath}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        Редагувати вміст на GitHub</a
      >.
    </p>
    <p class="mb-0">
      <a
        class="underline"
        :href="newIssueUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Завести issue на GitHub стосовно вмісту цієї сторінки</a
      >.
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    currentPage: {
      type: Object,
      required: true,
    },
  },
  computed: {
    newIssueUrl() {
      const url = new URL('https://github.com/webdoky/content/issues/new');
      const bodySections = [
        `URL: ${process.env.GRIDSOME_BASE_PATH}${this.currentPage.path}`,
        '#### Яка саме інформація є невірною, не корисною, чи неповною?\n',
        '#### Конкретний розділ чи заголовок?\n',
        '#### Як вона має виглядати натомість?\n',
        '#### Якісь конкретні дії, які допоможуть нам відтворити цю проблему?\n',
      ];
      const params = {
        body: bodySections.join('\n\n'),
        labels: ['needs-triage', 'content'],
        title: `Проблема з сторінкою ${this.currentPage.title}: <короткий опис проблеми тут>`,
      };

      Object.entries(params).map(([param, value]) =>
        url.searchParams.set(param, value)
      );

      return url.toString();
    },
    sourceUrl() {
      return `https://github.com/webdoky/content/tree/master/files/uk${this.currentPage.originalPath}`;
    },
  },
};
</script>

<style lang="scss">
.highlight-block {
  border: 1px solid var(--color-ui-primary-lighter-1);
  background: var(--color-ui-sidebar-lighter-1);
}
</style>