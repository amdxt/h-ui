<template>
  <div class="container">
    <ColorBlock
      v-for="id in ids"
      key="id"
      :id="id"
      style="margin: 16px 16px"
    ></ColorBlock>
  </div>
</template>

<script>
const getAllIds = () => {
  const ret = [];
  const types = ["primary", "success", "warning", "danger", "error", "info"];

  types.forEach((type) => {
    // ret.push(`colors-${type}-color`);
    ret.push(`colors-${type}-base`);

    ret.push(`colors-${type}-dark-2`);
    [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((num) => {
      ret.push(`colors-${type}-light-${num}`);
    });
  });

  const otherColors = {
    'text-color': [
        'primary',
        'regular',
        'secondary',
        'placeholder',
        'disabled',
    ],
    'fill-color': [
        '',
        'light',
        'lighter',
        'extra-light',
        'dark',
        'darker',
        'blank',
    ],
    'bg-color': [
        '',
        'page',
        'overlay',
    ]
  }
  // text-color
//   ["primary", "regular", 'secondary', 'placeholder', 'disabled'].forEach((name) => {
//     ret.push(`text-color-${name}`);
//   });
    Object.entries(otherColors).forEach(([name, secondNames]) => {
        secondNames.forEach(secondName => {
            ret.push(`${name}-${secondName}`)
        })
        
    })

  return ret;
};

export default {
  name: "ColorBlockPage",
  data() {
    return {
      ids: getAllIds(),
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
</style>
