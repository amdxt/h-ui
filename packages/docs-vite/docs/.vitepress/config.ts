import { demoBlockPlugin } from 'vitepress-theme-demoblock';
import { nav } from './configs/nav';
import { sidebar } from './configs/sidebar';

const config = {
  title: 'Vitepress',
  description: '使用 Vitepress 搭建组件库文档站点。',
  lastUpdated: true,
  cleanUrls: 'without-subfolders',

  themeConfig: {
    nav,
    sidebar,
    siteTitle: 'HUI',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ayangliayangli/h-ui' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023'
    }
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
