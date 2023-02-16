
import DefaultTheme from 'vitepress/theme'
// 使用的源代码 组件
// 主题
import '@my-h-ui/theme-chalk/index.scss'
// 组件
import HUI from '@my-h-ui/h-ui/src/entry'

import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.use(HUI)
    ctx.app.component('Demo', Demo)
    ctx.app.component('DemoBlock', DemoBlock)
  }
}