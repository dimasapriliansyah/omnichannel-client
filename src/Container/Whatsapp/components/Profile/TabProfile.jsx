import React, { Component } from 'react';
import { connect } from "react-redux";

import { getProfile } from "../../../../redux/actions";

import avatarImage from "../../../../media/img/avatar.png"

class TabProfile extends Component {
  render() {
    const { currentProfile, isLoading, currentTab } = this.props
    const show = currentTab === 'tab-profile' ? 'tab-pane show active text-center p0' : 'tab-pane text-center p0'
    console.log("TabProfile", currentProfile)
    console.log("TEST", currentProfile === null)
    if (currentProfile === null) {
      return (
        <p>Loading ...</p>
      )
    } else {
      return (
        <div className={show} id="profile" role="tabpanel">
          <img src={avatarImage} alt="avatar" className="rounded-circle" style={{ height: "100px" }} />
          <h6 className="font14 mt-4">{currentProfile.name}</h6>
          <h6 className="font12 text-muted mb-3">Cust ID : <p
            className="text-green">{currentProfile.id}</p>
          </h6>
          <div className="sidebar-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item-top">
                <div className="users-list-body text-left">
                  <h6 className="font12">Address</h6>
                  <p className="text-muted font11">
                    {currentProfile.address}
                  </p>
                </div>
              </li>
              <li className="list-group-item-top">
                <div className="users-list-body text-left">
                  <h6 className="font12">Work </h6>
                  <p className="text-muted font11">
                    {currentProfile.company}
                  </p>
                </div>
              </li>
              {
                currentProfile.contact.map((contact, index) => {
                  return (
                    <li className="list-group-item-top" key={index}>
                      <div className="users-list-body text-left">
                        <h6 className="font12">
                          {
                            contact.type.charAt(0).toUpperCase()
                            +
                            contact.type.slice(1)
                          }
                        </h6>
                        <p className="text-muted font11">
                          {
                            contact.value
                          }
                        </p>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>

        </div>
      )
    }

  }
}

const mapStateToProps = (state) => {
  const { profile } = state
  return {
    currentProfile: profile.currentProfile,
    isLoading: profile.isLoading,
    currentTab: profile.currentTab
  }
}

export default connect(mapStateToProps, { getProfile })(TabProfile)