/// <reference types="vitest" />

import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vue2 from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import dts from 'vite-plugin-dts'

import unocss from '../../config/unocss'

const rollupOptions = {
    external: ['vue', 'vue-router'],
    output: {
        globals: {
            vue: 'Vue',
        },
        exports: 'named' as any,
    },
}

export const config: UserConfig = {
    resolve: {
        alias: [
            // 这里影响类型系统的生成了 dist/h-ui.d.ts
            // {
            //     find: 'vue',
            //     replacement: 'vue/dist/vue.esm-bundler',
            // },
            // 打包 vue2
            // {
            //     find: 'vue',
            //     replacement: 'vue2',
            // },
        ],
    },
    plugins: [
        vue(),
        // vue2Community(),
        vueJsx({}),
        // unocss(),
        // dts({
        //     outputDir: './dist/types',
        //     insertTypesEntry: false, // 插入TS 入口, 不要插入, 后面我们使用脚本生成
        //     copyDtsFiles: true, // 是否将源码里的 .d.ts 文件复制到 outputDir
        // }),
    ],
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
        outDir: './dist',
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
        coverage: {
            provider: 'istanbul', // or 'c8',
            reporter: ['text', 'json', 'html'],
        },
    },
}

export default defineConfig(config)
