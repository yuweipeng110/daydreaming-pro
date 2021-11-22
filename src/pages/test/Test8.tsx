import { Component } from 'react';
import { Button } from 'antd';

function AuthButton(props: any) {
  const { auth, name } = props;
  if (auth === 'createUser') {
    return <Button type="primary">{name}</Button>;
  }
  if (auth === 'updater') {
    return <Button type="dashed">{name}</Button>;
  }
  return <Button disabled={true}>{name}</Button>;
}

class Page extends Component {
  componentDidMount() {
    console.log('componentDidMount');
  }
  render() {
    return (
      <div>
        <AuthButton name="提交" />
        <AuthButton auth="createUser" name="取消" />
        <AuthButton auth="updater" name="审批" />
      </div>
    );
  }
}

export default Page;
