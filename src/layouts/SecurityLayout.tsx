import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import type { ConnectProps } from 'umi';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';
import type { ConnectState } from '@/models/connect';
import { IUserTable } from '@/pages/types/user';

type SecurityLayoutProps = {
  loading?: boolean;
  loginUserInfo?: IUserTable;
} & ConnectProps;

type SecurityLayoutState = {
  isReady: boolean;
};

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, loginUserInfo } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    // const isLogin = currentUser && currentUser.userid;
    const isLogin = loginUserInfo && Number(loginUserInfo.id);
    // const { isLogin } = this.state;
    const queryString = stringify({
      redirect: window.location.href,
    });
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    return children;
  }
}

export default connect(({ loading, login }: ConnectState) => ({
  loading: loading.models.user,
  loginUserInfo: login.loginUserInfo,
}))(SecurityLayout);
