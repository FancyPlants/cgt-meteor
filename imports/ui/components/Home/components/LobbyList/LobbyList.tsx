import * as React from 'react'

import LobbyItem from './components/LobbyItem/LobbyItem'

const lobbies = [
  {
    name: 'Name',
    currentPlayers: 5,
    maxPlayers: 10,
  },
  {
    name: 'Muuuuuuuuch longer name',
    currentPlayers: 0,
    maxPlayers: 10,
  },
]

const LobbyList = () => (
  <div>
    {lobbies.map(lobby =>
      <LobbyItem
        currentPlayers={lobby.currentPlayers}
        maxPlayers={lobby.maxPlayers}
        name={lobby.name}/>
    )}
  </div>
)

export default LobbyList
