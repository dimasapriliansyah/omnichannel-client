import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_RESET,
  AUTOIN_START,
  AUTOIN_PLAY,
  AUTOIN_PAUSE,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CHANGE_QUEUE_COUNT,
  CONTACT_ADD,
  CONTACT_REMOVEALL,
  CONTACT_SETCURRENT,
  CONTACT_SETLASTCHAT,
  CONTACT_UPDATECOUNT,
  CONTACT_RESETCOUNT,
  RESET_DIALOG,
  GETDIALOG_START,
  GETDIALOG_FAIL,
  GETDIALOG_SUCCESS,
  GETPROFILE_START,
  GETPROFILE_SUCCESS,
  GETPROFILE_FAIL,
  RESET_PROFILE,
  PROFILE_CHANGE_TAB,
  PROFILE_RESET_TAB,
  UPDATE_DIALOG_MESSAGE,
  SEND_DIALOG_START,
  SEND_DIALOG_FAIL,
  SEND_DIALOG_SUCCESS
} from './actionTypes'

import {
  AUTH_URL_LOGIN,
  AUTH_URL_LOGOUT,
  AUTOIN_URL,
  GETDIALOG_URL,
  GETPROFILE_URL,
  OUTGOING_WA_URL
} from "../env.js";

import axios from 'axios';

const authStart = () => {
  return {
    type: AUTH_START
  }
}

const authSuccess = (data) => {
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

const authError = (data) => {
  return {
    type: AUTH_FAIL,
    payload: data
  }
}

const logoutStart = () => {
  return {
    type: LOGOUT_START
  }
}

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

const logoutFail = (data) => {
  return {
    type: LOGOUT_FAIL,
    payload: data
  }
}

const autoInStart = (data) => {
  return {
    type: AUTOIN_START
  }
}

const autoInPlay = (data) => {
  return {
    type: AUTOIN_PLAY,
  }
}

const autoInPause = (data) => {
  return {
    type: AUTOIN_PAUSE,
  }
}

// ASYNC THUNK ACTION CREATOR
export const authLogin = (inputdata) => {
  const { username, password } = inputdata
  return (dispatch, getState) => {
    dispatch(authStart())
    axios.post(AUTH_URL_LOGIN, {
      username: username,
      password: password
    }).then((res) => {
      const { data: agentdata } = res.data
      dispatch(authSuccess(agentdata))
    }).catch(error => {
      const { response } = error
      if (typeof response === "undefined") {
        const errordata = {
          isError: true,
          errorStatusCode: 0,
          errorMessage: error.message
        }
        return dispatch(authError(errordata))
      }
      const statusCode = error.response.status
      let errorMessage = null
      if (statusCode === 500) {
        errorMessage = "Internal Server Error"
      } else {
        const { data } = error.response.data
        errorMessage = data
      }

      const errordata = {
        isError: true,
        errorStatusCode: statusCode,
        errorMessage
      }

      dispatch(authError(errordata))

    })
  }
}

export const authLogout = (username) => {
  return (dispatch, getState) => {
    dispatch(logoutStart())
    axios.post(AUTH_URL_LOGOUT, {
      username: username
    }).then((res) => {
      dispatch(logoutSuccess())
      dispatch(contactRemoveAll())
      dispatch(autoInPause())
      dispatch(resetDialog())
      dispatch(resetProfile())
      dispatch(resetAuth())
    }).catch(error => {
      const statusCode = error.response.status
      let errorMessage = null
      if (statusCode === 500) {
        errorMessage = "Internal Server Error"
      } else {
        const { data } = error.response.data
        errorMessage = data
      }

      const errordata = {
        isError: true,
        errorStatusCode: statusCode,
        errorMessage
      }

      dispatch(logoutFail(errordata))

    })
  }
}

export const autoIn = (username, isPaused) => {
  return (dispatch, getState) => {
    dispatch(autoInStart())
    axios.post(AUTOIN_URL, {
      username,
      auxStatus: isPaused
    }).then((res) => {
      const response = res.data
      if (isPaused) {
        return dispatch(autoInPause())
      }

      return dispatch(autoInPlay())

    }).catch(error => {
      const statusCode = error.response.status
      let errorMessage = null
      if (statusCode === 500) {
        errorMessage = "Internal Server Error"
      } else {
        const { data } = error.response.data
        errorMessage = data
      }

      const errordata = {
        isError: true,
        errorStatusCode: statusCode,
        errorMessage
      }

      dispatch(authError(errordata))

    })
  }
}

export const queueCount = (queueCount, channelId) => {
  return {
    type: CHANGE_QUEUE_COUNT,
    payload: {
      queueCount,
      channelId
    }
  }
}

export const contactAdd = (data) => {
  return {
    type: CONTACT_ADD,
    payload: data
  }
}

export const contactRemoveAll = (data) => {
  return {
    type: CONTACT_REMOVEALL
  }
}

export const contactSetCurrent = (data) => {
  console.log("contactSetCurrent")
  return {
    type: CONTACT_SETCURRENT,
    payload: data
  }
}

// DIALOG/INTERACTION

const getInteractionStart = ({ sessionId }) => {
  return {
    type: GETDIALOG_START,
    payload: { sessionId }
  }
}

const getInteractionSuccess = (data) => {
  return {
    type: GETDIALOG_SUCCESS,
    payload: data
  }
}

const getInteractionFail = (data) => {
  return {
    type: GETDIALOG_FAIL,
    payload: data
  }
}

const contactResetCount = (sessionId) => {
  return {
    type: CONTACT_RESETCOUNT,
    payload: { sessionId }
  }
}

export const getInteraction = ({ sessionId, channelId, type }) => {
  return (dispatch, getState) => {
    dispatch(getInteractionStart(sessionId))
    dispatch(contactResetCount(sessionId))
    const { dialog } = getState()

    const foundDialog = dialog.dialogLists.filter((dialog) => {
      return (dialog.sessionId === sessionId)
    })

    if (foundDialog.length > 0) {
      return dispatch(getInteractionSuccess(foundDialog[0]))
    }

    axios.post(GETDIALOG_URL, {
      sessionId,
      channelId,
      type
    }).then((res) => {
      const response = res.data
      const { data } = response
      dispatch(getInteractionSuccess(data))
    }).catch(error => {
      const statusCode = error.response.status
      let errorMessage = null
      if (statusCode === 500) {
        errorMessage = "Internal Server Error"
      } else {
        const { data } = error.response.data
        errorMessage = data
      }

      const errordata = {
        isError: true,
        errorStatusCode: statusCode,
        errorMessage
      }

      dispatch(getInteractionFail(errordata))

    })
  }
}

const getProfileStart = (custId) => {
  return {
    type: GETPROFILE_START,
    payload: custId
  }
}

const getProfileSuccess = (data) => {
  return {
    type: GETPROFILE_SUCCESS,
    payload: { ...data }
  }
}

const getProfileFail = (data) => {
  return {
    type: GETPROFILE_FAIL,
    payload: { ...data }
  }
}

const profileChangeTab = (data) => {
  console.log('tabType', data)
  return {
    type: PROFILE_CHANGE_TAB,
    payload: data
  }
}

export const resetProfileTab = (data) => {
  return {
    type: PROFILE_RESET_TAB
  }
}

export const getProfile = ((custId, tabType) => {
  return (dispatch, getState) => {
    dispatch(getProfileStart(custId))
    dispatch(profileChangeTab(tabType))
    const { profile } = getState()

    console.log("listProfile", profile.listProfile)

    const foundProfile = profile.listProfile.filter((profile) => {
      return (profile.id === custId)
    })

    console.log("foundProfile", foundProfile)

    if (foundProfile.length > 0) {
      return dispatch(getProfileSuccess(foundProfile[0]))
    }

    axios.post(GETPROFILE_URL, {
      custId
    }).then((res) => {
      const response = res.data
      const { data } = response
      return dispatch(getProfileSuccess(data))
    }).catch(error => {
      const statusCode = error.response.status
      let errorMessage = null
      if (statusCode === 500) {
        errorMessage = "Internal Server Error"
      } else {
        const { data } = error.response.data
        errorMessage = data
      }

      const errordata = {
        isError: true,
        errorStatusCode: statusCode,
        errorMessage
      }

      dispatch(getProfileFail(errordata))

    })
  }
})

export const getCWC = ((custId, tabType) => {
  return (dispatch, getState) => {
    // dispatch(getProfileStart(custId))
    dispatch(profileChangeTab(tabType))
    // const { profile } = getState()

    // console.log("listProfile", profile.listProfile)

    // const foundProfile = profile.listProfile.filter((profile) => {
    //   return (profile.id === custId)
    // })

    // console.log("foundProfile", foundProfile)

    // if (foundProfile.length > 0) {
    //   return dispatch(getProfileSuccess(foundProfile[0]))
    // }

    // axios.post(GETPROFILE_URL, {
    //   custId
    // }).then((res) => {
    //   const response = res.data
    //   const { data } = response
    //   return dispatch(getProfileSuccess(data))
    // }).catch(error => {
    //   const statusCode = error.response.status
    //   let errorMessage = null
    //   if (statusCode === 500) {
    //     errorMessage = "Internal Server Error"
    //   } else {
    //     const { data } = error.response.data
    //     errorMessage = data
    //   }

    //   const errordata = {
    //     isError: true,
    //     errorStatusCode: statusCode,
    //     errorMessage
    //   }

    //   dispatch(getProfileFail(errordata))

    // })
  }
})

const sendDialogStart = (custId) => {
  return {
    type: SEND_DIALOG_START
  }
}

const sendDialogSuccess = (data) => {
  return {
    type: SEND_DIALOG_SUCCESS
  }
}

const sendDialogFail = (data) => {
  return {
    type: SEND_DIALOG_FAIL,
    payload: { ...data }
  }
}

export const sendInteraction = (data) => {
  const { sessionId } = data
  return (dispatch, getState) => {
    dispatch(sendDialogStart())

    axios.post(OUTGOING_WA_URL, {
      ...data
    }).then((res) => {
      dispatch(sendDialogSuccess())
      dispatch(contactResetCount(sessionId))
    }).catch(error => {
      const statusCode = error.response.status
      let errorMessage = null
      if (statusCode === 500) {
        errorMessage = "Internal Server Error"
      } else {
        const { data } = error.response.data
        errorMessage = data
      }

      const errordata = {
        isError: true,
        errorStatusCode: statusCode,
        errorMessage
      }

      dispatch(sendDialogFail(errordata))

    })
  }
}

const updateContactLastChat = (sessionId, message) => {
  return {
    type: CONTACT_SETLASTCHAT,
    payload: { sessionId, message }
  }
}

const updateContactCount = (sessionId) => {
  return {
    type: CONTACT_UPDATECOUNT,
    payload: { sessionId }
  }
}

const updateCurrentInteraction = (data) => {
  return {
    type: UPDATE_DIALOG_MESSAGE,
    payload: { ...data }
  }
}

export const updateCurrentDialog = (data) => {
  return (dispatch, getState) => {
    const { sessionId, message } = data
    dispatch(updateContactLastChat(sessionId, message))
    // dispatch(contactResetCount(sessionId))
    dispatch(updateCurrentInteraction(data))
    console.log("updateCurrentDialog", data)
    if (data.actionType === 'in') {
      dispatch(updateContactCount(sessionId))
    }
  }
}

const resetDialog = () => {
  return {
    type: RESET_DIALOG
  }
}

const resetProfile = () => {
  return {
    type: RESET_PROFILE
  }
}

const resetAuth = () => {
  return {
    type: AUTH_RESET
  }
}