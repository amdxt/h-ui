import { defineConfig } from 'vite';
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy';

import unocss from './config/unocss';

const rollupOptions = {
    external: ["vue", "vue-router"],
    output: {
      globals: {
        vue: "Vue",
      },
    },
  };

export default defineConfig({
    resolve: {
      alias: [
        {
          find: 'vue',
          replacement: 'vue/dist/vue.esm-bundler',
        }
      ],
    },
    plugins: [
        vue(),
        vueJsx({}),
        unocss()
    ],
    build: {
        rollupOptions,
        cssCodeSplit: true,   // 追加
        minify:false,
        lib: {
          entry: "./src/entry.ts",
          formats: ["umd", "es"],
          name: "HUI",
          fileName: "h-ui",
          // 导出模块格式
        },
      },
})