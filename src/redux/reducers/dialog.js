import {
  GETDIALOG_START,
  GETDIALOG_SUCCESS,
  GETDIALOG_FAIL,
  SEND_DIALOG_START,
  SEND_DIALOG_SUCCESS,
  SEND_DIALOG_FAIL,
  UPDATE_DIALOG_MESSAGE,
  RESET_DIALOG
} from '../actionTypes'
import produce from "immer"

const intialState = {
  isLoading: false,
  currentDialog: null,
  dialogLists: [],
  error: null
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case RESET_DIALOG:
      return produce(state, draftState => {
        draftState.isLoading = false
        draftState.currentDialog = null
        draftState.dialogLists = []
        draftState.error = null
      })
    case GETDIALOG_START:
    case SEND_DIALOG_START:
      return produce(state, draftState => {
        draftState.isLoading = true
      })
    case SEND_DIALOG_SUCCESS:
      return produce(state, draftState => {
        draftState.isLoading = false
      })
    case GETDIALOG_SUCCESS:
      return produce(state, draftState => {
        const foundDialog = state.dialogLists.filter((dialog) => {
          return (dialog.sessionId === action.payload.sessionId)
        })
        if (foundDialog.length <= 0) {
          draftState.isLoading = false
          draftState.currentDialog = { ...action.payload }
          draftState.dialogLists.push({ ...action.payload })
          draftState.error = null
        } else {
          draftState.isLoading = false
          draftState.currentDialog = { ...action.payload }
          draftState.error = null
        }
      })
    case GETDIALOG_FAIL:
    case SEND_DIALOG_FAIL:
      return produce(state, draftState => {
        draftState.isLoading = true
        draftState.error = { ...action.payload }
      })
    case UPDATE_DIALOG_MESSAGE:
      return produce(state, draftState => {
        const foundDialog = state.dialogLists.filter((dialog) => {
          return (dialog.sessionId === action.payload.sessionId)
        })
        if (foundDialog.length <= 0) {
          draftState.isLoading = false
          draftState.error = null
        } else {
          const newMessage = action.payload
          let index

          draftState.dialogLists.forEach((dialog, dialogIndex) => {
            if (dialog.sessionId === action.payload.sessionId) {
              index = dialogIndex
            }
          });

          if (state.currentDialog.sessionId === action.payload.sessionId) {
            draftState.currentDialog.messages.push(newMessage)
          }

          draftState.dialogLists[index].messages.push(newMessage)
          draftState.isLoading = false
          draftState.error = null
        }
      })

    default:
      return state
  }
}

export default reducer