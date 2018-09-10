import * as React from 'react'
import { Meteor } from 'meteor/meteor'
import {
  WithStyles,
  withStyles,
  Typography,
  Button,
  Grid,
  colors,
} from '@material-ui/core'

import { errorAlert } from '../../../../utilities'
import BoxPaper from '../../../../components/BoxPaper/BoxPaper'
import { User } from '../../../../../api/users'

interface LobbyPlayerListProps extends WithStyles<typeof styles> {
  users: User[],
}

class LobbyPlayerList extends React.Component<LobbyPlayerListProps, {}> {
  kickPlayer = (userId: string) => () => {
    Meteor.call('lobbies.kickPlayer', userId, (err: Meteor.Error) => {
      if (err) {
        errorAlert('Unable to kick the player', err.toString())
      }
    })
  }

  render() {
    const {
      kickPlayer,
      props: {
        classes,
        users,
      },
    } = this

    const currentUserId = Meteor.userId()
    const isHost = currentUserId === users[0]._id

    return (
      <Grid container={true}>
      {users.map(user =>
        <Grid
          item={true}
          key={user._id}
          md={4}>
          <BoxPaper>
            <Grid
              alignItems="center"
              container={true}
              justify="space-between">
              <Typography variant="display2">{user.username}</Typography>
              <Button
                className={classes.kickButton}
                disabled={!isHost && user._id === currentUserId}
                onClick={kickPlayer(user._id!)}
                variant="contained">
                Kick
              </Button>
            </Grid>
          </BoxPaper>
        </Grid>,
      )}
    </Grid>
    )
  }
}

const styles = {
  kickButton: {
    backgroundColor: colors.red[500],
    color: 'white',

    '&:hover': {
      backgroundColor: colors.red[700],
    },
  },
}

export default withStyles(styles)(LobbyPlayerList)
