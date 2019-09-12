import { combineReducers } from 'redux'
import { user } from './user.redux'
import { mapInfo } from './map.redux'

export default combineReducers({ user, mapInfo })