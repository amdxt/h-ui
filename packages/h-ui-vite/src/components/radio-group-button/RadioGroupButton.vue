<template>
    <div :class="[$huiGetNs()]">
        <div
            v-for="(item, index) in options"
            :key="index"
            :title="item.disabledTitle"
            :class="[
                $huiGetNsE('item'),
                $huiGetNsEM('item', size),
                getItemStyle(item.id, index, item.disabled),
            ]"
            :style="styleObj"
            @click="handleChange(item)"
        >
            <component v-if="item.slot" :is="item.slot" />
            <span v-else>{{ item.name }}</span>
        </div>
    </div>
</template>

<script lang="js">
// eslint-disable vue/no-mutating-props
import { nsMixin } from './../../mixins'
export default {
    mixins: [nsMixin],
    name: 'RadioGroupButton',
    emits: ['change'],
    props: {
        value: [String, Number],
        options: {
            type: Array,
            default() {
                return []
            },
        },
        size: {
            type: String,
            default: 'md', // sm md lg xl
        },
        height: {
            type: Number,
        },
    },
    data() {
        return {
            newValue: '',
        }
    },
    computed: {
        styleObj() {
            const ret = {}

            if (this.height) {
                ret.height = this.height + 'px'
            }

            return ret
        },
    },
    methods: {
        handleChange(item = {}) {
            const { id, disabled } = item
            if (disabled) return
            if (id !== this.value) {
                this.$emit('change', id, item)
            }
        },
        getItemStyle(id, index, disabled) {
            if (disabled) {
                return [this.$huiGetNsState('disabled')]
            }

            if (this.value === id && index === 0) {
                return [
                    this.$huiGetNsEM('item', 'on'),
                    this.$huiGetNsEM('item', 'on-first'),
                ]
            } else if (this.value === id && index === this.options.length - 1) {
                return [
                    this.$huiGetNsEM('item', 'on'),
                    this.$huiGetNsEM('item', 'on-last'),
                ]
            } else if (this.value === id) {
                return [this.$huiGetNsEM('item', 'on')]
            } else {
                return ''
            }
        },
    },
}
</script>
