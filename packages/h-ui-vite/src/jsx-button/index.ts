// import 'uno.css'

import Button from './JSXButton'
import { App } from 'vue'

Button.install = (app: App) => {
    app.component(Button.name, Button)
}

// test lint staged
export default Button
