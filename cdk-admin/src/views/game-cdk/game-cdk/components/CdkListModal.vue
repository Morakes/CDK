<script lang="ts" setup>
import { ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import type { IGameCDKType } from '../type';
import { apiBatchUploadCdk } from '../serveApi';

interface Props {
  visible: boolean;
  gameId?: number;
  cdkList?: IGameCDKType[];
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  gameId: undefined,
  cdkList: () => [],
});

const emit = defineEmits(['update:visible']);
const loading = ref(false);
const dataSource = ref<IGameCDKType[]>([]);
const inputValue = ref();

watch(
  () => props.cdkList,
  (newVal) => {
    if (newVal) {
      dataSource.value = [...newVal];
    }
  },
  { immediate: true }
);

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    width: '15%',
  },
  {
    title: '兑换码',
    dataIndex: 'code',
    width: '20%',
  },
  {
    title: '奖励内容',
    dataIndex: 'reward',
    width: '20%',
  },
  {
    title: '有效状态',
    dataIndex: 'isValid',
    width: '10%',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    width: '20%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '15%',
  },
];

const handleCancel = () => {
  emit('update:visible', false);
};

const editableData = ref<{ [key: string]: IGameCDKType }>({});

const edit = (key: string) => {
  editableData.value[key] = { ...dataSource.value.find((item) => item.code === key) };
};

const save = async (key: string) => {
  try {
    const row = editableData.value[key];
    // TODO: 调用更新兑换码API
    // await apiUpdateCdk(row);
    const index = dataSource.value.findIndex((item) => item.code === key);
    Object.assign(dataSource.value[index], row);
    delete editableData.value[key];
    message.success('更新成功');
  } catch (error) {
    console.error(error);
    message.error('更新失败');
  }
};

const cancel = (key: string) => {
  delete editableData.value[key];
};

const handleDelete = async (record: IGameCDKType) => {
  try {
    // TODO: 调用删除兑换码API
    // await apiDeleteCdk(record.code);
    const index = dataSource.value.findIndex((item) => item.code === record.code);
    dataSource.value.splice(index, 1);
    message.success('删除成功');
  } catch (error) {
    console.error(error);
    message.error('删除失败');
  }
};

const handleBatchUpload = () => {
  console.log('props.gameId', props.gameId);

  apiBatchUploadCdk(props.gameId, inputValue.value);
};
</script>

<template>
  <a-modal :visible="visible" title="兑换码列表" width="1000px" @cancel="handleCancel" :footer="null">
    <div style="display: flex; column-gap: 10px; margin-bottom: 20px">
      <a-textarea v-model:value="inputValue" />
      <a-button type="primary" @click="handleBatchUpload">批量导入</a-button>
    </div>
    <a-table :columns="columns" :data-source="dataSource" :loading="loading" size="small" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'title'">
          <div v-if="editableData[record.code]">
            <a-input
              v-model:value="editableData[record.code].title"
              style="margin: -5px 0"
              @pressEnter="save(record.code)"
            />
          </div>
          <template v-else>
            {{ record.title }}
          </template>
        </template>
        <template v-else-if="column.dataIndex === 'code'">
          <div v-if="editableData[record.code]">
            <a-input
              v-model:value="editableData[record.code].code"
              style="margin: -5px 0"
              @pressEnter="save(record.code)"
            />
          </div>
          <template v-else>
            {{ record.code }}
          </template>
        </template>
        <template v-else-if="column.dataIndex === 'reward'">
          <div v-if="editableData[record.code]">
            <a-input
              v-model:value="editableData[record.code].reward"
              style="margin: -5px 0"
              @pressEnter="save(record.code)"
            />
          </div>
          <template v-else>
            {{ record.reward }}
          </template>
        </template>
        <template v-else-if="column.dataIndex === 'isValid'">
          <a-tag :color="record.isValid ? 'success' : 'error'">
            {{ record.isValid ? '有效' : '无效' }}
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'endTime'">
          <div v-if="editableData[record.code]">
            <a-date-picker
              v-model:value="editableData[record.code].endTime"
              style="margin: -5px 0"
              show-time
              @ok="save(record.code)"
            />
          </div>
          <template v-else>
            {{ record.endTime }}
          </template>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <template v-if="editableData[record.code]">
              <a-typography-link @click="save(record.code)" style="margin-right: 8px">保存</a-typography-link>
              <a-popconfirm title="确定取消吗?" @confirm="cancel(record.code)">
                <a-typography-link>取消</a-typography-link>
              </a-popconfirm>
            </template>
            <template v-else>
              <a-typography-link @click="edit(record.code)" style="margin-right: 8px">编辑</a-typography-link>
              <a-popconfirm
                title="确定删除这条兑换码吗?"
                @confirm="handleDelete(record)"
                ok-text="确定"
                cancel-text="取消"
              >
                <a-typography-link danger>删除</a-typography-link>
              </a-popconfirm>
            </template>
          </div>
        </template>
      </template>
    </a-table>
  </a-modal>
</template>

<style lang="less" scoped>
.editable-row-operations {
  display: flex;
  gap: 8px;
}
</style>
