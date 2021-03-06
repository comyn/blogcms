const en = [
  { text: '首页', link: '/' },
  { text: 'Guide', link: '/guide/' },
  {
    text: 'Reference',
    children: [
      {
        text: 'VuePress',
        children: [
          {
            text: 'CLI',
            link: '/reference/cli.html'
          },
          '/reference/config.md',
          '/reference/frontmatter.md',
          '/reference/components.md',
          '/reference/plugin-api.md',
          '/reference/theme-api.md',
          '/reference/client-api.md',
          '/reference/node-api.md'
        ]
      },
      {
        text: 'Bundlers',
        children: ['/reference/bundler/webpack.md', '/reference/bundler/vite.md']
      },
      {
        text: 'Default Theme',
        children: [
          '/reference/default-theme/config.md',
          '/reference/default-theme/frontmatter.md',
          '/reference/default-theme/components.md',
          '/reference/default-theme/markdown.md'
        ]
      },
      {
        text: 'Official Plugins',
        link: '/reference/plugin/',
        children: []
      }
    ]
  },
  {
    text: 'Learn More',
    children: [
      {
        text: 'Advanced',
        children: ['/guide/advanced/architecture.md', '/guide/advanced/plugin.md', '/guide/advanced/theme.md', '/guide/advanced/markdown.md']
      },
      {
        text: 'Resources',
        children: [
          '/contributing.md',
          {
            text: 'Changelog',
            link: 'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md'
          },
          {
            text: 'Awesome VuePress',
            link: 'https://github.com/vuepress/awesome-vuepress'
          },
          {
            text: 'v1 docs',
            link: 'https://v1.vuepress.vuejs.org'
          },
          {
            text: 'v0 docs',
            link: 'https://v0.vuepress.vuejs.org'
          }
        ]
      }
    ]
  },
  {
    text: '后端记录',
    children: [
      { text: 'C#', link: '/server/C#/' },
      { text: 'NodeJS', link: '/server/NodeJS/' },
      { text: 'Java', link: '/server/Java/' }
    ]
  },
  {
    text: '前端记录',
    children: [
      { text: 'Web', link: '/client/Web/' },
      { text: 'WPF', link: '/client/WPF/' },
      { text: 'iOS', link: '/client/iOS/' },
      { text: 'Android', link: '/client/Android/' }
    ]
  }
]
module.exports = {
  en
}
