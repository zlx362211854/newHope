import LoginLayout from './loginLayout/index';
import BaseLayout from './baseLayout/index';
import {sideList} from './sideList';
import router from 'umi/router';
function BasicLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'))
  let list = []
  if (user) {
    list = sideList(user.role)
  }
  const newProps = {
    ...props,
    sideList: list,
  };
  if (props.location.pathname === '/login' || props.location.pathname === '/signup') {
    return <LoginLayout>{props.children}</LoginLayout>;
  }
  if (props.location.pathname === '/') {
    router.push('/tags/list');
  }
  return <BaseLayout {...newProps}>{props.children}</BaseLayout>;
}

export default BasicLayout;
