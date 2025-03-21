<template>
  <view class="container">
    <NavigationBar :show-back="true" :title="title" />
    <up-tabs 
        :list="list"
        @click="(_item, index: number) => {
          activeIndex = index;
        }"
        :scrollable="false" 
        :inactive-style="{
          color: '#ccc',
          fontWeight: 'bold',
        }"
        :active-style="{
          color: 'white',
          fontWeight: 'bold',
          transform: 'scale(1.05)'
        }"
      />

    <view v-for="item in gameCdks" :key="item" style="margin-top: 20rpx;">
      <CdkCard :data="item"  />
    </view>

  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import NavigationBar from '@/components/NavigationBar.vue';
import CdkCard from '@/components/card/CdkCard.vue';
import type { IGameCDKType } from '../index/type';
import { apiGetCdks } from '@/apis/index.api';

const gameCdks = ref<IGameCDKType[]>()
const title = ref('')
const list = ([
    { name: '兑换码' },
    // { name: '游戏论坛' },
]);

const fetchCdks = (id: number) => {
  return apiGetCdks(id).then((res) => {
    gameCdks.value = res.data
  })
}

onLoad(() => {
  // 获取当前页面实例
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const options = currentPage.options;
  title.value = options.name
  fetchCdks(Number(options.id))
})

</script>

<style lang="scss" scoped>
.container {
  padding: 0 10px;
  padding-top: var(--status-bar-height);
  background: url('https://haowallpaper.com/link/common/file/getCroppingImg/15477537881035072') no-repeat center / cover;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>