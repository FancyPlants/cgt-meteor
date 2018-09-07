import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { WithStyles, withStyles } from '@material-ui/core'
import styles from './AppStyles'
import Home from './components/Home/Home'
// import Lobby from './components/Lobby'
// import Game from './components/Game'

interface AppProps extends WithStyles<typeof styles>{}

class App extends React.Component<AppProps, {}> {

  render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            {/* <Route path='/lobby/:name' component={Lobby} />
            <Route path='/game/:name' component={Game} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default withStyles(styles)(App)
