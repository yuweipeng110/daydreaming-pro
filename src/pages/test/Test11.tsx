import { useEffect } from 'react';
import { Steps, Space, Popover, Button, message } from 'antd';
import ProCard from '@ant-design/pro-card';
import './index.less';
import _ from 'lodash';
import ProForm, { ProFormTextArea } from '@ant-design/pro-form';

const { Step } = Steps;
export default () => {
  useEffect(() => {
    const a = '';
    console.log('a => ', a || 'x');

    const jsonList = [
      {
        deleted: null,
        createUser: 'WB934005-WB934005',
        updateUser: null,
        createTime: '2021-11-17T10:57:42.000+0000',
        updateTime: null,
        id: 1142,
        branchId: 837,
        branchVersionId: 2540,
        strategyId: 126,
        appId: 86,
        sceneId: 144,
        name: 'st1',
        strategyContentId: 681,
        strategyIndex: 1,
        type: 1,
        packageName: 'default',
      },
      {
        deleted: null,
        createUser: 'WB934005-WB934005',
        updateUser: null,
        createTime: '2021-11-17T10:57:42.000+0000',
        updateTime: null,
        id: 1141,
        branchId: 837,
        branchVersionId: 2540,
        strategyId: 139,
        appId: 86,
        sceneId: 144,
        name: 'ss',
        strategyContentId: 725,
        strategyIndex: 0,
        type: 1,
        packageName: 'b1',
      },
      {
        strategyIndex: 2,
        strategyId: 231,
        name: 'st1',
        strategyContentId: 1194,
        packageName: 'b1',
      },
    ];

    const newBranchStrategyList = jsonList.filter((item: any) => {
      if (!item.packageName) {
        return item.name !== 'st1';
      }
      return item.name !== 'st1' || item.packageName !== 'b1';
    });
    console.log('jsonList', jsonList);
    console.log('newBranchStrategyList', newBranchStrategyList);

    return(() => {
      message.info('卸载组件');
      return false;
    })
  }, []);

  const content = () => {
    return (
      <ProForm
        submitter={{
          render: () => {
            return (
              <div style={{ textAlign: 'right', width: '100%' }}>
                <Space>
                  <Button key="cancelBtn" size="small">
                    取消
                  </Button>
                  <Button type="primary" key="okBtn" size="small">
                    确定
                  </Button>
                </Space>
              </div>
            );
          },
        }}
      >
        <ProFormTextArea
          name="approveIdea"
          label="审批意见"
          width="md"
          rules={[
            {
              required: true,
            },
          ]}
          fieldProps={{
            autoSize: { minRows: 5, maxRows: 5 },
          }}
        />
      </ProForm>
    );
  };

  return (
    <ProCard title="策略审批" headerBordered>
      <Steps progressDot className="my-approve-flow">
        <Step
          title={
            <>
              主管审批(
              {_.truncate('WB01044834,于x鹏,李x355428', {
                length: 10,
                separator: /,? +/,
              })}
              )
            </>
          }
          description={
            <>
              {/* <Space direction="vertical"> */}
              <div>当前审批人：WB01044834</div>
              <div>
                <span style={{ color: 'green', fontWeight: 'bold' }}>同意</span>(
                {_.truncate('UI请问u去异味u以u气温也UI请问请问', {
                  length: 10,
                  separator: /,? +/,
                })}
                )
              </div>
              {/* </Space> */}
            </>
          }
        />
        <Step
          title={
            <>
              研发审批(
              <Popover content={'WB01044834,于x鹏,李x355428'}>
                {_.truncate('WB01044834,于x鹏,李x355428', {
                  length: 10,
                })}
              </Popover>
              )
            </>
          }
          description={
            <>
              {/* <Space direction="vertical"> */}
              <div>
                当前审批人：
                <Popover content={'于维鹏-WB01044834'}>
                  {_.truncate('于维鹏-WB01044834', {
                    length: 10,
                  })}
                </Popover>
              </div>
              <div>
                <span style={{ color: 'orange', fontWeight: 'bold' }}>审批中</span>(
                <Popover content={'UI请问u去异味u以u气温也UI请问请问'}>
                  {_.truncate('UI请问u去异味u以u气温也UI请问请问', {
                    length: 10,
                  })}
                </Popover>
                )
              </div>
              <Space>
                {/* <Popover content={content} title="Title" trigger="hover">
      <Button>Hover me</Button>
    </Popover>
    <Popover content={content} title="Title" trigger="focus">
      <Button>Focus me</Button>
    </Popover> */}
                <Popover content={content} trigger="click">
                  <Button type="primary">同意</Button>
                </Popover>
                <Popover content={content} trigger="click">
                  <Button>拒绝</Button>
                </Popover>
              </Space>
              {/* </Space> */}
            </>
          }
        />
      </Steps>
    </ProCard>
  );
};
