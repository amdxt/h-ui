module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
        jest: true,
    },
    globals: {
        ga: true,
        chrome: true,
        __DEV__: true,
    },
    plugins: ['@typescript-eslint'],
    // 解析 .vue 文件
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser', // 解析 .ts 文件
    },
    extends: [
        'plugin:json/recommended',
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/prettier',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'prettier/prettier': 'error',
        'no-unused-vars': 'warn',
    },
}
