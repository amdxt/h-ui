import * as fs from 'fs';
import handlebars from 'handlebars';
import { logGreen } from './index.js';

export const compileHbsAndWriteFs = (templatePath, metaData, distPath) => {
    if (fs.existsSync(templatePath)) {
        const content = fs.readFileSync(templatePath).toString();
        const result = handlebars.compile(content)(metaData);
        fs.writeFileSync(distPath, result);
        logGreen(`📚 ${templatePath} 修改成功`);
      } else {
        logGreen(`❌ ${templatePath} 修改失败`);
      }
}