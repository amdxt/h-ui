/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'

import unocss from '../../config/unocss'

const rollupOptions = {
    external: ['vue', 'vue-router'],
    output: {
        globals: {
            vue: 'Vue',
        },
    },
}

export default defineConfig({
    resolve: {
        alias: [
            {
                find: 'vue',
                replacement: 'vue/dist/vue.esm-bundler',
            },
        ],
    },
    plugins: [vue(), vueJsx({}), unocss()],
    build: {
        rollupOptions,
        cssCodeSplit: true, // 样式打包成单独的文件
        minify: false, // boolean | 'terser' | 'esbuild'
        sourcemap: true, // 输出单独 source文件
        lib: {
            entry: './src/entry.ts', // 入口
            formats: ['umd', 'es', 'cjs'], // 构建产物格式
            fileName: (fmt, entryName) => {
                return `h-ui.${fmt}.js`
            }, // 导出的模块格式
            name: 'HUI', // UMD IIFE 全局变量的名字
        },
    },
    test: {
        // enable jest-like global test APIs
        globals: true,
        // simulate DOM with happy-dom
        // (requires installing happy-dom as a peer dependency)
        environment: 'happy-dom',
        // 支持tsx组件，很关键
        transformMode: {
            web: [/.[tj]sx$/],
        },
    },
})
