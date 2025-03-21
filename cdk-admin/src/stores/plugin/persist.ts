import { Pinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import type { PersistedStateFactoryOptions } from 'pinia-plugin-persistedstate';

/**
 * Register Pinia Persist Plugin
 * 注册 Pinia 持久化插件
 *
 * @param pinia Pinia instance Pinia 实例
 */
export function registerPiniaPersistPlugin(pinia: Pinia) {
  pinia.use(createPersistedState(createPersistedStateOptions()));
}

/**
 * Create Persisted State Options
 * 创建持久化状态选项
 *
 * @param keyPrefix prefix for storage key 储存键前缀
 * @returns persisted state factory options
 */
export function createPersistedStateOptions(): PersistedStateFactoryOptions {
  return {
    storage: sessionStorage,
    // key: (id) => `${keyPrefix}__${id}`,
  };
}
