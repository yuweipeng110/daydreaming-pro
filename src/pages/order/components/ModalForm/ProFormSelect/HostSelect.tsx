import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { useRequest } from 'umi';
import { ProFormSelect } from '@ant-design/pro-form';
import { Empty, Spin } from 'antd';
import { STATUS_CODE } from '@/pages/constants';
import { queryUserListApi } from '@/services/user';
import { IUserTable } from '@/pages/types/user';
import { IDeskTable } from "@/pages/types/desk";
import _ from 'lodash';

interface IProps extends ConnectProps, StateProps {
  currentData?: IDeskTable;
}

interface IOption {
  value: number;
  label: string;
}

const HostSelect: React.FC<IProps> = (props) => {
  const { currentData, loginUserInfo } = props;
  const [hostOptions, setHostOptions] = useState<IOption[]>([]);

  const loadHostListData = async () => {
    const params = {
      pageSize: 10,
      storeId: loginUserInfo.storeId,
      isHost: true,
    }
    const res = await queryUserListApi(params);
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
    if (currentData) {
      // host select options
      const { hostInfo } = currentData.orderInfo!;
      const hostOptionList = {
        value: Number(hostInfo?.id),
        label: `${hostInfo?.phone}-${hostInfo?.nickname}`,
      };
      setHostOptions([hostOptionList]);
    } else {
      loadHostListData();
    }
  }, [currentData]);

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
      storeId: loginUserInfo.storeId,
      isHost: true,
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
        notFoundContent: hostLoading ? <Spin size="small"/> : <Empty/>,
      }}
    />
  );
};

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(HostSelect);
