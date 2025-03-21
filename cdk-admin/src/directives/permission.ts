import { App, Directive, DirectiveBinding } from 'vue';

const hasPermission = (arg: any) => !!arg;

const authDirective: Directive = {
  mounted: (el: Element, binding: DirectiveBinding<any>) => {
    const { value } = binding;
    if (!value) {
      return;
    }
    if (!hasPermission(value)) {
      el.parentNode?.removeChild(el);
    }
  },
};

export const setupAuthDirective = (app: App) => {
  app.directive('auth', authDirective);
};

export default authDirective;
