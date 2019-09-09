import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '@container/login/login'
import Register from '@container/register/register'
// import Forget from '@container/forget/forget'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact={true} component={Login}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        {/* <Route path="/forget" component={Forget}></Route> */}
      </Switch>
    </div>
  )
}

export default App
