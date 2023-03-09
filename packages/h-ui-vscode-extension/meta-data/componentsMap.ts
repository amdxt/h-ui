export interface ComponentDescriptor {
    path: string // hover 上去的时候, 跳转到文档需要的path
    attrs?: string[] // 选择组建后 默认属性
    characterDelta?: number // 选择组建后, 鼠标往前移动步数
    closeSelf?: boolean // 是否是自闭和的  <h-icon />
}

export const componentsMap: Record<string, ComponentDescriptor> = {
    // <var-demo name=""><cursor-pos></var-demo>
    demo: {
        path: '/components/button/simple.html', // hover 上去的时候, 跳转到文档需要的path
        attrs: ['name=""'], // 默认属性
        closeSelf: false, // 是否是自闭和的
        characterDelta: 0, // 选择组建后, 鼠标往前移动步数
    },
    // <demo-close-self name="<cursor-pos>" />
    'demo-close-self': {
        path: '/icon',
        attrs: ['name=""'],
        closeSelf: true,
        characterDelta: -2,
    },
    button: {
        path: '/button',
        attrs: ['type="primary"'],
    },
    tabs: {
        path: '/components/tabs/', // hover 上去的时候, 跳转到文档需要的path
        attrs: ['tabs=""', 'value=""'], // 默认属性
        closeSelf: false, // 是否是自闭和的
        characterDelta: 0, // 选择组建后, 鼠标往前移动步数
    },
    'radio-group-button': {
        path: '/components/radio-group-button/', // hover 上去的时候, 跳转到文档需要的path
        attrs: ['value=""', 'options=""'], // 默认属性
        closeSelf: false, // 是否是自闭和的
        characterDelta: 0, // 选择组建后, 鼠标往前移动步数
    },
}
