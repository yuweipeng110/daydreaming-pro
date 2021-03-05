import React, { useState } from 'react';
import { useRequest } from 'umi';
import ProForm, { ProFormSelect } from '@ant-design/pro-form';
import { EditableProTable, ProColumns } from '@ant-design/pro-table';
import { IOrderDetailTable } from '@/pages/types/orderDetail';
import { IUserTable } from '@/pages/types/user';
import { queryPlayerListApi } from '@/services/player';
import { STATUS_CODE, UserSexEnum } from '@/pages/constants';
import _ from 'lodash';

interface IProps {
  orderDetailList: IOrderDetailTable[];
  setOrderDetailList: (orderDetailList: IOrderDetailTable[]) => void;
}

interface IOption {
  value: number;
  label: string;
}

const UserSelectList: React.FC<IProps> = (props) => {
  const { orderDetailList, setOrderDetailList } = props;
  const [playerOptions, setPlayerOptions] = useState<IOption[]>([]);
  const [playerList, setPlayerList] = useState<IUserTable[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const { loading: playerLoading, run: playerRun, cancel: playerCancel } = useRequest(
    queryPlayerListApi,
    {
      debounceInterval: 500,
      manual: true,
      formatResult: (res) => {
        if (res.code === STATUS_CODE.SUCCESS) {
          const options = res.data.map((item: IUserTable) => {
            return {
              value: item.id,
              label: `${item.phone}-${item.nickname}`,
            };
          });
          setPlayerOptions(options);
          setPlayerList(res.data);
        }
      },
    },
  );

  const handleSearchPlayer = (value: string) => {
    if (_.isEmpty(value)) return;
    setPlayerOptions([]);
    playerRun({
      pageSize: 10,
      phone: value,
    });
  };

  const handleAddPlayer = (userId: string) => {
    const userInfo: IUserTable =
      playerList.find((user: IUserTable) => Number(user.id) === Number(userId)) ||
      ({} as IUserTable);
    const tempOrderDetail: IOrderDetailTable = {
      id: Number((Math.random() * 1000000).toFixed(0)),
      userId,
      userInfo,
    };
    setOrderDetailList(_.uniqBy(_.compact([tempOrderDetail, ...orderDetailList]), 'userId'));
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
    <>
      <ProForm.Group>
        <ProFormSelect
          name="userId"
          label="玩家"
          width="md"
          placeholder="请输入玩家电话"
          showSearch
          options={playerOptions}
          fieldProps={{
            showArrow: true,
            filterOption: false,
            onSelect: (value) => handleAddPlayer(value),
            onSearch: (value) => handleSearchPlayer(value),
            onBlur: playerCancel,
            loading: playerLoading,
          }}
        />
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
    </>
  );
};

export default UserSelectList;
