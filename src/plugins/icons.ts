import type { App } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import 'element-plus/theme-chalk/base.css';
import 'element-plus/theme-chalk/index.css';
import "element-plus/theme-chalk/dark/css-vars.css";

// 注册所有图标
export function setupElIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  // app.use(ElementPlus)
}
