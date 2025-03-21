<template>
  <Card>
    <view class="cdk-card">
      <view class="title">{{ props?.data.title }}</view>
      <view class="code-section">
        <text class="code">{{ props?.data.code }}</text>
        <text class="copy-btn" @click="copyCode">复制</text>
      </view>
      <view class="info-section">
        <view class="reward">
          <text class="label">奖励：</text>
          <text class="value">{{ props?.data.reward }}</text>
        </view>
        <view class="end-time">
          <text class="label">有效期至：</text>
          <text class="value">{{ props?.data.endTime }}</text>
        </view>
      </view>
      <view class="status-tag" :class="{ 'expired': !props?.data.isValid }">
        {{ props?.data.isValid ? '可使用' : '已过期' }}
      </view>
    </view>
  </Card>
</template>

<script setup lang="ts">
import type { IGameCDKType } from '@/pages/index/type';
import Card from './Card.vue';

interface Props {
  data: IGameCDKType
}

const props = defineProps<Props>()

const copyCode = () => {
    uni.setClipboardData({
      data: props.data.code,
      success: () => {
        uni.showToast({
          title: '复制成功',
          icon: 'success',
        });
      },
    });
  };

</script>

<style lang="scss" scoped>
.cdk-card {
  position: relative;
  padding: 16px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-orange);
}

.code-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 4px 0;
}

.code {
  font-size: 20px;
  font-family: monospace;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--font-color);
}

.copy-btn {
  padding: 4px 12px;
  background-color: var(--color-orange);
  color: var(--font-color);
  border-radius: 4px;
  font-size: 14px;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reward, .end-time {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.label {
  color: var(--font-color);
}

.value {
  color: var(--font-color);
}

.status-tag {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  background-color: #4CAF50;
  color: var(--font-color);
}

.status-tag.expired {
  background-color: #999;
}
</style>
