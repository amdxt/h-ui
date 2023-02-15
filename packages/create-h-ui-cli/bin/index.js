#!/usr/bin/env node
console.log('this is create-h-ui-cli')

import clear from 'clear'
import figlet from 'figlet'
import chalkAnimation from 'chalk-animation'
import { logGreen } from '../lib/utils/index.js'
import inquirer from 'inquirer'

async function query() {
    logGreen('请简单回答几个问题就可以使用 h-ui 了')

    const question = [
        {
            name: 'operation',
            type: 'rawlist' /* 选择框 */,
            message: '请选择要创建的项目？',
            choices: [
                {
                    name: '创建 h-ui-app-vite',
                    value: 'h-ui-app-vite',
                    short: '',
                },
                {
                    name: '创建 h-ui',
                    value: 'h-ui',
                    short: '',
                },
                {
                    name: '退出',
                    value: 'exit',
                    short: '',
                },
            ],
        },
    ]

    const answer = await inquirer.prompt(question)
    console.log(answer)
    if (answer.operation === 'exit') {
        logGreen('小的退下了')
    } else {
        const { default: op } = await import(
            `../lib/operations/${answer.operation}.js`
        )
        console.log('123', op)
        if (op) {
            op()
        }
    }
}

function main() {
    clear()
    const logo = figlet.textSync('@my-h-ui/h-ui!', {
        // font: "Ghost",
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
    })

    const rainbow = chalkAnimation.rainbow(logo)
    setTimeout(() => {
        rainbow.stop() // Animation stops
        query()
    }, 1000)
}

main()
