import * as React from 'react'
import { Meteor } from 'meteor/meteor'
import swal from 'sweetalert2'
import { History } from 'history'
import { Lobbies } from '../../../api/lobbies'
import {
  Typography,
  TextField,
  Grid,
  Button,
  Paper,
  WithStyles,
  withStyles,
} from '@material-ui/core'

import LobbyList from './components/LobbyList/LobbyList'
import styles from './HomeStyles'

interface HomeProps extends WithStyles<typeof styles> {
  history: History,
}

class Home extends React.Component<HomeProps, {}> {
  state = {
    room: '',
  }

  componentWillMount() {
    const { history } = this.props
    const lobby = Lobbies.findOne({ currentPlayers: Meteor.userId() })
    console.log(lobby)
    if (lobby) {
      history.push(`/lobby/${lobby.name}`)
    }
  }

  handleChange = (e: any) => {
    this.setState({ room: e.target.value })
  }

  createNewRoom = async () => {
    const { room } = this.state
    // if room is blank, don't submit the request
    if (!room) {
      return
    }

    Meteor.call('lobbies.newLobby', room, (err: Meteor.Error) => {
      if (err) {
        swal({
          title: 'Unable to create lobby',
          text: err.toString(),
          type: 'error',
        })
      }
    })
  }

  render() {
    const {
      createNewRoom,
      handleChange,
    } = this
    const { classes } = this.props
    const { room } = this.state

    return (
      <React.Fragment>
        <Typography variant="display3">
          Coordinated Government Takedown (Not Coup, for Legal Reasons)
        </Typography>
        <hr className={classes.divider} />
        <Paper className={classes.inputContainer}>
          <Grid container={true}>

            <Grid
              item={true}
              sm={8}>
              <TextField
                fullWidth={true}
                label="New Room"
                onChange={handleChange}
                value={room}
                />
            </Grid>

            <Grid item={true} sm={1} />

            <Grid
              item={true}
              sm={3}>
              <Button
                color="primary"
                onClick={createNewRoom}
                variant="contained">
                Create Room
              </Button>
            </Grid>

          </Grid>
        </Paper>

        <LobbyList />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Home)
