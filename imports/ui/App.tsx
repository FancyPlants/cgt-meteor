import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { WithStyles, withStyles } from '@material-ui/core'
import styles from './AppStyles'
import Landing from './scenes/Landing/Landing'
import Home from './scenes/Home/Home'
import LobbyScreen from './scenes/LobbyScreen/LobbyScreen'
// import Game from './components/Game'

interface AppProps extends WithStyles<typeof styles> {}

class App extends React.Component<AppProps, {}> {

  render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/home' component={Home} />
            <Route path='/lobby/:name' component={LobbyScreen} />
            {/* <Route path='/game/:name' component={Game} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default withStyles(styles)(App)
