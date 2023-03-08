<template>
    <div class="radio-box" :class="[$huiGetNs()]">
        <div
            v-for="(item, index) in config.options"
            :key="index"
            :title="item.disabledTitle"
            :class="[
                $huiGetNsE('item'),
                getItemStyle(item.id, index, item.disabled),
                {
                    [$huiGetNsState('disabled')]: item.disabled === true,
                },
            ]"
            :style="{ height: height + 'px' }"
            @click="handleDateChange(item)"
        >
            <component v-if="item.slot" :is="item.slot" />
            <span v-else>{{ item.name }}</span>
        </div>
    </div>
</template>

<script>
// eslint-disable vue/no-mutating-props
import { nsMixin } from '@my-h-ui/mixins'
export default {
    mixins: [nsMixin],
    name: 'RadioGroupButton',
    props: {
        config: {
            type: Object,
            default() {
                return {}
            },
        },
        height: {
            type: Number,
            default: 30,
        },
        setTraceTitle: String, // 自动埋点上报的名称
    },
    data() {
        return {
            newValue: '',
        }
    },
    methods: {
        handleDateChange({ id, disabled, name }) {
            if (disabled) return
            if (id !== this.config.value) {
                // eslint-disable-next-line vue/no-mutating-props
                this.config.value = id
                this.$emit('change')
            }
            if (this.setTraceTitle) {
                this.$sensors.setWebClick({
                    name: `${this.setTraceTitle}-${name}`,
                })
            }
        },
        getItemStyle(id, index, disabled) {
            if (disabled) {
                return [this.$huiGetNsEM('item', 'disabled')]
            } else if (this.config.value === id && index === 0) {
                return [
                    this.$huiGetNsEM('item', 'on'),
                    this.$huiGetNsEM('item', 'on-first'),
                ]
            } else if (
                this.config.value === id &&
                index === this.config.options.length - 1
            ) {
                return [
                    this.$huiGetNsEM('item', 'on'),
                    this.$huiGetNsEM('item', 'on-last'),
                ]
            } else if (this.config.value === id) {
                return [this.$huiGetNsEM('item', 'on')]
            } else {
                return ''
            }
        },
    },
}
</script>
