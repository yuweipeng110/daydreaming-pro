import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { ProFormSelect } from '@ant-design/pro-form';
import { Spin } from 'antd';
import { STATUS_CODE } from '@/pages/constants';
import { queryUserListApi } from '@/services/user';
import { IUserTable } from '@/pages/types/user';
import _ from 'lodash';

interface IOption {
  value: number;
  label: string;
}

const HostSelect: React.FC = () => {
  const [hostOptions, setHostOptions] = useState<IOption[]>([]);

  const loadHostListData = async () => {
    const res = await queryUserListApi({});
    if (res.code === STATUS_CODE.SUCCESS) {
      const options = res.data.map((item: IUserTable) => {
        return {
          value: item.id,
          label: `${item.phone}-${item.nickname}`,
        };
      });
      setHostOptions(options);
    }
  };

  useEffect(() => {
    loadHostListData();
  }, []);

  const { loading: hostLoading, run: hostRun, cancel: hostCancel } = useRequest(queryUserListApi, {
    debounceInterval: 800,
    manual: true,
    formatResult: (res) => {
      if (res.code === STATUS_CODE.SUCCESS) {
        const options = res.data.map((item: IUserTable) => {
          return {
            value: item.id,
            label: `${item.phone}-${item.nickname}`,
          };
        });
        setHostOptions(options);
      }
    },
  });

  const handleSearchHost = (value: string) => {
    if (_.isEmpty(value)) return;
    setHostOptions([]);
    hostRun({
      pageSize: 10,
      nickname: value,
    });
  };

  return (
    <ProFormSelect
      name="hostId"
      label="主持人"
      width="md"
      rules={[
        {
          required: true,
          message: '请选择主持人!',
        },
      ]}
      showSearch
      options={hostOptions}
      fieldProps={{
        showArrow: true,
        filterOption: false,
        onSearch: (value) => handleSearchHost(value),
        onBlur: hostCancel,
        loading: hostLoading,
        notFoundContent: hostLoading ? <Spin size="small" /> : null,
      }}
    />
  );
};

export default HostSelect;
