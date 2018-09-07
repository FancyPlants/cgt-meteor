import { createStyles, Theme, colors } from '@material-ui/core'

const styles = (theme: Theme) => createStyles({
  button: {
    backgroundColor: colors.green[400],
    height: '40px',
    width: '60px',

    '&:hover': {
      backgroundColor: colors.green[600],
    },
  },
  container: {
    padding: theme.spacing.unit * 4,
    margin: theme.spacing.unit * 6,
  },
})

export default styles
