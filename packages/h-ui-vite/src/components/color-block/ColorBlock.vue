<template>
    <div :class="classes">{{ id }}</div>
</template>

<script>
export default {
    name: 'ColorBlock',
    props: {
        id: {
            type: String,
            default: 'colors-primary-color',
        },
    },
    computed: {
        classes() {
            return [`h-color-block--${this.id}`, 'h-color-block']
        },
    },
}
</script>
