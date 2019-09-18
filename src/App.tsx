import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '@container/login/login'
import Register from '@container/register/register'
import Forget from '@container/forget/forget'
import Workbench from '@container/workbench/workbench'
import PrivateRoute from '@component/private-route/private-route'
import NoMatch from '@component/no-match/no-match'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forget" component={Forget} />
        <PrivateRoute path="/workbench" component={Workbench} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}

export default App
