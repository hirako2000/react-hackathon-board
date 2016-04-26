import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import hacks from './modules/hacks'

export default combineReducers({
  counter,
  hacks,
  router
})
