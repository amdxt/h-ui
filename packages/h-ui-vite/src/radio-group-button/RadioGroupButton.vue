<template>
    <div class="radio-box">
        <div
            v-for="(item, index) in config.options"
            :key="index"
            :title="item.disabledTitle"
            class="radio-item"
            :class="getItemStyle(item.id, index, item.disabled)"
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
export default {
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
                return ' disabled'
            } else if (this.config.value === id && index === 0) {
                return 'radio-item-on radio-item-on-first'
            } else if (
                this.config.value === id &&
                index === this.config.options.length - 1
            ) {
                return 'radio-item-on radio-item-on-last'
            } else if (this.config.value === id) {
                return 'radio-item-on'
            } else {
                return ''
            }
        },
    },
}
</script>

<style lang="scss" scoped>
$G4: #e1e1e1;
$G9: #313233;
$main-color: #3b6cff;

.radio-box {
    display: flex;
    border: 1px solid $G4;
    border-radius: 2px;
    .radio-item {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        box-sizing: content-box;
        color: $G9;
        font-size: 13px;
        padding: 0 10px;
        border-right: 1px solid $G4;
        cursor: pointer;
        &:last-child {
            border-right: none;
        }
    }
    .radio-item-on {
        color: $main-color;
        font-weight: 500;
        &::after {
            content: '';
            position: absolute;
            top: -1px;
            left: -1px;
            width: 100%;
            height: 100%;
            z-index: 1;
            border: 1px solid $main-color;
        }
    }
    .disabled {
        cursor: not-allowed;
        background: rgb(242, 242, 242);
    }
    .radio-item-on-first::after {
        border-radius: 2px 0px 0px 2px;
    }
    .radio-item-on-last::after {
        border-radius: 0px 2px 2px 0px;
    }
}
</style>
