<template>
  <view class="navigation-bar">
     <up-icon name="arrow-left" class="back-icon" @click="goback" color="" size="20" v-show="showBack" />
    <text class="title">{{ title }}</text>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  showBack: {
    type: Boolean,
    default: true
  }
})

function goback() {

  uni.switchTab({
    url: '/pages/index/index'
  })
}
</script>

<style scoped lang="scss">
.navigation-bar {
  height: 44px;
  width: 750rpx;
  display: flex;
  align-items: center;
  color: var(--color-orange);
  font-size: 28rpx;
  font-weight: 600;
  position: relative;
  .back-icon {
    position: absolute;
    left: 10rpx;
  }
  .title {
    flex: 1;
    text-align: center;
  }
}
</style>