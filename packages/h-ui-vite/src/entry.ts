import { createApp, App } from 'vue'
import Button from './components/button'
import JSXButton from './components/jsx-button'
import SFCButton from './components/sfc-button'
import Tabs from './components/tabs'
import RadioGroupButton from './components/radio-group-button'
import ColorBlock from './components/color-block'

// 全量导出
export default {
    install(app: App): void {
        app.component(Button.name, Button)
        app.component(JSXButton.name, JSXButton)
        app.component(SFCButton.name, SFCButton)
        app.component(ColorBlock.name, ColorBlock)
        app.component(Tabs.name, Tabs)
        app.component(RadioGroupButton.name, RadioGroupButton)
    },
}
