import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const token = useSelector((state: any) => state.user.userInfo.token)
  console.log(rest)
  return (
    <Route
      {...rest}
      render={props => {
        console.log('props', props)
        return token ? <Component {...props} /> : <Redirect to="/login" />
      }
        
      } />
  )
}

export default PrivateRoute