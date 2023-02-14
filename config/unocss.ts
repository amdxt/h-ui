import { presetUno, presetAttributify, presetIcons } from 'unocss'
import Unocss from 'unocss/vite'

const colors = [
    'white',
    'black',
    'gray',
    'red',
    'yellow',
    'green',
    'blue',
    'indigo',
    'purple',
    'pink',
]

const safelist: string[] = [
    ...colors.map((item) => `bg-${item}-500`),
    ...colors.map((item) => `hover:bg-${item}-700`),
    ...[
        'search',
        'edit',
        'check',
        'message',
        'star-off',
        'delete',
        'add',
        'share',
    ].map((v) => `i-ic-baseline-${v}`),
]

export default () => {
    return Unocss({
        safelist,
        presets: [presetUno(), presetAttributify(), presetIcons()],
    })
}
