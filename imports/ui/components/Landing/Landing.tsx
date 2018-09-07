import * as React from 'react'
import {
  Paper,
  WithStyles,
  withStyles,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'

import styles from './LandingStyles'

enum ScreenState {
  Login = 'Login',
  Signup = 'Signup',
}

interface LandingState {
  currentScreen: ScreenState,
  loginEmail: string,
  loginPassword: string,
  signupConfirmPassword: string,
  signupEmail: string,
  signupPassword: string,
}

interface LandingProps extends WithStyles<typeof styles> {}

class Landing extends React.Component<LandingProps, LandingState> {
  state = {
    currentScreen: ScreenState.Login,
    loginEmail: '',
    loginPassword: '',

    signupConfirmPassword: '',
    signupEmail: '',
    signupPassword: '',
  }

  switchScreen = (state: ScreenState) => () => {
    this.setState({ currentScreen: state })
  }

  handleChange = (field: string) => (e: any) => {
    this.setState({ [field]: e.target.value } as LandingState)
  }

  render() {
    const { classes } = this.props
    const {
      currentScreen,
      loginEmail,
      loginPassword,

      signupConfirmPassword,
      signupEmail,
      signupPassword,
    } = this.state
    const { handleChange, switchScreen } = this

    return (
      <Paper className={classes.container}>
        {currentScreen === ScreenState.Login &&
          <React.Fragment>
            <Typography
              className={classes.header}
              variant="display2">
              Log In
            </Typography>
            <TextField
              fullWidth={true}
              label="Email"
              onChange={handleChange('loginEmail')}
              value={loginEmail}
              />
             <TextField
              fullWidth={true}
              label="Password"
              onChange={handleChange('loginPassword')}
              type="password"
              value={loginPassword}
              />
            <Button variant="contained">Login</Button>
            <Typography>Need an account?</Typography>
            <Button onClick={switchScreen(ScreenState.Signup)}>Sign Up</Button>
          </React.Fragment>
        }
        {currentScreen === ScreenState.Signup &&
          <React.Fragment>
            <Typography variant="display1">Sign Up</Typography>
            <TextField
              fullWidth={true}
              label="Email"
              onChange={handleChange('signupEmail')}
              value={signupEmail}
              />
             <TextField
              fullWidth={true}
              label="Password"
              onChange={handleChange('signupPassword')}
              type="password"
              value={signupPassword}
              />
            <TextField
              fullWidth={true}
              label="Confirm Password"
              onChange={handleChange('signupConfirmPassword')}
              type="password"
              value={signupConfirmPassword}
              />
            <Button variant="contained">Sign up</Button>
            <Typography>Have an account?</Typography>
            <Button onClick={switchScreen(ScreenState.Login)}>Login</Button>
          </React.Fragment>
        }
      </Paper>
    )
  }
}

export default withStyles(styles)(Landing)
