import { createApp, App } from 'vue';
import Button from './Button';
import SFCButton from './SFCButton/index.vue';
import JSXButton from './JSXButton';

const app = createApp(JSXButton)

app.mount('#app')
