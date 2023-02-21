import { PLAYGROUND } from './constant'
import { commands, window, Selection, env, Uri, Range } from 'vscode'

function openPlayground(wrapTemplate = false) {
    const { activeTextEditor } = window

    if (!activeTextEditor) {
        env.openExternal(Uri.parse(PLAYGROUND))
        return
    }

    const range = new Range(
        activeTextEditor.selection.start,
        activeTextEditor.selection.end
    )
    let text = activeTextEditor.document.getText(range)

    if (!text.trim()) {
        env.openExternal(Uri.parse(PLAYGROUND))
        return
    }

    if (wrapTemplate) {
        text = `<template>\n${text}\n</template>`
    }

    const file = { 'App.vue': text }
    const hash = btoa(unescape(encodeURIComponent(JSON.stringify(file))))
    env.openExternal(Uri.parse(`${PLAYGROUND}#${hash}`))
}

// 命令, 光标左右移动
export function registerCommands() {
    commands.registerCommand('hui.move-cursor', (characterDelta: number) => {
        // 光标所在位置
        const active = window.activeTextEditor!.selection.active!
        // 左右移动 characterDelta 后的位置
        const position = active.translate({ characterDelta })
        // 选中 Selection(position, position), 其实就是把光标移动到 position
        window.activeTextEditor!.selection = new Selection(position, position)
    })

    // 打开 playground
    commands.registerCommand('hui.open-playground', () => {
        openPlayground()
    })

    // 打开 playground 用 template 包一下模板
    commands.registerCommand(
        'hui.open-playground-and-wrap-template-tag',
        () => {
            openPlayground(true)
        }
    )
}
