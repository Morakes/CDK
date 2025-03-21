<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouteRecordRaw, useRouter } from 'vue-router';
import { getAllParentPath } from '@/router/helper/menuHelper';

const router = useRouter();
const routes = ref();

const getBreadcrumbList = () => {
  // 获取所有父路径, 顺序: 父=>子
  const paths = getAllParentPath(router.currentRoute.value.matched, router.currentRoute.value.path).filter(
    (path) => path !== '/'
  );

  routes.value = [router.getRoutes().find((item) => item.path === paths[0]), router.currentRoute.value];
};

watch(
  () => router.currentRoute.value,
  () => {
    getBreadcrumbList();
  },
  {
    immediate: true,
  }
);

const handleClick = (route: RouteRecordRaw, paths: string[]) => {
  // 只有父级菜单
  if (paths?.length === 1) {
    return;
  }
  router.push(route.path);
};
</script>

<template>
  <a-breadcrumb :routes="routes" class="contianer">
    <template #itemRender="{ route, paths }: { route: RouteRecordRaw; paths: string[] }">
      <span v-if="routes.indexOf(route) === routes.length - 1" class="bread-link">
        <dynamic-component :is="route.meta?.icon" type="antd_icon"></dynamic-component>
        {{ route.meta?.title || '' }}
      </span>
      <router-link v-else to="" @click="handleClick(route, paths)" class="bread-link">
        <dynamic-component :is="route.meta?.icon" type="antd_icon"></dynamic-component>
        {{ route.meta?.title || '' }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>
<style lang="less" scoped>
@grey-color: rgba(0, 0, 0, 0.45);
.contianer {
  display: flex;
  align-items: center;
  color: @text-color;
  .bread-link {
    font-size: @font-puhui-base;
    color: @text-color;
  }
}
</style>
