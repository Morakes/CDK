<script lang="ts" setup>
import { ref } from 'vue';
import { apiGameAI, apiGetGameList } from './serveApi';
import { onMounted } from 'vue';
import { IGameType } from './type';
import GameEditModal from './components/GameEditModal.vue';
import CdkListModal from './components/CdkListModal.vue';

const dataSource = ref<IGameType[]>();
const loading = ref(false);
const modalVisible = ref(false);
const editData = ref<IGameType>();
const cdkModalVisible = ref(false);
const cdkList = ref();
const gameId = ref();

const fetchMenuList = async () => {
  loading.value = !loading.value;
  try {
    const res = await apiGetGameList();

    dataSource.value = res.data;
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = !loading.value;
  }
};
onMounted(() => {
  fetchMenuList();
});

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '游戏名称',
    dataIndex: 'name',
  },
  {
    title: '游戏封面',
    dataIndex: 'cover',
  },
  {
    title: '游戏兑换码',
    dataIndex: 'cdk',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
];

const handleEdit = (record: IGameType) => {
  editData.value = record;
  modalVisible.value = true;
};

const handleAI = (record: IGameType) => {
  apiGameAI(record.id).then((res) => {});
};
</script>

<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button type="primary" @click="modalVisible = true">添加游戏</a-button>
    </div>
    <a-table :columns="columns" :data-source="dataSource" :loading="loading" size="small" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'cover'">
          <img :src="record[column.dataIndex]" alt="" width="100" />
        </template>

        <template v-if="column.dataIndex === 'cdk'">
          <a-button
            type="link"
            @click="
              () => {
                cdkModalVisible = true;
                cdkList = record.cdkList;
                gameId = Number(record.id);
              }
            "
            >查看</a-button
          >
        </template>
        <template v-if="column.dataIndex === 'name'">
          {{ record.name }}
        </template>
        <template v-if="column.key === 'operation'">
          <a-button type="link" @click="handleEdit(record)">编辑</a-button>
          <a-button type="link" @click="handleAI(record)">AI分析</a-button>
        </template>
      </template>
    </a-table>
    <GameEditModal v-model:visible="modalVisible" :edit-data="editData" @success="fetchMenuList" />
    <CdkListModal v-model:visible="cdkModalVisible" :cdkList="cdkList" :game-id="gameId" />
  </div>
</template>
