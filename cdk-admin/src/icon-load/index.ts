import * as antIcons from '@ant-design/icons-vue';
import { App } from 'vue';

export const setupAntdIcons = (app: App) => {
  Object.keys(antIcons).forEach((key: string) => {
    app.component(key, antIcons[key]);
  });
  app.config.globalProperties.$antIcons = antIcons;
};
