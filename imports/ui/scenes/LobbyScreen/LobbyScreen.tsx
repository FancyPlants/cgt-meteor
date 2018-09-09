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
import { User } from '../../../api/users'
import LobbyPlayerList from './components/LobbyPlayerList/LobbyPlayerList'

interface LobbyScreenState {
  lobby: Lobby,
  users: User[],
}

class LobbyScreen extends React.Component<{}, LobbyScreenState> {
  tracker: Tracker.Computation

  componentWillMount() {
    this.tracker = Tracker.autorun(() => {
      // after this, should only be subscribed to one lobby,
      // so this should return the current lobby
      const lobby = Lobbies.findOne({ currentPlayers: Meteor.userId() })
      const users: User[] = []

      for (const userId of lobby.currentPlayers) {
        users.push(Meteor.users.findOne({ _id: userId }) as User)
      }

      this.setState({ lobby, users })
    })
  }

  componentWillUnmount() {
    this.tracker.stop()
  }

  render() {
    const { lobby, users } = this.state

    if (!lobby || !users) {
      return <Typography>Loading...</Typography>
    }

    return (
      <React.Fragment>
        <Typography variant="display2">{lobby.name}</Typography>
        <hr />
        <LobbyPlayerList users={users}/>
      </React.Fragment>
    )
  }
}

export default LobbyScreen
