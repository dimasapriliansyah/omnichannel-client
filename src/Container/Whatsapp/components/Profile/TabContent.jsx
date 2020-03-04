import React from 'react';

import TabProfile from './TabProfile'
import TabCwc from './TabCwc'
import TabJourney from './TabJourney'

function TabContent(props) {
  const { currentTab } = props
  console.log('currentTab', currentTab)
  switch (currentTab) {
    case 'tab-profile':
      return <TabProfile />
    case 'tab-cwc':
      return <TabCwc />
    case 'tab-journey':
      return <TabJourney />
    default:
      return null
  }
  // return (
  //   <h1>TabProfile</h1>
  // )
}

export default TabContent 