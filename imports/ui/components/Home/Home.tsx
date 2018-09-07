import * as React from 'react'
import {
  Typography,
  TextField,
  Grid,
  Button,
  WithStyles,
  withStyles,
} from '@material-ui/core'

import LobbyList from './components/LobbyList/LobbyList'
import styles from './HomeStyles'

interface HomeProps extends WithStyles<typeof styles> {

}

class Home extends React.Component<HomeProps, {}> {
  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <Typography variant="display3">
          Coordinated Government Takedown (Not Coup, for Legal Reasons)
        </Typography>
        <hr className={classes.divider} />
        <Grid container={true}>
          <Grid
            item={true}
            sm={8}>
            <TextField
              fullWidth={true}
              label="New Room"
              />
          </Grid>
          <Grid item={true} sm={1} />
          <Grid
            item={true}
            sm={3}>
            <Button
              color="primary"
              variant="contained">
              Create Room
            </Button>
          </Grid>
        </Grid>
        
        <LobbyList />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Home)
