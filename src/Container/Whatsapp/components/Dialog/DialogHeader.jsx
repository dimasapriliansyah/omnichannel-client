import React from 'react';
import avatarImage from "../../../../media/img/avatar.png"

function DialogHeader(props) {
  const currentDialog = props.currentDialog
  // console.log("DialogHeader currentDialog", currentDialog)
  return (
    <React.Fragment>
      {/* <p>{JSON.stringify(currentDialog)}</p> */}

      <div className="chat-header">
        <div className="chat-header-user">
          <figure className="avatar avatar-lg">
            {
              currentDialog === null ?
                <span class="avatar-title rounded-circle"></span> :
                <span class="avatar-title bg-success rounded-circle">
                  {currentDialog.fromName[0].toUpperCase()}
                </span>
            }
          </figure>
          {
            currentDialog !== null &&
            <div>
              <h6 className="font14">
                {currentDialog.from}
              </h6>
              <h6 className="font12">
                {currentDialog.fromName}
              </h6>
            </div>
          }
        </div>

        {
          currentDialog !== null &&
          <div className="chat-header-action">
            <ul className="list-inline">
              <li className="list-inline-item">
                <button className="btn btn-md btn-info">
                  End Interaction
                </button>
              </li>
            </ul>
          </div>
        }

      </div>

    </React.Fragment>
  );
}

export default DialogHeader;
