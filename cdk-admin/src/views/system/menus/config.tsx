import DynamicComponent from '@/components/dynamic-component/DynamicComponent.vue';

export const useColumns = () => {
  return [
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      customRender: ({ text }: { text: string }) => {
        return <DynamicComponent is={text} type="antd_icon" />;
      },
    },
    {
      title: '路由地址',
      dataIndex: 'path',
    },
    {
      title: '权限标识',
      dataIndex: 'sign',
    },
    {
      title: '排序',
      dataIndex: 'order',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '操作',
    },
  ].map((item) => ({ ...item, align: 'center' as const }));
};
