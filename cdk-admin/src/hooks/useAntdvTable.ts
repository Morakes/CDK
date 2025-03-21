// vue-request官网 https://cn.attojs.org/api

import type { TablePaginationConfig } from 'ant-design-vue';
import type { FilterValue, SorterResult } from 'ant-design-vue/es/table/interface';
import { computed, ref, unref } from 'vue';
import type { Ref } from 'vue';
import { useRequest } from 'vue-request';
import type { Options } from 'vue-request';

export interface AntdvPaginationType {
  current: number;
  pageSize: number;
  total?: number;
  [key: string]: any;
}
export interface AntdvResultType {
  total?: number;
  list?: any;
  summary?: any;
  [key: string]: any;
}

const INIT_CURRENT = 1;
const INIT_PAGESIZE = 10;
const orderEnum = {
  ascend: 'asc',
  descend: 'desc',
};

function useAntdvTable<T extends AntdvResultType>(
  api: (p: AntdvPaginationType, f?: any) => Promise<T>,
  options: {
    pagination?: AntdvPaginationType;
    form?: Ref<any>;
    defaultSize?: number;
    useRequestParams?: Omit<Options<any, any>, 'defaultParams'>;
  }
) {
  const { pagination, defaultSize, form, useRequestParams, ...others } = options;
  const computedForm = computed(() => unref(form));
  const current = ref<number>(pagination?.current ?? INIT_CURRENT);
  const pageSize = ref<number>(pagination?.pageSize ?? defaultSize ?? INIT_PAGESIZE);
  const { data, loading, run, runAsync, error, refresh } = useRequest(
    () => api({ current: current.value, pageSize: pageSize.value }, { ...unref(computedForm) }),
    {
      manual: true,
      ...useRequestParams,
      ...others,
    }
  );
  const onPaginationChange = (v: TablePaginationConfig, f?: Record<string, FilterValue | null>, s?: SorterResult) => {
    if (f && form) {
      computedForm.value.filter = f;
    }
    if (s && form) {
      console.log(s);
      computedForm.value.sort_field = s.field;
      computedForm.value.sort_type = s.order && orderEnum[s.order];
    }
    if (typeof v.current !== 'number') return;
    if (typeof v.pageSize !== 'number') return;
    current.value = v.current;
    pageSize.value = v.pageSize;
    run();
  };

  const search = () => {
    current.value = INIT_CURRENT;
    run();
  };

  const total: Ref<number | undefined> = computed(() => data.value && data.value.total);

  const dataSource: Ref<T['list']> = computed(() => data.value && data.value.list);

  const paginations: Ref<AntdvPaginationType> = computed(() => ({
    total: total.value,
    pageSize: pageSize.value,
    current: current.value,
  }));

  const tableProps = computed(() => ({
    dataSource: dataSource.value,
    pagination: {
      total: total.value,
      pageSize: pageSize.value,
      current: current.value,
    },
    onChange: onPaginationChange,
  }));

  return {
    tableProps,
    pagination: paginations,
    data,
    dataSource,
    total,
    pageSize,
    current,
    loading,
    run,
    runAsync,
    refresh,
    error,
    onPaginationChange,
    search,
  };
}

export default useAntdvTable;
