import React, { useEffect, useRef, useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';

const Test2: React.FC = () => {
  const timerHandle = useRef<NodeJS.Timeout>();
  const [nums, setNums] = useState<number>(5);

  useEffect(() => {
    console.log('eeeee', moment().day());
  }, []);

  useEffect(() => {
    if (nums !== 0) {
      timerHandle.current = setInterval(() => {
        // 这时候的num由于闭包的原因，一直是0，所以这里不能用setNum(num-1)
        setNums((n) => {
          if (n === 1) {
            if (timerHandle.current) {
              clearInterval(timerHandle.current);
            }
          }
          return n - 1;
        });
      }, 1000);
    }
    console.log('nums', nums);
    return () => {
      // 组件销毁时，清除定时器
      if (timerHandle.current) {
        console.log('componentWillUnmount-timerHandle');
        clearInterval(timerHandle.current);
      }
    };
  }, [nums]);

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3rd menu item
        </a>
      </Menu.Item>
      <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Hover me <DownOutlined />
        </a>
      </Dropdown>
      nums: {nums}
    </>
  );
};

export default Test2;
