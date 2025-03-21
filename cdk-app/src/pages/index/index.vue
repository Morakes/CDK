<template>
  <view class="container">
    <!-- 标题 -->
    <NavigationBar title="gamecode宝库" :show-back="false" />

    <!-- swipe轮播图 -->
    <up-swiper :list="banners" :autoplay="true" :circular="true" :indicator="true" indicatorMode="dot" height="180"></up-swiper>

    <!-- 游戏卡片 -->
    <view class="games-card-title">
      <text>热门游戏兑换码</text>
      <span class="games-card-more" @click="handleToSearch">
        戳我更多
        <up-icon name="arrow-right" color="" class="back-icon" size="18" />
      </span>
    </view>
    <view v-for="item in games" :key="item.name">
      <GameCard :data="item" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import GameCard from '@/components/card/GameCard.vue'
import NavigationBar from '@/components/NavigationBar.vue';
import { gameLists } from './config';
import { onLoad } from '@dcloudio/uni-app';
import { apiGetBannerList, apiGetGameList } from '@/apis/index.api';
import { ref } from 'vue';
import type { IGameType } from './type';

const games = ref<IGameType[]>()
const banners = ref();

function fetchList() {
  apiGetGameList().then(res => {
    games.value = res.data;
  })
};

function fetchBanner() {
  apiGetBannerList().then(res => {
    banners.value = res.data.map((i) => i.imageUrl)
  })
}

const handleToSearch = () => {
  uni.navigateTo({
    url: '/pages/game-search/game-search'
  })
}
onLoad(() => {
  fetchList();
  fetchBanner()
})

</script>

<style scoped lang="scss">
.container {
  // #if MP-WEIXIN
  height: 100vh;
  // #endif
  // #if H5
  height: calc(100vh - var(--window-bottom));
  // #endif
  padding: 0 10px;
  padding-top: var(--status-bar-height);
  background: url('https://haowallpaper.com/link/common/file/getCroppingImg/15024949517192512') no-repeat center / cover;
  color: var(--font-color);
  overflow-x: hidden;
  overflow-y: scroll;
  .games-card-title {
    margin-top: 40rpx;
    margin-bottom: 20rpx;
    font-size: 35rpx;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    color: var(--color-orange);
    .games-card-more {
      font-size: 30rpx;
      display: flex;
      align-items: center;
    }
  }
}
</style>