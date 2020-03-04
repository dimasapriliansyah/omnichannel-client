import React, { Component } from 'react';
import { connect } from "react-redux";

import { getProfile } from "../../../../redux/actions";

import avatarImage from "../../../../media/img/avatar.png"

class TabCwc extends Component {
  render() {
    const { currentProfile, isLoading, currentTab } = this.props
    const show = currentTab === 'tab-cwc' ? 'tab-pane m20 show active' : 'tab-pane m20'
    console.log("TabCwc", currentProfile)
    console.log("TEST", currentProfile === null)
    if (currentProfile === null) {
      return (
        <p>Loading ...</p>
      )
    } else {
      return (
        <div className={show} id="cwc" role="tabpanel">
          <form action="">
            <div class="form-group">
              <label for="custID" class="col-form-label">Cust ID</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="ti-user"></i>
                  </span>
                </div>
                <input type="text" class="form-control" id="Cust ID"
                  placeholder="339292929" />
              </div>
            </div>
            <div class="form-group">
              <label for="name" class="col-form-label">Name</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="ti-user"></i>
                  </span>
                </div>
                <input type="text" class="form-control" id="name"
                  placeholder="Your Name" />
              </div>
            </div>
            <div class="form-group">
              <label for="address" class="col-form-label">Address</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="ti-home"></i>
                  </span>
                </div>
                <input type="text" class="form-control" id="address"
                  placeholder="Your Address" />
              </div>
            </div>
            <div class="form-group">
              <label for="hp" class="col-form-label">HP</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="ti-mobile"></i>
                  </span>
                </div>
                <input type="text" class="form-control" id="hp"
                  placeholder="(+628) 555 555 555" />
              </div>
            </div>
            <div class="form-group">
              <label for="phone" class="col-form-label">Phone</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="ti-mobile"></i>
                  </span>
                </div>
                <input type="text" class="form-control" id="hp"
                  placeholder="(021) 892922" />
              </div>
            </div>
            <div class="form-group">
              <label for="email" class="col-form-label">Email</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="ti-envelope"></i>
                  </span>
                </div>
                <input type="text" class="form-control" id="email" />
              </div>
            </div>
          </form>
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

export default connect(mapStateToProps, { getProfile })(TabCwc)