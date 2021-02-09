const zh = [
  // NavbarItem
  { text: '首页', link: '/zh/' },
  { text: '指南', link: '/zh/guide/' },
  {
    text: '参考',
    children: [
      {
        text: 'VuePress',
        children: [
          '/zh/reference/cli.md',
          '/zh/reference/config.md',
          '/zh/reference/frontmatter.md',
          '/zh/reference/components.md',
          '/zh/reference/plugin-api.md',
          '/zh/reference/theme-api.md',
          '/zh/reference/client-api.md',
          '/zh/reference/node-api.md'
        ]
      },
      {
        text: '打包工具',
        children: ['/zh/reference/bundler/webpack.md', '/zh/reference/bundler/vite.md']
      },
      {
        text: '默认主题',
        children: [
          '/zh/reference/default-theme/config.md',
          '/zh/reference/default-theme/frontmatter.md',
          '/zh/reference/default-theme/components.md',
          '/zh/reference/default-theme/markdown.md'
        ]
      },
      {
        text: '官方插件',
        link: '/zh/reference/plugin/',
        children: []
      }
    ]
  },
  {
    text: '了解更多',
    children: [
      {
        text: '深入',
        children: [
          '/zh/guide/advanced/architecture.md',
          '/zh/guide/advanced/plugin.md',
          '/zh/guide/advanced/theme.md',
          '/zh/guide/advanced/markdown.md'
        ]
      },
      {
        text: '其他资源',
        children: [
          '/zh/contributing.md',
          {
            text: '更新日志',
            link: 'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md'
          },
          {
            text: 'Awesome VuePress',
            link: 'https://github.com/vuepress/awesome-vuepress'
          },
          {
            text: 'v1 文档',
            link: 'https://v1.vuepress.vuejs.org/zh/'
          },
          {
            text: 'v0 文档',
            link: 'https://v0.vuepress.vuejs.org/zh/'
          }
        ]
      }
    ]
  },
  {
    text: '后端记录',
    children: [
      { text: 'C#', link: '/zh/server/C#/' },
      { text: 'NodeJS', link: '/zh/server/NodeJS/' },
      { text: 'Java', link: '/zh/server/Java/' }
    ]
  },
  {
    text: '前端记录',
    children: [
      { text: 'Web', link: '/zh/client/Web/' },
      { text: 'WPF', link: '/client/WPF/' },
      { text: 'iOS', link: '/zh/client/iOS/' },
      { text: 'Android', link: '/zh/client/Android/' }
    ]
  },
  // 字符串 - 页面文件路径
  { text: '关于', link: '/about/' }
]

module.exports = {
  zh
}
