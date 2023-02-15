import { resolve } from 'path'
import fs from 'fs'
import inquirer from 'inquirer'
import handlebars from 'handlebars'

import { logGreen } from '../utils/index.js'
import { cloneGitRepo } from '../utils/clone.js'
import { compileHbsAndWriteFs } from '../utils/compileHbsAndWireFs.js'

export default async () => {
    logGreen('operation h-ui-app-vite entry')

    // 询问项目名字 inquirer
    const { name } = await inquirer.prompt([
        {
            name: 'name',
            type: 'input' /* 选择框 */,
            message: '请输入项目的名称？',
        },
    ])

    logGreen('🚌 创建项目:' + name)

    // 下载模板 download-git-repo
    await cloneGitRepo('github:smarty-team/smarty-ui-app-js-template', name)

    // 编译模板 handlebars
    compileHbsAndWriteFs(
        `./${name}/template/package.hbs.json`,
        {
            name,
        },
        `./${name}/package.json`
    )

    logGreen(`
  安装完成：
  To get Start:
  ===========================
  cd ${name}
  npm i
  npm run dev
  ===========================
              `)
}
