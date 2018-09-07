import * as React from 'react'
import {
  Paper,
  Button,
  Grid,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core'

import styles from './LobbyItemStyles'

interface LobbyItemProps extends WithStyles<typeof styles> {
  currentPlayers: number,
  maxPlayers: number,
  name: string,
}

class LobbyItem extends React.Component<LobbyItemProps, {}> {
  render() {
    const {
      classes,
      currentPlayers,
      maxPlayers,
      name,
    } = this.props

    return (
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
              variant="contained">
              Join
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(LobbyItem)
