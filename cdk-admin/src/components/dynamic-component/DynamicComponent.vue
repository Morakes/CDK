<script setup lang="ts">
import { getCurrentInstance, watchEffect, ref, DefineComponent } from 'vue';

interface Props {
  is?: string | DefineComponent;
  type: 'is' | 'antd_icon';
}
const props = defineProps<Props>();
const _this = getCurrentInstance();
const renderComponent = ref(props.is);

const strategyRenderType = {
  antd_icon: (is: string) => _this?.appContext.config.globalProperties.$antIcons[is],
  is: (is: typeof props.is) => is,
};

watchEffect(() => {
  if (!props.is) {
    return;
  }
  if (props.type) {
    try {
      renderComponent.value = strategyRenderType[props.type](props.is as string);
    } catch (error) {
      // @ts-expect-error
      throw new Error('组件语法报错', { cause: error });
    }
  } else {
    renderComponent.value = props.is;
  }
});
</script>

<template>
  <template v-if="renderComponent">
    <Component :is="renderComponent" />
  </template>
  <template v-else></template>
</template>
