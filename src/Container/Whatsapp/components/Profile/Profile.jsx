import React, { Component } from 'react';

import { connect } from "react-redux";

import { getProfile, getCWC } from "../../../../redux/actions";
import tabImage from "../../../../media/img/selecttab.jpeg"


import TabContent from "./TabContent";

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listProfile: [{ custId: null, cwc: { category: null, subCategory: null } }],
    }
    this.changeTabHandler = this.changeTabHandler.bind(this)
    this.tabActive = this.tabActive.bind(this)
  }
  changeTabHandler(tabType) {
    const { currentContact, getProfile, getCWC } = this.props
    switch (tabType) {
      case 'tab-profile':
        getProfile(currentContact.customerId, tabType)
        break;
      case 'tab-cwc':
        getCWC(currentContact.customerId, tabType)
        break;
      case 'tab-journey':
        // getCWC(currentContact.customerId, tabType)
        break;
      default:
        break;
    }

  }
  tabActive(tabType) {
    const { currentTab } = this.props
    return tabType === currentTab ? 'nav-link active text-center' : 'nav-link text-center'
  }
  render() {
    const { currentDialog, currentContact, currentTab } = this.props
    return (
      <div className="sidebar-group">
        {
          currentDialog !== null &&
          <div id="chats" className="sidebar active">
            <header className="bg-green"
              style={{ padding: "10px 10px 0px 14px" }}>
              <ul className="nav nav-tabs">
                <li
                  className="nav-item"
                  name="tab-profile"
                  onClick={() => this.changeTabHandler('tab-profile')}>
                  <a href="#" className={this.tabActive('tab-profile')}>
                    <i className="fa fa-user"></i>
                    <br />
                    Profile
                  </a>
                </li>
                <li
                  className="nav-item"
                  name="tab-cwc"
                  onClick={() => this.changeTabHandler('tab-cwc')}>
                  <a href="#" className={this.tabActive('tab-cwc')}>
                    <i className="fa fa-pencil-square-o"></i>
                    <br />
                    CWC
                  </a>
                </li>
                <li
                  className="nav-item"
                  name="tab-journey"
                  onClick={() => this.changeTabHandler('tab-journey')}>
                  <a href="#" className={this.tabActive('tab-journey')}>
                    <i className="fa fa-tasks"></i>
                    <br />
                    Journey
                  </a>
                </li>
              </ul>
            </header>
            <div className="sidebar-body">
              <ul className="list-group list-group-flush">
                <div className="tab-content mt-3">
                  {
                    currentTab === null ?
                      <div
                        className='tab-pane show active text-center p0'
                        id="profile"
                        role="tabpanel">
                        <img src={tabImage} alt="selecttab" style={{ height: "12em", width: "12em", marginTop: '5em' }} />
                        <p style={{ color: '#B0B0B0', padding: '3em' }}>
                          <em>
                            Select tab for more detail about the customers.
                          </em>
                        </p>
                      </div>
                      :
                      <TabContent currentTab={currentTab} currentContact={currentContact} />
                  }

                </div>
              </ul>
            </div>

            {/* <div className="tab-content">
              <div className="tab-pane show active text-center p0">
                <h6 className="font14 mt-4">
                  Dimas Apriliansyah
                </h6>
              </div>
            </div> */}

          </div>

        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { contact, profile } = state
  return {
    currentContact: contact.currentContact,
    currentProfile: profile.currentProfile,
    currentTab: profile.currentTab
  }
}

export default connect(mapStateToProps, { getProfile, getCWC })(Profile);
