import { demoBlockPlugin } from 'vitepress-theme-demoblock';

const nav = [
  { text: 'Guide', link: '/guide' },
  { text: 'component', link: '/components/' , activeMatch: '/components'},
  { text: 'Configs', link: '/configs' },
  { text: 'Changelog', link: 'https://github.com/...' },
  {
    text: 'Dropdown Menu',
    items: [
      { text: 'Item A', link: '/item-1' },
      { text: 'Item B', link: '/item-2' },
      { text: 'Item C', link: '/item-3' }
    ]
  }
];

const sidebar = {
  '/': [
    { text: '快速开始', link: '/' },
    {
      text: '通用',
      items: [
        {
          text: 'Button 按钮',
          //   link: '/components/button/',
          items: [
            {
              text: '简单用法',
              link: '/components/button/simple',
            },
            {
              text: '高级用法',
              link: '/components/button/complex',
            },
          ],
        },
        {
          text: 'icon',
          link: '/components/icon/',
        },
        {
          text: 'checkbox',
          link: '/components/checkbox/',
        },
        {
          text: 'transfer',
          link: '/components/transfer/',
        },
        {
          text: 'message',
          link: '/components/message/',
        },
      ],
    },
    { text: '导航' },
    { text: '反馈' },
    { text: '数据录入' },
    { text: '数据展示' },
    { text: '布局' },
  ],
};

const config = {
  themeConfig: {
    nav,
    sidebar,
    siteTitle: 'HUI',
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      // 添加DemoBlock插槽
      md.use(demoBlockPlugin);
    },
  },
};

export default config;
