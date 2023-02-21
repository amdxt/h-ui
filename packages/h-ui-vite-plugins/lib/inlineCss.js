"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inlineCss = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const { pathExistsSync, writeFileSync, readFileSync, removeSync } = fs_extra_1.default;
function inlineCss(options) {
    return {
        name: 'vite-plugin-varlet-inline-css',
        apply: 'build',
        closeBundle() {
            const { cssFile, jsFile, onEnd } = options;
            if (!pathExistsSync(cssFile)) {
                this.warn('css file cannot found');
                onEnd === null || onEnd === void 0 ? void 0 : onEnd();
                return;
            }
            if (!pathExistsSync(jsFile)) {
                this.error('js file cannot found');
                onEnd === null || onEnd === void 0 ? void 0 : onEnd();
                return;
            }
            const cssCode = readFileSync(cssFile, 'utf-8');
            const jsCode = readFileSync(jsFile, 'utf-8');
            const injectCode = `;(function(){var style=document.createElement('style');style.type='text/css';\
style.rel='stylesheet';style.appendChild(document.createTextNode(\`${cssCode.replace(/\\/g, '\\\\')}\`));\
var head=document.querySelector('head');head.appendChild(style)})();`;
            writeFileSync(jsFile, `${injectCode}${jsCode}`);
            removeSync(cssFile);
            onEnd === null || onEnd === void 0 ? void 0 : onEnd();
        },
    };
}
exports.inlineCss = inlineCss;
