<script setup lang="ts">
import Breadcrumb from './components/Breadcrumb.vue';
import Avatar from './components/Avatar.vue';
import AppThemeModeToggle from '@/components/application/AppThemeModeToggle.vue';
</script>
<template>
  <a-layout-header>
    <div class="container">
      <Breadcrumb style="margin-right: auto" />
      <Avatar />
      <AppThemeModeToggle />
    </div>
  </a-layout-header>
</template>

<style scoped lang="less">
.ant-layout-header {
  background: @bg-color;
  border: 1px solid @border-color;
  padding: 0 16px;
  height: 60px;
}
.container {
  width: 100%;
  height: inherit;
  display: flex;
  column-gap: 16px;
  align-items: center;
  font-family: @font-puhui-base;
  font-size: 16px;
}
</style>
