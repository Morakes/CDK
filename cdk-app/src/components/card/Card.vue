<template>
    <view class="card">
      <slot name="default"></slot>
    </view>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style lang="scss" scoped>
  .card {
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    background-color: rgba(255, 255, 255, 0.11);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
    border-radius: 20rpx;
    box-shadow: 2px 2px 4px rgba(56, 56, 56, 0.5);
    width: 100%;
  }
  </style>
  