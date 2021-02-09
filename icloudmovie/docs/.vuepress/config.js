// import { navbar, sidebar } from './configs'

module.exports = {
  base: '/', // 设置站点根路径
  dest: './ROOT', // 设置输出目录
  port: 8090,
  head: [],
  markdown: {
    lineNumbers: true // 代码块显示行号
  },

  locales: {
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US',
      title: 'ai cloud movie',
      description: 'Cloud World'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '爱云影',
      description: '云上世界'
    }
  },

  themeConfig: {
    // Public 文件路径
    logo: '/images/logo.png',

    // 如果你按照 `organization/repository` 的格式设置它
    // 我们会将它作为一个 GitHub 仓库
    repo: 'comyn/blogcms',
    // 如果你使用的不是 GitHub ，可以直接使用 URL
    // repo: 'https://gitlab.com/foo/bar'

    docsDir: 'docs',

    // URL
    // logo: 'https://vuejs.org/images/logo.png',
    locales: {
      '/': {
        selectLanguageName: 'English',

        // navbar
        navbar: [
          { text: 'Guide', link: '/guide/' },
          {
            text: 'Reference',
            children: [
              { text: 'VuePress', children: [{ text: 'CLI', link: '/reference/cli.html' }, '/reference/config.md', '/reference/node-api.md'] },
              { text: 'Bundlers', children: ['/reference/bundler/webpack.md', '/reference/bundler/vite.md'] },
              { text: 'Default Theme', children: ['/reference/default-theme/config.md', '/reference/default-theme/frontmatter.md'] },
              { text: 'Official Plugins', link: '/reference/plugin/', children: [] }
            ]
          },
          {
            text: '后端记录',
            children: [
              { text: 'VuePress', children: [{ text: 'CLI', link: '/reference/cli.html' }, '/reference/config.md', '/reference/frontmatter.md'] },
              { text: 'Bundlers', children: ['/reference/bundler/webpack.md', '/reference/bundler/vite.md'] },
              { text: 'Default Theme', children: ['/reference/default-theme/config.md', '/reference/default-theme/frontmatter.md'] },
              { text: 'Official Plugins', link: '/reference/plugin/', children: [] },
              { text: 'C#', link: '/server/CSharp/', children: [] },
              { text: 'NodeJS', link: '/server/NodeJS/', children: [] },
              { text: 'Java', link: '/server/Java/', children: ['/server/Java/test1.md', '/server/Java/test2.md'] }
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
        ],

        // sidebar
        sidebar: {
          '/guide/': [
            {
              isGroup: true,
              text: 'Guide',
              children: [
                '/guide/README.md',
                '/guide/getting-started.md',
                '/guide/configuration.md',
              ]
            }
          ],
          '/guide/advanced/': [
            {
              isGroup: true,
              text: 'Advanced',
              children: ['/guide/advanced/architecture.md', '/guide/advanced/plugin.md', '/guide/advanced/theme.md', '/guide/advanced/markdown.md']
            }
          ],
          '/reference/': [
            {
              isGroup: true,
              text: 'VuePress Reference',
              children: [
                '/reference/cli.md',
                '/reference/config.md',
                '/reference/frontmatter.md',
                '/reference/components.md',
                '/reference/plugin-api.md',
                '/reference/theme-api.md',
                '/reference/client-api.md',
                '/reference/node-api.md'
              ]
            }
          ],
          '/reference/bundler/': [
            {
              isGroup: true,
              text: 'Bundlers Reference',
              children: ['/reference/bundler/webpack.md', '/reference/bundler/vite.md']
            }
          ],
          '/reference/plugin/': [
            {
              isGroup: true,
              text: 'Official Plugins Reference',
              children: ['/reference/plugin/active-header-links.md', '/reference/plugin/back-to-top.md']
            }
          ],
          '/server/CSharp/': [
            {
              isGroup: true,
              text: 'dotnet 平台开发',
              children: ['/server/CSharp/README.md', '/server/CSharp/README1.md']
            }
          ],
          '/server/Java/': [
            {
              isGroup: true,
              text: 'Java 知识',
              children: ['/server/Java/test1.md', '/server/Java/test2.md']
            }
          ]
        },

        // page meta
        editLinkText: 'Edit this page on GitHub'
      }
      // '/zh/': {
      //   // navbar
      //   navbar: navbar.zh,
      //   selectLanguageName: '简体中文',
      //   selectLanguageText: '选择语言',
      //   selectLanguageAriaLabel: '选择语言',

      //   // sidebar
      //   sidebar: sidebar.zh,

      //   // page meta
      //   editLinkText: '在 GitHub 上编辑此页',
      //   lastUpdatedText: '上次更新',
      //   contributorsText: '贡献者',

      //   // custom containers
      //   tip: '提示',
      //   warning: '注意',
      //   danger: '警告',

      //   // 404 page
      //   notFound: ['这里什么都没有', '我们怎么到这来了？', '这是一个 404 页面', '看起来我们进入了错误的链接'],
      //   backToHome: '返回首页',

      //   // other
      //   openInNewWindow: '在新窗口打开'
      // }
    },
    sidebarDepth: 2,
    lastUpdated: 'Last Updated'
  }
}
