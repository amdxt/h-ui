"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const vue = require("vue");
const __uno = "";
const props = {
  color: {
    type: String,
    default: "blue"
    // 设定默认颜色
  },
  icon: {
    type: String,
    default: ""
    // 设定默认颜色
  }
};
const Button = /* @__PURE__ */ vue.defineComponent({
  name: "HButton",
  props,
  setup(props2, {
    slots
  }) {
    return () => vue.createVNode("button", {
      "class": `
      py-2 
      px-4 
      font-semibold 
      rounded-lg 
      shadow-md 
      text-white 
      bg-${props2.color}-500 
      hover:bg-${props2.color}-700 
      border-none 
      cursor-pointer 
      `
    }, [props2.color ? vue.createVNode("i", {
      "class": `i-ic-baseline-${props2.icon} p-3`
    }, null) : "", slots.default ? slots.default() : ""]);
  }
});
Button.install = (app) => {
  app.component(Button.name, Button);
};
const JSXButton = /* @__PURE__ */ vue.defineComponent({
  name: "HJSXButton",
  render() {
    return vue.createVNode("button", null, [vue.createTextVNode("jsx-button")]);
  }
});
const _export_sfc = (sfc, props2) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {
  name: "HSFCButton"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("button", null, "sfc-button");
}
const SFCButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const entry = {
  install(app) {
    app.component(Button.name, Button);
    app.component(JSXButton.name, JSXButton);
    app.component(SFCButton.name, SFCButton);
  }
};
exports.Button = Button;
exports.JSXButton = JSXButton;
exports.SFCButton = SFCButton;
exports.default = entry;
//# sourceMappingURL=h-ui.cjs.js.map
