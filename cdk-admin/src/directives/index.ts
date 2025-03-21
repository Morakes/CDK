import { App } from 'vue';
import { setupLazyLoadDirective } from './lazyLoad';
import { setupEllipsisDirective } from './ellipsis';
import { setupAuthDirective } from './permission';

export const setupGlobalDirecitve = (app: App) => {
  setupLazyLoadDirective(app);
  setupEllipsisDirective(app);
  setupAuthDirective(app);
};
