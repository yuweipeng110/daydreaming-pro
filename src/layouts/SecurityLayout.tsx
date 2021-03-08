import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import type { ConnectProps } from 'umi';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';
import type { ConnectState } from '@/models/connect';
import { userAuth } from "@/utils/useAuth";

type SecurityLayoutProps = {
  loading?: boolean;
} & ConnectProps;

type SecurityLayoutState = {
  isReady: boolean;
  isLogin: boolean;
};

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
    isLogin: false,
  };

  async componentDidMount() {
    const { isLogin, loginUserInfo } = await userAuth();
    const { dispatch } = this.props;
    if (dispatch) {
      await dispatch({
        type: 'login/setLoginUserReducer',
        loginUserInfo
      });
    }
    this.setState({
      isReady: true,
      isLogin
    });
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  render() {
    const { isReady, isLogin } = this.state;
    const { children, loading } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    // const isLogin = currentUser && currentUser.userid;
    const queryString = stringify({
      redirect: window.location.href,
    });
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin && window.location.pathname !== '/login') {
      return <Redirect to={`/login?${queryString}`} />;
    }
    return children;
  }
}

export default connect(({ loading }: ConnectState) => ({
  loading: loading.models.user,
}))(SecurityLayout);
