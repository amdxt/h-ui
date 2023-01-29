import { defineConfig } from 'vite';
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy';

const rollupOptions = {
    external: ["vue", "vue-router"],
    output: {
      globals: {
        vue: "Vue",
      },
    },
  };

export default defineConfig({
    plugins: [
        vue(),
        vueJsx({}),
    ],
    build: {
        rollupOptions,
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