import { onUnmounted, Ref, ref, watch } from 'vue';

const useSize = (el: Ref<HTMLElement>) => {
  const elRef = ref(el);
  const size = ref<DOMRectReadOnly>();
  const observe = new ResizeObserver((entries) => {
    if (elRef.value === entries[0].target) {
      size.value = entries[0].contentRect;
    }
  });

  watch(
    () => elRef.value,
    () => {
      if (elRef.value) {
        observe.observe(elRef.value);
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );
  onUnmounted(() => {
    observe.disconnect();
  });
  return size;
};

export default useSize;
