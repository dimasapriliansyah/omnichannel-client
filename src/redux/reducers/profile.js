import { GETPROFILE_START, GETPROFILE_SUCCESS, GETPROFILE_FAIL, PROFILE_CHANGE_TAB, PROFILE_RESET_TAB, RESET_PROFILE } from '../actionTypes'
import produce from "immer"

const intialState = {
  currentTab: null,
  isLoading: false,
  currentProfile: null,
  listProfile: [],
  error: null
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case RESET_PROFILE:
      return produce(state, draftState => {
        draftState.currentTab = null
        draftState.isLoading = false
        draftState.currentProfile = null
        draftState.listProfile = []
        draftState.error = null
      })
    case GETPROFILE_START:
      return produce(state, draftState => {
        draftState.isLoading = true
      })
    case GETPROFILE_SUCCESS:
      return produce(state, draftState => {
        const foundProfile = state.listProfile.filter((profile) => {
          return (profile.id === action.payload.id)
        })
        if (foundProfile.length <= 0) {
          draftState.isLoading = false
          draftState.currentProfile = { ...action.payload }
          draftState.listProfile.push({ ...action.payload })
          draftState.error = null
        } else {
          draftState.isLoading = false
          draftState.currentProfile = { ...action.payload }
          draftState.error = null
        }

      })
    case GETPROFILE_FAIL:
      return produce(state, draftState => {
        draftState.isLoading = false
        draftState.error = { ...action.payload }
      })
    case PROFILE_CHANGE_TAB:
      return produce(state, draftState => {
        console.log("action.payload", action.payload)
        draftState.isLoading = false
        draftState.currentTab = action.payload
      })
    case PROFILE_RESET_TAB:
      return produce(state, draftState => {
        draftState.isLoading = false
        draftState.currentTab = null
      })
    default:
      return state
  }
}

export default reducer