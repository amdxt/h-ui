import { createApp, App } from 'vue';
import Button from './Button';
import SFCButton from './SFCButton/index.vue';
import JSXButton from './JSXButton';
import HUI from './entry';

const app = createApp({
    template: `
        <HButton color="red" icon="search">red</HButton>
        <HButton color="green" icon="edit">green</HButton>
        <HButton color="yellow" icon="check">black</HButton>
    `
})
app.use(HUI)

app.mount('#app')
