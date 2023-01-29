import { createApp, App } from 'vue';
import HButton from './HButton';
import HSFCButton from './SFCButton/index.vue';
import HJSXButton from './JSXButton';

const app = createApp(HJSXButton)

app.mount('#app')
