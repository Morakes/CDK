<script setup lang="ts">
import { ThemeEnum } from '@/enums/appEnums';
import { useAppStore } from '@/stores/modules/app';
import { computed, unref, onMounted } from 'vue';
import useUpdateTheme from '@/hooks/useUpdateTheme';

const appStore = useAppStore();
const mode = computed(() => unref(appStore.mode));

const handleChange = () => {
  const darkMode = mode.value === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;
  appStore.setMode(darkMode);
  useUpdateTheme(darkMode);
};

onMounted(() => {
  // refresh or open the page
  useUpdateTheme(mode.value);
});
</script>

<template>
  <div>
    <a-switch
      class="dark-switch"
      :checked="mode === ThemeEnum.LIGHT"
      checked-children="☀"
      un-checked-children="🌙"
      @change="handleChange"
    ></a-switch>
  </div>
</template>

<style lang="less" scoped>
.dark-switch {
  background-color: #000;
}
</style>
