# Tabs

常用页面内导航

## 基础用法

基础的函数用法

:::demo 基础用法(显示代码后的描述)

```vue
<template>
  <div style="margin-bottom:20px;">
    <HTabs :tabs="options" :value="value" @change="handleChange"></HTabs>
    <span>123</span>
    <span>11</span>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const options = ref([
      {
        name: 'amazon1',
        id: 1,
      },
      {
        name: 'aliexpress',
        id: 2,
      },
      {
        name: 'lazada',
        id: 3,
      },
      {
        name: 'shopee',
        id: 4,
      },
    ])
    const value = ref(1)

    function handleChange(val) {
      value.value = val
    }

    return {
      options,
      value,
      handleChange,
    }
  }
}
</script>
```

:::