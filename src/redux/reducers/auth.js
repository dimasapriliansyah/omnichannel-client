import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTH_RESET
} from '../actionTypes'
import produce from "immer"

const intialState = {
  isLoading: false,
  agentDataUser: null,
  agentDataGroupSkill: null,
  error: null
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case AUTH_RESET:
      return produce(state, draftState => {
        draftState.isLoading = false
        draftState.agentDataUser = null
        draftState.agentDataGroupSkill = null
        draftState.error = null
      })
    case AUTH_START:
    case LOGOUT_START:
      return produce(state, draftState => {
        draftState.isLoading = true
      })
    case AUTH_SUCCESS:
      return produce(state, draftState => {
        draftState.agentDataUser = action.payload.user
        draftState.agentDataGroupSkill = action.payload.groupSkill
        draftState.error = null
        draftState.isLoading = false
      })
    case AUTH_FAIL:
    case LOGOUT_FAIL:
      return produce(state, draftState => {
        draftState.error = { ...action.payload }
        draftState.isLoading = false
      })
    case LOGOUT_SUCCESS:
      return produce(state, draftState => {
        draftState.agentDataUser = null
        draftState.agentDataGroupSkill = null
        draftState.error = null
        draftState.isLoading = false
      })
    default:
      return state
  }
}

export default reducer