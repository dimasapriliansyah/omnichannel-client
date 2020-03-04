import { AUTOIN_START, AUTOIN_PLAY, AUTOIN_PAUSE } from '../actionTypes'
import produce from "immer"

const intialState = {
  isLoading: false,
  pausedStatus: true
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case AUTOIN_START:
      return produce(state, draftState => {
        draftState.isLoading = true
      })
    case AUTOIN_PLAY:
      return produce(state, draftState => {
        draftState.isLoading = false
        draftState.pausedStatus = false
      })
    case AUTOIN_PAUSE:
      return produce(state, draftState => {
        draftState.isLoading = false
        draftState.pausedStatus = true
      })
    default:
      return state
  }
}

export default reducer