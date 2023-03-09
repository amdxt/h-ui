# RadioGroupButton

button 样式的 radioGroup, 又名胶囊

## 用法

### 简单用法

:::demo 基本用法

```vue
<template>
  <div style="display: flex">
    <radio-group-button
      :value="value"
      :options="options"
      @change="handleChange"
    ></radio-group-button>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const options = ref([
      {
        name: "amazon1",
        id: 1,
      },
      {
        name: "aliexpress",
        id: 2,
        disabled: true,
      },
      {
        name: "lazada",
        id: 3,
      },
      {
        name: "shopee",
        id: 4,
      },
    ]);
    const value = ref(1);

    function handleChange(val) {
      value.value = val;
    }

    return {
      value,
      options,
      handleChange,
    };
  },
};
</script>
```

:::

### 大小控制

:::demo 可以使用 size or height 属性来控制组件的大小
```vue
<template>
  <div>
    <div style="display: flex">
      <radio-group-button
        :value="value"
        :options="options"
        @change="handleChange"
      ></radio-group-button>
      <div>默认大小 size="md"</div>
    </div>
    <div style="display: flex">
      <radio-group-button
        size="sm"
        :value="value"
        :options="options"
        @change="handleChange"
      ></radio-group-button>
      <div>size="sm"</div>
    </div>
    <div style="display: flex">
      <radio-group-button
        :height="40"
        :value="value"
        :options="options"
        @change="handleChange"
      ></radio-group-button>
      <div>自定义高度</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const options = ref([
      {
        name: "amazon1",
        id: 1,
      },
      {
        name: "aliexpress",
        id: 2,
        disabled: true,
      },
      {
        name: "lazada",
        id: 3,
      },
      {
        name: "shopee",
        id: 4,
      },
    ]);
    const value = ref(1);

    function handleChange(val) {
      value.value = val;
    }

    return {
      value,
      options,
      handleChange,
    };
  },
};
</script>
```

:::

## API

### Props

#### RadioGroupButton Props

| Prop      | Description          | Type                                            | Default |
| --------- | -------------------- | ----------------------------------------------- | ------- |
| `value`   | 当前活跃状态的 radio | _string_ \| _Number_                            |         |
| `options` | options              | {id: string, name: string, disabled: boolean}[] | `[]`    |
| `size`    | 尺寸                 | _sm_ \| _md_                                    | `md`    |
| `height`  | 自定义高度           | _string_                                        | `30px`  |

### Events

#### RadioGroupButton Events

| Event    | Description                   | Arguments                         |
| -------- | ----------------------------- | --------------------------------- |
| `change` | active options 改变的时候触发 | `id: 当前点击的 option 对应的 id` |

### Slots

#### RadioGroupButton Slots

| Name      | Description    | SlotProps |
| --------- | -------------- | --------- |
| `default` | Button content | `-`       |
