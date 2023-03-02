import { createApp, App } from 'vue'
import Button from './button'
import SFCButton from './SFCButton/SFCButton.vue'
import JSXButton from './jsx-button'
import HUI from './entry'

const app = createApp({
    template: `
        <HButton color="red" icon="search">red</HButton>
        <HButton color="green" icon="edit">green</HButton>
        <HButton color="yellow" icon="check">black</HButton>
    `,
})
app.use(HUI)

app.mount('#app')
