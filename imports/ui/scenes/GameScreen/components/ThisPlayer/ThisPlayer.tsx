import * as React from 'react'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import {
  withStyles,
  WithStyles,
  Typography,
  Button,
} from '@material-ui/core'

import { Games, Game } from '../../../../../api/games'
import BoxPaper from '../../../../components/BoxPaper/BoxPaper'

interface ThisPlayerState {
  game: Game,
}

class ThisPlayer extends React.Component<{}, ThisPlayerState> {
  tracker: Tracker.Computation

  componentWillMount() {
    this.tracker = Tracker.autorun(() => {
      this.setState({ game: Games.findOne({
        currentPlayers: { $elemMatch: { userId: Meteor.userId() }} }),
      })
    })
  }

  componentWillUnmount() {
    this.tracker.stop()
  }

  render() {
    const {
      state: {
        game,
      },
    } = this

    // game possibly hasn't loaded yet
    if (!game) {
      return null
    }

    // aw man, I missed doing this
    const currentUser = Meteor.user()
    const gameInfo = game.currentPlayers.find(data =>
      data.userId === currentUser._id)

    // oh god
    if (!gameInfo) {
      return null
    }

    return (
      <BoxPaper>
        <Typography variant="title">
          {currentUser.username}, Game State: {game.state}
        </Typography>
        <Typography variant="subheading">
          Tokens: {gameInfo.tokens}
        </Typography>
        <Typography>
          Hand: {JSON.stringify(gameInfo.hand)}
        </Typography>
        <Button variant="contained">
          Income
        </Button>
        <Button variant="contained">
          Duke
        </Button>
        <Button variant="contained">
          Ambassador
        </Button>
      </BoxPaper>
    )
  }
}

const styles = {

}

export default withStyles(styles)(ThisPlayer)
