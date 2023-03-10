/* eslint-disable no-unreachable */
console.log('====start to build:all =====')

import * as fs from 'fs-extra'
import * as path from 'path'
import {
    build,
    InlineConfig,
    defineConfig,
    UserConfig,
    mergeConfig,
} from 'vite'
// import { createVuePlugin as vue2Community } from 'vite-plugin-vue2'
import { merge, cloneDeep } from 'lodash'

import { generateDTS } from './type'
import { config } from '../vite.config'

const repoRootNodeModules = path.resolve(__dirname, '../../../node_modules')
const repoRootNodeModulesVue = path.resolve(repoRootNodeModules, 'vue')
const repoRootNodeModulesVue2 = path.resolve(repoRootNodeModules, 'vue2')
const repoRootNodeModulesVueBak = path.resolve(repoRootNodeModules, 'vue-bak')

const configBase: InlineConfig = {
    configFile: false,
    envFile: false,
}

const configFinal: InlineConfig = mergeConfig(configBase, config, true)

const buildEntry = async () => {
    // 全量打包 build:entry
    console.log('=== buildEntry ===')
    await build(configFinal)
    // await build()
}

const buildEntryV2 = async () => {
    // fs.copySync(repoRootNodeModulesVue, '/Users/ligfee/tmp/vue-bak')
    // 切换 node_modules vue 版本
    // rm vue-bak
    console.log('=== buildEntryV2 ===')
    console.log('切换 vue 版本')
    fs.removeSync(repoRootNodeModulesVueBak)
    // vue -> vue-bak
    console.log(`${repoRootNodeModulesVue} -> ${repoRootNodeModulesVueBak}`)
    fs.copySync(repoRootNodeModulesVue, repoRootNodeModulesVueBak)
    // rm vue
    fs.removeSync(repoRootNodeModulesVue)
    // vue2 -> vue
    console.log(`${repoRootNodeModulesVue2} -> ${repoRootNodeModulesVue}`)
    fs.copySync(repoRootNodeModulesVue2, repoRootNodeModulesVue)

    try {
        const curConfigFinal = cloneDeep(configFinal)

        // replace plugins
        const vue2Community = require('vite-plugin-vue2').createVuePlugin
        curConfigFinal.plugins = [vue2Community()]
        // replace outDir
        const outDir = path.resolve(
            curConfigFinal!.build!.outDir as string,
            'v2'
        )
        curConfigFinal!.build!.outDir = outDir
        await build(curConfigFinal)
    } catch (error) {
        console.error(error)
    } finally {
        // node_modules 文件还原
        // rm vue
        fs.removeSync(repoRootNodeModulesVue)
        // vue-bak -> vue
        console.log(
            `还原 vue 版本: ${repoRootNodeModulesVueBak} -> ${repoRootNodeModulesVue}`
        )
        fs.copySync(repoRootNodeModulesVueBak, repoRootNodeModulesVue)
    }
}

const buildSplit = async () => {
    console.log('=== buildSplit ===')
    // const inline: InlineConfig =
    //   viteConfig;
    const baseOutDir = config!.build!.outDir as string

    // 复制 Package.json 文件  -> dist/package.json
    // 如果在 dist/package.json 那么 @my-h-ui/h-ui 根目录就是 dist 里面了, docs 里面无法使用 src 里面的代码, 先注释
    // const packageJson = require('../package.json')
    // packageJson.main = 'h-ui.umd.js'
    // packageJson.module = 'h-ui.esm.js'
    // packageJson.types = 'h-ui.d.ts'
    // fs.outputFile(
    //     path.resolve(baseOutDir, `package.json`),
    //     JSON.stringify(packageJson, null, 2)
    // )

    // 拷贝 README.md文件
    // fs.copyFileSync(
    //     path.resolve('./README.md'),
    //     path.resolve(baseOutDir + '/README.md')
    // )

    // 分包打包有点问题, 先不搞分包 build
    // 分包打包有点问题, 先不搞分包 build
    // 分包打包有点问题, 先不搞分包 build
    // return
    // 各个组件分别打包
    console.log('===build:split===')
    const srcDir = path.resolve(__dirname, '../src/components')
    const componentsDir = fs.readdirSync(srcDir).filter((name: string) => {
        const componentDir = path.resolve(srcDir, name)
        const isDir = fs.lstatSync(componentDir).isDirectory()
        // 只要目录，且里面包含index.ts
        // e.g. src/radio-group-button/index.ts
        return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })
    console.log('===识别到的组件有:', componentsDir)

    // forEach中异步执行有问题 改为for-of
    for (let name of componentsDir) {
        console.log(`===开始打包组件: ${name}`)
        const outDir = path.resolve(baseOutDir, name)
        const customBuildOptions = {
            outDir,
            lib: {
                entry: path.resolve(srcDir, name, 'index.ts'),
                name, // 导出模块名
                fileName: (format: string) => `index.${format}.js`,
            },
        }

        // Object.assign(config.build as any, customBuildOptions)
        // const curConfig = merge({}, config, { build: customBuildOptions })
        const curConfig = mergeConfig(
            configFinal,
            {
                build: customBuildOptions,
            },
            true
        )

        await build(curConfig)

        fs.outputFile(
            path.resolve(outDir, `package.json`),
            `{
                "name": "@my-h-ui/h-ui/${name}",
                "main": "index.umd.js",
                "module": "index.umd.js"
            }`,
            `utf-8`
        )
    }
}

const genDTS = async () => {
    // 生成配置DTS配置文件入口
    console.log('========generateDTS h-ui.d.ts ===========')
    await generateDTS(path.resolve(config!.build!.outDir as any, `h-ui.es.js`))
}

const buildAll = async () => {
    await buildEntry()
    await buildSplit()
    await buildEntryV2()
    // await genDTS()
}

buildAll()
