import RadioGroupButton from './RadioGroupButton.vue'
import { App } from 'vue'

RadioGroupButton.install = (app: App) => {
    app.component(RadioGroupButton.name, RadioGroupButton)
}

// test lint staged
export default RadioGroupButton
