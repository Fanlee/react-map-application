import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isLogin = localStorage.getItem('token')

  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? <Component {...props} /> : <Redirect to="/login" />
      } />
  )
}

export default PrivateRoute