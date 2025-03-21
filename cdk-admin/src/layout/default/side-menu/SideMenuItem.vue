<template>
  <template v-if="showSubMenu">
    <a-sub-menu :key="menuInfos?.name">
      <template #title>
        <span>
          <DynamicComponent :is="menuInfos?.meta?.icon" type="antd_icon"></DynamicComponent>
          <span>{{ props.menuInfos?.meta?.title }}</span>
        </span>
      </template>
      <template v-for="item in menuChildren" :key="item.name">
        <side-menu-item :menu-infos="item" />
      </template>
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="props.menuInfos?.name">
      <DynamicComponent :is="menuInfos?.meta?.icon" type="antd_icon"></DynamicComponent>
      <span>{{ props.menuInfos?.meta?.title }}</span>
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import DynamicComponent from '@/components/dynamic-component/DynamicComponent.vue';

const props = defineProps({
  menuInfos: Object as PropType<RouteRecordRaw>,
});

// 判断 是否有子路由
const showSubMenu = computed(() => {
  const menuInfos = props.menuInfos;
  return menuInfos?.children && menuInfos?.children?.length > 0;
});
// 获取子路由
const menuChildren = computed(() => {
  return props.menuInfos?.children || [];
});
</script>

<style lang="less" scoped></style>
