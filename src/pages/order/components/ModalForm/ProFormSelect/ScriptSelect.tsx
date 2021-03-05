import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { ProFormSelect } from '@ant-design/pro-form';
import { Spin } from 'antd';
import { STATUS_CODE } from '@/pages/constants';
import { queryScriptListApi } from '@/services/script';
import { IScriptTable } from '@/pages/types/script';
import _ from 'lodash';

interface IOption {
  value: number;
  label: string;
}

const ScriptSelect: React.FC = () => {
  const [scriptOptions, setScriptOptions] = useState<IOption[]>([]);

  const loadScriptListData = async () => {
    const params = {
      storeId: 1,
      pageRecords: 10,
    };
    const res = await queryScriptListApi(params);
    if (res.code === STATUS_CODE.SUCCESS) {
      const options = res.data.map((item: IScriptTable) => {
        return {
          value: item.id,
          label: item.title,
        };
      });
      setScriptOptions(options);
    }
  };

  useEffect(() => {
    loadScriptListData();
  }, []);

  const { loading: scriptLoading, run: scriptRun, cancel: scriptCancel } = useRequest(
    queryScriptListApi,
    {
      debounceInterval: 800,
      manual: true,
      formatResult: (res) => {
        if (res.code === STATUS_CODE.SUCCESS) {
          const options = res.data.map((item: IScriptTable) => {
            return {
              value: item.id,
              label: item.title,
            };
          });
          setScriptOptions(options);
        }
      },
    },
  );

  const handleSearchScript = (value: string) => {
    if (_.isEmpty(value)) return;
    setScriptOptions([]);
    scriptRun({
      pageSize: 10,
      title: value,
    });
  };

  return (
    <ProFormSelect
      name="scriptId"
      label="选择剧本"
      width="md"
      rules={[
        {
          required: true,
          message: '请选择剧本!',
        },
      ]}
      showSearch
      options={scriptOptions}
      fieldProps={{
        showArrow: true,
        filterOption: false,
        onSearch: (value) => handleSearchScript(value),
        onBlur: scriptCancel,
        loading: scriptLoading,
        notFoundContent: scriptLoading ? <Spin size="small" /> : null,
      }}
    />
  );
};

export default ScriptSelect;
