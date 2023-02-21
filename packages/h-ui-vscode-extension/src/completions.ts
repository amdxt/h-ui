import { COMPONENT_NAMESPACE } from './constant'
// todo 这个文件里面存储了指定组件的 attrs events slots 等数据
import enWebTypes from '../meta-data/highlight/web-types.en-US.json'
import zhWebTypes from '../meta-data/highlight/web-types.en-US.json'

// todo 这个库有所有的图标
// todo 相应的文档放在了 gitee.com 上面
import icons, { pointCodes } from '@varlet/icons'
import {
    languages,
    Range,
    CompletionItem,
    CompletionItemKind,
    TextDocument,
    Position,
    MarkdownString,
    type ExtensionContext,
    type CompletionItemProvider,
} from 'vscode'
import { componentsMap, type ComponentDescriptor } from './componentsMap'
import { bigCamelize, isString, kebabCase } from '@varlet/shared'
import {
    ATTR_RE,
    DOCUMENTATION_EN,
    DOCUMENTATION_ZH,
    ICONS_STATIC,
    LANGUAGE_IDS,
    PROP_NAME_RE,
} from './constant'
import { getLanguage } from './env'
import { type HtmlTag } from './webTypes'

export function getWebTypesTags(): HtmlTag[] {
    return (getLanguage() === 'en-US' ? enWebTypes : zhWebTypes).contributions
        .html.tags
}

export interface AttrProviderOptions {
    props: boolean
    events: boolean
}

export function registerCompletions(context: ExtensionContext) {
    // 组件名称补全 关键词: var
    const componentsProvider: CompletionItemProvider = {
        provideCompletionItems() {
            const completionItems: CompletionItem[] = []

            Object.keys(componentsMap).forEach((key) => {
                const name = `${COMPONENT_NAMESPACE}-${key}` // h-demo h-button

                completionItems.push(
                    new CompletionItem(name, CompletionItemKind.Field),
                    new CompletionItem(
                        bigCamelize(name),
                        CompletionItemKind.Field
                    )
                )
            })

            return completionItems
        },

        resolveCompletionItem(item: CompletionItem) {
            const nameKebabCase = kebabCase(item.label as string)
            const name = nameKebabCase.slice(COMPONENT_NAMESPACE.length + 1)
            const descriptor: ComponentDescriptor = componentsMap[name]

            const attrText = descriptor.attrs
                ? ' ' + descriptor.attrs.join(' ')
                : ''
            const tagSuffix = descriptor.closeSelf ? '' : `</${item.label}>`
            const characterDelta =
                -tagSuffix.length + (descriptor.characterDelta ?? 0)

            item.insertText = `<${item.label}${attrText}`
            item.insertText += descriptor.closeSelf ? '/>' : `>${tagSuffix}`
            item.command = {
                title: 'hui.move-cursor',
                command: 'hui.move-cursor',
                arguments: [characterDelta],
            }

            return item
        },
    }

    // 图标 name="" 自动补全
    const iconsProvider: CompletionItemProvider = {
        provideCompletionItems(document, position) {
            const line = document.getText(
                new Range(
                    new Position(position.line, 0),
                    new Position(position.line, position.character)
                )
            )

            // 本行正在写 name 这个属性, 就提供相应的 icon options
            if (!PROP_NAME_RE.test(line)) {
                return null
            }

            const completionItems: CompletionItem[] = icons.map(
                (icon: string) => {
                    return new CompletionItem(icon, CompletionItemKind.Field)
                }
            )

            return completionItems
        },

        resolveCompletionItem(completionItem: CompletionItem) {
            const id = completionItem.label
            // icon 的 url
            const url = `${ICONS_STATIC}/u${
                pointCodes[id as string]
            }-${id}.png?t=${Date.now()}`
            // 文档链接
            const documentation =
                getLanguage() === 'en-US' ? DOCUMENTATION_EN : DOCUMENTATION_ZH
            // 自动补全文档 html
            const markdownString =
                new MarkdownString(`[icon: ${id}](${documentation}/icon)
<p align="center"><img height="80" src="${url}"></p>
<br>
`)

            markdownString.supportHtml = true

            return {
                ...completionItem,
                documentation: markdownString,
            }
        },
    }

    // 组件属性 自动补全
    const attrProvider: CompletionItemProvider = {
        provideCompletionItems(document: TextDocument, position: Position) {
            const text = document.getText(
                new Range(
                    new Position(0, 0),
                    new Position(position.line, position.character)
                )
            )

            if (!Array.from(text.matchAll(ATTR_RE)).length) {
                return null
            }

            let name: string
            let lastValue: string
            let startIndex: number

            // eslint-disable-next-line no-restricted-syntax
            for (const matched of text.matchAll(ATTR_RE)) {
                // h-demo HDemo --> h-demo --> demo
                name = (kebabCase(matched[1] ?? matched[2]) as string).slice(
                    COMPONENT_NAMESPACE.length + 1
                )
                lastValue = matched[0]
                startIndex = matched.index!
            }

            const currentIndex = text.length
            const endIndex = startIndex! + lastValue!.length

            if (currentIndex > endIndex || currentIndex < startIndex!) {
                return null
            }

            const tags = getWebTypesTags() || []
            const tag = tags.find((tag) => tag.name === name)

            if (!tag) {
                return null
            }

            const hasAt = text.endsWith('@')
            const hasColon = text.endsWith(':')

            const events = tag.events.map((event) => {
                const item = new CompletionItem(
                    {
                        label: `@${event.name}`,
                        description: event.description,
                    },
                    CompletionItemKind.Event
                )

                // 补全窗口右边的文档
                item.documentation = new MarkdownString(`\
**Event**: ${event.name}

**Description**: ${event.description}`)
                // enter 后插入 editor 的文本
                item.insertText = hasAt ? event.name : `@${event.name}`

                return item
            })

            const props = tag.attributes.map((attr) => {
                const item = new CompletionItem(
                    {
                        label: attr.name,
                        description: attr.description,
                    },
                    CompletionItemKind.Value
                )

                item.sortText = '0'

                item.documentation = new MarkdownString(`\
**Prop**: ${attr.name}

**Description**: ${attr.description}

**Type**: ${attr.value.type}

**Default**: ${attr.default}`)

                item.insertText = attr.name

                return item
            })

            return [...(hasAt ? [] : props), ...(hasColon ? [] : events)]
        },

        resolveCompletionItem(item: CompletionItem) {
            // enter 一个option 后的 cb
            if (!isString(item.label)) {
                // 光标往左移动一个位置
                item.command = {
                    title: 'hui.move-cursor',
                    command: 'hui.move-cursor',
                    arguments: [-1],
                }
                // 最终插入 editor 的文本 click="" name=""
                item.insertText = `${item.insertText}=""`
            }

            return item
        },
    }

    context.subscriptions.push(
        languages.registerCompletionItemProvider(
            LANGUAGE_IDS,
            componentsProvider
        )
    )
    context.subscriptions.push(
        languages.registerCompletionItemProvider(
            LANGUAGE_IDS,
            iconsProvider,
            '"',
            "'"
        )
    )
    context.subscriptions.push(
        languages.registerCompletionItemProvider(
            LANGUAGE_IDS,
            attrProvider,
            ' ',
            '@',
            ':'
        )
    )
}
