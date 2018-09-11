import * as React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import { Game, Games } from '../../../../../api/games'
import { User } from '../../../../../api/users'
import OtherPlayer from './components/OtherPlayer/OtherPlayer'

interface OtherPlayerListState {
  game: Game,
  users: User[],
}

class OtherPlayerList extends React.Component<{}, OtherPlayerListState> {
  tracker: Tracker.Computation

  componentWillMount() {
    this.tracker = Tracker.autorun(() => {
      const game = Games.findOne({ currentPlayers: { $elemMatch: {
        userId: Meteor.userId(),
      }}})

      if (!game) {
        return
      }
      const userIDs = game.currentPlayers.map(data => data.userId)
      const users = Meteor.users.find({ _id: { $in: userIDs }}).fetch() as User[]

      this.setState({
        game,
        users,
      })
    })
  }

  render() {
    const {
      state: {
        game,
        users,
      },
    } = this

    return (
      <div>
        {users.map => {

        }}
      </div>
    )
  }
}

export default OtherPlayerList
