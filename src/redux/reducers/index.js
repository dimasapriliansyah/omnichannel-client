import { combineReducers } from "redux";

import counter from './counter'
import auth from './auth'
import autoin from './autoin'
import queue from './queue'
import contact from './contact'
import dialog from './dialog'
import profile from './profile'

export default combineReducers({ counter, auth, autoin, queue, contact, dialog, profile });