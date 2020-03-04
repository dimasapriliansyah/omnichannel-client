import {
  CONTACT_ADD,
  CONTACT_REMOVEALL,
  CONTACT_SETCURRENT,
  CONTACT_SETLASTCHAT,
  CONTACT_UPDATECOUNT,
  CONTACT_RESETCOUNT
} from "../actionTypes";
import produce from "immer"

const initialState = {
  contactLists: [],
  currentContact: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_SETLASTCHAT:
      return produce(state, draftState => {
        const { contactLists, currentContact } = state
        let foundContact = false
        contactLists.forEach((contact, index) => {
          if (contact.sessionId === action.payload.sessionId) {
            foundContact = index
          }
        })
        if (foundContact !== false) {
          draftState.contactLists[foundContact].lastChat = action.payload.message
        }

        if (currentContact !== null) {
          if (currentContact.sessionId === action.payload.sessionId) {
            draftState.currentContact.lastChat = action.payload.message
          }
        }
      })
    case CONTACT_UPDATECOUNT:
      return produce(state, draftState => {
        const { contactLists, currentContact } = state
        let foundContact = false
        contactLists.forEach((contact, index) => {
          if (contact.sessionId === action.payload.sessionId) {
            foundContact = index
          }
        })
        if (foundContact !== false) {
          draftState.contactLists[foundContact].count++
        }

        if (currentContact !== null) {
          if (currentContact.sessionId === action.payload.sessionId) {
            draftState.currentContact.count++
          }
        }

      })
    case CONTACT_RESETCOUNT:
      return produce(state, draftState => {
        console.log('state CONTACT_RESETCOUNT', state)
        console.log('action CONTACT_RESETCOUNT', action)
        const { contactLists, currentContact } = state
        let foundContact = false
        contactLists.forEach((contact, index) => {
          if (contact.sessionId === action.payload.sessionId) {
            foundContact = index
          }
        })
        if (foundContact !== false) {
          draftState.contactLists[foundContact].count = 0
        }

        if (currentContact !== null) {
          if (currentContact.sessionId === action.payload.sessionId) {
            draftState.currentContact.count = 0
          }
        }
      })
    case CONTACT_ADD:
      return produce(state, draftState => {
        let fromName
        const {
          sessionId,
          channelId,
          customerId,
          from,
          lastChat,
          count
        } = action.payload

        if (typeof action.payload.fromName === "undefined") {
          fromName = from
        } else {
          fromName = action.payload.fromName
        }

        const data = {
          sessionId,
          channelId,
          customerId,
          from,
          fromName,
          lastChat,
          count
        }

        draftState.contactLists.push(data)

      })
    case CONTACT_SETCURRENT:
      return produce(state, draftState => {
        const findContactList = state.contactLists.filter((contact) => {
          console.log("state contact", contact.sessionId)
          console.log("payload contact", action.payload)
          return (contact.sessionId === action.payload)
        }
        )
        if (findContactList.length <= 0) {
          draftState.currentContact = null
        } else {
          draftState.currentContact = findContactList[0]
        }
      })
    case CONTACT_REMOVEALL:
      return produce(state, draftState => {
        draftState.contactLists = []
      })
    default:
      return state;
  }
}

export default reducer