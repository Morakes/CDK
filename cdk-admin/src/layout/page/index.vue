<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import { RouterTransitionEnum } from '@/enums/appEnums';

defineOptions({ name: 'PageLayout' });

const openKeepAlive = ref<boolean>(true);

const getCaches = computed((): string[] => {
  if (!unref(openKeepAlive)) {
    return [];
  }
  // 缓存页面
  return [];
});
</script>
<template>
  <RouterView>
    <template #default="{ Component, route }">
      <Transition :name="RouterTransitionEnum.FADE_SIDE" mode="out-in" appear>
        <keep-alive v-if="openKeepAlive" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </Transition>
    </template>
  </RouterView>
</template>
