<template>
  <div class="font-sans antialiased text-ui-typo bg-ui-background">
    <div class="flex flex-col justify-start min-h-screen">
      <header
        ref="header"
        class="
          sticky
          top-0
          z-10
          w-full
          border-b
          bg-ui-background
          border-ui-border
        "
        @resize="setHeaderHeight"
      >
        <LayoutHeader />
      </header>

      <slot />
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import LayoutHeader from '@/components/LayoutHeader';

export default {
  components: {
    LayoutHeader,
  },
  data() {
    return {
      headerHeight: 0,
    };
  },
  mounted() {
    this.setHeaderHeight();
  },
  methods: {
    setHeaderHeight() {
      this.$nextTick(() => {
        this.headerHeight = this.$refs.header.offsetHeight;
      });
    },
  },
  metaInfo() {
    return {
      meta: [
        {
          key: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          key: 'og:locale',
          property: 'og:locale',
          content: 'uk-UA',
        },
        {
          key: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          key: 'og:image',
          name: 'og:image',
          content: process.env.GRIDSOME_BASE_PATH + '/logo.png',
        },
        {
          key: 'twitter:image',
          name: 'twitter:image',
          content: process.env.GRIDSOME_BASE_PATH + '/logo.png',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
:root {
  --color-ui-background: theme('colors.white');
  --color-ui-typo: theme('colors.gray.700');
  --color-ui-sidebar: theme('colors.gray.200');
  --color-ui-sidebar-lighter-1: theme('colors.gray.50');
  --color-ui-border: theme('colors.gray.300');
  --color-ui-primary: theme('colors.indigo.600');
  --color-ui-footer: theme('colors.gray.100');
  --color-ui-primary-lighter-1: theme('colors.indigo.300');

  --color-ui-warning: theme('colors.yellow.100');
  --color-ui-warning-border: theme('colors.yellow.500');
  --color-ui-note: theme('colors.indigo.100');
  --color-ui-note-border: theme('colors.indigo.500');
  --color-ui-deprecated: theme('colors.red.100');
  --color-ui-deprecated-border: theme('colors.red.500');
  --color-ui-supported: rgba(16, 195, 109, 0.2);
}

html[lights-out] {
  --color-ui-background: theme('colors.gray.900');
  --color-ui-typo: theme('colors.gray.100');
  --color-ui-sidebar: theme('colors.gray.800');
  --color-ui-sidebar-lighter-1: theme('colors.gray.700');
  --color-ui-primary-lighter-1: theme('colors.indigo.300');
  --color-ui-border: theme('colors.gray.800');
  --color-ui-primary: theme('colors.indigo.500');
  --color-ui-footer: theme('colors.gray.700');

  --color-ui-warning: theme('colors.yellow.900');
  --color-ui-warning-border: theme('colors.yellow.600');
  --color-ui-note: theme('colors.indigo.900');
  --color-ui-note-border: theme('colors.indigo.600');
  --color-ui-deprecated: theme('colors.red.900');
  --color-ui-deprecated-border: theme('colors.red.600');
  --color-ui-supported: rgba(16, 195, 109, 0.45);

  pre[class*='language-'],
  code[class*='language-'] {
    @apply bg-ui-border;
  }
}

* {
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}

h1,
h2,
h3,
h4 {
  @apply leading-snug font-black mb-4 text-ui-typo;

  &:hover {
    a::before {
      @apply opacity-100;
    }
  }

  a {
    &::before {
      content: '#';
      margin-left: -1em;
      padding-right: 1em;
      @apply text-ui-primary absolute opacity-0 float-left;
    }
  }
}

h1 {
  @apply text-4xl;
}

h2 {
  @apply text-2xl;
}

h3 {
  @apply text-xl;
}

h4 {
  @apply text-lg;
}

a:not(.active):not(.text-ui-primary):not(.text-white) {
  @apply text-ui-typo;
}

p,
ol,
ul,
pre,
strong,
blockquote {
  @apply mb-4 text-base text-ui-typo;
}

.content {
  a {
    @apply text-ui-primary underline;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply -mt-12 pt-20;
  }

  h2 + h3,
  h2 + h2,
  h3 + h3 {
    @apply border-none -mt-20;
  }

  h2,
  h3 {
    @apply border-b border-ui-border pb-1 mb-3;
  }

  ul {
    @apply list-disc;

    ul {
      list-style: circle;
    }
  }

  ol {
    @apply list-decimal;
  }

  ol,
  ul {
    @apply pl-5 py-1;

    li {
      @apply mb-2;

      p {
        @apply mb-0;
      }

      &:last-child {
        @apply mb-0;
      }
    }
  }

  dl dd {
    margin: 0 1.5em;
  }
}

blockquote {
  @apply border-l-4 border-ui-border py-2 pl-4;

  p:last-child {
    @apply mb-0;
  }
}

code {
  @apply px-1 py-1 text-ui-typo bg-ui-sidebar font-mono border-b border-r border-ui-border text-sm rounded;
}

pre[class*='language-'] {
  z-index: 0;
  @apply max-w-full overflow-x-auto rounded;

  & + p {
    @apply mt-4;
  }

  & > code[class*='language-'] {
    @apply border-none leading-relaxed;
  }
}

header {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
}

footer {
  a {
    @apply text-ui-primary underline;
  }
}

table {
  @apply text-left mb-6;

  td,
  th {
    @apply py-3 px-4;
    &:first-child {
      @apply pl-0;
    }
    &:last-child {
      @apply pr-0;
    }
  }

  tr {
    @apply border-b border-ui-border;
    &:last-child {
      @apply border-b-0;
    }
  }
}

.badge__inline svg {
  @apply inline mr-1;
}

.badge__inline.badge__readonly,
.badge__inline.badge__optional {
  @apply px-1 py-1 bg-ui-sidebar border-b border-r border-ui-border text-sm rounded font-bold italic;
}

.sidebar {
  @apply fixed bg-ui-background px-4 inset-x-0 bottom-0 w-full border-r border-ui-border overflow-y-auto transition-all z-40;
  transform: translateX(-100%);

  &.open {
    transform: translateX(0);
  }

  @screen lg {
    @apply w-1/4 px-0 bg-transparent top-0 bottom-auto inset-x-auto sticky z-0;
    transform: translateX(0);
  }
}

// notecards
.notecard__warning,
.notecard__note,
.notecard__deprecated {
  @apply border-l-4 py-2 pl-4 pr-4 mb-4;

  h4 {
    @apply pt-0 mt-0 mb-1;
  }

  p:last-child {
    @apply mb-0;
  }
}

.notecard__deprecated {
  background: var(--color-ui-deprecated);
  border-color: var(--color-ui-deprecated-border);
}

.notecard__warning {
  background: var(--color-ui-warning);
  border-color: var(--color-ui-warning-border);
}

.notecard__note {
  background: var(--color-ui-note);
  border-color: var(--color-ui-note-border);
}

// spec table
.table--standard {
  @apply text-left mb-6 w-full;
  background: var(--color-ui-sidebar-lighter-1);

  td,
  th {
    &:first-child {
      @apply pl-2;
    }
    &:last-child {
      @apply pr-2;
    }
  }

  tbody tr {
    @apply border-t border-ui-border;
  }
}

// compatibility table
.bc__table-wrapper {
  overflow-x: auto;
  max-width: 100%;
}

.bc__table {
  background: var(--color-ui-sidebar-lighter-1);

  td,
  th {
    @apply py-2 px-2;
    font-weight: normal;

    &:nth-child(n + 2) {
      @apply border-l border-ui-border;
    }

    &:first-child {
      @apply pl-2;
    }
    &:last-child {
      @apply pr-2;
    }
  }

  .bc-platforms {
    span {
      @apply invisible inline-block w-0 h-0 overflow-hidden absolute;
    }

    th {
      text-align: center;
    }

    .bc-platform-desktop::after,
    .bc-platform-mobile::after {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }

    .bc-platform-desktop::after {
      background: url('/icons/computer-line.svg');
    }

    .bc-platform-mobile::after {
      background: url('/icons/smartphone-line.svg');
    }
  }

  .bc-browsers {
    span {
      @apply invisible inline-block w-0 h-0 overflow-hidden absolute;
    }

    th {
      text-align: center;
    }

    th::after {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
    .bc-browser-chrome::after,
    .bc-browser-chrome_android::after {
      background: url('/icons/chrome-line.svg');
    }
    .bc-browser-edge::after {
      background: url('/icons/edge-line.svg');
    }
    .bc-browser-firefox::after,
    .bc-browser-firefox_android::after {
      background: url('/icons/firefox-line.svg');
    }
    .bc-browser-ie::after {
      background: url('/icons/ie-fill.svg');
    }
    .bc-browser-opera::after,
    .bc-browser-opera_android::after {
      background: url('/icons/opera-fill.svg');
    }
    .bc-browser-safari::after,
    .bc-browser-safari_ios::after {
      background: url('/icons/ie-fill.svg');
    }
    .bc-browser-webview_android::after {
      background: url('/icons/android-line.svg');
    }
    .bc-browser-samsunginternet_android::after {
      background: url('/icons/samsung-internet.svg');
    }
  }

  tbody tr {
    @apply border-t border-ui-border;

    td {
      text-align: center;

      abbr {
        @apply invisible inline-block w-0 h-0 overflow-hidden absolute;
      }
    }
  }

  .bc-icons {
    @apply flex px-1 py-2;
  }

  .bc-icons span {
    @apply invisible inline-block w-0 h-0 overflow-hidden absolute;
  }

  .bc-browser-name {
    @apply invisible inline-block w-0 h-0 overflow-hidden absolute;
  }

  .bc-supports-yes {
    background: var(--color-ui-supported);
  }
  .bc-supports-no {
    background: var(--color-ui-deprecated);
  }
  .bc-supports-partial {
    background: var(--color-ui-deprecated);
    background: repeating-linear-gradient(
      130deg,
      var(--color-ui-deprecated),
      var(--color-ui-deprecated) 8px,
      var(--color-ui-supported) 8px,
      var(--color-ui-supported) 16px
    );
  }
}
</style>
