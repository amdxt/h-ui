import { reactive, watchEffect, version } from 'vue'
import { compileFile, File } from '@vue/repl'
import { utoa, atou } from './utils/encode'
import * as defaultCompiler from 'vue/compiler-sfc'
import type { Store, SFCOptions, StoreState, OutputModes } from '@vue/repl'

const publicPath = './'
const varletImports = {
    '@my-h-ui/h-ui': `${publicPath}h-ui.es.js`,
}
// Playground.vue, 这个文件是 repl iframe 里面的 entry file
const MAIN_CONTAINER = 'Playground.vue'
const huiReplPlugin = 'h-ui-repl-plugin.js'
const huiCss = `${publicPath}entry.css`
const huiCssThemeChalk = `${publicPath}index.css`
const defaultMainFile = 'App.vue'

// Playground.vue code
const containerCode = `\
<script setup>
import App from './${defaultMainFile}'
import { installHUI } from './${huiReplPlugin}'

installHUI()
</script>

<template>
  <App />
</template>
`

// h-ui-repl-plugin.js 的 code
const huiReplPluginCode = `\
import { getCurrentInstance } from 'vue'
import HUI from '@my-h-ui/h-ui'

// 挂在组件库的 style
await appendStyle('${huiCss}')
await appendStyle('${huiCssThemeChalk}')

// 安装组件库 vue插件
export function installHUI() {
  const { parent } = window

  // 增加样式
  const style = document.createElement('style')
  style.innerHTML = \`
    body {
      min-height: 100vh;
      padding: 16px;
      margin: 0;
      color: var(--color-text);
      background-color: var(--color-body);
    }

    *::-webkit-scrollbar {
      display: none;
    }
  \`
  document.head.appendChild(style)

  // 主题切换, 先忽略
  // if (parent.document.documentElement.classList.contains('dark')) {
  //   VarletUI.StyleProvider(VarletUI.Themes.dark)
  // }

  // window.addEventListener('message', ({ data }) => {
  //   if (data.action === 'theme-change') {
  //     VarletUI.StyleProvider(data.value === 'dark' ? VarletUI.Themes.dark : null)
  //   }
  // })

  // keypoint 在组件里面 使能一个 vue插件 的方法
  const instance = getCurrentInstance()
  instance.appContext.app.use(HUI)
}

export function appendStyle(url) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    link.onload = resolve
    link.onerror = reject
    document.body.appendChild(link)
  })
}
`

// App.vue 的 code
const welcomeCode = `\
<script setup lang='ts'>
import { ref } from 'vue'

const msg = ref('Hello Varlet!')
</script>

<template>
  <h-button type="primary" icon="search">{{ msg }}</h-button>
</template>
`

export class ReplStore implements Store {
    state: StoreState

    compiler = defaultCompiler

    options?: SFCOptions

    initialShowOutput: boolean

    initialOutputMode: OutputModes = 'preview'

    private readonly defaultVueRuntimeURL: string

    constructor({
        serializedState = '',
        defaultVueRuntimeURL = `https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js`,
        showOutput = false,
        outputMode = 'preview',
    }: {
        serializedState?: string
        showOutput?: boolean
        // loose type to allow getting from the URL without inducing a typing error
        outputMode?: OutputModes | string
        defaultVueRuntimeURL?: string
    }) {
        let files: StoreState['files'] = {}

        if (serializedState) {
            const saved = JSON.parse(atou(serializedState))
            // eslint-disable-next-line no-restricted-syntax
            for (const filename of Object.keys(saved)) {
                files[filename] = new File(filename, saved[filename])
            }
        } else {
            files = {
                [defaultMainFile]: new File(defaultMainFile, welcomeCode),
            }
        }

        this.defaultVueRuntimeURL = defaultVueRuntimeURL
        this.initialShowOutput = showOutput
        this.initialOutputMode = outputMode as OutputModes

        let mainFile = defaultMainFile
        if (!files[mainFile]) {
            mainFile = Object.keys(files)[0]
        }

        files[MAIN_CONTAINER] = new File(MAIN_CONTAINER, containerCode, true)

        this.state = reactive({
            files, // 所有文件
            mainFile: MAIN_CONTAINER, // 主文件  Playground.vue, --> installHUI() 加载 APP;
            activeFile: files[mainFile], // 活跃文件 App.vue
            errors: [],
            vueRuntimeURL: this.defaultVueRuntimeURL,
            vueServerRendererURL: '',
        })

        this.initImportMap() // 确保这个文件存在且正确 this.state.files['import-map.json']

        // varlet inject --> h-ui-repl-plugin.js
        // @ts-ignore
        this.state.files[huiReplPlugin] = new File(
            huiReplPlugin,
            huiReplPluginCode,
            !import.meta.env.DEV
        )

        watchEffect(() => compileFile(this, this.state.activeFile))

        // eslint-disable-next-line no-restricted-syntax
        for (const file in this.state.files) {
            if (file !== defaultMainFile) {
                compileFile(this, this.state.files[file])
            }
        }
    }

    init() {}

    setActive(filename: string) {
        this.state.activeFile = this.state.files[filename]
    }

    addFile(fileOrFilename: string | File) {
        const file =
            typeof fileOrFilename === 'string'
                ? new File(fileOrFilename)
                : fileOrFilename
        this.state.files[file.filename] = file
        if (!file.hidden) this.setActive(file.filename)
    }

    deleteFile(filename: string) {
        if (filename === huiReplPlugin) {
            // Snackbar --> import { Snackbar } from @varlet/ui
            // 按需加载黑魔法, 无需导入, 直接使用, unplugin-vue-component 插件会处理好 import 的事情
            Snackbar.warning('Varlet depends on this file')
            return
        }

        // Dialog --> import { Dialog } from @varlet/ui
        // 按需加载黑魔法, 无需导入, 直接使用, unplugin-vue-component 插件会处理好 import 的事情
        Dialog(`Are you sure you want to delete ${filename}?`).then(
            (action) => {
                if (action === 'confirm') {
                    if (this.state.activeFile.filename === filename) {
                        this.state.activeFile =
                            this.state.files[defaultMainFile]
                    }
                    delete this.state.files[filename]
                }
            }
        )
    }

    serialize() {
        return '#' + utoa(JSON.stringify(this.getFiles()))
    }

    getFiles() {
        const exported: Record<string, string> = {}
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const filename in this.state.files) {
            exported[filename] = this.state.files[filename].code
        }
        return exported
    }

    async setFiles(
        newFiles: Record<string, string>,
        mainFile = defaultMainFile
    ) {
        const files: Record<string, File> = {}
        // 确保 App.vue 存在
        if (mainFile === defaultMainFile && !newFiles[mainFile]) {
            files[mainFile] = new File(mainFile, welcomeCode)
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const [filename, file] of Object.entries(newFiles)) {
            files[filename] = new File(filename, file)
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const file of Object.values(files)) {
            await compileFile(this, file)
        }
        this.state.mainFile = mainFile
        this.state.files = files
        this.initImportMap()
        this.setActive(mainFile)
    }

    private initImportMap() {
        const map = this.state.files['import-map.json']
        if (!map) {
            this.state.files['import-map.json'] = new File(
                'import-map.json',
                JSON.stringify(
                    {
                        imports: {
                            vue: this.defaultVueRuntimeURL,
                            ...varletImports,
                        },
                    },
                    null,
                    2
                )
            )
        } else {
            try {
                const json = JSON.parse(map.code)
                if (!json.imports.vue) {
                    json.imports.vue = this.defaultVueRuntimeURL
                    map.code = JSON.stringify(json, null, 2)
                }
                // eslint-disable-next-line no-empty
            } catch (e) {}
        }
    }

    getImportMap() {
        try {
            return JSON.parse(this.state.files['import-map.json'].code)
        } catch (e) {
            this.state.errors = [
                `Syntax error in import-map.json: ${(e as Error).message}`,
            ]
            return {}
        }
    }
}
