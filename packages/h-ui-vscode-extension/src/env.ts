import { workspace } from 'vscode'

export function getLanguage() {
    const config = workspace.getConfiguration('hui')
    const useChineseLanguage = config.get('useChineseLanguage')
    return useChineseLanguage ? 'zh-CN' : 'en-US'
}
