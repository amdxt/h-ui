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
const Button$2 = /* @__PURE__ */ vue.defineComponent({
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
      h-button__text--primary
      `
    }, [props2.color ? vue.createVNode("i", {
      "class": `i-ic-baseline-${props2.icon} p-3`
    }, null) : "", slots.default ? slots.default() : ""]);
  }
});
Button$2.install = (app) => {
  app.component(Button$2.name, Button$2);
};
const Button$1 = /* @__PURE__ */ vue.defineComponent({
  name: "HJSXButton",
  render() {
    return vue.createVNode("button", null, [vue.createTextVNode("jsx-button")]);
  }
});
Button$1.install = (app) => {
  app.component(Button$1.name, Button$1);
};
const _export_sfc = (sfc, props2) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = {
  name: "HSFCButton"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("span", null, "sfc button");
}
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
Button.install = (app) => {
  app.component(Button.name, Button);
};
const Tabs_vue_vue_type_style_index_0_scoped_221a5ab7_lang = "";
const _sfc_main = {
  name: "HTabs",
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: [String, Number]
    },
    height: {
      type: Number,
      default: 40
    },
    fontSize: {
      type: Number,
      default: 14
    }
  },
  data() {
    return {};
  },
  computed: {
    valueInner: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("update:value", val);
      }
    }
  },
  methods: {
    handleClickTab(id) {
      this.valueInner = id;
      this.$emit("change", id);
    }
  }
};
const _hoisted_1 = ["name", "onClick"];
const _hoisted_2 = {
  key: 0,
  class: "el-icon-loading"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", null, [
    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.tabs, (tab) => {
      return vue.openBlock(), vue.createElementBlock("span", {
        key: tab.name,
        class: vue.normalizeClass(["tab", { active: tab.id === $options.valueInner }]),
        style: vue.normalizeStyle({ lineHeight: `${$props.height}px`, fontSize: `${$props.fontSize}px` }),
        name: tab.id,
        onClick: ($event) => $options.handleClickTab(tab.id)
      }, [
        tab.isLoading ? (vue.openBlock(), vue.createElementBlock("i", _hoisted_2)) : vue.createCommentVNode("", true),
        vue.createTextVNode(" " + vue.toDisplayString(tab.name), 1)
      ], 14, _hoisted_1);
    }), 128))
  ]);
}
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-221a5ab7"]]);
Tabs.install = (app) => {
  app.component(Tabs.name, Tabs);
};
const entry = {
  install(app) {
    app.component(Button$2.name, Button$2);
    app.component(Button$1.name, Button$1);
    app.component(Button.name, Button);
    app.component(Tabs.name, Tabs);
  }
};
exports.Button = Button$2;
exports.JSXButton = Button$1;
exports.SFCButton = Button;
exports.default = entry;
//# sourceMappingURL=h-ui.cjs.js.map
