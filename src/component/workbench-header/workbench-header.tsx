import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon, Avatar, Dropdown, Menu } from 'antd'
import { logout } from '@redux/user.redux'
import { urls } from '@common/ts/config'
import styles from './style.module.sass'

const WorkbenchHeader = React.memo(() => {
  const userInfo = useSelector((state: any) => state.user.userInfo)
  const dispatch = useDispatch()
  const handleClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      dispatch(logout())
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div className={styles.team}>
          <Icon className={`colorGray ${styles.icon}`} type="team" />
          <h1>{userInfo.defaultTeamName}</h1>
        </div>
        <Dropdown overlay={(
          <Menu onClick={handleClick}>
            <Menu.Item key="user">
              <Icon type="user" />
              <Link className="inline" to="/workbench/usercenter" > 个人中心</Link>
            </Menu.Item>
            <Menu.Item key="feedback">
              <Icon type="exception" />
              <a className="inline" href="http://e0.dituhui.com/feedback/?pageName=feedback&key=40288e9f483f48e501483f48eb060000" target="_blank">反馈</a>
            </Menu.Item>
            <Menu.Item key="logout">
              <Icon type="logout" />
              退出登录
            </Menu.Item>
          </Menu>
        )}>
          <div className={styles.userInfo}>
            <Icon className={`colorGray ${styles.icon}`} type="bell" />
            <div className={`curPointer ${styles.user}`}>
              {
                userInfo.photo ?
                  <Avatar className={styles.avatar} src={`${urls.platform}file/getFile?&width=34&height=34&filePath=${userInfo.photo}`} /> :
                  <Avatar className={styles.avatar} style={{ backgroundColor: userInfo.iconColor }} size="large">
                    {userInfo.userName}
                  </Avatar>
              }
              <span>{userInfo.userName}</span>
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  )
})

export default WorkbenchHeader