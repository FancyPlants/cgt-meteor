import * as React from 'react'
import {
  Paper,
  WithStyles,
  withStyles,
  Typography,
  Button,
  Grid,
} from '@material-ui/core'

import { User } from '../../../api/users'

interface LobbyPlayerListProps {
  users: User[],
}

const LobbyPlayerList: React.SFC<LobbyPlayerListProps> = ({
  users,
}) => (
  <Grid container={true}>
    {users.map(user =>
      <Grid
        item={true}
        md={4}>
        <Paper>
          <Typography>{user.username}</Typography>
        </Paper>
      </Grid>,
    )}
  </Grid>
)

export default LobbyPlayerList
