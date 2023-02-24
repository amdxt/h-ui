
import DefaultTheme from 'vitepress/theme'

// 组件 HUI
// 组件主题
import '@my-h-ui/theme-chalk/src/index.scss'
// 组件源码
import HUI from '@my-h-ui/h-ui/src/entry'

// 使用 vitepress-theme-demoblock
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents' // 这个文件是 pnpm run register:components 自动生成的
// import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
// import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

// 自定义的主题样式 vitepress
import './styles/index.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    // vitepress-theme-demoblock 组件
    useComponents(ctx.app)
    // HUI 组件
    ctx.app.use(HUI)
  }
}