<script setup lang="ts">
import { TransitionProps } from 'vue';
import { RouterTransitionEnum } from '@/enums/appEnums';

interface Props extends Omit<TransitionProps, 'name'> {
  name: RouterTransitionEnum.FADE_SIDE;
}
const props = defineProps<Props>();
</script>
<template>
  <Transition v-bind="{ ...props }">
    <slot name="defualt"></slot>
  </Transition>
</template>
