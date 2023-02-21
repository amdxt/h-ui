"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.html = void 0;
const ejs_1 = __importDefault(require("ejs"));
function html(options) {
    return {
        name: 'vite-plugin-varlet-html',
        transformIndexHtml: {
            order: 'pre',
            transform(html) {
                return ejs_1.default.render(html, options.data);
            },
        },
    };
}
exports.html = html;
