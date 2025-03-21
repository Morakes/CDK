<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { getMenuList } from './serveApi';
import { useColumns } from './config';
const form = reactive<{
  name: string;
}>({
  name: '',
});
const dataSource = ref();
const loading = ref(false);

const fetchMenuList = async () => {
  loading.value = !loading.value;
  try {
    const res = await getMenuList();
    dataSource.value = res;
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = !loading.value;
  }
};
const columns = useColumns();
onMounted(() => {
  fetchMenuList();
});
</script>

<template>
  <a-space :size="16" direction="vertical" style="width: 100%" class="root">
    <a-form layout="inline">
      <a-form-item label="菜单名称">
        <a-input v-model:value="form.name" placeholder="请输入菜单名称" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="fetchMenuList">查询</a-button>
      </a-form-item>
    </a-form>
    <div>菜单管理</div>
    <a-table :columns="columns" :data-source="dataSource" :loading="loading" size="small" bordered> </a-table>
  </a-space>
</template>

<style lang="less" scoped>
.root {
}
</style>
