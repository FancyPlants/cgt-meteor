import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

import { generateID } from '../logic/utilities'
import { Player } from './players'

export interface Lobby {
  _id: string,
  name: string,

  // player IDs
  currentPlayers: string[],
  maxPlayers: number,
}

export const Lobbies = new Mongo.Collection<Lobby>('lobbies')

if (Meteor.isServer) {
  Meteor.publish(
    'lobbies',
    function lobbies() {
      return Lobbies.find({})
    },
  )

  Meteor.methods({
    'lobbies.newLobby'(name: string) {
      check(name, String)
      const currentLobbies = Lobbies.find({ name }).fetch()

      if (currentLobbies.length > 0) {
        throw new Meteor.Error('Lobby with the same name already exists!')
      }

      Lobbies.insert({
        _id: generateID(),
        name,
        currentPlayers: [],
        maxPlayers: 10,
      })
    },
  })
}
