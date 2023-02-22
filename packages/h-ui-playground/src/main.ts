import '@vue/repl/style.css'
import { createApp } from 'vue'
import App from './App.vue'

// 按需加载的黑魔法, 先忽略
// Locale.add('en-US', Locale.enUS)
// Locale.use('en-US')

createApp(App).mount('#app')
