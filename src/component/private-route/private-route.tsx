import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isLogin = useSelector((state: any) => state.user.userInfo.token)
  // 每次路由跳转的时候存一下跳转过去的路由
  return (
    <Route
      {...rest}
      render={props => {
        return isLogin ? <Component {...props} /> : <Redirect to="/login" />
      }
      } />
  )
}

export default PrivateRoute