import * as React from 'react'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { History } from 'history'
import {
  Paper,
  WithStyles,
  withStyles,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'

import { errorAlert } from '../../utilities'
import styles from './LandingStyles'

enum ScreenState {
  Login = 'Login',
  Signup = 'Signup',
}

interface LandingState {
  currentScreen: ScreenState,
  loginUsername: string,
  loginPassword: string,
  signupConfirmPassword: string,
  signupUsername: string,
  signupPassword: string,
}

interface LandingProps extends WithStyles<typeof styles> {
  history: History,
}

class Landing extends React.Component<LandingProps, LandingState> {
  state = {
    currentScreen: ScreenState.Login,
    loginUsername: '',
    loginPassword: '',

    signupConfirmPassword: '',
    signupUsername: '',
    signupPassword: '',
  }

  componentWillMount() {
    // they don't need to login if they already logged in
    const { history } = this.props
    if (Meteor.userId()) {
      history.push('/home')
    }
  }

  switchScreen = (state: ScreenState) => () => {
    this.setState({ currentScreen: state })
  }

  handleChange = (field: string) => (e: any) => {
    this.setState({ [field]: e.target.value } as LandingState)
  }

  //#region login
  loginWithPassword = () => {
    const { loginUsername, loginPassword } = this.state
    const { history } = this.props

    Meteor.loginWithPassword(loginUsername, loginPassword, (err: Meteor.Error) => {
      if (err) {
        errorAlert('Unable to sign up', err.toString())
      } else {
        history.push('/home')
      }
    })
  }
  //#endregion

  //#region signup
  signupWithPassword = () => {
    const {
      signupConfirmPassword,
      signupUsername,
      signupPassword,
    } = this.state
    const { history } = this.props

    if (signupConfirmPassword !== signupPassword) {
      errorAlert('Unable to sign up', 'Passwords do not match.')
      return
    }

    Accounts.createUser({
      username: signupUsername,
      password: signupPassword,
    }, (err: Meteor.Error) => {
      if (err) {
        errorAlert('Unable to sign up', err.toString())
      } else {
        history.push('/home')
      }
    })
  }
  //#endregion

  render() {
    const { classes } = this.props
    const {
      currentScreen,
      loginUsername,
      loginPassword,

      signupConfirmPassword,
      signupUsername,
      signupPassword,
    } = this.state

    const {
      loginWithPassword,
      handleChange,
      signupWithPassword,
      switchScreen,
    } = this

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
              label="Username"
              onChange={handleChange('loginUsername')}
              value={loginUsername}
              />
             <TextField
              fullWidth={true}
              label="Password"
              onChange={handleChange('loginPassword')}
              type="password"
              value={loginPassword}
              />
            <Button
              onClick={loginWithPassword}
              variant="contained">
              Login
            </Button>
            <Typography>Need an account?</Typography>
            <Button onClick={switchScreen(ScreenState.Signup)}>Sign Up</Button>
          </React.Fragment>
        }
        {currentScreen === ScreenState.Signup &&
          <React.Fragment>
            <Typography variant="display1">Sign Up</Typography>
            <TextField
              fullWidth={true}
              label="Username"
              onChange={handleChange('signupUsername')}
              value={signupUsername}
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
            <Button
              onClick={signupWithPassword}
              variant="contained">
              Sign up
            </Button>
            <Typography>Have an account?</Typography>
            <Button onClick={switchScreen(ScreenState.Login)}>Login</Button>
          </React.Fragment>
        }
      </Paper>
    )
  }
}

export default withStyles(styles)(Landing)
