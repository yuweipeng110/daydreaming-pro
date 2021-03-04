import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { useRequest } from 'umi';
import { Form, message } from 'antd';
import ProForm, { ModalForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { STATUS_CODE, UserSexEnum } from '@/pages/constants';
import { IOrderDetailTable } from '@/pages/types/orderDetail';
import { IUserTable } from '@/pages/types/user';
import { addOrderApi } from '@/services/order';
import { queryScriptListApi } from '@/services/script';
import { queryUserListApi } from '@/services/user';
import { queryPlayerListApi } from '@/services/player';
import _ from 'lodash';

interface IProps extends ConnectProps {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  deskId: number;
}

const AddOrder: React.FC<IProps> = (props) => {
  const { actionRef, visible, onVisibleChange, deskId } = props;
  const [form] = Form.useForm();
  const [playerList, setPlayerList] = useState<IUserTable[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [orderDetailList, setOrderDetailList] = useState<IOrderDetailTable[]>([]);
  const [valueEnum, setValueEnum] = useState({});

  useEffect(() => {
    if (visible) setOrderDetailList([]);
  }, [visible]);

  /**
   * /app/user/get-user-list?storeId=1&pageRecords=1000
   */
  const loadScriptListData = async () => {
    const params = { pageRecords: 1000 };
    const res = await queryScriptListApi(params);
    if (res.code === STATUS_CODE.SUCCESS) {
      return res.data.map((item) => {
        return {
          label: item.title,
          value: item.id,
        };
      });
    }
    return [];
  };

  /**
   * /app/user/get-script-list?storeId=1&pageRecords=1000
   */
  const loadHostListData = async () => {
    const res = await queryUserListApi({});
    if (res.code === STATUS_CODE.SUCCESS) {
      return res.data.map((item) => {
        return {
          label: `${item.nickname}-${item.phone}`,
          value: item.id,
        };
      });
    }
    return [];
  };

  const { loading, run, cancel } = useRequest(queryPlayerListApi, {
    debounceInterval: 500,
    manual: true,
    onSuccess: (data) => {
      const valueEnumList = {};
      // eslint-disable-next-line no-return-assign
      data.map((item: IUserTable) => (valueEnumList[item.id] = `${item.nickname}-${item.phone}`));
      setPlayerList(data);
      setValueEnum(valueEnumList);
    },
  });

  const handleAddPlayer = (userId: string) => {
    const userInfo: IUserTable =
      playerList.find((user: IUserTable) => user.id === userId) || ({} as IUserTable);
    const tempOrderDetail: IOrderDetailTable = {
      id: Number((Math.random() * 1000000).toFixed(0)),
      userId,
      userInfo,
    };
    setOrderDetailList(_.uniqWith(_.compact([tempOrderDetail, ...orderDetailList]), _.isEqual));
  };

  const onSubmit = async (values: any) => {
    if (orderDetailList.length === 0) {
      const orderDetailListError = {
        name: 'userId',
        errors: ['至少选择一名玩家'],
      };
      const errorList = [orderDetailListError];
      form.setFields(errorList);
      return false;
    }

    const hide = message.loading('正在开台');
    const params = {
      ...values,
      storeId: 1,
      deskId,
      // orderOperatorId: props.loginUserInfo.id,
      detailList: orderDetailList,
      // storeId,scriptId,deskId,hostId,orderOperatorId,remark,detailList
    };
    const res = await addOrderApi(params);
    if (res.code === STATUS_CODE.SUCCESS) {
      onVisibleChange(false);
      hide();
      message.success('开台成功');
      return true;
    }
    hide();
    message.error(res.msg);
    return false;
  };

  const columns: ProColumns<IOrderDetailTable>[] = [
    {
      title: '昵称',
      dataIndex: ['userInfo', 'nickname'],
    },
    {
      title: '性别',
      dataIndex: ['userInfo', 'sex'],
      valueEnum: UserSexEnum,
    },
    {
      title: '手机号',
      dataIndex: ['userInfo', 'phone'],
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text: any, record: IOrderDetailTable) => [
        <a
          key="delete"
          onClick={() => {
            setOrderDetailList(orderDetailList.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <ModalForm
      title="创建开台信息"
      visible={visible}
      onVisibleChange={(visibleValue) => {
        form.resetFields();
        onVisibleChange(visibleValue);
      }}
      form={form}
      onFinish={async (values) => {
        const success = await onSubmit(values);
        if (!success) {
          return false;
        }
        onVisibleChange(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormSelect
          name="scriptId"
          label="选择剧本"
          request={() => loadScriptListData()}
          width="md"
          rules={[
            {
              required: true,
              message: '请选择剧本!',
            },
          ]}
        />
        <ProFormSelect
          name="hostId"
          label="主持人"
          request={() => loadHostListData()}
          width="md"
          rules={[
            {
              required: true,
              message: '请选择主持人!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="userId"
          label="玩家"
          width="md"
          placeholder="请输入玩家电话"
          showSearch
          fieldProps={{
            showArrow: true,
            filterOption: false,
            onSelect: (value) => handleAddPlayer(value),
            onSearch: (value) => !_.isEmpty(value) && run({ phone: value }),
            onBlur: cancel,
            loading,
          }}
          valueEnum={valueEnum}
        />
        <ProFormTextArea name="remark" label="备注" width="md" />
      </ProForm.Group>
      <EditableProTable<IOrderDetailTable>
        headerTitle="玩家列表"
        rowKey="id"
        recordCreatorProps={false}
        columns={columns}
        value={orderDetailList}
        onChange={setOrderDetailList}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableRowKeys,
        }}
      />
    </ModalForm>
  );
};

export default connect()(AddOrder);
