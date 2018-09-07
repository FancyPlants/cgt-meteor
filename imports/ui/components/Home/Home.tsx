import * as React from 'react'
import { Meteor } from 'meteor/meteor'
import to from 'await-to-ts'
import swal from 'sweetalert2'
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

}

class Home extends React.Component<HomeProps, {}> {
  state = {
    room: '',
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

    Meteor.call('lobbies.newLobby', room, err => {
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
