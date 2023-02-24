import { demoBlockPlugin } from 'vitepress-theme-demoblock';
import { nav } from './configs/nav';
import { sidebar } from './configs/sidebar';

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
