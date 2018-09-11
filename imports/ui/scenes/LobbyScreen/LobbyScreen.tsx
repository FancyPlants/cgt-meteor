import * as React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Redirect } from 'react-router-dom'
import {
  Typography,
  Button,
  WithStyles,
  withStyles,
  colors,
  Grid,
} from '@material-ui/core'

import { Lobbies, Lobby } from '../../../api/lobbies'
import { User } from '../../../api/users'
import LobbyPlayerList from './components/LobbyPlayerList/LobbyPlayerList'

interface LobbyScreenState {
  lobby: Lobby,
  users: User[],
}

interface LobbyScreenProps extends WithStyles<typeof styles> {}

class LobbyScreen extends React.Component<LobbyScreenProps, LobbyScreenState> {
  tracker: Tracker.Computation

  componentWillMount() {
    window.addEventListener('beforeunload', this.removePlayerFromLobby)
    this.tracker = Tracker.autorun(() => {
      // after this, should only be subscribed to one lobby,
      // so this should return the current lobby
      const lobby = Lobbies.findOne({ currentPlayers: Meteor.userId() })
      if (!lobby) {
        return
      }
      const users: User[] = Meteor.users
        .find({ _id: { $in: lobby.currentPlayers } }).fetch() as User[]

      this.setState({ lobby, users })
    })
  }

  componentWillUnmount() {
    this.tracker.stop()
    this.removePlayerFromLobby()
  }

  removePlayerFromLobby = () => {
    Meteor.call('lobbies.leaveLobby')
    window.removeEventListener('beforeunload', this.removePlayerFromLobby)
  }

  startGame = () => {
    Meteor.call('lobbies.startGame')
  }

  render() {
    const {
      startGame,
      props: {
        classes,
      },
      state: {
        lobby,
        users,
      },
    } = this

    if (!lobby || !users) {
      return <Typography>Loading...</Typography>
    }

    if (lobby.isStarting) {
      return <Redirect to={`/game/${lobby.name}`} />
    }

    const currentUserId = Meteor.userId()
    const isHost = currentUserId === lobby.currentPlayers[0]

    return (
      <React.Fragment>
        <Grid container={true}>
          <Grid
            item={true}
            md={9}>
            <Typography variant="display2">{lobby.name}</Typography>
          </Grid>

          <Grid
            item={true}
            md={2}>
            <Button
              className={classes.startButton}
              disabled={!isHost}
              onClick={startGame}
              variant="contained">
              Start Game
            </Button>
          </Grid>
        </Grid>

        <hr />
        <LobbyPlayerList users={users}/>
      </React.Fragment>
    )
  }
}

const styles = {
  startButton: {
    backgroundColor: colors.green[600],
    color: 'white',

    '&:hover': {
      backgroundColor: colors.green[800],
    },
  },
}

export default withStyles(styles)(LobbyScreen)
