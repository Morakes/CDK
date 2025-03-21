<script setup lang="ts">
import PageLayout from '../../page/index.vue';
</script>
<template>
  <a-layout-content>
    <PageLayout />
  </a-layout-content>
</template>
<style lang="less" scoped>
.ant-layout .ant-layout-content {
  background: @bg-color;
  padding: 16px;
  font-family: @font-puhui-base;
  font-size: 16px;
  color: @text-color;
}
</style>
