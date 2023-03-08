import { createApp, App } from 'vue'
import Button from './button'
import SFCButton from './SFCButton/SFCButton.vue'
import JSXButton from './jsx-button'
import HUI from './entry'
import AppComp from './App.vue'

const app = createApp(AppComp)
app.use(HUI)

app.mount('#app')
