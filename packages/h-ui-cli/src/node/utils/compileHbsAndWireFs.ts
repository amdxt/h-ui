import * as fs from 'fs'
import handlebars from 'handlebars'
import { logGreen } from './index.js'

export const compileHbsAndWriteFs = (
    templatePath: string,
    metaData: any,
    distPath: string
) => {
    if (fs.existsSync(templatePath)) {
        const content = fs.readFileSync(templatePath).toString()
        const result = handlebars.compile(content)(metaData)
        fs.writeFileSync(distPath, result)
        logGreen(`📚 ${templatePath} 修改成功`)
    } else {
        logGreen(`❌ ${templatePath} 修改失败`)
    }
}
