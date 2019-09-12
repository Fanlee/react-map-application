import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '@container/login/login'
import Register from '@container/register/register'
import Forget from '@container/forget/forget'
import Menu from '@container/menu/menu'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forget" component={Forget} />
        <Route path="/menu" component={Menu} />
      </Switch>
    </div>
  )
}

export default App
