import * as React from 'react'
import {
  Paper,
  WithStyles,
  withStyles,
  Theme,
} from '@material-ui/core'

interface BoxPaperProps extends WithStyles<typeof styles> {
  children: React.ReactNode,
}

const BoxPaper: React.SFC<BoxPaperProps> = ({
  children,
  classes,
}) => (
  <Paper className={classes.container}>
    {children}
  </Paper>
)

const styles = (theme: Theme) => ({
  container: {
    overflow: 'auto',
    padding: theme.spacing.unit * 4,
    margin: '5%',
  },
})

export default withStyles(styles)(BoxPaper)
