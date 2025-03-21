<template>
  <view class="search-game-card" @click="goto">
    <view class="game-info">
      <image :src="props.data.cover" mode="aspectFill" class="game-icon" />
      <text class="game-name">{{ props.data.name }}</text>
    </view>
    <up-icon name="arrow-right" size="16" color="#999" />
  </view>
</template>

<script setup lang="ts">
import type { IGameType } from '@/pages/index/type';

interface Props {
  data: IGameType
}

const props = defineProps<Props>()

function goto() {
  uni.navigateTo({
    url: `/pages/game-cdk/game-cdk?id=${props.data.id}&name=${props.data.name}`,
    animationType: 'slide-in-right',
    animationDuration: 200,
  })
}
</script>

<style scoped lang="scss">
.search-game-card {
  padding: 20rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;

  .game-info {
    display: flex;
    align-items: center;
    gap: 20rpx;

    .game-icon {
      width: 80rpx;
      height: 80rpx;
      border-radius: 10rpx;
    }

    .game-name {
      font-size: 28rpx;
      color: #333;
    }
  }
}
</style>