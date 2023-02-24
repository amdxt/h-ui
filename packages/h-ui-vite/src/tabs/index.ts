import Tabs from './Tabs.vue'
import { App } from 'vue'

Tabs.install = (app: App) => {
    app.component(Tabs.name, Tabs)
}

// test lint staged
export default Tabs
