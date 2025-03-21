import { RouteRecordRaw } from 'vue-router';

interface TreeHelperConfig {
  id: string;
  children: string;
  pid: string;
}

// 默认配置
const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

export function findPath<T = any>(tree: any, func: Fn, config: Partial<TreeHelperConfig> = {}): T | T[] | null {
  config = getConfig(config);
  const path: T[] = [];
  const list = [...tree];
  const visitedSet = new Set();
  const { children } = config;
  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      node[children!] && list.unshift(...node[children!]);
      path.push(node);
      // 命中目标路径
      if (func(node)) {
        return path;
      }
    }
  }
  return null;
}

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as RouteRecordRaw[];
  return (menuList || []).map((item) => item.path);
}
