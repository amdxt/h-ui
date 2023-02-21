"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const { copySync, copyFileSync } = fs_extra_1.default;
function copy(options) {
    return {
        name: 'vite-plugin-varlet-copy',
        buildStart() {
            options.paths.forEach((copyPath) => {
                try {
                    ;
                    (copyPath.type === 'folder' ? copySync : copyFileSync)(copyPath.from, copyPath.to);
                }
                catch (e) {
                    this.warn(e);
                }
            });
        },
    };
}
exports.copy = copy;
