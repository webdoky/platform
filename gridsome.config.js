const excludedUrls = require('./noindex-urls');
const tailwindcss = require('tailwindcss');
// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'WebDoky',
  icon: {
    favicon: './src/assets/favicon.png',
    touchicon: './src/assets/favicon.png',
  },
  siteUrl: process.env.GRIDSOME_BASE_PATH
    ? process.env.GRIDSOME_BASE_PATH
    : 'https://example.com',
  settings: {
    web: process.env.URL_WEB || false,
    twitter: process.env.URL_TWITTER || false,
    github: process.env.URL_GITHUB || false,
    localeName: 'en-US',
    nav: {
      links: [
        {
          path: `/${process.env.TARGET_LOCALE}/docs/Web/`,
          title: 'Технології',
        },
        { path: '/docs/', title: 'Про проєкт' },
      ],
    },
    sidebar: [
      {
        name: 'docs',
        sections: [
          {
            title: 'Про проєкт',
            items: [
              '/docs/',
              '/docs/translation/',
              '/docs/translating-in-github/',
              '/docs/git-naming-conventions/',
              '/docs/glossary/',
              '/docs/licensing/',
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content',
        path: '**/*.md',
        typeName: 'MarkdownPage',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['noopener', 'noreferrer'],
          plugins: ['@gridsome/remark-prismjs'],
        },
      },
    },

    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          // Prevent purging of prism classes.
          whitelistPatternsChildren: [/token$/],
        },
      },
    },

    process.env.GOOGLE_ANALYTICS_ID && {
      use: 'gridsome-plugin-gtag',
      options: {
        config: {
          id: process.env.GOOGLE_ANALYTICS_ID,
        },
      },
    },

    {
      use: '@gridsome/plugin-sitemap',
      options: {
        exclude: excludedUrls,
      },
    },

    {
      use: 'gridsome-plugin-typescript',
    },

    // {
    //   use: 'gridsome-plugin-bundle-analyzer',
    //   options: {
    //     onlyProduction: true, // only production bundle will be analyzed by default
    //     analyzerOptions: {}, // see https://github.com/webpack-contrib/webpack-bundle-analyzer
    //   },
    // },
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
  },
};
