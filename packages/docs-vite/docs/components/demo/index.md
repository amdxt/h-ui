## API

### Props

#### Button Props

| Prop             | Description                                                                             | Type      | Default        |
|------------------|-----------------------------------------------------------------------------------------|-----------|----------------|
| `d-type`           | Button type, Can be set to `default` `primary` `info` `success` `warning` `danger`      | _string_  | `default`      |
| `d-native-type`    | Native button type, Can be set to `button` `submit` `reset` | _string_  | `button`       |
| `d-size`           | Button size, Can be set to `normal` `mini` `small` `large`                              | _string_  | `normal`       |
| `d-loading`        | Loading status                                                                          | _boolean_ | `false`        |
| `d-loading-radius` | Loading radius, Can only be used when `loading-type="circle"`                           | _string  \| number_        | `-`      |
| `d-loading-type`   | Loading type, Can be set to `circle` `wave` `cube` `rect` `disappear`                   | _string_  | `circle`       |
| `d-loading-size`   | Loading size, Can be set to `large` `normal` `small` `mini`                             | _string_  | `normal`       |
| `d-loading-color`  | Loading color                                                                           | _string_  | `currentColor` |
| `d-auto-loading`   | Autoload mode for easy handling of asynchronous tasks                                   | _boolean_ | `false`        |
| `d-round`          | Whether to be round button                                                              | _boolean_ | `false`        |
| `d-block`          | Whether to be block button                                                              | _boolean_ | `false`        |
| `d-text`           | Whether to be text button                                                               | _boolean_ | `false`        |
| `d-outline`        | Whether to be outline button                                                            | _boolean_ | `false`        |
| `d-disabled`       | Whether to disable button                                                               | _boolean_ | `false`        |
| `d-ripple`         | Whether to be ripple button                                                             | _boolean_ | `true`         |
| `d-text-color`     | Button Text color                                                                       | _string_  | `-`            |
| `d-color`          | Button background color                                                                 | _string_  | `-`            |

#### ButtonGroup Props

| 参数           | 说明                                                                                       | 类型       | 默认值       |
|--------------|------------------------------------------------------------------------------------------|----------|-----------|
| `type`       | Button Group type, Can be set to `default` `primary` `info` `success` `warning` `danger` | _string_ | `default` |
| `size`       | Button Group size, Can be set to `normal` `mini` `small` `large`                         | _string_ | `normal`  |
| `mode`       | Button Group mode, Can be set to `normal` `text` `outline`                               | _string_ | `normal`  |
| `vertical`   | Whether to be vertical button  group                                                     | _boolean_ | `false`   |
| `elevation`         | The elevation of Button Group                                                         | _string \| number_  | `2`     |
| `color`      | Button Group background color                                                            | _string_ | `-`       |
| `text-color`     | Button Group Text color                                                                  | _string_  | `-`            |

### Events

#### Button Events

| Event        | Description                                                                                          | Arguments      |
| ------------ | ---------------------------------------------------------------------------------------------------- | -------------- |
| `d-click`      | Triggered when the button is clicked. Not triggered when `loading` or `disabled` status is `true`    | `event: Event` |
| `d-touchstart` | Triggered when the button is touchstart, Not triggered when `loading` or `disabled` status is `true` | `event: Event` |

### Slots

#### Button Slots

| Name | Description | SlotProps |
| --------- | -------------- | --------- |
| `d-default` | Button content | `-`       |

#### ButtonGroup Slots

| Name | Description | SlotProps |
| --------- | -------------- | --------- |
| `default` | Button group content | `-`       |

### Style Variables

Here are the CSS variables used by the component, Styles can be customized using [StyleProvider](#/en-US/style-provider).

#### Button Variables

| Variable                       | Default                      |
| ------------------------------ | ---------------------------- |
| `--button-default-color`       | `#f5f5f5`                    |
| `--button-primary-color`       | `var(--color-primary)`       |
| `--button-danger-color`        | `var(--color-danger)`        |
| `--button-success-color`       | `var(--color-success)`       |
| `--button-warning-color`       | `var(--color-warning)`       |
| `--button-info-color`          | `var(--color-info)`          |
| `--button-disabled-color`      | `var(--color-disabled)`      |
| `--button-disabled-text-color` | `var(--color-text-disabled)` |
| `--button-border-radius`       | `4px`                        |
| `--button-mini-padding`        | `0 9px`                      |
| `--button-small-padding`       | `0 11px`                     |
| `--button-normal-padding`      | `0 15px`                     |
| `--button-large-padding`       | `0 22px`                     |
| `--button-round-padding`       | `6px`                        |
| `--button-mini-height`         | `20px`                       |
| `--button-small-height`        | `28px`                       |
| `--button-normal-height`       | `36px`                       |
| `--button-large-height`        | `44px`                       |
| `--button-mini-font-size` | `var(--font-size-xs)` |
| `--button-small-font-size` | `var(--font-size-sm)` |
| `--button-normal-font-size` | `var(--font-size-md)` |
| `--button-large-font-size` | `var(--font-size-lg)` |
