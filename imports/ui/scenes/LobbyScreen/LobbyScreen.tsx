import * as React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import {
  Typography,
  Button,
  Paper,
  Grid,
  withStyles,
  WithStyles,
} from '@material-ui/core'

import { Lobbies, Lobby } from '../../../api/lobbies'
import LobbyPlayerList from './LobbyPlayerList'

interface LobbyScreenState {
  lobby: Lobby,
}

class LobbyScreen extends React.Component<{}, LobbyScreenState> {
  tracker: Tracker.Computation

  componentWillMount() {
    this.tracker = Tracker.autorun(() => {
      // after this, should only be subscribed to one lobby,
      // so this should return the current lobby
      this.setState({ lobby: Lobbies.findOne() })
    })
  }

  componentWillUnmount() {
    this.tracker.stop()
  }

  render() {
    const { lobby } = this.state

    return (
      <React.Fragment>
        <Typography variant="display2">{lobby.name}</Typography>
        <hr />
        <LobbyPlayerList users={lobby.currentPlayers}/>
      </React.Fragment>
    )
  }
}

export default LobbyScreen
