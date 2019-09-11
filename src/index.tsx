import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import rootReducer from '@redux/index.redux'
import './common/ts/server'

import 'antd/dist/antd.css'
import './index.sass'


import * as serviceWorker from './serviceWorker';

// 数据持久化配置
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'] // 白名单
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


interface Window {
  [p: string]: any
}

declare const window: Window

const store = createStore(persistedReducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f: any) => f
))

const persistor = persistStore(store)

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>

), document.getElementById('root') as HTMLElement)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

