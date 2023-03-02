import 'uno.css'

import Button from './Button'
import { App } from 'vue'

Button.install = (app: App) => {
    app.component(Button.name, Button)
}

// test lint staged
export default Button
