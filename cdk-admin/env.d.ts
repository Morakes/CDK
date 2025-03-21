/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare module 'vue' {
//   import type { DefineComponent } from 'vue';
//   interface ComponentCustomProperties {
//     $antIcons: Record<string, DefineComponent>;
//   }
// }

declare interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare type Res<T> = {
  code: number;
  msg: string;
  data: T;
};
