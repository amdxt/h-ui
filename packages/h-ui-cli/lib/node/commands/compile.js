import logger from '../shared/logger.js';
import fse from 'fs-extra';
import { createSpinner } from 'nanospinner';
import { ES_DIR, HL_DIR, LIB_DIR, UMD_DIR, dirname as CONST_FILE_DIRNAME, } from '../shared/constant.js';
import { compileTemplateHighlight } from '../compiler/compileTemplateHighlight.js';
console.log('CONST_FILE_DIRNAME', CONST_FILE_DIRNAME);
const { remove } = fse;
export function removeDir() {
    return Promise.all([
        remove(ES_DIR),
        remove(LIB_DIR),
        remove(UMD_DIR),
        remove(HL_DIR),
    ]);
}
export async function runTask(taskName, task) {
    const s = createSpinner().start({ text: `Compiling ${taskName}` });
    console.log('\n');
    try {
        await task();
        s.success({ text: `Compilation ${taskName} completed!` });
    }
    catch (e) {
        s.error({ text: `Compilation ${taskName} failed!` });
        logger.error(e.toString());
    }
}
export async function compile() {
    process.env.NODE_ENV = 'compile';
    await removeDir();
    await Promise.all([runTask('template highlight', compileTemplateHighlight)]);
}
