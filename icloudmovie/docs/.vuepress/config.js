module.exports = {
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US',
      title: 'ai cloud movie',
      description: 'Cloud World',
      selectLanguageName: 'English',
      theme: '/path/to/docs/.vuepress/theme',
      base: '/', // 设置站点根路径
      dest: './ROOT', // 设置输出目录
      port: 8090,
      head: [],
      markdown: {
        lineNumbers: true // 代码块显示行号
      },
      plugins: [
        [
          '@vuepress/search',
          {
            search: true, //默认false
            searchMaxSuggestions: 10
          }
        ]
      ]
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'i 云影',
      description: '云上世界',
      selectLanguageName: '简体中文',
      theme: '/path/to/docs/.vuepress/theme',
      base: '/', // 设置站点根路径
      dest: './ROOT', // 设置输出目录
      port: 8090,
      head: [],
      plugins: ['fulltext-search']
    }
  },

  themeConfig: {
    // Public 文件路径
    logo: '/images/logo.png',
    // URL
    // logo: 'https://vuejs.org/images/logo.png',
    locales: {
      '/': {
        selectLanguageName: 'English'
      },
      '/zh/': {
        selectLanguageName: '简体中文'
      }
    },
    navbar: [
      // NavbarItem
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      // NavbarGroup
      {
        text: '后端记录',
        children: [
          { text: 'C#', link: '/server/csharp.md' },
          { text: 'NodeJS', link: '/server/nodejs.md' },
          { text: 'Java', link: '/server/java.md' }
        ]
      },
      // 嵌套 Group - 最大深度为 2
      {
        text: '前端记录',
        children: [
          { text: 'PC网站', link: '/client/web.md' },
          { text: 'PC桌面', link: '/client/desktop.md' },
          {
            text: '移动端',
            children: [
              { text: 'iOS', link: '/client/mobile/ios.md' },
              { text: 'Android', link: '/client/mobile/android.md' }
            ]
          }
        ]
      },
      // 字符串 - 页面文件路径
      { text: '关于', link: '/about/' }
    ],
    // 侧边栏数组
    // 所有页面会使用相同的侧边栏
    sidebar: [
      // SidebarItem
      {
        text: 'Foo',
        link: '/foo/',
        children: [
          // SidebarItem
          {
            text: 'github',
            link: 'https://github.com',
            children: []
          },
          // 字符串 - 页面文件路径
          '/foo/bar.md'
        ]
      },
      // SidebarGroup
      {
        isGroup: true,
        text: 'Group',
        children: ['/group/foo.md', '/group/bar.md']
      },
      // 字符串 - 页面文件路径
      '/bar/README.md'
    ],
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    // 如果你按照 `organization/repository` 的格式设置它
    // 我们会将它作为一个 GitHub 仓库
    repo: 'comyn/blogcms'
    // 如果你使用的不是 GitHub ，可以直接使用 URL
    // repo: 'https://gitlab.com/foo/bar'
  }
}
