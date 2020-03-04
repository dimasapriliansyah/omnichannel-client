import React, { Component } from 'react';
import { connect } from "react-redux";

import DialogHeader from './DialogHeader'
import DialogBody from './DialogBody'
import DialogFooter from './DialogFooter'

function Dialog(props) {
  const { currentDialog } = props
  return (
    <div className="chat">
      <DialogHeader currentDialog={currentDialog} />
      <DialogBody currentDialog={currentDialog} />
      <DialogFooter currentDialog={currentDialog} />
    </div>
  );
}

// const mapStateToProps = (state) => {
//   const { dialog } = state
//   return {
//     currentDialog: dialog.currentDialog
//   }
// }

export default Dialog

// export default connect(mapStateToProps)(Dialog);
