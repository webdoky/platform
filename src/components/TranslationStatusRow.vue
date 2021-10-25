<template>
  <tr>
    <td v-if="includePopularity">
      {{ page.popularity }}
    </td>
    <td
      :class="{
        'doc-status--not-translated': !page.content,
        'doc-status--translated': page.content,
        'doc-status--up-to-date':
          page.sourceLastUpdatetAt < page.translationLastUpdatedAt,
      }"
    >
      <div class="flex flex-row justify-between">
        <a
          class="underline pl-4"
          :href="page.path"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ page.title }}</a
        >
        <a
          v-if="page.content"
          class="underline px-2"
          title="Переглянути сирці перекладеної сторінки на GitHub"
          :href="`https://github.com/webdoky/content/tree/master/files/uk${page.originalPath}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon size="1.5x"
        /></a>
      </div>
    </td>
    <td class="pt-2 pb-2">
      <div class="flex flex-row">
        <a
          class="underline px-2"
          title="Переглянути оригінальний текст на MDN"
          :href="`https://developer.mozilla.org/en-US/docs/${page.slug}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GlobeIcon size="1.5x" /></a
        ><a
          class="underline px-2"
          title="Переглянути сирці оригінальної статті на GitHub"
          :href="`https://github.com/mdn/content/blob/main/files/en-us${page.originalPath}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon size="1.5x" />
        </a>
      </div>
    </td>
    <td>
      <CopyToClipboard
        v-if="!page.content"
        :text="bashCommand"
        :classes="'px-2'"
        :title="'Скопіювати bash скрипт для ініціалізації файлу перекладу (скопіювати і виконати в корені репозиторію)'"
      >
        <TerminalIcon size="1.5x" />
      </CopyToClipboard>
    </td>
  </tr>
</template>

<script>
import { GithubIcon, TerminalIcon, GlobeIcon } from 'vue-feather-icons';
import CopyToClipboard from '@/components/CopyToClipboard.vue';

export default {
  components: {
    GithubIcon,
    TerminalIcon,
    GlobeIcon,
    CopyToClipboard,
  },

  props: {
    page: {
      type: Object,
      default: () => {},
    },
    includePopularity: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    linkToRawOriginalGithubContent() {
      return `https://raw.githubusercontent.com/mdn/content/main/files/en-us${this.page.originalPath}`;
    },
    bashCommand() {
      const baseRepoPath = 'files/uk';
      const tree = this.page.originalPath
        .replace('/index.html', '')
        .replace('/index.md', '');

      return `mkdir -p ${baseRepoPath}${tree} && wget -O ${baseRepoPath}${this.page.originalPath} ${this.linkToRawOriginalGithubContent}`;
    },
  },
};
</script>

