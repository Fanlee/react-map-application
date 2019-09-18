import * as React from 'react'
import { Link, Route } from 'react-router-dom'
import { Menu, Icon, Layout } from 'antd'
import Homepage from '@container/homepage/homepage'
import MapList from '@container/map-list/map-list'
import Team from '@container/team/team'
import MapCase from '@container/map-case/map-case'
import Setting from '@container/setting/setting'
import UserCenter from '@container/user-center/user-center'
import WorkbenchHeader from '@component/workbench-header/workbench-header'
import styles from './style.module.sass'

const { Header, Content, Sider } = Layout

const Workbench = (props: any) => {
  const { location, match } = props
  const active = location.pathname.split(match.path + '/')[1] || 'homepage'

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
        <img src={require('../../common/image/logo-g.png')} alt="logo" />
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[active]}>
          <Menu.Item key="homepage">
            <Icon type="home" />
            <Link className="inline" to={`${match.url}/homepage`}>主页</Link>
          </Menu.Item>
          <Menu.Item key="maplist">
            <Icon type="database" />
            <Link className="inline" to={`${match.url}/maplist`}>我的地图</Link>
          </Menu.Item>
          <Menu.Item key="team">
            <Icon type="team" />
            <Link className="inline" to={`${match.url}/team`}>团队管理</Link>
          </Menu.Item>
          <Menu.Item key="mapcase">
            <Icon type="project" />
            <Link className="inline" to={`${match.url}/mapcase`}>案例地图</Link>
          </Menu.Item>
          <Menu.Item key="setting">
            <Icon type="setting" />
            <Link className="inline" to={`${match.url}/setting`}>系统设置</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header} >
          <WorkbenchHeader />
        </Header>
        <Content className={styles.content}>
          <Route exact={true} path={`${match.url}`} component={Homepage} />
          <Route path={`${match.url}/homepage`} component={Homepage} />
          <Route path={`${match.url}/maplist`} component={MapList} />
          <Route path={`${match.url}/team`} component={Team} />
          <Route path={`${match.url}/mapcase`} component={MapCase} />
          <Route path={`${match.url}/setting`} component={Setting} />
          <Route path={`${match.url}/usercenter`} component={UserCenter} />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Workbench