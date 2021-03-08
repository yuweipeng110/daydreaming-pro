import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { useRequest } from 'umi';
import { ProFormSelect } from '@ant-design/pro-form';
import { Empty, Spin } from 'antd';
import { STATUS_CODE } from '@/pages/constants';
import { queryScriptListApi } from '@/services/script';
import { IScriptTable } from '@/pages/types/script';
import { IDeskTable } from "@/pages/types/desk";
import _ from 'lodash';

interface IProps extends ConnectProps, StateProps {
  currentData?: IDeskTable;
}

interface IOption {
  value: number;
  label: string;
}

const ScriptSelect: React.FC<IProps> = (props) => {
  const { currentData, loginUserInfo } = props;
  const [scriptOptions, setScriptOptions] = useState<IOption[]>([]);

  const loadScriptListData = async () => {
    const params = {
      pageSize: 10,
      storeId: loginUserInfo.storeId,
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
    if (currentData) {
      // script select options
      const scriptOptionList = { value: Number(currentData.id), label: currentData.title };
      setScriptOptions([scriptOptionList]);
    } else {
      loadScriptListData();
    }
  }, [currentData]);

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
      storeId: loginUserInfo.storeId,
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
        notFoundContent: scriptLoading ? <Spin size="small" /> : <Empty />,
      }}
    />
  );
};

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ScriptSelect);
