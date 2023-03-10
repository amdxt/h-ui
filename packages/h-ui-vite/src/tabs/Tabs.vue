<template>
    <div>
        <span
            v-for="tab in tabs"
            :key="tab.name"
            class="tab"
            :class="{ active: tab.id === valueInner }"
            :style="{ lineHeight: `${height}px`, fontSize: `${fontSize}px` }"
            :name="tab.id"
            @click="handleClickTab(tab.id)"
        >
            <i v-if="tab.isLoading" class="el-icon-loading"></i>
            {{ tab.name }}
        </span>
    </div>
</template>

<script lang="js">
export default {
    name: 'HTabs',
    props: {
        tabs: {
            type: Array,
            default() {
                return []
            },
        },
        value: {
            type: [String, Number],
        },
        height: {
            type: Number,
            default: 40,
        },
        fontSize: {
            type: Number,
            default: 14,
        },
    },
    data() {
        return {}
    },
    computed: {
        valueInner: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('update:value', val)
            },
        },
    },
    methods: {
        handleClickTab(id) {
            this.valueInner = id
            this.$emit('change', id)
        },
    },
}
</script>

<style lang="scss" scoped>
$G9: #313233;
$main-color: #3b6cff;

.tab {
    font-weight: 600;
    color: $G9;
    display: inline-block;
    vertical-align: top;
    margin: 0 24px 0;
    text-align: center;
    cursor: pointer;
    &.active {
        color: $main-color;
        border-bottom: 2px solid $main-color;
    }
}
</style>
