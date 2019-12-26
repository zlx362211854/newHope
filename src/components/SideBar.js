import React, {useMemo} from 'react'
import {Layout, Menu, Icon} from 'antd';
import Link from 'umi/link';
const {SubMenu} = Menu;
const {Sider} = Layout;
function SideBar(props) {
  const path = props.location.pathname
  const defaultSelectedKeys = [path]
  const defaultOpenKeys = ['/' + path.split('/')[1]]
  const loop = (list = []) => {
    return list.map(i => {
      if (i.show) {
        return (
          <SubMenu
            key={i.key}
            title={
              <span>
                <Icon type={i.icon || 'user'} />
                {i.name}
              </span>
            }
          >
            {i.children.map((l, idx) => {
              if (l.show) {
                return (
                  <Menu.Item key={l.key}>
                    <Link to={l.path}>{l.name}</Link>
                  </Menu.Item>
                )
              }
            })}
          </SubMenu>
        )
      }
    });
  }
  const renderMenu = useMemo(() => {
    return loop(props.sideList)
  }, [props.sideList])
  return (
    <Sider width={200} style={{background: '#fff'}}>
      <Menu
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        style={{height: '100%', borderRight: 0}}
      >
        {renderMenu}
      </Menu>
    </Sider>
  )
}
export default SideBar

