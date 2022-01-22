<template>
  <tr>
    <td v-if="includePopularity">
      {{ page.popularity }}
    </td>
    <td
      :class="{
        'doc-status--not-translated': !page.hasContent,
        'doc-status--translated': page.hasContent,
        'doc-status--up-to-date': !page.updatesInOriginalRepo.length,
      }"
    >
      <div class="flex flex-row justify-between">
        <p :class="`mb-0 ${includePopularity ? '' : 'pl-4'}`">
          <a
            class="underline"
            :href="page.path"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ page.title }}</a
          >
          <span v-if="page.updatesInOriginalRepo.length"
            >, (нові зміни:
            <a
              v-for="(commit, index) in page.updatesInOriginalRepo"
              :key="commit"
              :href="`https://github.com/mdn/content/commit/${
                commit.split(' - ')[0]
              }`"
            >
              {{
                `${commit.slice(0, 7)}${
                  page.updatesInOriginalRepo.length - 1 > index ? ',' : ''
                }`
              }} </a
            >)
          </span>
        </p>
        <a
          v-if="page.hasContent"
          class="underline px-2"
          title="Переглянути сирці перекладеної сторінки на GitHub"
          :href="`https://github.com/webdoky/content/tree/master/files/uk${page.originalPath}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon :size="1.7"
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
          <GlobeIcon :size="1.7" /></a
        ><a
          class="underline px-2"
          title="Переглянути сирці оригінальної статті на GitHub"
          :href="`https://github.com/mdn/content/blob/main/files/en-us${page.originalPath}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon :size="1.7" />
        </a>
      </div>
    </td>
    <td>
      <CopyToClipboard
        v-if="page.updatesInOriginalRepo.length"
        :text="listOfChanges"
        :classes="'px-2'"
        :title="'Скопіювати перелік комітів зі змінами'"
      >
        <CopyIcon :size="1.7" />
      </CopyToClipboard>
      <CopyToClipboard
        v-if="!page.hasContent"
        :text="bashCommand"
        :classes="'px-2'"
        :title="'Скопіювати bash скрипт для ініціалізації файлу перекладу (скопіювати і виконати в корені репозиторію)'"
      >
        <TerminalIcon :size="1.7" />
      </CopyToClipboard>
    </td>
  </tr>
</template>

<script>
import CopyIcon from '@/components/icons/Copy';
import GlobeIcon from '@/components/icons/Globe';
import GithubIcon from '@/components/icons/Github';
import TerminalIcon from '@/components/icons/Terminal';
import CopyToClipboard from '@/components/CopyToClipboard.vue';

export default {
  components: {
    GithubIcon,
    TerminalIcon,
    GlobeIcon,
    CopyToClipboard,
    CopyIcon,
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
    listOfChanges() {
      const {
        page: { title, path, updatesInOriginalRepo: updates },
      } = this;

      const changes = updates
        ? `(нові зміни: ${updates
            .map(
              (commit) =>
                `[${commit.slice(
                  0,
                  7
                )}](https://github.com/mdn/content/commit/${
                  commit.split(' - ')[0]
                })`
            )
            .join(', ')})`
        : '';

      return `[${title}](${path})${changes ? `, ${changes}` : ''}`;
    },
  },
};
</script>

