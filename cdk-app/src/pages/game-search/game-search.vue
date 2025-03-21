<template>
  <view class="container">
    <NavigationBar title="游戏搜索" :show-back="true" />
    
    <!-- 搜索框 -->
    <view class="search-box">
      <up-input
        v-model="searchKeyword"
        placeholder="搜索游戏"
        :clearable="true"
        @change="handleSearch"
      >
        <template #prefix>
          <up-icon name="search" size="20" />
        </template>
      </up-input>
    </view>

    <!-- 搜索结果列表 -->
    <view class="search-result" v-if="searchResults && searchResults.length > 0">
      <view v-for="item in searchResults" :key="item.id">
        <SearchGameCard :data="item" />
      </view>
    </view>

    <!-- 无搜索结果提示 -->
    <view class="empty-result" v-else-if="searchResults && searchResults.length === 0">
      <text>未找到相关游戏</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import NavigationBar from '@/components/NavigationBar.vue';
import SearchGameCard from '@/components/card/SearchGameCard.vue';
import { apiSearchGame } from '@/apis/index.api';
import type { IGameType } from '../index/type';

const searchKeyword = ref('');
const searchResults = ref<IGameType[]>();

// 处理搜索
const handleSearch = (e) => {
  nextTick(() => {
    if (searchKeyword.value.trim()) {
    apiSearchGame(searchKeyword.value).then(res => {
        searchResults.value = res.data;
      });
    } else {
      searchResults.value = [];
    }
  })
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: white;
}

.search-box {
  padding: 20rpx;
  
}

.search-result {
  padding: 20rpx;
}

.empty-result {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40rpx;
  color: #999;
}
</style>