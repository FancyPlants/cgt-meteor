import { createStyles, Theme, colors } from '@material-ui/core'

const styles = (theme: Theme) => createStyles({
  button: {
    backgroundColor: colors.green[600],
    height: '60px',
    width: '80px',

    '&:hover': {
      backgroundColor: colors.green[800],
    },
  },
  container: {
    overflow: 'auto',
    padding: theme.spacing.unit * 4,
    margin: '5%',
  },
})

export default styles
