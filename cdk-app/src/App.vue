<template>
  <view class="app">
    <router-view />
  </view>
</template>

<script setup>
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
@import "uview-plus/index.scss";
@import './assets/css/variables.css';

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

</style>