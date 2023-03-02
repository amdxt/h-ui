import type { UserConfigExport } from 'vite'
import { resolve } from 'path'

const input = resolve(__dirname, './src/index.scss')
const outDir = resolve(__dirname, './dist')

export default (): UserConfigExport => {
    return {
        build: {
            minify: false,
            outDir,
            rollupOptions: {
                input,
                output: {
                    assetFileNames: '[name].[ext]',
                },
            },
        },
    }
}
