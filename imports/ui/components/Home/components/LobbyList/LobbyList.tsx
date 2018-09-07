import * as React from 'react'
// even though this is real...
import { withTracker } from 'meteor/react-meteor-data'

import { Lobbies, Lobby } from '../../../../../api/lobbies'
import LobbyItem from './components/LobbyItem/LobbyItem'

// const lobbies = [
//   {
//     name: 'Name',
//     currentPlayers: 5,
//     maxPlayers: 10,
//   },
//   {
//     name: 'Muuuuuuuuch longer name',
//     currentPlayers: 0,
//     maxPlayers: 10,
//   },
// ]

interface LobbyListProps {
  lobbies: Lobby[],
}

const LobbyList: React.SFC<LobbyListProps> = ({ lobbies }) => (
  <div>
    {lobbies.map(lobby =>
      <LobbyItem
        currentPlayers={lobby.currentPlayers.length}
        key={lobby._id}
        maxPlayers={lobby.maxPlayers}
        name={lobby.name}/>
    )}
  </div>
)

export default withTracker((props: LobbyListProps) => {
  Meteor.subscribe('lobbies')

  return {
    lobbies: Lobbies.find().fetch()
  }
})(LobbyList)
