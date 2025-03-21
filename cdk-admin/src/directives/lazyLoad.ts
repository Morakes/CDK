import type { App, Directive } from 'vue';

const lazyLoadHandler = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      (entry.target as HTMLImageElement).src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(lazyLoadHandler, {
  rootMargin: '20px',
});

export const lazyLoad: Directive<HTMLElement, string> = {
  mounted(el, { value }) {
    el.dataset.src = value;
    observer.observe(el);
  },
};

export const setupLazyLoadDirective = (app: App) => {
  app.directive('lazy', lazyLoad);
};
