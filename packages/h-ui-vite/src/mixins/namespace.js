import { configProviderContextKey } from '../tokens'
import kebabCase from 'lodash/kebabCase'

const statePrefix = 'is-'
const defaultNamespace = 'h'

const _bem = (namespace, block, blockSuffix, element, modifier) => {
    let cls = `${namespace}-${block}`
    if (blockSuffix) {
        cls += `-${blockSuffix}`
    }
    if (element) {
        cls += `__${element}`
    }
    if (modifier) {
        cls += `--${modifier}`
    }
    return cls
}

export const nsMixin = {
    inject: {
        $huiGlobalConfig: {
            from: configProviderContextKey,
            default() {
                return {
                    namespace: defaultNamespace,
                }
            },
        },
    },
    data() {
        return {
            $huiNsBlock: '',
        }
    },
    methods: {
        $huiGetNs(blockName) {
            // this.$huiNsBlock = kebabCase(blockName || this.$options.name)
            return _bem(
                this.$huiGlobalConfig.namespace,
                this.$huiNsBlock,
                '',
                '',
                ''
            )
        },
        $huiGetNsB(blockSuffix) {
            return _bem(
                this.$huiGlobalConfig.namespace,
                this.$huiNsBlock,
                blockSuffix,
                '',
                ''
            )
        },
        $huiGetNsE(element) {
            return _bem(
                this.$huiGlobalConfig.namespace,
                this.$huiNsBlock,
                '',
                element,
                ''
            )
        },
        $huiGetNsM(modifier) {
            return _bem(
                this.$huiGlobalConfig.namespace,
                this.$huiNsBlock,
                '',
                '',
                modifier
            )
        },
        $huiGetNsBEM(blockSuffix, element, modifier) {
            return _bem(
                this.$huiGlobalConfig.namespace,
                this.$huiNsBlock,
                blockSuffix,
                element,
                modifier
            )
        },
        $huiGetNsBE(blockSuffix, element) {
            return _bem(
                this.$huiGlobalConfig.namespace,
                this.$huiNsBlock,
                blockSuffix,
                element,
                ''
            )
        },
        $huiGetNsBM(blockSuffix, modifier) {
            return _bem(
                this.$huiGlobalConfig.namespace,
                this.$huiNsBlock,
                blockSuffix,
                '',
                modifier
            )
        },
        $huiGetNsEM(element, modifier) {
            return _bem(
                this.$huiGlobalConfig.namespace,
                this.$huiNsBlock,
                '',
                element,
                modifier
            )
        },
        $huiGetNsState(name, state = true) {
            return name && state ? `${statePrefix}${name}` : ''
        },
    },
    beforeCreate() {
        console.log('123', this.$options.name, kebabCase(this.$options.name))
        this.$huiNsBlock = kebabCase(this.$options.name)
    },
}
