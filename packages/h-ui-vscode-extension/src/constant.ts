export const LANGUAGE_IDS = [
    'vue',
    'typescript',
    'javascript',
    'javascriptreact',
    'typescriptreact',
]
export const TAG_LINK_RE = /(?<=<h-)([\w-]+)/g // 匹配组件的名称, 不要 namespace h-    ?<= 这个括号的内容不会出现在 match 里面, 有兼容问题
export const TAG_BIG_CAMELIZE_RE = /(?<=<H)([\w-]+)/g // 匹配组件的名称, 不要 namespace h-    ?<= 这个括号的内容不会出现在 match 里面, 有兼容问题
// https://regexr.com/77ppf
export const ATTR_RE = /(?:<(h-[\w-]+)[^>/]*)|(?:<(H[\w-]+)[^>/]*)/g // 匹配是否在编写 props  ?: 内容不会出现在 capture group 中
export const PROP_NAME_RE = /name=['"][\w-]*/ // 正在写 name="" 这个属性
export const DOCUMENTATION_EN = 'https://varlet.gitee.io/varlet-ui/#/en-US'
export const DOCUMENTATION_ZH = 'https://varlet.gitee.io/varlet-ui/#/zh-CN'
export const PLAYGROUND = 'https://varlet.gitee.io/varlet-ui-playground'
export const ICONS_STATIC = 'https://varlet.gitee.io/varlet-ui/icons/png'

// 新增的配置
export const COMPONENT_NAMESPACE = 'h' // 组件的命名空间, 也就是前缀
