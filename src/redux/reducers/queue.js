import { CHANGE_QUEUE_COUNT } from '../actionTypes'
import produce from "immer"

const intialState = {
  queueCount: { whatsapp: 0 }
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case CHANGE_QUEUE_COUNT:
      return produce(state, draftState => {
        const channelId = action.payload.channelId
        draftState.queueCount[channelId] = action.payload.queueCount
      })
    default:
      return state
  }
}

export default reducer