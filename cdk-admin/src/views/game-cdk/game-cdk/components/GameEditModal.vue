<script lang="ts" setup>
import { ref, watch } from 'vue';
import { IGameType } from '../type';
import { apiAddGame, apiUpdateGame } from '../serveApi';
import { message } from 'ant-design-vue';

interface Props {
  visible: boolean;
  editData?: IGameType;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  editData: undefined,
});

const emit = defineEmits(['update:visible', 'success']);

const formRef = ref();
const loading = ref(false);
const formData = ref<Partial<IGameType>>({
  name: '',
  cover: '',
});

watch(
  () => props.editData,
  (val) => {
    if (val) {
      formData.value = { ...val };
    } else {
      formData.value = {
        name: '',
        cover: '',
      };
    }
  }
);

const handleCancel = () => {
  emit('update:visible', false);
  formData.value = {
    name: '',
    cover: '',
  };
};

const handleOk = async () => {
  try {
    await formRef.value.validate();
    loading.value = true;
    if (props.editData?.id) {
      await apiUpdateGame(formData.value as IGameType);
      message.success('修改成功');
    } else {
      await apiAddGame(formData.value as IGameType);
      message.success('添加成功');
    }
    emit('success');
    handleCancel();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const rules = {
  name: [
    {
      required: true,
      message: '请输入游戏名称',
    },
  ],
  cover: [
    {
      required: true,
      message: '请输入游戏封面URL',
    },
  ],
};
</script>

<template>
  <a-modal
    :visible="props.visible"
    :title="editData?.id ? '编辑游戏' : '添加游戏'"
    @cancel="handleCancel"
    @ok="handleOk"
    :confirmLoading="loading"
  >
    <a-form ref="formRef" :model="formData" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
      <a-form-item label="游戏名称" name="name">
        <a-input v-model:value="formData.name" placeholder="请输入游戏名称" />
      </a-form-item>
      <a-form-item label="游戏封面" name="cover">
        <a-input v-model:value="formData.cover" placeholder="请输入游戏封面URL" />
        <template #extra>
          <img
            v-if="formData.cover"
            :src="formData.cover"
            alt="游戏封面预览"
            style="max-width: 200px; margin-top: 8px"
          />
        </template>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
