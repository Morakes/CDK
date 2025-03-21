<script setup lang="ts">
import { computed } from 'vue';
import LOGO from '@/assets/logo.ico';
import { useRoute, useRouter } from 'vue-router';
import SideMenuItem from './SideMenuItem.vue';
import { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import { useAppStore } from '@/stores/modules/app';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const { collapsed } = storeToRefs(appStore);

const currentKeys = computed(() => [route.path]);

const menus = route.matched[0].children;

const getRoutePath = (name: string) => {
  return router.getRoutes().find((item) => item.name === name);
};
const handleMenuClick = ({ key }: MenuInfo) => {
  if (key === route.path) return;
  const nextRoute = getRoutePath(key as string);
  if (!nextRoute) return;
  router.push(nextRoute.path);
};
</script>

<template>
  <a-layout-sider :collapsed="collapsed" collapsible @collapse="appStore.setCollapsed" class="layout-sider">
    <!-- :style="{
      overflow: 'auto',
      left: 0,
      top: 0,
      bottom: 0,
      background: '#fff',
    }" -->
    <div class="sy-logo">
      <img :src="LOGO" alt="admin-logo" />
      <template v-if="!collapsed"> CDK后台 </template>
    </div>
    <a-menu :selectedKeys="currentKeys" mode="inline" @click="handleMenuClick">
      <template v-for="item in menus" :key="item.name">
        <SideMenuItem :menuInfos="item" />
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<style lang="less" scoped>
.layout-sider {
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
  background: @bg-color;
}

:deep(.ant-layout-sider-trigger) {
  background-color: @bg-color;
  .anticon svg {
    color: #9d9d9d;
  }
}

.sy-logo {
  margin: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: @text-color;
  img {
    width: 50px;
    height: auto;
    border-radius: 8%;
  }
}

</style>
