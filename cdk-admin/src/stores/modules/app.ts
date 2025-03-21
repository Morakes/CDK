import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ThemeEnum } from '@/enums/appEnums';

export const useAppStore = defineStore(
  'appStore',
  () => {
    // 菜单折叠
    const collapsed = ref(false);
    function setCollapsed() {
      collapsed.value = !collapsed.value;
    }

    // 主题切换
    const mode = ref<ThemeEnum>(ThemeEnum.LIGHT);
    function setMode(payload: ThemeEnum) {
      mode.value = payload;
    }

    return { collapsed, setCollapsed, mode, setMode };
  },
  {
    persist: true,
    // {
    //   key: 'appStore',
    //   storage: sessionStorage,
    //   paths: ['collapsed', 'mode'], // 需要持久化的字段，默认全部持久化，如果需要指定，传入数组即可
    // },
  }
);
