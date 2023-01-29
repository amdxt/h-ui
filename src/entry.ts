import { createApp, App } from 'vue';
import HButton from './HButton';
import HJSXButton from './JSXButton';
import HSFCButton from './SFCButton/index.vue';

// 单独导出
export { HButton, HSFCButton, HJSXButton };

// 全量导出
export default {
  install(app: App): void {
    app.component(HButton.name, HButton);
    app.component(HJSXButton.name, HJSXButton);
    app.component(HSFCButton.name, HSFCButton);
  },
};
