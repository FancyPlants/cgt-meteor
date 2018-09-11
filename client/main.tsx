import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CssBaseline } from '@material-ui/core'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import App from '../imports/ui/App'

const CGT = () => (
  <React.Fragment>
    <CssBaseline />
    <App />
  </React.Fragment>
)

Meteor.startup(() => {
  // For now, subscribe to everything
  const userSubscription = Meteor.subscribe('users')
  const lobbySubscription = Meteor.subscribe('lobbies')
  const gameSubscription = Meteor.subscribe('currentGame')

  ReactDOM.render(<CGT />, document.getElementById('root'))
})
