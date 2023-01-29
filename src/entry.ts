import { createApp, App } from 'vue';
import Button from './Button';
import JSXButton from './JSXButton';
import SFCButton from './SFCButton/index.vue';

// 单独导出
export { Button, JSXButton, SFCButton };

// 全量导出
export default {
  install(app: App): void {
    app.component(Button.name, Button);
    app.component(JSXButton.name, JSXButton);
    app.component(SFCButton.name, SFCButton);
  },
};
