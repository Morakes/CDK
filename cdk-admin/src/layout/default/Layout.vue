<script lang="ts" setup>
import SideMenu from './side-menu/SideMenu.vue';
import Header from './header/Header.vue';
import Content from './content/Content.vue';
import Footer from './footer/Footer.vue';
import { useAppStore } from '@/stores/modules/app';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { collapsed } = storeToRefs(appStore);
</script>

<template>
  <a-layout has-sider class="root">
    <SideMenu />
    <a-layout :class="[collapsed ? 'a-layout-collapsed' : 'a-layout-not-collapsed']">
      <Header />
      <Content />
      <Footer />
    </a-layout>
  </a-layout>
</template>

<style lang="less">
.root {
  font-family: @font-puhui-base;
  font-size: 16px;
  .a-layout-collapsed {
    margin-left: 85px;
    transition: 0.2s margin-left ease-out;
  }
  .a-layout-not-collapsed {
    margin-left: 205px;
    transition: 0.2s margin-left ease-out;
  }
}

</style>
