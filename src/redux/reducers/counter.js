import { INCREMENT, INCREMENT_COUNTER_BY_5 } from '../actionTypes'
import produce from "immer"

const intialState = {
  count: 0
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return produce(state, draftState => {
        draftState.count += 1
      })
    case INCREMENT_COUNTER_BY_5:
      return produce(state, draftState => {
        draftState.count += action.payload.count
      })
    default:
      return state
  }
}

export default reducer