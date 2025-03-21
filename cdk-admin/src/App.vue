<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
</script>

<template>
  <AConfigProvider :locale="zhCN">
    <RouterView class="root" />
  </AConfigProvider>
</template>

<style lang="less">
.root {
  font-family: @font-puhui-base;
  font-size: 14px;
}
</style>
