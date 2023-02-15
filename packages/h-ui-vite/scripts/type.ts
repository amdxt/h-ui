import handlebars from 'handlebars'
import fs from 'fs'
import { resolve } from 'path'

// generateDTS('../dist/smarty-ui.esm.js')

/**
 *
 * @param entryPath 生成类型定义文件 d.ts  dist/h-ui.esm.js
 */
export async function generateDTS(entryPath: string) {
    console.log('开始生成 h-ui.d.ts 文件')
    const template = resolve(__dirname, './entry.d.ts.hbs')
    const dts = resolve(__dirname, entryPath.replace('.es.js', '.d.ts'))

    // 组件库数据
    const components = await getComponents(entryPath)
    // console.log('list', list)

    // 生成模版
    await generateCode(
        {
            components,
        },
        dts,
        template
    )
    console.log('生成 h-ui.d.ts 文件 结束')
}

/**
 * 生成代码
 * @param meta 数据定义
 * @param filePath 目标文件路径
 * @param templatePath 模板文件路径
 */
function generateCode(meta: any, filePath: any, templatePath: any) {
    if (fs.existsSync(templatePath)) {
        const content = fs.readFileSync(templatePath).toString()
        const result = handlebars.compile(content)(meta)
        fs.writeFileSync(filePath, result)
    }
    console.log(`🚀${filePath} 创建成功`)
}
/**
 * 获取组件列表
 * 通过解析entry.ts模块获取组件数据
 */
async function getComponents(input: string) {
    const entry = await import(input)
    return Object.keys(entry)
        .filter((k) => k !== 'default')
        .map((k) => ({
            name: entry[k].name,
            component: k,
        }))
}
