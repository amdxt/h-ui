import ColorBlock from './ColorBlock.vue'
import { App } from 'vue'

ColorBlock.install = (app: App) => {
    app.component(ColorBlock.name, ColorBlock)
}

// test lint staged
export default ColorBlock
