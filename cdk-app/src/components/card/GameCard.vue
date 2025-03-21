<template>
  <view class="game-card" @click="goto">
    <image
      :src="props.data.cover"
      mode="aspectFill"
      class="game-image"
    />
    <view class="game-name">{{ props.data.name+'专区兑换码' }}</view>
  </view>
</template>
  
<script setup lang="ts">
import type { IGameType } from '@/pages/index/type';

interface Props {
  data: IGameType
}

const props = defineProps<Props>()

function goto () {
  uni.navigateTo({
    url: `/pages/game-cdk/game-cdk?id=${props.data.id}&name=${props.data.name}`,
    animationType: 'slide-in-right',
	  animationDuration: 200,
  })
}
</script>
  
<style scoped lang="scss">
.game-card {
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.11);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  border-radius: 20rpx;
  width: 100%;
  height: 220rpx;
  margin-bottom: 30rpx;
  padding: 0 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px 4px rgba(56, 56, 56, 0.5);
  .game-image {
    height: 150rpx;
    width: 150rpx;
    border-radius: 50%;
  }
  .game-name {
    font-size: 35rpx;
    color: var(--font-color);
    font-weight: 600;
    margin-left: 40rpx;
  }
}
</style>