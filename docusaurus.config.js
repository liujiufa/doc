const math = require('remark-math')
const katex = require('rehype-katex')
require('dotenv').config()

module.exports = {
  customFields: {
    // Analytics proxy URL
    analyticsProxyUrl: process.env.REACT_APP_AMPLITUDE_PROXY_URL,
    // Determines if staging env
    stagingEnv: process.env.REACT_APP_STAGING,
    // From node
    nodeEnv: process.env.NODE_ENV,
  },
  title: 'HABITAT',
  tagline: 'Documentation and Guides',
  url: 'http://192.168.2.109:3000/',
  baseUrl: '/doc/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/favicon.png',
  themeConfig: {
    image: 'img/twitter_card_bg.jpg',
    prism: {
      additionalLanguages: ['solidity'],
    },
    algolia: {
      apiKey: '32465e2ab6f7554ff014e64c0d92171c',
      indexName: 'v3-docs',
      appId: 'S0IDD0YGLZ',
    },
    navbar: {
      title: 'HABITAT Docs',
      logo: {
        alt: 'HABITAT Unicorn',
        src: 'img/logo1.svg',
      },
      items: [
        {
          to: '/concepts/NFT/overview',
          label: 'NFT介绍',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/contracts/v1/guides/connect-to-uniswap',
          label: 'NFT交易',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/sdk/v1/overview',
          label: '加密钱包',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/api/v1/overview',
          label: '区块gas费',
          position: 'left',
          className: 'V3_active',
        },
      ],
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: true,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          id: 'contracts',
          path: 'docs/contracts',
          routeBasePath: 'contracts/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          editUrl: 'https://github.com/uniswap/uniswap-docs/tree/main/',
          includeCurrentVersion: true,
        },
        blog: {
          remarkPlugins: [math],
          rehypePlugins: [katex],
          path: 'blog/',
          blogTitle: 'Engineering Blog',
          blogSidebarCount: 0,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
          customCss2: require.resolve('./src/css/colors.css'),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  plugins: [
    ['@saucelabs/theme-github-codeblock', {}],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'sdk',
        path: 'docs/sdk',
        routeBasePath: 'sdk',
        remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]],
        includeCurrentVersion: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'docs/api',
        routeBasePath: 'api/',
        remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]],
        includeCurrentVersion: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'concepts',
        path: 'docs/concepts',
        routeBasePath: 'concepts/',
        remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]],
        includeCurrentVersion: true,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // 1/9/23 V3 SDK Guide Redirects
          // {
          //   to: '/sdk/v3/guides/background',
          //   from: '/sdk/v3/guides/quick-start',
          // },
          // {
          //   to: '/sdk/v3/guides/quoting',
          //   from: ['/sdk/v3/guides/creating-a-pool', '/sdk/v3/guides/fetching-prices'],
          // },
          // {
          //   to: '/sdk/v3/guides/trading',
          //   from: '/sdk/v3/guides/creating-a-trade',
          // },
          // {
          //   to: '/sdk/v3/guides/routing',
          //   from: '/sdk/v3/guides/auto-router',
          // },
          // {
          //   to: '/sdk/v3/guides/liquidity/modifying-position',
          //   from: ['/sdk/v3/guides/liquidity/adding', '/sdk/v3/guides/liquidity/removing'],
          // },
        ],
        createRedirects(existingPath) {
          // v3-sdk Redirects
          // if (existingPath.includes('/sdk/v3/overview')) {
          //   return [existingPath.replace('/sdk/v3/overview', '/sdk/introduction')]
          // }
          // if (existingPath.includes('/sdk/v3/guides')) {
          //   return [existingPath.replace('/sdk/v3/guides', '/sdk/guides')]
          // }
          // swap-widgets Redirects
          if (existingPath.includes('/sdk/swap-widget/overview')) {
            return [existingPath.replace('/sdk/swap-widget/overview', '/sdk/widgets/swap-widget')]
          }
          if (existingPath.includes('/sdk/swap-widget/reference/v2')) {
            return [existingPath.replace('/sdk/swap-widget/reference/v2', '/sdk/widgets/swap-widget/api')]
          }
          if (existingPath.includes('/concepts')) {
            return [existingPath.replace('/concepts', '/protocol/concepts')]
          }

          // Return a falsy value: no redirect created
          return undefined
        },
      },
    ],
  ],
}
