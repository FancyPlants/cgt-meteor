import * as React from 'react'
import { Meteor } from 'meteor/meteor'
import {
  Paper,
  Button,
  Grid,
  Grow,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'

import { errorAlert } from '../../../../../../../logic/utilities'
import styles from './LobbyItemStyles'

interface LobbyItemState {
  lobbyRedirect: boolean,
}

interface LobbyItemProps extends WithStyles<typeof styles> {
  currentPlayers: number,
  maxPlayers: number,
  name: string,
}

class LobbyItem extends React.Component<LobbyItemProps, LobbyItemState> {
  state = {
    lobbyRedirect: false,
  }

  joinGame = () => {
    const { name } = this.props
    Meteor.call('lobbies.joinLobby', name, (err: Meteor.Error) => {
      if (err) {
        errorAlert('Unable to join lobby', err.toString())
      } else {
        this.setState({ lobbyRedirect: true })
      }
    })
  }

  render() {
    const {
      joinGame,
      props: {
        classes,
        currentPlayers,
        maxPlayers,
        name,
      },
      state: {
        lobbyRedirect,
      },
    } = this

    if (lobbyRedirect) {
      return <Redirect to={`/lobby/${name}`} />
    }

    return (
      <Grow in={true}>
        <Paper className={classes.container}>
          <Grid
            alignContent="center"
            container={true}>
            <Grid
              item={true}
              md={7}>
              <Typography variant="display2">{name}</Typography>
            </Grid>

            <Grid
              item={true}
              md={1}
              />

            <Grid
              item={true}
              md={2}>
              <Typography variant="display2">{currentPlayers}/{maxPlayers}</Typography>
            </Grid>

            <Grid
              item={true}
              md={1}>
              <Button
                className={classes.button}
                onClick={joinGame}
                variant="contained">
                Join
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    )
  }
}

export default withStyles(styles)(LobbyItem)
