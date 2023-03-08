<template>
    <div>
        <div>App</div>
        <div style="display: inline-block">
            <RadioGroupButton :config="config"></RadioGroupButton>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            config: {
                options: [
                    {
                        id: 1,
                        name: 'amazon',
                    },
                    {
                        id: 2,
                        name: 'aliexpress',
                        disabled: true,
                    },
                    {
                        id: 3,
                        name: 'shopee',
                    },
                    {
                        id: 4,
                        name: 'lazada',
                    },
                ],
                value: 1,
            },
        }
    },
}
</script>

<style lang="scss" scoped></style>
