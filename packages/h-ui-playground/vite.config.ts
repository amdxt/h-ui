import fs from 'fs'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig, Plugin } from 'vite'

// 编译后的 css 文件
const huiCSSFile = resolve(__dirname, '../h-ui-vite/dist/entry.css')
// 编译后的主题文件
const huiCSSFileThemeChalk = resolve(
    __dirname,
    '../h-ui-theme-chalk/dist/index.css'
)
const huiESMBundleFile = resolve(__dirname, '../h-ui-vite/dist/h-ui.es.js')

function copyVarletDependencies(): Plugin {
    return {
        name: 'copy-varlet-dependencies',

        buildStart() {
            console.log('process.cwd()', process.cwd())
            console.log('__dirname', __dirname)
            console.log('huiCSSFileThemeChalk', huiCSSFileThemeChalk)
            console.log(
                '__dirname',
                fs.exists(__dirname, (res) => console.log(res))
            )
            console.log(
                `resolve(__dirname,'../h-ui-theme-chalk/dist')`,
                fs.exists(
                    resolve(__dirname, '../h-ui-theme-chalk/dist'),
                    (res) => console.log(res)
                )
            )
            console.log(
                `resolve(__dirname,'../h-ui-theme-chalk/dist/index.css')`,
                fs.exists(
                    resolve(__dirname, '../h-ui-theme-chalk/dist/index.css'),
                    (res) => console.log(res)
                )
            )
            //  复制文件 ../h-ui-vite/dist/entry.css --> public/entry.css
            fs.copyFileSync(huiCSSFile, resolve('public/entry.css'))
            // 复制文件 ../h-ui-theme-chalk/dist/index.css --> public/index.css
            fs.copyFileSync(huiCSSFileThemeChalk, resolve('public/index.css'))
            // 复制文件 ../h-ui-vite/dist/h-ui.es.js --> public/h-ui.es.js
            fs.copyFileSync(huiESMBundleFile, resolve('public/h-ui.es.js'))
        },
    }
}

export default defineConfig({
    base: './',

    server: {
        host: '0.0.0.0',
        port: 3002,
    },

    build: {
        outDir: 'site',
    },

    plugins: [
        copyVarletDependencies(),
        // 按需加载插件
        components({
            resolvers: [VarletUIResolver()],
        }),
        // 按需加载插件
        autoImport({
            resolvers: [VarletUIResolver({ autoImport: true })],
        }),
    ],
})
