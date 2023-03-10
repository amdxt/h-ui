import { createApp, App } from 'vue'
import Button from './button'
import JSXButton from './jsx-button'
import SFCButton from './sfc-button'
import Tabs from './tabs'
import RadioGroupButton from './radio-group-button'
import ColorBlock from './color-block'

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
